class StepOpening {
    /** @type {string[]}    */ texts;
    /** @type {boolean}     */ timeStartDirectly;
    /** @type {string|null} */ music;

    constructor() {
        this.texts = [];
        this.timeStartDirectly = true;
        this.music = null;
    }

    /**
     * @param {string} value
     * @return {StepOpening}
     */
    addText(value) {
        this.texts[this.texts.length] = value;
        return this;
    }

    /**
     * @param {boolean} value
     * @return {StepOpening}
     */
    setTimeStartDirectly(value) {
        this.timeStartDirectly = value;
        return this;
    }

    /**
     * @param {string|null} music
     * @return {StepOpening}
     */
    setMusic(music) {
        this.music = music;
        return this;
    }
}
