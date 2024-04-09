class Theme {
    /** @type {string}      */ code;
    /** @type {string|null} */ background;
    /** @type {string|null} */ music;
    /** @type {string|null} */ sound;
    /** @type {string}      */ text;

    /**
     * @param {string} code
     */
    constructor(code) {
        this.code       = code;
        this.background = null;
        this.music      = null;
        this.sound      = null;
        this.text       = '';
    }

    /**
     * @param {string} background
     * @return {Theme}
     */
    setBackground(background) {
        this.background = background;
        return this;
    }

    /**
     * @param {string} music
     * @return {Theme}
     */
    setMusic(music) {
        this.music = music;
        return this;
    }

    /**
     * @param {string} sound
     * @return {Theme}
     */
    setSound(sound) {
        this.sound = sound;
        return this;
    }

    /**
     * @param {string} text
     * @return {Theme}
     */
    setText(text) {
        this.text = text;
        return this;
    }
}
