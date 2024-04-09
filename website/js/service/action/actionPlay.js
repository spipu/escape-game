class ActionPlay extends AbstractAction {
    execute() {
        if (this.state.isEnd) {
            return;
        }

        if (this.state.isBegin === false) {
            this.state.isBegin = true;
            this.actions.begin.execute();
        } else {
            this.state.isPause = false;
            if (this.state.parameters.musics) {
                this.display.resource.resumeMusic();
            }
        }

        this.display.showButton(this.scenario.buttonPause);
        this.display.hideButton(this.scenario.buttonPlay);

        this.display.enableButton(this.scenario.buttonCode);
        this.display.enableButton(this.scenario.buttonHelp);
        this.display.enableButton(this.scenario.buttonMachine);
        this.display.enableButton(this.scenario.buttonPenalty);

        this.dispatchEvent('play');
    }
}
