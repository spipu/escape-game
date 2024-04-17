class ActionClose extends AbstractAction {
    execute() {
        let modal = new ModalTextSmall(
            'Voulez-vous quitter le jeu ?'
        );

        modal.addConfirmAction(
            new Action(
                'Oui',
                $.proxy(this.actionConfirm, this),
                '#500',
                '#F55',
                'fa-solid fa-xmark'
            )
        );
        modal.addConfirmCancel(
            new Action(
                'Non',
                $.proxy(this.actionCancel, this),
                '#333',
                '#EEE',
                'fa-solid fa-rotate-left'
            )
        );
        modal.open(this.display);
    }

    /**
     * @param {Modal} modal
     */
    actionConfirm(modal) {
        modal.close(this.display);
        this.dispatchEvent('close');
    }

    /**
     * @param {Modal} modal
     */
    actionCancel(modal) {
        modal.close(this.display);
    }
}
