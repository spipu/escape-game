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
        this.htmlTag.addClass('sprite');

        display.sprites[this.spriteId] = this;
        display.maxSpriteId++;
        display.screen.append(this.htmlTag);

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
        this.htmlTag
            .css('width',  this.size.width  * display.ratio)
            .css('height', this.size.height * display.ratio)
            .css('left',   this.position.x  * display.ratio)
            .css('top',    this.position.y  * display.ratio)
        ;
    }
}
