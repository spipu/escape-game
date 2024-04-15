class Keyboard {
    /** @type {string}      */ imageBackground;
    /** @type {string}      */ imageButtonNumber;
    /** @type {string}      */ imageButtonConfirm;
    /** @type {string}      */ imageButtonCancel;
    /** @type {string}      */ imageButtonClose;
    /** @type {GameDisplay} */ display;
    /**                     */ overlay;
    /** @type {Sprite}      */ sprite;
    /** @type {Button[]}    */ buttons;
    /** @type {int}         */ nbMinDigits;
    /** @type {int}         */ nbMaxDigits;
    /** @type {boolean}     */ allowZeroFirst;
    /** @type {string}      */ value;

    /**
     * @param {string} imageBackground
     * @param {string} imageButtonNumber
     * @param {string} imageButtonConfirm
     * @param {string} imageButtonCancel
     * @param {string} imageButtonClose
     */
    constructor(
        imageBackground,
        imageButtonNumber,
        imageButtonConfirm,
        imageButtonCancel,
        imageButtonClose,
    ) {
        this.imageBackground    = imageBackground;
        this.imageButtonNumber  = imageButtonNumber;
        this.imageButtonConfirm = imageButtonConfirm;
        this.imageButtonCancel  = imageButtonCancel;
        this.imageButtonClose   = imageButtonClose;
        this.overlay = null;
        this.sprite = null;
        this.buttons = [];
        this.nbMinDigits = 1;
        this.nbMaxDigits = 4;
        this.value = '';
    }

    /**
     * @param {GameDisplay} display
     * @return {Keyboard}
     */
    setDisplay(display) {
        this.display = display;
        return this;
    }

    /**
     * @param {int}      nbMinDigits
     * @param {int}      nbMaxDigits
     * @param {boolean}  allowZeroFirst
     * @param {function} callback
     */
    open(nbMinDigits, nbMaxDigits, allowZeroFirst, callback) {
        this.nbMinDigits = nbMinDigits;
        this.nbMaxDigits = nbMaxDigits;
        this.allowZeroFirst = allowZeroFirst;
        this.value = '';

        this.overlay = $('<div class="overlay"></div>');
        this.display.screen.append(this.overlay);

        let width = 675;
        let height = width * 1270 / 1010;

        this.sprite = new Sprite(new Size(width, height), new Position((this.display.width - width) / 2, this.display.height - 50 - height));
        this.sprite.htmlTag = $('<div class="sprite keyboard"></div>');
        this.display.resource.applyImage(this.sprite.htmlTag, this.imageBackground);
        this.sprite.htmlTag.append($('<div class="keyboard-screen"></div>'));
        this.display.addSprite(this.sprite);

        this.buttons[0]  = this.createCloseButton();
        this.buttons[1]  = this.createKey(this.imageButtonNumber,  '1',  0, 0, $.proxy(function() { this.addDigit('1'); }, this));
        this.buttons[2]  = this.createKey(this.imageButtonNumber,  '2',  1, 0, $.proxy(function() { this.addDigit('2'); }, this));
        this.buttons[3]  = this.createKey(this.imageButtonNumber,  '3',  2, 0, $.proxy(function() { this.addDigit('3'); }, this));
        this.buttons[4]  = this.createKey(this.imageButtonNumber,  '4',  0, 1, $.proxy(function() { this.addDigit('4'); }, this));
        this.buttons[5]  = this.createKey(this.imageButtonNumber,  '5',  1, 1, $.proxy(function() { this.addDigit('5'); }, this));
        this.buttons[6]  = this.createKey(this.imageButtonNumber,  '6',  2, 1, $.proxy(function() { this.addDigit('6'); }, this));
        this.buttons[7]  = this.createKey(this.imageButtonNumber,  '7',  0, 2, $.proxy(function() { this.addDigit('7'); }, this));
        this.buttons[8]  = this.createKey(this.imageButtonNumber,  '8',  1, 2, $.proxy(function() { this.addDigit('8'); }, this));
        this.buttons[9]  = this.createKey(this.imageButtonNumber,  '9',  2, 2, $.proxy(function() { this.addDigit('9'); }, this));
        this.buttons[10] = this.createKey(this.imageButtonCancel,  'C',  0, 3, $.proxy(function() { this.resetDigit();  }, this));
        this.buttons[11] = this.createKey(this.imageButtonNumber,  '0',  1, 3, $.proxy(function() { this.addDigit('0'); }, this));
        this.buttons[12] = this.createKey(this.imageButtonConfirm, 'OK', 2, 3, $.proxy(function() { this.sendValue(callback); }, this));

        this.buttons[0].htmlTag.on('click', $.proxy(function() { this.close(); }, this));

        this.updateZeroButton();
    }

    /**
     * @param {function} callback
     */
    sendValue(callback) {
        if (this.value.length < this.nbMinDigits) {
            this.display.showQuickAlert(
                'Veuillez entrer' + (this.nbMinDigits < this.nbMaxDigits ? "\nau moins " : ' ') + this.nbMinDigits + ' chiffre' + (this.nbMinDigits > 1 ? 's' : '')
            )
            return;
        }

        callback(this.value);
    }

    addDigit(digit) {
        if (digit === '0' && !this.allowZeroFirst && this.value === '') {
            return;
        }

        if (this.value.length === this.nbMaxDigits) {
            this.display.showQuickAlert(
                'Veuillez entrer' + (this.nbMinDigits < this.nbMaxDigits ? "\nau maximum " : ' ') + this.nbMaxDigits + ' chiffre' + (this.nbMaxDigits > 1 ? 's' : '')
            )
            return;
        }

        this.value += digit;
        this.updateValue();
    }

    resetDigit() {
        this.value = '';
        this.updateValue();
    }

    updateValue() {
        this.sprite.htmlTag.find('.keyboard-screen').first().text(this.value);
        this.updateZeroButton();
    }

    updateZeroButton() {
        if (!this.allowZeroFirst && this.value === '') {
            this.display.disableButton(this.buttons[11]);
        } else {
            this.display.enableButton(this.buttons[11]);
        }
    }

    /**
     * @return {Button}
     */
    createCloseButton() {
        let btn = new Button(
            new Size(80, 80),
            new Position(
                this.sprite.position.x - 100 + this.sprite.size.width,
                this.sprite.position.y +  20
            ),
            this.imageButtonClose
        );

        this.display.addButton(btn);

        return btn;
    }

    /**
     * @param {string}   image
     * @param {string}   text
     * @param {int}      x
     * @param {int}      y
     * @param {function} callback
     */
    createKey(image, text, x, y, callback ) {
        let size = 130;
        let delta = 20;

        let btn = new Button(
            new Size(size, size),
            new Position(
                (size + delta) * (x - 1) + (this.display.width - size) / 2,
                (size + delta) * (y - 4) - 20 + this.sprite.position.y + this.sprite.size.height
            ),
            image
        );

        this.display.addButton(btn);

        btn.htmlTag.text(text);
        btn.htmlTag.css('font-size', '150%');
        btn.htmlTag.on('click', callback);

        return btn;
    }

    close() {
        for (let key in this.buttons) {
            this.display.removeButton(this.buttons[key]);
        }
        if (this.sprite) {
            this.display.removeSprite(this.sprite);
        }
        if (this.overlay) {
            this.overlay.remove();
        }

        this.overlay = null;
        this.sprite = null;
        this.buttons = [];
        this.value = '';
    }
}
