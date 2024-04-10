class AppBootstrap {
    /** @type {AppVersion} */ version;
    /** @type {string[]}   */ jsFiles;
    /** @type {int}        */ currentFile;

    constructor() {
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
            '/js/machine/abstractMachine.js',
            '/js/machine/machineConnector.js',
            '/js/machine/machineDigicode.js',
            '/scenario/tutorial/definition.js',
            '/scenario/broceliande/definition.js',
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
        this.currentFile = 0;
        this.loadNextJsFile();
    }

    loadNextJsFile() {
        this.loadJsFile(
            this.jsFiles[this.currentFile],
            this.version.currentVersion,
            $.proxy(this.jsSuccess, this)
        )
    }

    loadJsFile(url, version, callbackLoaded) {
        let script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url + '?_v=' + version);
        script.onload=callbackLoaded;
        script.onerror=$.proxy(this.jsFailed, this);
        document.body.appendChild(script);
    }

    jsSuccess() {
        this.currentFile++;
        if (this.currentFile < this.jsFiles.length) {
            this.loadNextJsFile();
            return;
        }

        this.ready();
    }

    jsFailed() {
        alert('Error on loading JS file ' + this.jsFiles[this.currentFile]);
        window.location.reload();
    }

    ready() {
        (new Launcher(this.version))
            .addScenario(new ScenarioTutorial())
            .addScenario(new ScenarioBroceliande())
            .start()
    }
}

new AppBootstrap(true);
