class Timer {
    /** @type {int}      */ duration;
    /** @type {boolean}  */ canContinue;
    /** @type {string}   */ image;
    /** @type {Size}     */ size;
    /** @type {Position} */ position;
    /** @type {int}      */ fontSize;
    /** @type {Sprite}   */ sprite;

    /**
     * @param {int}     duration
     * @param {boolean} canContinue
     */
    constructor(duration, canContinue) {
        this.duration = duration;
        this.canContinue = canContinue;
    }

    /**
     * @param {string}   image
     * @param {Size}     size
     * @param {Position} position
     * @param {int}      fontSize
     * @return {Timer}
     */
    setDisplay(image, size, position, fontSize) {
        this.image    = image;
        this.size     = size;
        this.position = position;
        this.fontSize = fontSize;
        return this;
    }

    /**
     * @param {GameDisplay} display
     * @param {GameState}   state
     */
    start(display, state) {
        this.sprite = new Sprite(this.size, this.position);
        this.sprite.htmlTag = document.createElement('div');
        display.resource.applyImage(this.sprite.htmlTag, this.image);
        this.sprite.htmlTag.style.fontWeight = 'bold';

        display.addSprite(this.sprite);

        this.resize(display);
        this.refresh(state);
    }

    stop(display) {
        display.removeSprite(this.sprite);
        this.sprite = null;
    }

    /**
     * @param {GameState} state
     */
    refresh(state) {
        if (state.currentTime < 60 || state.isPenalty) {
            this.sprite.htmlTag.style.color = '#A00';
        } else {
            this.sprite.htmlTag.style.color = '';
        }

        if (!state.parameters.timer) {
            let text = '<i class="fa-solid fa-hourglass-half" style="font-size: 70%; font-weight: normal;"></i>';
            this.sprite.htmlTag.innerHTML = text;
            return;
        }

        let text = this.convertToText(state.currentTime);
        this.sprite.htmlTag.textContent = text;
    }

    /**
     * @param {int} time
     * @return {string}
     */
    convertToText(time) {
        if (time < 0) {
            time = -time;
        }
        let sec = (time % 60);
        let min = (time - sec) / 60;
        return (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
    }

    /**
     * @param {GameDisplay} display
     */
    resize(display) {
        this.sprite.htmlTag.style.fontSize = (this.fontSize * display.ratio) + 'px';
    }
}
