class Button {
    /** @type {Size}        */ size;
    /** @type {Position}    */ position;
    /** @type {string|null} */ image;
    /** @type {string|null} */ specificClass;
    /** @type {int|null} */ buttonId;
    /**                  */ htmlTag;
    /**                  */ labelTag;
    /** @type {boolean}  */ enable;
    /** @type {boolean}  */ click;
    /** @type {string}   */ label;

    /**
     * @param {Size} size
     * @param {Position} position
     * @param {string|null} image
     * @param {string|null} specificClass
     */
    constructor(size, position, image, specificClass = null) {
        this.size          = size;
        this.position      = position;
        this.image         = image;
        this.specificClass = specificClass;
        this.buttonId = null;
        this.htmlTag  = null;
        this.labelTag = null;
        this.enable   = false;
        this.click    = true;
    }

    disableClick() {
        this.click = false;
    }

    /**
     * @param {string} label
     */
    setLabel(label) {
        this.label = label;
    }

    /**
     * @param {GameDisplay} display
     */
    add(display) {
        this.enable = true;

        this.htmlTag = new $('<div class="button"></div>');
        if (this.image) {
            this.htmlTag.addClass('button-image');
            display.resource.applyImage(this.htmlTag, this.image);
        } else if (this.specificClass) {
            this.htmlTag.addClass(this.specificClass);
        } else {
            this.htmlTag.addClass('button-no-image');
        }

        let functionOn = $.proxy(
            function () {
                if (this.enable) {
                    this.htmlTag.addClass('button-hover');
                }
            },
            this
        );

        let functionOff = $.proxy(
            function () {
                if (this.enable) {
                    this.htmlTag.removeClass('button-hover');
                }
            },
            this
        );

        let functionSound = $.proxy(
            function () {
                if (this.enable && this.click) {
                    display.resource.playSoundClick();
                }
            },
            this
        );

        this.htmlTag
            .attr('draggable', false)
            .on('click',      functionSound)
            .on('mousedown',  functionOn)
            .on('touchstart', functionOn)
            .on('mouseup',    functionOff)
            .on('mouseout',   functionOff)
            .on('touchend',   functionOff)
        ;

        this.buttonId = display.maxButtonId;
        display.buttons[this.buttonId] = this;
        display.maxButtonId++;

        display.screen.append(this.htmlTag);

        if (this.label) {
            this.labelTag = new $('<div class="button-label"></div>');
            this.labelTag.text(this.label);
            display.screen.append(this.labelTag);
        }

        this.updatePosition(display);
    }

    /**
     * @param {GameDisplay} display
     */
    remove(display) {
        display.buttons[this.buttonId] = null;

        if (this.labelTag) {
            this.labelTag.remove();
            this.labelTag = null;
        }

        this.htmlTag.remove();
        this.htmlTag = null;
        this.buttonId = null;
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

        if (this.labelTag) {
            this.labelTag
                .css('width',  this.size.width  * display.ratio)
                .css('left',   this.position.x  * display.ratio)
                .css('top',    (this.position.y - 40)  * display.ratio)
            ;
        }
    }
}
