class StepCode {
    /** @type {string}      */ code;
    /** @type {string|null} */ text;
    /** @type {int|null}    */ penalty;
    /** @type {string|null} */ end;

    /**
     * @param {string} code
     */
    constructor(code) {
        this.code    = code;
        this.text    = null;
        this.penalty = false;
        this.end     = null;
    }

    /**
     * @param {string} text
     * @return {StepCode}
     */
    setText(text) {
        this.text = text;
        return this;
    }

    /**
     * @param {int} penalty
     * @return {StepCode}
     */
    setPenalty(penalty) {
        this.penalty = penalty;
        return this;
    }

    /**
     * @param {string} code
     * @return {StepCode}
     */
    setEnd(code) {
        this.end = code;
        return this;
    }
}
