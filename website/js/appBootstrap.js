class AppBootstrap {
    constructor(forceReload = false) {
        this.forceReload = forceReload;

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

        this.currentFile = 0;
        this.loadNextJsFile();
    }

    loadNextJsFile() {
        let url = this.jsFiles[this.currentFile];
        if (this.forceReload) {
            url += '?_t=' + (new Date()).getTime()
        }

        let script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", url);
        script.onload=$.proxy(this.jsSuccess, this);
        script.onerror=$.proxy(this.jsFailed, this);
        document.body.appendChild(script);
    }

    jsSuccess() {
        this.currentFile++;
        if (this.currentFile < this.jsFiles.length) {
            this.loadNextJsFile();
            return;
        }

        this.launchApp();
    }

    jsFailed() {
        alert('Error on loading JS file ' + this.jsFiles[this.currentFile]);
        window.location.reload();
    }

    launchApp() {
        (new Launcher(this.forceReload))
            .addScenario(new ScenarioTutorial())
            .addScenario(new ScenarioBroceliande())
            .start()
    }
}

new AppBootstrap(true);
