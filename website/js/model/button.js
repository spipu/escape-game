class Button {
    /** @type {Size}        */ size;
    /** @type {Position}    */ position;
    /** @type {string|null} */ image;
    /** @type {string|null} */ specificClass;
    /** @type {int|null} */ buttonId;
    /**                  */ htmlTag;
    /**                  */ labelTag;
    /** @type {boolean}  */ enabled;
    /** @type {boolean}  */ click;
    /** @type {string}   */ label;

    /**
     * @param {Size|null} size
     * @param {Position|null} position
     * @param {string|null} image
     * @param {string|null} specificClass
     */
    constructor(size = null, position = null, image = null, specificClass = null) {
        this.size          = size;
        this.position      = position;
        this.image         = image;
        this.specificClass = specificClass;
        this.buttonId = null;
        this.htmlTag  = null;
        this.labelTag = null;
        this.enabled  = false;
        this.click    = true;
    }

    isReady() {
        return (this.size !== null && this.position !== null);
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
        this.enabled = true;
        if (!this.isReady()) {
            return;
        }

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
                if (this.enabled) {
                    this.htmlTag.addClass('button-hover');
                }
            },
            this
        );

        let functionOff = $.proxy(
            function () {
                if (this.enabled) {
                    this.htmlTag.removeClass('button-hover');
                }
            },
            this
        );

        let functionSound = $.proxy(
            function () {
                if (this.enabled && this.click) {
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
        if (!this.isReady()) {
            return;
        }

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
        if (!this.isReady()) {
            return;
        }

        this.htmlTag
            .css('width',  this.size.width  * display.ratio)
            .css('height', this.size.height * display.ratio)
            .css('left',   this.position.x  * display.ratio)
            .css('top',    this.position.y  * display.ratio)
        ;

        if (this.labelTag) {
            this.labelTag
                .css('width',  (this.size.width * 1.5) * display.ratio)
                .css('left',   (this.position.x - this.size.width * 0.25)* display.ratio)
                .css('top',    (this.position.y - 40)  * display.ratio)
            ;
        }
    }

    enable() {
        if (!this.isReady()) {
            return;
        }

        this.enabled = true;
        this.htmlTag.removeClass('button-disabled');
    }

    disable() {
        if (!this.isReady()) {
            return;
        }

        this.enabled = false;
        this.htmlTag.addClass('button-disabled');
        this.htmlTag.removeClass('button-hover');
    }

    show() {
        if (!this.isReady()) {
            return;
        }

        this.htmlTag.show();
        if (this.labelTag) {
            this.labelTag.show();
        }
    }

    hide() {
        if (!this.isReady()) {
            return;
        }

        this.htmlTag.hide();
        if (this.labelTag) {
            this.labelTag.hide();
        }
    }
}
