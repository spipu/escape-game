class Scenario {
    /** @type {string}      */ code;
    /** @type {string}      */ name;
    /** @type {string}      */ backgroundModalParameters;
    /** @type {string}      */ backgroundModalText;
    /** @type {string|null} */ soundClick;
    /** @type {string|null} */ soundGood;
    /** @type {string|null} */ soundBad;
    /** @type {string|null} */ soundAlert;
    /** @type {string|null} */ soundTimeout;
    /** @type {Button}      */ buttonClose;
    /** @type {Button}      */ buttonCode;
    /** @type {Button}      */ buttonHelp;
    /** @type {Button}      */ buttonMachine;
    /** @type {Button}      */ buttonParameters;
    /** @type {Button}      */ buttonPause;
    /** @type {Button}      */ buttonPenalty;
    /** @type {Button}      */ buttonPlay;
    /** @type {Timer}       */ timer;
    /** @type {Keyboard}    */ keyboard;
    /** @type {ResourceImage[]} */ images;
    /** @type {ResourceSound[]} */ sounds;
    /** @type {Help[]}          */ helps;
    /** @type {StepOpening}     */ stepOpening;
    /** @type {StepCode[]}      */ stepCodes;
    /** @type {StepMachine[]}   */ stepMachines;
    /** @type {StepEnding[]}    */ stepEndings;
    /** @type {Theme[]}         */ themes;
    /** @type {function|null}   */ initCallback;

    /**
     * @param {string} code
     * @param {string} name
     */
    constructor(code, name) {
        this.code = code;
        this.name = name;
        this.images       = [];
        this.sounds       = [];
        this.helps        = [];
        this.stepCodes    = [];
        this.stepMachines = [];
        this.stepEndings  = [];
        this.themes       = [];

        this
            .setButtonClose(new Button())
            .setButtonParameters(new Button())
            .setButtonPause(new Button())
            .setButtonPlay(new Button())
            .setButtonHelp(new Button())
            .setButtonCode(new Button())
            .setButtonPenalty(new Button())
            .setButtonMachine(new Button())
        ;
    }

    addResources() {
        throw new Error('You have to implement the method addResources!');
    }

    load() {
        throw new Error('You have to implement the method load!');
    }

    /**
     * @param {string} code
     * @param {string} filename
     * @param {boolean} useDefault
     * @returns {Scenario}
     */
    addResourceImage(code, filename, useDefault = false) {
        let resource = new ResourceImage((useDefault ? '_default' : this.code), code, filename);
        this.images[resource.code] = resource;
        return this;
    }

    /**
     * @param {string} code
     * @param {string} filename
     * @param {number} volume
     * @param {boolean} useDefault
     * @returns {Scenario}
     */
    addResourceSound(code, filename, volume, useDefault = false) {
        let resource = new ResourceSound((useDefault ? '_default' : this.code), code, filename, volume);
        this.sounds[resource.code] = resource;
        return this;
    }

    /**
     * @param {Theme} theme
     * @return {Scenario}
     */
    addTheme(theme) {
        this.themes[theme.code] = theme;
        return this;
    }

    /**
     * @param {Help} help
     * @returns {Scenario}
     */
    addHelp(help) {
        this.helps[help.code] = help;
        return this;
    }

    /**
     * @param {StepOpening} stepOpening
     * @returns {Scenario}
     */
    setStepOpening(stepOpening) {
        this.stepOpening = stepOpening;
        return this;
    }

    /**
     * @param {StepCode} step
     * @returns {Scenario}
     */
    addStepCode(step) {
        this.stepCodes[step.code] = step;
        return this;
    }

    /**
     * @param {StepMachine} step
     * @returns {Scenario}
     */
    addStepMachine(step) {
        this.stepMachines[step.code] = step;
        return this;
    }

    /**
     * @param {StepEnding} step
     * @returns {Scenario}
     */
    addStepEnding(step) {
        this.stepEndings[step.code] = step;
        return this;
    }

    /**
     * @param {string} background
     * @returns {Scenario}
     */
    setBackgroundModalParameters(background) {
        this.backgroundModalParameters = background;
        return this;
    }

    /**
     * @param {string} background
     * @returns {Scenario}
     */
    setBackgroundModalText(background) {
        this.backgroundModalText = background;
        return this;
    }

    /**
     * @param {string|null} soundClick
     * @param {string|null} soundGood
     * @param {string|null} soundBad
     * @param {string|null} soundAlert
     * @param {string|null} soundTimeout
     * @return {Scenario}
     */
    setSounds(soundClick, soundGood, soundBad, soundAlert, soundTimeout) {
        this.soundClick   = soundClick;
        this.soundGood    = soundGood;
        this.soundBad     = soundBad;
        this.soundAlert   = soundAlert;
        this.soundTimeout = soundTimeout;

        return this;
    }

    /**
     * @param {Button} button
     * @returns {Scenario}
     */
    setButtonClose(button) {
        this.buttonClose = button;
        return this;
    }

    /**
     * @param {Button} button
     * @returns {Scenario}
     */
    setButtonCode(button) {
        this.buttonCode = button;
        return this;
    }

    /**
     * @param {Button} button
     * @returns {Scenario}
     */
    setButtonHelp(button) {
        this.buttonHelp = button;
        return this;
    }

    /**
     * @param {Button} button
     * @returns {Scenario}
     */
    setButtonMachine(button) {
        this.buttonMachine = button;
        return this;
    }

    /**
     * @param {Button} button
     * @returns {Scenario}
     */
    setButtonParameters(button) {
        this.buttonParameters = button;
        return this;
    }

    /**
     * @param {Button} button
     * @returns {Scenario}
     */
    setButtonPause(button) {
        this.buttonPause = button;
        return this;
    }

    /**
     * @param {Button} button
     * @returns {Scenario}
     */
    setButtonPenalty(button) {
        this.buttonPenalty = button;
        return this;
    }

    /**
     * @param {Button} button
     * @returns {Scenario}
     */
    setButtonPlay(button) {
        this.buttonPlay = button;
        return this;
    }

    /**
     * @param {Timer} timer
     * @returns {Scenario}
     */
    setTimer(timer) {
        this.timer = timer;
        return this;
    }

    /**
     * @param {Keyboard} keyboard
     * @return {Scenario}
     */
    setKeyboard(keyboard) {
        this.keyboard = keyboard;
        return this;
    }

    /**
     * @param {function} callback
     * @return {Scenario}
     */
    setInitCallback(callback) {
        this.initCallback = callback;
        return this;
    }
}
