class Help {
    /** @type {string}   */ code;
    /** @type {string[]} */ helps;

    /**
     * @param {string} code
     * @param {string} text
     */
    constructor(code, text) {
        this.code = code;
        this.helps = [];
        this.addHelp(text);
    }

    /**
     * @param {string} text
     * @return {Help}
     */
    addHelp(text) {
        this.helps[this.helps.length] = text;
        return this;
    }
}
