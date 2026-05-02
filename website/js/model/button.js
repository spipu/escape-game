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

        this.htmlTag = document.createElement('div');
        this.htmlTag.className = 'button';

        if (this.image) {
            this.htmlTag.classList.add('button-image');
            display.resource.applyImage(this.htmlTag, this.image);
        } else if (this.specificClass) {
            this.htmlTag.classList.add(this.specificClass);
        } else {
            this.htmlTag.classList.add('button-no-image');
        }

        const functionOn = () => {
            if (this.enabled) {
                this.htmlTag.classList.add('button-hover');
            }
        };

        const functionOff = () => {
            if (this.enabled) {
                this.htmlTag.classList.remove('button-hover');
            }
        };

        const functionSound = () => {
            if (this.enabled && this.click) {
                display.resource.playSoundClick();
            }
        };

        this.htmlTag.setAttribute('draggable', false);
        this.htmlTag.addEventListener('click',      functionSound);
        this.htmlTag.addEventListener('mousedown',  functionOn);
        this.htmlTag.addEventListener('touchstart', functionOn);
        this.htmlTag.addEventListener('mouseup',    functionOff);
        this.htmlTag.addEventListener('mouseout',   functionOff);
        this.htmlTag.addEventListener('touchend',   functionOff);

        this.buttonId = display.maxButtonId;
        display.buttons[this.buttonId] = this;
        display.maxButtonId++;

        display.screen.appendChild(this.htmlTag);

        if (this.label) {
            this.labelTag = document.createElement('div');
            this.labelTag.className = 'button-label';
            this.labelTag.textContent = this.label;
            display.screen.appendChild(this.labelTag);
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

        this.htmlTag.style.width  = (this.size.width  * display.ratio) + 'px';
        this.htmlTag.style.height = (this.size.height * display.ratio) + 'px';
        this.htmlTag.style.left   = (this.position.x  * display.ratio) + 'px';
        this.htmlTag.style.top    = (this.position.y  * display.ratio) + 'px';

        if (this.labelTag) {
            this.labelTag.style.width = ((this.size.width * 1.5) * display.ratio) + 'px';
            this.labelTag.style.left  = ((this.position.x - this.size.width * 0.25) * display.ratio) + 'px';
            this.labelTag.style.top   = ((this.position.y - 40) * display.ratio) + 'px';
        }
    }

    enable() {
        if (!this.isReady()) {
            return;
        }

        this.enabled = true;
        this.htmlTag.classList.remove('button-disabled');
    }

    disable() {
        if (!this.isReady()) {
            return;
        }

        this.enabled = false;
        this.htmlTag.classList.add('button-disabled');
        this.htmlTag.classList.remove('button-hover');
    }

    show() {
        if (!this.isReady()) {
            return;
        }

        this.htmlTag.style.display = '';
        if (this.labelTag) {
            this.labelTag.style.display = '';
        }
    }

    hide() {
        if (!this.isReady()) {
            return;
        }

        this.htmlTag.style.display = 'none';
        if (this.labelTag) {
            this.labelTag.style.display = 'none';
        }
    }
}
