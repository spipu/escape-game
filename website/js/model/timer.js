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
        this.sprite.htmlTag = $('<div />');
        display.resource.applyImage(this.sprite.htmlTag, this.image);
        this.sprite.htmlTag.css('font-weight', 'bold');

        display.addSprite(this.sprite);

        this.resize(display);
        this.refresh(state);
    }

    /**
     * @param {GameState} state
     */
    refresh(state) {
        if (state.currentTime < 60 || state.isPenalty) {
            this.sprite.htmlTag.css('color', '#A00');
        } else {
            this.sprite.htmlTag.css('color', '');
        }

        if (!state.parameters.timer) {
            let text = '<i class="fa-solid fa-hourglass-half" style="font-size: 70%; font-weight: normal;"></i>';
            this.sprite.htmlTag.html(text);
            return;
        }

        let text = this.convertToText(state.currentTime);
        this.sprite.htmlTag.text(text);
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
        this.sprite.htmlTag.css('font-size', this.fontSize * display.ratio)
    }
}
