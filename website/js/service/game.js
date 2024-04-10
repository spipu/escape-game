class Game {
    /** @type {AppVersion}     */ version;
    /** @type {GameDisplay}    */ display;
    /** @type {Scenario}       */ scenario;
    /** @type {GameResource}   */ resource;
    /** @type {GameState}      */ state;
    /** @type {Actions}        */ actions;
    /** @type {ScreenWakeLock} */ screenWakeLock;

    /**
     * @param {Scenario}   scenario
     * @param {AppVersion} version
     */
    constructor(scenario, version) {
        scenario.load();
        this.version  = version;
        this.scenario = scenario;
        this.state    = new GameState(scenario);
        this.resource = new GameResource(scenario, this.state, version);
        this.display  = new GameDisplay(this.resource);
        this.actions  = new Actions(this.display, this.scenario, this.state);
        this.screenWakeLock = new ScreenWakeLock();
    }

    start() {
        this.display.init();
        this.display.setBackground(this.scenario.themes['main'].background);
        this.display.prepareQuickAlert(this.scenario.backgroundModalText, this.scenario.buttonClose.image);
        this.display.setTimer(this.scenario.timer, this.state);

        this.scenario.buttonPenalty.disableClick();

        this.scenario.buttonPlay.setLabel('Start/Pause');
        this.scenario.buttonPause.setLabel('Start/Pause');
        this.scenario.buttonCode.setLabel('Code');
        this.scenario.buttonMachine.setLabel('Machine');
        this.scenario.buttonHelp.setLabel('Indice');
        this.scenario.buttonPenalty.setLabel('Pénalité');

        this.display.addButton(this.scenario.buttonClose);
        this.display.addButton(this.scenario.buttonCode);
        this.display.addButton(this.scenario.buttonHelp);
        this.display.addButton(this.scenario.buttonMachine);
        this.display.addButton(this.scenario.buttonParameters);
        this.display.addButton(this.scenario.buttonPause);
        this.display.addButton(this.scenario.buttonPenalty);
        this.display.addButton(this.scenario.buttonPlay);

        this.addActionOnButton(this.scenario.buttonClose,      this.actions.close);
        this.addActionOnButton(this.scenario.buttonParameters, this.actions.parameters);
        this.addActionOnButton(this.scenario.buttonPause,      this.actions.pause);
        this.addActionOnButton(this.scenario.buttonPlay,       this.actions.play);
        this.addActionOnButton(this.scenario.buttonCode,       this.actions.code);
        this.addActionOnButton(this.scenario.buttonMachine,    this.actions.machine);
        this.addActionOnButton(this.scenario.buttonHelp,       this.actions.help);
        this.addActionOnButton(this.scenario.buttonPenalty,    this.actions.penalty);

        this.scenario.keyboard.setDisplay(this.display);

        this.state.init($.proxy(this.refreshTimer, this));

        this.actions.pause.execute();

        if (this.scenario.initCallback) {
            this.scenario.initCallback(this.actions);
        }

        window.addEventListener('escape-game.start', (e) => { this.screenWakeLock.ask(); }, false);
        window.addEventListener('escape-game.end',   (e) => { this.screenWakeLock.release(); }, false);
        window.addEventListener('escape-game.close', (e) => { this.screenWakeLock.release(); }, false);
    }

    addActionOnButton(button, action) {
        button.htmlTag.on(
            'click',
            $.proxy(action.execute, action)
        )
    }

    refreshTimer() {
        if (!this.scenario.timer.canContinue && this.state.currentTime < 0) {
            this.timeIsOver();
            this.state.currentTime = 0;
            this.actions.end.execute('timeout');
            return;
        }

        if (this.state.currentTime < 1 - 100 * 60) {
            this.state.currentTime = 1 - 100 * 60;
        }

        if (!this.state.isTimeOver && this.state.currentTime < 0) {
            this.timeIsOver();

            this.display.showQuickAlert(
                "Le délai est dépassé\n" +
                "mais le temps continue de touner.\n" +
                "\n" +
                "#ICON[fa-solid fa-person-running fa-3x]\n" +
                "\n" +
                "Vous pouvez terminer l'aventure."
            );
        }

        this.scenario.timer.refresh(this.state);
    }

    timeIsOver() {
        this.state.isTimeOver = true;
        this.resource.playSoundTimeout();
    }
}
