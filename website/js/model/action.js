class Action {
    /** @type {string}      */ label;
    /** @type {function}    */ callback;
    /** @type {string}      */ colorText;
    /** @type {string|null} */ colorBackground;
    /** @type {string|null} */ icon;

    /**
     * @param {string}      label
     * @param {function}    callback
     * @param {string}      colorText
     * @param {string|null} colorBackground
     * @param {string|null} icon
     */
    constructor(
        label,
        callback,
        colorText = 'black',
        colorBackground = null,
        icon = null
    ) {
        this.label           = label;
        this.callback        = callback;
        this.colorText       = colorText;
        this.colorBackground = colorBackground;
        this.icon            = icon;
    }
}
