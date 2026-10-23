class AppServiceWorker {
    /** @type {WorkerGlobalScope} */ serviceWorker;
    /** @type {int}               */ statsFetchTotal;
    /** @type {int}               */ statsFetchServer;
    /** @type {int}               */ statsFetchCache;
    /** @type {Map<string, int>}  */ statsServerFiles;
    /** @type {boolean}           */ debugEnabled = false;
    /** @type {string}            */ version = "v1";
    /** @type {string[]}          */ files = [
        "/",
        "/js/webapp/appBootstrap.js",
        "/css/main.css",
        "/manifest.webmanifest"
    ];

    /**
     * @param {WorkerGlobalScope} serviceWorker
     */
    constructor(serviceWorker) {
        this.serviceWorker    = serviceWorker;
        this.statsFetchTotal  = 0;
        this.statsFetchServer = 0;
        this.statsFetchCache  = 0;
        this.statsServerFiles = new Map();
    }

    initListeners() {
        this.serviceWorker.addEventListener("install",  this.install.bind(this));
        this.serviceWorker.addEventListener("activate", this.activate.bind(this));
        this.serviceWorker.addEventListener("message",  this.message.bind(this));
        this.serviceWorker.addEventListener("fetch",    this.fetch.bind(this));
    }

    install(event) {
        event.waitUntil(this.loadNewVersion());
    }

    activate(event) {
        // Without claim(), the page that registered this worker stays uncontrolled until its next load.
        event.waitUntil(this.serviceWorker.clients.claim());
    }

    message(event) {
        let eventCode = event.data;
        switch (eventCode) {
            case 'clearCache':
                event.waitUntil(this.clearCache());
                break;

            case 'resetStats':
                this.resetStats();
                break;

            case 'askStats':
                event.waitUntil(this.askStats());
                break;

            default:
                this.logDebug('Unknown message', eventCode);
        }
    }

    resetStats() {
        this.statsFetchTotal  = 0;
        this.statsFetchServer = 0;
        this.statsFetchCache  = 0;
        this.statsServerFiles.clear();
    }

    // The weight of the application: what the cache holds, plus what came from the server to go in it and is not
    // there yet — each file once. The requests that bypass the cache (version check, a downloaded data file) are
    // never part of it.
    async askStats() {
        const sizes = new Map();
        for (const name of await caches.keys()) {
            const cache = await caches.open(name);
            for (const request of await cache.keys()) {
                const response = await cache.match(request);
                sizes.set(request.url, (await response.blob()).size);
            }
        }
        const cacheFiles = sizes.size;
        for (const [url, size] of this.statsServerFiles) {
            if (!sizes.has(url)) {
                sizes.set(url, size);
            }
        }
        let bytes = 0;
        for (const size of sizes.values()) {
            bytes += size;
        }
        this.triggerEvent(
            'statsAsked',
            {
                'fetchTotal':  this.statsFetchTotal,
                'fetchServer': this.statsFetchServer,
                'fetchCache':  this.statsFetchCache,
                'serverFiles': this.statsServerFiles.size,
                'cacheFiles':  cacheFiles,
                'appBytes':    bytes,
            }
        );
    }

    // Only a response that goes to the cache: an HTTP error never does.
    async recordServerFile(url, response) {
        if (!response.ok) {
            return;
        }
        this.statsServerFiles.set(url, (await response.clone().blob()).size);
    }

    async clearCache() {
        this.logDebug(`Clear Cache`);
        await this.deleteOldVersions();
        await this.loadNewVersion();
        this.logDebug(`Cache Cleared`);
        this.triggerEvent('cacheCleared');
    }

    async loadNewVersion() {
        this.logDebug(`Loading Version`);

        let cache = await caches.open(this.version);
        let urls = this.files;

        const requests = urls.map((url) => new Request(url, {cache: 'no-store'}));
        await cache.addAll(requests);
    }

    async deleteOldVersions() {
        let keys = await caches.keys();

        await Promise.all(
            keys.map(key => {
                this.logDebug(`Deleting version ${key}`);
                return caches.delete(key);
            })
        );
    }

    fetch(event) {
        if (event.request.url.indexOf('swBypass=1') !== -1) {
            event.respondWith(fetch(event.request));
            return;
        }

        event.respondWith(
            caches
                .match(event.request)
                .then(
                    (cached) => {
                        this.statsFetchTotal++;

                        if (cached) {
                            this.statsFetchCache++;
                            return cached;
                        }

                        this.logDebug('Get from server', event.request.url);
                        this.statsFetchServer++;
                        return fetch(event.request, {cache: "no-store"})
                            .then(response => Promise.all([
                                this.recordServerFile(event.request.url, response),
                                this.putInCache(event.request, response)
                            ]).then(() => response));
                    })
        );
    }

    async putInCache(request, response) {
        // A cached HTTP error would be served until the next version bump; ok is also false for error/opaque types.
        if (!response.ok) {
            return;
        }

        return caches
            .open(this.version)
            .then(cache => cache.put(request, response.clone()));
    }

    triggerEvent(eventCode, eventContext = null) {
        this.serviceWorker.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage(JSON.stringify({code: eventCode, context: eventContext}));
            });
        });
    }

    logDebug(message, context = null) {
        if (this.debugEnabled) {
            console.log('AppServiceWorker ' + this.version + ' - ' + message, context);
        }
    }
}

let appServiceWorker = new AppServiceWorker(self);
appServiceWorker.initListeners();
