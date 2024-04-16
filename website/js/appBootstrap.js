class AppBootstrap {
    /** @type {AppVersion} */ version;
    /** @type {string[]}   */ cssFiles;
    /** @type {string[]}   */ jsFiles;
    /** @type {int}        */ currentCssFile;
    /** @type {int}        */ currentJsFile;

    constructor() {
        this.cssFiles = [
            '/css/screen.css',
            '/css/launcher.css',
            '/css/app.css',
            '/css/scenario/broceliande.css',
        ];

        this.jsFiles = [
            '/js/model/action.js',
            '/js/model/button.js',
            '/js/model/buttonSwitch.js',
            '/js/model/keyboard.js',
            '/js/model/help.js',
            '/js/model/modal.js',
            '/js/model/modalParameters.js',
            '/js/model/modalTextBig.js',
            '/js/model/modalTextSmall.js',
            '/js/model/position.js',
            '/js/model/resourceImage.js',
            '/js/model/resourceSound.js',
            '/js/model/scenario.js',
            '/js/model/size.js',
            '/js/model/sprite.js',
            '/js/model/stepCode.js',
            '/js/model/stepEnding.js',
            '/js/model/stepMachine.js',
            '/js/model/stepOpening.js',
            '/js/model/theme.js',
            '/js/model/timer.js',
            '/js/service/action/abstractAction.js',
            '/js/service/action/actionBegin.js',
            '/js/service/action/actionClose.js',
            '/js/service/action/actionCode.js',
            '/js/service/action/actionEnd.js',
            '/js/service/action/actionHelp.js',
            '/js/service/action/actionMachine.js',
            '/js/service/action/actionPause.js',
            '/js/service/action/actionParameters.js',
            '/js/service/action/actionPenalty.js',
            '/js/service/action/actionPlay.js',
            '/js/service/action/actions.js',
            '/js/service/game/resource.js',
            '/js/service/game/state.js',
            '/js/service/game/parameters.js',
            '/js/service/game/display.js',
            '/js/service/game.js',
            '/js/service/launcher.js',
            '/js/service/screenWakeLock.js',
            '/js/machine/abstractMachine.js',
            '/js/machine/machineConnector.js',
            '/js/machine/machineDigicode.js',
            '/js/machine/machineCode.js',
            '/scenario/tutorial/definition.js',
            '/scenario/broceliande/definition.js',
            '/scenario/home/definition.js',
        ];

        this.loadVersion();
    }

    loadVersion() {
        this.loadJsFile(
            '/js/appVersion.js',
            (new Date()).getTime(),
            $.proxy(this.verifyVersion, this)
        );
    }

    verifyVersion() {
        this.version = new AppVersion();
        this.currentCssFile = 0;
        this.currentJsFile = 0;
        this.loadNextCssFile();
    }

    loadNextCssFile() {
        this.loadCssFile(
            this.cssFiles[this.currentCssFile],
            this.version.currentVersion,
            $.proxy(this.cssSuccess, this)
        )
    }

    loadCssFile(url, version, callbackLoaded) {
        let htmlTag = document.createElement("link");
        htmlTag.setAttribute("rel", "stylesheet");
        htmlTag.setAttribute("type", "text/css");
        htmlTag.setAttribute("href", url + '?_v=' + version);
        htmlTag.onload=callbackLoaded;
        htmlTag.onerror=$.proxy(this.cssFailed, this);
        document.body.appendChild(htmlTag);
    }

    cssSuccess() {
        this.currentCssFile++;
        if (this.currentCssFile < this.cssFiles.length) {
            this.loadNextCssFile();
            return;
        }

        this.loadNextJsFile();
    }

    cssFailed() {
        alert('Error on loading CSS file ' + this.cssFiles[this.currentCssFile]);
        window.location.reload();
    }

    loadNextJsFile() {
        this.loadJsFile(
            this.jsFiles[this.currentJsFile],
            this.version.currentVersion,
            $.proxy(this.jsSuccess, this)
        )
    }

    loadJsFile(url, version, callbackLoaded) {
        let htmlTag = document.createElement("script");
        htmlTag.setAttribute("type", "text/javascript");
        htmlTag.setAttribute("src", url + '?_v=' + version);
        htmlTag.onload=callbackLoaded;
        htmlTag.onerror=$.proxy(this.jsFailed, this);
        document.body.appendChild(htmlTag);
    }

    jsSuccess() {
        this.currentJsFile++;
        if (this.currentJsFile < this.jsFiles.length) {
            this.loadNextJsFile();
            return;
        }

        this.ready();
    }

    jsFailed() {
        alert('Error on loading JS file ' + this.jsFiles[this.currentJsFile]);
        window.location.reload();
    }

    ready() {
        (new Launcher(this.version))
            .addScenario(new ScenarioTutorial())
            .addScenario(new ScenarioBroceliande())
            .addScenario(new ScenarioHome())
            .start()
    }
}

new AppBootstrap(true);
