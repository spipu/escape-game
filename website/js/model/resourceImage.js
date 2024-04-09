class ResourceImage {
    /** @type {string} */ code;
    /** @type {string} */ filename;
    /** @type {string} */ url;

    /**
     * @param {string} code
     * @param {string} filename
     */
    constructor(
        code,
        filename
    ) {
        this.code     = code;
        this.filename = filename;
        this.url      = '';
    }

    /**
     * @param {string}  scenarioCode
     * @param {boolean} forceReload
     * @return {ResourceImage}
     */
    init(scenarioCode, forceReload) {
        this.url = '/scenario/' + scenarioCode + '/image/' + this.filename;

        if (forceReload) {
            this.url += '?_t=' + (new Date()).getTime()
        }

        $('<img/>')[0].src = this.url;

        return this;
    }
}
