class AbstractMachine extends AbstractAction {
    /** @type {string}         */ code;
    /**                        */ background;
    /** @type {Sprite[]}       */ sprites;
    /** @type {Button[]}       */ buttons;
    /** @type {ButtonSwitch[]} */ buttonSwitches;
    /** @type {string|null}    */ helpMessage;
    /** @type {StepCode[]}     */ results;
    /** @type {string}         */ btnCloseImage;

    constructor(code, actions) {
        super(actions);
        this.code = code;
        this.background = null;
        this.sprites = [];
        this.buttons = [];
        this.buttonSwitches = [];
        this.helpMessage = null;
        this.results = [];
    }

    /**
     * @param {string} image
     */
    setButtonCloseImage(image) {
        this.btnCloseImage = image;
        return this;
    }

    /**
     * @param {ButtonSwitch} buttonSwitch
     * @return {AbstractMachine}
     */
    addButtonSwitch(buttonSwitch) {
        this.buttonSwitches[this.buttonSwitches.length] = buttonSwitch;
        return this;
    }

    /**
     * @param {StepCode} stepCode
     * @return {AbstractMachine}
     */
    addStepCode(stepCode) {
        this.results[stepCode.code] = stepCode;
        return this;
    }

    /**
     * @param {string} message
     * @return {AbstractMachine}
     */
    setHelpMessage(message) {
        this.helpMessage = message;
        return this;
    }

    start() {
        throw new Error('You have to implement the method startMachine!');
    }

    stop() {
        this.removeButtonSwitches();
        this.removeButtons();
        this.removeSprites();
        this.removeBackground();
    }

    removeButtons() {
        for (let key in this.buttons) {
            this.display.removeButton(this.buttons[key]);
        }
        this.buttons = [];
    }

    removeSprites() {
        for (let key in this.sprites) {
            this.display.removeSprite(this.sprites[key]);
        }
        this.sprites = [];
    }

    removeBackground() {
        if (this.background) {
            this.background.remove();
        }
        this.background = null;
    }

    displayBackground(image) {
        this.background = $('<div class="machine-background"></div>');
        this.display.resource.applyImage(this.background, image);
        this.display.screen.append(this.background);
    }

    displayButtonClose() {
        let btn = new Button(new Size(100, 100), new Position(635, 15), this.btnCloseImage);
        this.display.addButton(btn)
        btn.htmlTag.on('click', $.proxy(this.stop, this));

        this.buttons[this.buttons.length] = btn;
    }

    displayButtonSwitches() {
        for (let key in this.buttonSwitches) {
            this.buttonSwitches[key].add(this.display);
        }
    }

    removeButtonSwitches() {
        for (let key in this.buttonSwitches) {
            this.buttonSwitches[key].remove(this.display);
        }
        this.buttonSwitches = [];
    }

    resetButtonSwitches() {
        for (let key in this.buttonSwitches) {
            this.buttonSwitches[key].reset();
        }
    }

    getButtonSwitchesValue() {
        let value = '';
        for (let key in this.buttonSwitches) {
            if (this.buttonSwitches[key].state) {
                value += this.buttonSwitches[key].code;
            }
        }

        return value;
    }

    displayHelpMessage() {
        if (this.helpMessage) {
            this.display.showQuickAlert(this.helpMessage);
        }
    }

    /**
     * @param {string} machineValue
     */
    executeMachine(machineValue) {
        if (this.results[machineValue] === undefined) {
            this.executeMachineWrong(machineValue);
            return;
        }

        let step = this.results[machineValue];
        if (step.penalty) {
            this.executeMachineBad(step);
            return;
        }

        this.executeMachineGood(step);
    }

    /**
     * @param {string} machineValue
     */
    executeMachineWrong(machineValue) {
        this.display.resource.playSoundBad();
        this.state.nbCodeBad++;
        this.state.nbPenalty++;
        this.state.applyTimerPenalty();
        this.resetButtonSwitches();

        this.display.showQuickAlert(
            "Vous perdez 1 minute.\n" +
            "\n" +
            "\n" +
            "#ICON[fa-solid fa-skull fa-3x]"
        );
        this.dispatchEvent('machine.wrong', this.code, machineValue);
    }

    /**
     * @param {StepCode} step
     */
    executeMachineBad(step) {
        this.display.resource.playSoundBad();
        this.state.nbCodeBad++;
        this.state.applyTimerPenalty(step.penalty);
        this.resetButtonSwitches();

        this.display.showQuickAlert(step.text);
        this.dispatchEvent('machine.bad', this.code, step.code);
    }

    /**
     * @param {StepCode} step
     */
    executeMachineGood(step) {
        this.display.resource.playSoundGood();
        this.state.addMachine(step.code);
        this.state.nbCodeGood++;
        this.stop();

        if (step.end) {
            this.dispatchEvent('machine.good', this.code, step.code);
            this.actions.end.execute(step.end);
            return;
        }

        let modal = (new ModalTextBig(step.text));
        modal.addCloseButton(this.scenario.buttonClose.image);
        modal.open(this.display);
        this.dispatchEvent('machine.good', this.code, step.code);
    }
}
