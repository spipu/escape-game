class Sprite {
    /** @type {Size}     */ size;
    /** @type {Position} */ position;
    /** @type {int|null} */ spriteId;
    /**                  */ htmlTag;

    /**
     * @param {Size} size
     * @param {Position} position
     */
    constructor(size, position) {
        this.size     = size;
        this.position = position;
        this.spriteId = null;
        this.htmlTag  = null;
    }

    /**
     * @param {GameDisplay} display
     */
    add(display) {
        this.spriteId = display.maxSpriteId;
        this.htmlTag.classList.add('sprite');

        display.sprites[this.spriteId] = this;
        display.maxSpriteId++;
        display.screen.appendChild(this.htmlTag);

        this.updatePosition(display);
    }

    /**
     * @param {GameDisplay} display
     */
    remove(display) {
        display.sprites[this.spriteId] = null;

        this.htmlTag.remove();
        this.htmlTag = null;
        this.spriteId = null;
    }

    /**
     * @param {GameDisplay} display
     */
    updatePosition(display) {
        this.htmlTag.style.width  = (this.size.width  * display.ratio) + 'px';
        this.htmlTag.style.height = (this.size.height * display.ratio) + 'px';
        this.htmlTag.style.left   = (this.position.x  * display.ratio) + 'px';
        this.htmlTag.style.top    = (this.position.y  * display.ratio) + 'px';
    }
}
