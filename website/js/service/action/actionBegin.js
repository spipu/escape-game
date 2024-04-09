class ActionBegin extends AbstractAction {
    execute() {
        if (this.scenario.stepOpening.timeStartDirectly) {
            this.state.isPause = false;
        }

        if (this.scenario.stepOpening.texts.length === 0) {
            this.startGame();
            return;
        }

        this.display.resource.startMusic(this.scenario.stepOpening.music);
        this.showModal(0);
    }

    showModal(textKey) {
        let modal = new ModalTextSmall(
            this.scenario.stepOpening.texts[textKey]
        );

        if (textKey < this.scenario.stepOpening.texts.length - 1) {
            modal.addConfirmAction(
                new Action(
                    'Suivant',
                    $.proxy(function () { modal.close(this.display); this.showModal(textKey + 1);}, this),
                    '#333',
                    '#EEE'
                )
            );
        } else {
            modal.addConfirmAction(
                new Action(
                    'Commencer',
                    $.proxy(
                        function () {
                            modal.close(this.display);
                            this.display.resource.stopMusic();
                            this.startGame();
                            this.state.isPause = false;
                        },
                        this
                    ),
                    '#DDD',
                    '#333',
                    'fa-solid fa-play'
                )
            );
        }
        modal.open(this.display);
    }

    startGame() {
        this.display.resource.startMusic(this.scenario.themes['main'].music);
        this.dispatchEvent('start');
    }
}
