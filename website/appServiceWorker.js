class AppServiceWorker {
    /** @type {WorkerGlobalScope} */ serviceWorker;
    /** @type {boolean}           */ debugEnabled = false;
    /** @type {string}            */ version = "v1";
    /** @type {string[]}          */ files = [
        "/",
        "/js/appBootstrap.js",
        "/js/appVersion.json",
        "/css/main.css"
    ];

    /**
     * @param {WorkerGlobalScope} serviceWorker
     */
    constructor(serviceWorker) {
        this.serviceWorker = serviceWorker;
    }

    initListeners() {
        this.serviceWorker.addEventListener("install",  this.install.bind(this));
        this.serviceWorker.addEventListener("activate", this.activate.bind(this));
        this.serviceWorker.addEventListener("message",  this.message.bind(this));
        this.serviceWorker.addEventListener("fetch",    this.fetch.bind(this));
    }

    install(event) {
        event.waitUntil(this.loadNewVersion.bind(this));
    }

    activate(event) {
    }

    message(event) {
        let eventCode = event.data;
        switch (eventCode) {
            case 'clearCache':
                this.clearCache();
                break;

            default:
                this.logDebug('Unknown message', eventCode);
        }
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

        let cache = await caches.open(this.version)
        let urls = this.files;

        const requests = urls.map((url) => new Request(url, {cache: 'reload'}));
        await cache.addAll(requests);
    }

    async deleteOldVersions() {
        let keys = await caches.keys();

        keys.map(key => {
            this.logDebug(`Deleting version ${key}`);
            caches.delete(key);
        });
    }

    fetch(event) {
        event.respondWith(
            caches
                .match(event.request)
                .then(
                    (cached) => {
                        if (cached) {
                            return cached;
                        }

                        this.logDebug('Get from server', event.request.url);
                        return fetch(event.request, {cache: "reload"})
                    })
                .then(response => this.cache(event.request, response).then(() => response))
        );
    }

    async cache(request, response) {
        if (response.type === "error" || response.type === "opaque") {
            return Promise.resolve();
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

let appServiceWorker =  new AppServiceWorker(self);
appServiceWorker.initListeners();
