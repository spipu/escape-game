class ActionHelp extends AbstractAction {
    execute() {
        if (this.state.isPause || this.state.isEnd) {
            return;
        }

        this.keyboard.open(1, 4, false, $.proxy(this.actionCallback, this));
    }

    /**
     * @param {string} value
     */
    actionCallback(value) {
        this.keyboard.close();
        this.state.nbHelp++;

        if (this.scenario.helps[value] === undefined) {
            this.display.showQuickAlert(
                "#ICON[fa-regular fa-lightbulb fa-3x]\n" +
                "\n" +
                "Rien à signaler...",
                "Indice n°" + value
            );
            this.dispatchEvent('help.unknown', value);
            return;
        }

        let help = this.scenario.helps[value];

        this.display.resource.playSoundGood();
        this.state.addHelp(value);

        let modal = (new ModalTextBig(help.text));
        modal.setTitle("Indice n°" + help.code)
        modal.addCloseButton(this.scenario.buttonClose.image);
        modal.open(this.display);
        this.dispatchEvent('help.good', value);
    }
}
