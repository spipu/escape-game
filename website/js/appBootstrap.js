class AppBootstrap {
    /** @type {int}            */ currentFile;
    /** @type {Object}         */ version;
    /** @type {boolean}        */ offline;
    /** @type {ScreenWakeLock} */ screenWakeLock;

    constructor() {
        if (!("serviceWorker" in navigator)) {
            this.logError("Your browser is not compatible with this application");
            return;
        }

        this.serviceWorkerLoad();
    }

    serviceWorkerLoad()
    {
        navigator.serviceWorker
            .register("/appServiceWorker.js")
            .then(() => {
                navigator.serviceWorker.ready.then((registration) => {
                    this.serviceWorker = registration;
                    navigator.serviceWorker.onmessage = this.serviceWorkerListen.bind(this);
                    this.checkVersion();
                });
            })
            .catch((error) => {
                this.logError("Error registering the Service Worker", error);
            });
    }

    serviceWorkerListen(event) {
        let message = JSON.parse(event.data);
        let eventCode = message.code;
        let eventContext = message.context;

        switch (eventCode) {
            case 'cacheCleared':
                window.location.href = '/';
                break;

            default:
                this.logError('Unknown message ' + eventCode, eventContext);
        }
    }

    async checkVersion() {
        this.loadCurrentVersion();
        let serverVersion = await this.loadServerVersion();

        if (this.version === null) {
            if (serverVersion === null) {
                this.offline = true;
                this.logError("You need network connexion to load the app");
                return;
            }

            this.offline = false;
            this.logDebug('OnLine - first install');
            this.saveVersion(serverVersion);
            this.loadApp();
            return;
        }

        if (serverVersion === null) {
            this.offline = true;
            this.logDebug('OffLine Mode');
            this.loadApp();
            return;
        }

        this.offline = false;
        if (this.version.version === serverVersion.version) {
            this.logDebug('OnLine Mode');
            this.loadApp();
            return;
        }

        this.logDebug('Need update');
        this.saveVersion(serverVersion);
        this.serviceWorker.active.postMessage("clearCache");
    }

    loadCurrentVersion() {
        this.version = null;

        let values = localStorage.getItem("app.version");
        if (!values) {
            return;
        }
        this.version = JSON.parse(values);
        if (!(this.version instanceof Object)) {
            this.version = null;
        }
    }

    async loadServerVersion() {
        try {
            let response = await fetch('/js/appVersion.json?_=' + (new Date()).getTime());
            return await response.json();
        } catch {
            return null;
        }
    }

    saveVersion(version) {
        this.version = version;
        localStorage.setItem("app.version", JSON.stringify(version));
    }

    loadApp() {
        this.currentFile = 0;
        this.loadNextAsset();
    }

    async loadNextAsset() {
        try {
            let response = await fetch(this.version.files['assets'][this.currentFile])
            if (response.status >= 200 && response.status < 300) {
                this.assetSuccess();
                return;
            }
        } catch {
        }
        this.assetFailed();
    }

    assetSuccess() {
        this.currentFile++;
        if (this.currentFile < this.version.files['assets'].length) {
            this.loadNextAsset();
            return;
        }

        this.currentFile = 0;
        this.loadNextCssFile();
    }

    assetFailed() {
        this.logError('Error on loading ASSET file ' + this.version.files['assets'][this.currentFile]);
    }

    loadNextCssFile() {
        let htmlTag = document.createElement("link");
        htmlTag.setAttribute("rel", "stylesheet");
        htmlTag.setAttribute("type", "text/css");
        htmlTag.setAttribute("href", this.version.files['css'][this.currentFile]);
        htmlTag.onload  = this.cssSuccess.bind(this);
        htmlTag.onerror = this.cssFailed.bind(this);
        document.body.appendChild(htmlTag);
    }

    cssSuccess() {
        this.currentFile++;
        if (this.currentFile < this.version.files['css'].length) {
            this.loadNextCssFile();
            return;
        }

        this.currentFile = 0;
        this.loadNextJsFile();
    }

    cssFailed() {
        this.logError('Error on loading CSS file ' + this.version.files['css'][this.currentFile]);
    }

    loadNextJsFile() {
        let htmlTag = document.createElement("script");
        htmlTag.setAttribute("type", "text/javascript");
        htmlTag.setAttribute("src", this.version.files['js'][this.currentFile]);
        htmlTag.onload  = this.jsSuccess.bind(this);
        htmlTag.onerror = this.jsFailed.bind(this);
        document.body.appendChild(htmlTag);
    }

    jsSuccess() {
        this.currentFile++;
        if (this.currentFile < this.version.files['js'].length) {
            this.loadNextJsFile();
            return;
        }

        this.currentFile = 0;
        this.startApp();
    }

    jsFailed() {
        this.logError('Error on loading JS file ' + this.version.files['js'][this.currentFile])
    }

    startApp() {
        this.initScreenWakeLock();
        this.runLauncher();
    }

    initScreenWakeLock() {
        this.screenWakeLock = new ScreenWakeLock();
        this.screenWakeLock.init();
    }

    runLauncher() {
        (new Launcher(this.version.version, this.offline))
            .addScenario(new ScenarioTutorial())
            .addScenario(new ScenarioBroceliande())
            .addScenario(new ScenarioHome())
            .start()
        ;
    }

    logDebug(message, context = null) {
        console.log("AppBootstrap - " + message, context);
    }

    logError(message, context = null) {
        console.error("AppBootstrap - " + message, context);
        alert(message);
    }
}

document.addEventListener("DOMContentLoaded", () => { new AppBootstrap(); });
