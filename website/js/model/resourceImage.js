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
        const img = document.createElement('img');
        img.src = this.url;

        return this;
    }
}
