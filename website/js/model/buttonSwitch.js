class ButtonSwitch {
    /** @type {string}      */ code;
    /** @type {Button|null} */ button;
    /** @type {boolean}     */ state;

    /**
     * @param {string}      code
     * @param {Position}    position
     * @param {Size|null}   size
     * @param {string|null} image
     */
    constructor(code, position, size, image) {
        this.code     = code;
        this.button   = new Button(size, position, image);
        this.state    = false;
    }

    reset() {
        this.state = false;
        this.updateDisplay();
    }

    switch() {
        this.state = !this.state;
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.state) {
            this.button.htmlTag.removeClass('button-switch-off');
        } else {
            this.button.htmlTag.addClass('button-switch-off');
        }
    }

    /**
     * @param {GameDisplay} display
     */
    add(display) {
        display.addButton(this.button)
        this.reset();
        this.button.htmlTag.on('click', $.proxy(this.switch, this));
    }

    /**
     * @param {GameDisplay} display
     */
    remove(display) {
        display.removeButton(this.button);
    }
}
