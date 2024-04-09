class MachineConnector extends AbstractMachine {
    /** @type {string}         */ btnCancelImage;
    /** @type {string}         */ btnConfirmImage;

    /**
     * @param {string} image
     */
    setButtonCancelImage(image) {
        this.btnCancelImage = image;
        return this;
    }

    /**
     * @param {string} image
     */
    setButtonConfirmImage(image) {
        this.btnConfirmImage = image;
        return this;
    }

    start() {
        this.displayBackground('machine_connector')
        this.displayButtonClose();
        this.displayButtonReset();
        this.displayButtonConfirm();
        this.displayButtonSwitches();
        this.displayHelpMessage();
    }

    displayButtonReset() {
        let size = 120;
        let delta = 15;

        let btn = new Button(
            new Size(size, size),
            new Position(375 - delta - size, this.display.height - delta - size),
            this.btnCancelImage
        );
        this.display.addButton(btn)
        btn.htmlTag.text('C');
        btn.htmlTag.css('font-size', '120%');
        btn.htmlTag.on(
            'click',
            $.proxy(this.resetButtonSwitches, this)
        );

        this.buttons[this.buttons.length] = btn;
    }

    displayButtonConfirm() {
        let size = 120;
        let delta = 15;

        let btn = new Button(
            new Size(size, size),
            new Position(375 + delta, this.display.height - delta - size),
            this.btnConfirmImage
        );
        this.display.addButton(btn)
        btn.htmlTag.text('OK');
        btn.htmlTag.css('font-size', '120%');
        btn.htmlTag.on(
            'click',
            $.proxy(function () { this.executeMachine(this.getButtonSwitchesValue()); }, this)
        );

        this.buttons[this.buttons.length] = btn;
    }
}
