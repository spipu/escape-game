class ActionPenalty extends AbstractAction {
    execute() {
        if (this.state.isPause || this.state.isEnd) {
            return;
        }

        this.display.resource.playSoundBad();
        this.state.nbPenalty++;
        this.state.applyTimerPenalty();

        if (this.state.isFirstPenalty) {
            this.state.isFirstPenalty = false;
            this.display.showQuickAlert(
                "Vous perdez 1 minute.\n" +
                "\n" +
                "\n" +
                "#ICON[fa-solid fa-skull fa-3x]"
            );
        }

        this.dispatchEvent('penalty');
    }
}
