class MachineCode extends AbstractMachine {
    /** @type {string}  */ codeValue;

    /**
     * @param {Size}     size
     * @param {Position} position
     */
    addSlotCode(size, position) {
        let sprite = new Sprite(size, position);
        sprite.htmlTag = $('<div></div>');

        this.sprites[this.sprites.length] = sprite;
        return this;
    }

    start() {
        this.displayBackground(this.backgroundImage)
        this.displayButtonCodes();
        this.displaySprites();
        this.displayButtonClose();
        this.displayButtonReset(120, 15, '120%');
        this.displayButtonConfirm(120, 15, '120%');
        this.resetButtonSwitches();
        this.displayHelpMessage();

        for (let key in this.buttonCodes) {
            this.buttonCodes[key].button.htmlTag.on(
                'click',
                $.proxy(
                    function() { this.selectCode(key); },
                    this
                )
            );
        }

    }

    resetButtonSwitches() {
        this.codeValue = '';
        this.updateDisplay();
    }

    getButtonSwitchesValue() {
        return this.codeValue;
    }

    selectCode(key) {
        if (this.codeValue.length < this.sprites.length) {
            this.codeValue += this.buttonCodes[key].code
            this.updateDisplay();
        }
    }

    updateDisplay() {
        for (let slot=0; slot < this.sprites.length; slot ++) {
            if (slot < this.codeValue.length) {
                for (let codeKey = 0; codeKey < this.buttonCodes.length; codeKey++) {
                    if (this.buttonCodes[codeKey].code === this.codeValue.charAt(slot)) {
                        this.display.resource.applyImage(this.sprites[slot].htmlTag, this.buttonCodes[codeKey].image);
                    }
                }
            } else {
                this.display.resource.removeImage(this.sprites[slot].htmlTag);
            }
        }
    }
}
