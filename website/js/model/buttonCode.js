class ButtonCode {
    /** @type {string}      */ code;
    /** @type {string}      */ image;
    /** @type {Button|null} */ button;

    /**
     * @param {string}   code
     * @param {string}   image
     * @param {Position} position
     * @param {Size}     size
     */
    constructor(code, image, position, size) {
        this.code     = code;
        this.image    = image;
        this.button   = new Button(size, position, null, 'button-over-circle');
    }

    /**
     * @param {GameDisplay} display
     */
    add(display) {
        display.addButton(this.button)
    }

    /**
     * @param {GameDisplay} display
     */
    remove(display) {
        display.removeButton(this.button);
    }
}
