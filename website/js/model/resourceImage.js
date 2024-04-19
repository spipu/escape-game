class ResourceImage {
    /** @type {string} */ code;
    /** @type {string} */ filename;
    /** @type {string} */ url;

    /**
     * @param {string} scenarioCode
     * @param {string} code
     * @param {string} filename
     */
    constructor(
        scenarioCode,
        code,
        filename
    ) {
        this.code     = code;
        this.filename = filename;
        this.url      = '/scenario/' + scenarioCode + '/image/' + this.filename;
    }

    /**
     * @return {ResourceImage}
     */
    init() {
        $('<img/>')[0].src = this.url;

        return this;
    }
}
