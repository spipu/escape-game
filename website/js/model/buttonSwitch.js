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
            this.button.htmlTag.classList.remove('button-switch-off');
        } else {
            this.button.htmlTag.classList.add('button-switch-off');
        }
    }

    /**
     * @param {GameDisplay} display
     */
    add(display) {
        display.addButton(this.button)
        this.reset();
        this.button.htmlTag.addEventListener('click', this.switch.bind(this));
    }

    /**
     * @param {GameDisplay} display
     */
    remove(display) {
        display.removeButton(this.button);
    }
}
