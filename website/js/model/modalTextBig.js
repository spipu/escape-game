class ModalTextBig extends Modal {
    /**
     * @param {string} message
     */
    constructor(message) {
        super('bkg_modal_big', message);
        this.size.height = 732;
        this.modalBodyClass = 'modal-body modal-body-big';
    }
}
