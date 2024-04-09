class StepMachine {
    /** @type {string}   */ code;
    /** @type {function} */ callback;

    /**
     * @param {string} code
     */
    constructor(code) {
        this.code = code;
    }

    /**
     *
     * @param {function} callback
     * @return {StepMachine}
     */
    setCallbackStartMachine(callback) {
        this.callback = callback;
        return this;
    }
}
