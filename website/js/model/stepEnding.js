class StepEnding {
    /** @type {string}      */ code;
    /** @type {string}      */ text;
    /** @type {string|null} */ music;
    /** @type {boolean}     */ isGood;

    constructor(code) {
        this.code   = code;
        this.text   = '';
        this.music  = null;
        this.isGood = true;
    }

    /**
     * @param {string} text
     * @return {StepEnding}
     */
    setText(text) {
        this.text = text;
        return this;
    }

    /**
     * @param {boolean} isGood
     * @return {StepEnding}
     */
    setIsGood(isGood) {
        this.isGood = isGood;
        return this;
    }

    /**
     * @param {string|null} music
     * @return {StepEnding}
     */
    setMusic(music) {
        this.music = music;
        return this;
    }
}
