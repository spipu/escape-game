class MachineDigicode extends AbstractMachine {

    /** @type {int}    */ maxDigits;
    /** @type {int}    */ screenWidth;
    /** @type {int}    */ screenHeight;
    /** @type {int}    */ screenDeltaY;
    /** @type {int}    */ digitsSize;
    /** @type {int}    */ digitsMargeX;
    /** @type {int}    */ digitsMargeY;
    /** @type {int}    */ digitsDeltaX;
    /** @type {int}    */ digitsDeltaY;
    /** @type {Sprite} */ screen;
    /** @type {string} */ digicodeValue;

    /**
     * @param {int} maxDigits
     * @return {MachineDigicode}
     */
    setMaxDigit(maxDigits) {
        this.maxDigits = maxDigits;
        return this;
    }

    /**
     * @param {int} width
     * @param {int} height
     * @param {int} deltaY
     * @return {MachineDigicode}
     */
    setScreen(width, height, deltaY) {
        this.screenWidth  = width;
        this.screenHeight = height;
        this.screenDeltaY = deltaY;
        return this;
    }

    /**
     * @param {int} size
     * @param {int} margeX
     * @param {int} margeY
     * @param {int} deltaX
     * @param {int} deltaY
     * @return {MachineDigicode}
     */
    setDigitsPosition(size, margeX, margeY, deltaX, deltaY) {
        this.digitsSize = size;
        this.digitsMargeX = margeX;
        this.digitsMargeY = margeY;
        this.digitsDeltaX = deltaX;
        this.digitsDeltaY = deltaY;
        return this;
    }

    start() {
        this.displayBackground('machine_digicode');
        this.displayScreen();
        this.displayButtonClose();
        this.displayDigicodeButtons();
        this.resetDigit();
        this.displayHelpMessage();
    }

    displayScreen() {
        this.screen = new Sprite(
            new Size(this.screenWidth, this.screenHeight),
            new Position((this.display.width - this.screenWidth) / 2, this.screenDeltaY)
        );
        this.screen.htmlTag = $('<div class="digicode-screen"></div>');
        this.display.addSprite(this.screen);
        this.sprites[this.sprites.length] = this.screen;
    }

    displayDigicodeButtons() {
        let key = this.buttons.length;
        this.buttons[key + 1]  = this.createKey(0, 0, $.proxy(function() { this.addDigit('7'); }, this));
        this.buttons[key + 2]  = this.createKey(1, 0, $.proxy(function() { this.addDigit('8'); }, this));
        this.buttons[key + 3]  = this.createKey(2, 0, $.proxy(function() { this.addDigit('9'); }, this));
        this.buttons[key + 4]  = this.createKey(0, 1, $.proxy(function() { this.addDigit('4'); }, this));
        this.buttons[key + 5]  = this.createKey(1, 1, $.proxy(function() { this.addDigit('5'); }, this));
        this.buttons[key + 6]  = this.createKey(2, 1, $.proxy(function() { this.addDigit('6'); }, this));
        this.buttons[key + 7]  = this.createKey(0, 2, $.proxy(function() { this.addDigit('1'); }, this));
        this.buttons[key + 8]  = this.createKey(1, 2, $.proxy(function() { this.addDigit('2'); }, this));
        this.buttons[key + 9]  = this.createKey(2, 2, $.proxy(function() { this.addDigit('3'); }, this));
        this.buttons[key + 10] = this.createKey(0, 3, $.proxy(function() { this.resetDigit();  }, this));
        this.buttons[key + 11] = this.createKey(1, 3, $.proxy(function() { this.addDigit('0'); }, this));
        this.buttons[key + 12] = this.createKey(2, 3, $.proxy(function() { this.verifyValue(); }, this));
    }

    verifyValue() {
        let value = this.digicodeValue;
        this.resetDigit();
        this.executeMachine(value);
    }

    addDigit(digit) {
        if (this.digicodeValue.length < this.maxDigits) {
            this.digicodeValue += digit;
            this.updateValue();
        }
    }

    resetDigit() {
        this.digicodeValue = '';
        this.updateValue();
    }

    updateValue() {
        this.screen.htmlTag.text(this.digicodeValue);
    }

    /**
     * @param {int}      x
     * @param {int}      y
     * @param {function} callback
     */
    createKey(x, y, callback ) {
        let btn = new Button(
            new Size(this.digitsSize, this.digitsSize),
            new Position(
                (this.digitsSize + this.digitsDeltaX) * (x - 1) - this.digitsMargeX + (this.display.width - this.digitsSize) / 2,
                (this.digitsSize + this.digitsDeltaY) * (y - 4) - this.digitsMargeY + this.digitsDeltaY + this.display.height
            ),
            null,
            'button-over-circle'
        );

        this.display.addButton(btn);
        btn.htmlTag.on('click', callback);

        return btn;
    }
}
