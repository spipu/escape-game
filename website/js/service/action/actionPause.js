class ActionPause extends AbstractAction {
    execute() {
        if (this.state.isEnd) {
            return;
        }

        this.state.isPause = true;
        this.display.resource.pauseMusic();

        this.display.hideButton(this.scenario.buttonPause);
        this.display.showButton(this.scenario.buttonPlay);

        this.display.disableButton(this.scenario.buttonCode);
        this.display.disableButton(this.scenario.buttonHelp);
        this.display.disableButton(this.scenario.buttonMachine);
        this.display.disableButton(this.scenario.buttonPenalty);

        this.dispatchEvent('pause');
    }
}
