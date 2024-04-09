class ActionEnd extends AbstractAction {
    execute(endingCode) {
        let ending = this.scenario.stepEndings[endingCode];
        this.state.isEndSuccess = ending.isGood;
        this.endGame();

        this.display.resource.stopMusic();
        if (ending.music) {
            this.display.resource.startMusic(ending.music);
        }

        let modal = (new ModalTextBig(ending.text));
        modal.addConfirmAction(
            new Action(
                'Fermer',
                $.proxy(this.showScore, this),
                '#DDD',
                '#333',
                'fa-solid fa-xmark'
            )
        );
        modal.open(this.display);

        this.dispatchEvent('end');
    }

    endGame() {
        this.state.stop();

        this.display.hideButton(this.scenario.buttonPause);
        this.display.showButton(this.scenario.buttonPlay);
        this.display.disableButton(this.scenario.buttonPlay);
        this.display.disableButton(this.scenario.buttonCode);
        this.display.disableButton(this.scenario.buttonHelp);
        this.display.disableButton(this.scenario.buttonMachine);
        this.display.disableButton(this.scenario.buttonPenalty);
    }

    showScore() {
        this.display.resource.stopMusic();
        window.location.reload();
    }
}
