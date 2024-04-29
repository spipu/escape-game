class AppBootstrap {
    /** @type {int}            */ currentFile;
    /** @type {Object}         */ version;
    /** @type {boolean}        */ offline;
    /** @type {ScreenWakeLock} */ screenWakeLock;
    /** @type int              */ loadingStepCurrent
    /** @type int              */ loadingStepMax
    /** @type int              */ loadingFileCurrent
    /** @type int              */ loadingFileMax
    /** @type {boolean}        */ pwaMode;

    constructor() {
        if ("serviceWorker" in navigator) {
            this.bootstrapPwa();
            return;
        }

        this.logError("Your browser is not compatible with PWA and service workers");
        this.bootstrapClassic();
    }

    bootstrapPwa() {
        this.pwaMode = true;
        navigator.serviceWorker
            .register("./appServiceWorker.js")
            .then(() => {
                navigator.serviceWorker.ready.then((registration) => {
                    this.serviceWorker = registration;
                    navigator.serviceWorker.onmessage = this.serviceWorkerListen.bind(this);
                    this.checkVersion();
                });
            })
            .catch((error) => {
                this.logError("Error registering the Service Worker", error);
                this.bootstrapClassic();
            });
    }

    bootstrapClassic() {
        this.pwaMode = false;
        this.logDebug('Disable PWA feature');
        this.checkVersion();
    }

    serviceWorkerListen(event) {
        let message = JSON.parse(event.data);
        let eventCode = message.code;
        let eventContext = message.context;

        switch (eventCode) {
            case 'cacheCleared':
                window.location.href = '/';
                break;

            case 'statsAsked':
                this.displayStats(eventContext);
                break;

            default:
                this.logError('Unknown message ' + eventCode, eventContext);
        }
    }

    displayStats(stats) {
        console.log(stats);
        let debug = document.getElementById('appDebug');
        if (debug) {
            debug.innerText = '(Queries: ' + stats.fetchTotal + ' | Server: ' + stats.fetchServer + ' | Cache: ' + stats.fetchCache + ')';
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
        if (!this.pwaMode) {
            window.location.href = '/';
            return;
        }
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
            let response = await fetch('./js/appVersion.json?_=' + (new Date()).getTime());
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
        if (this.pwaMode) {
            this.serviceWorker.active.postMessage("resetStats");
        }

        this.loadingStepCurrent = 0;
        this.loadingStepMax     = 2;
        this.loadingFileCurrent = 0;
        this.loadingFileMax     = 0;
        this.loadingFileMax    += this.version.files['assets'].length;
        this.loadingFileMax    += this.version.files['css'].length;
        this.loadingFileMax    += this.version.files['js'].length;
        this.displayLoadingBar();

        this.currentFile = 0;
        this.loadNextAsset();
    }

    async loadNextAsset() {
        if (await this.resourceLoad(this.version.files['assets'][this.currentFile])) {
            this.assetSuccess();
        }
    }

    assetSuccess() {
        this.loadingFileCurrent ++;
        this.displayLoadingBar();

        this.currentFile++;
        if (this.currentFile < this.version.files['assets'].length) {
            this.loadNextAsset();
            return;
        }

        this.currentFile = 0;
        this.loadNextCssFile();
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
        this.loadingFileCurrent ++;
        this.displayLoadingBar();

        this.currentFile++;
        if (this.currentFile < this.version.files['css'].length) {
            this.loadNextCssFile();
            return;
        }

        this.currentFile = 0;
        this.loadNextJsFile();
    }

    cssFailed() {
        this.resourceFailed(this.version.files['css'][this.currentFile]);
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
        this.loadingFileCurrent ++;
        this.displayLoadingBar();

        this.currentFile++;
        if (this.currentFile < this.version.files['js'].length) {
            this.loadNextJsFile();
            return;
        }

        this.currentFile = 0;
        this.startApp();
    }

    jsFailed() {
        this.resourceFailed(this.version.files['js'][this.currentFile])
    }

    startApp() {
        this.initScreenWakeLock();
        this.loadLauncher();
    }

    initScreenWakeLock() {
        this.screenWakeLock = new ScreenWakeLock();
        this.screenWakeLock.init();
    }

    loadLauncher() {
        let launcher = new Launcher(this.version.version, this.offline);

        launcher
            .addScenario(new ScenarioTutorial())
            .addScenario(new ScenarioBroceliande())
            .addScenario(new ScenarioHome())
        ;

        this.loadScenarioResources(launcher).then((launcher) => { this.runLauncher(launcher); });
    }

    runLauncher(launcher) {
        $('#progressBarContainer').remove();
        launcher.start();
        if (this.pwaMode) {
            this.serviceWorker.active.postMessage("askStats");
        }
    }

    /**
     * @param {Launcher} launcher
     * @return {Promise<*>}
     */
    async loadScenarioResources(launcher) {
        this.loadingStepCurrent ++;
        this.loadingFileCurrent = 0;
        this.loadingFileMax     = 0;

        for (let key in launcher.list) {
            let scenario = launcher.list[key];
            scenario.addResources();
            this.loadingFileMax += Object.keys(scenario.images).length;
            this.loadingFileMax += Object.keys(scenario.sounds).length;
        }

        for (let key in launcher.list) {
            await this.loadScenarioResource(launcher.list[key]);
        }

        return launcher;
    }

    /**
     * @param {Scenario} scenario
     */
    async loadScenarioResource(scenario) {
        scenario.addResources();

        for (let key in scenario.images) {
            await this.resourceLoad(scenario.images[key].url);
            this.loadingFileCurrent ++;
            this.displayLoadingBar();
        }

        for (let key in scenario.sounds) {
            await this.resourceLoad(scenario.sounds[key].url);
            this.loadingFileCurrent ++;
            this.displayLoadingBar();
        }
    }

    async resourceLoad(url) {
        try {
            let response = await fetch(url)
            if (response.status >= 200 && response.status < 300) {
                return true;
            }
        } catch {
        }

        this.resourceFailed(url);
        return false;
    }

    resourceFailed(url) {
        this.logError('Error on loading file ' + url);
    }

    async displayLoadingBar() {
        let percent = Math.floor(100. * (this.loadingFileCurrent / this.loadingFileMax + this.loadingStepCurrent) / this.loadingStepMax);

        document.getElementById('progressBar').style.width = percent + '%';
    }

    logDebug(message, context = null) {
        console.log("AppBootstrap - " + message, context);
    }

    logError(message, context = null) {
        console.error("AppBootstrap - " + message, context);
    }
}

document.addEventListener("DOMContentLoaded", () => { new AppBootstrap(); });
