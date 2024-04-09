class ModalParameters extends Modal {
    /**
     * @param {string} message
     */
    constructor(message) {
        super('bkg_params', message);
        this.addCloseButton('btn_close');
    }
}
