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
     * @param {string}     scenarioCode
     * @param {AppVersion} version
     * @return {ResourceImage}
     */
    init(scenarioCode, version) {
        this.url = '/scenario/' + scenarioCode + '/image/' + this.filename;
        this.url += '?_v=' + version.currentVersion;

        $('<img/>')[0].src = this.url;

        return this;
    }
}
