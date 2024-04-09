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
                $.proxy(
                    function () {
                        modal.close(this.display);
                        this.showScore();
                    },
                    this
                ),
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
        this.display.hideButton(this.scenario.buttonPlay);
        this.display.hideButton(this.scenario.buttonPlay);
        this.display.hideButton(this.scenario.buttonCode);
        this.display.hideButton(this.scenario.buttonHelp);
        this.display.hideButton(this.scenario.buttonMachine);
        this.display.hideButton(this.scenario.buttonPenalty);
        this.display.hideButton(this.scenario.buttonClose);
        this.display.hideButton(this.scenario.buttonParameters);
    }

    showScore() {
        this.display.resource.stopMusic();

        let title = '';
        if (this.state.isEndSuccess) {
            title = "Vous avez réussit !\n";
        }
        if (this.state.isEndFail) {
            title = "Vous avez échoué...\n";
        }

        let time = (this.scenario.timer.duration - this.state.currentTime);
        let score = this.calculateScore();

        let text = '<table>';
        text += '<tr><th>#ICON[fa-solid   fa-star]        </th><td>' + score + " %</td></tr>";
        text += '<tr><th>#ICON[fa-solid   fa-stopwatch]   </th><td>' + this.display.timer.convertToText(time) + "</td></tr>";
        text += '<tr><th>#ICON[fa-regular fa-lightbulb]   </th><td>' + this.state.nbHelp + "</td></tr>";
        text += '<tr><th>#ICON[fa-solid   fa-skull red]   </th><td>' + this.display.timer.convertToText(this.state.penaltyTime) + " (" + this.state.nbPenalty + ")</td></tr>";
        text += '<tr><th>#ICON[fa-solid   fa-lock  red]   </th><td>' + (this.state.nbCodeBad + this.state.nbCodeUnknown) + "</td></tr>";
        text += '<tr><th>#ICON[fa-solid   fa-lock  green] </th><td>' + (this.state.nbCodeGood) + "</td></tr>";
        text += '<tr><th>#ICON[fa-solid   fa-gear  red]   </th><td>' + (this.state.nbMachineBad) + "</td></tr>";
        text += '<tr><th>#ICON[fa-solid   fa-gear  green] </th><td>' + (this.state.nbMachineGood) + "</td></tr>";
        text += '</table>';

        let modal = (new ModalTextBig(text));
        modal.setTitle(title);
        modal.addConfirmAction(
            new Action(
                'Fermer',
                $.proxy(this.closeScore, this),
                '#DDD',
                '#333',
                'fa-solid fa-xmark'
            )
        );
        modal.open(this.display);
        modal.sprite.htmlTag.find('.modal-body').addClass('modal-score');
        modal.overlay.hide();
    }

    /**
     * @return {int}
     */
    calculateScore() {
        if (this.state.isEndFail) {
            return 0;
        }

        let timeMax = this.scenario.timer.duration;
        let timeUse = (this.scenario.timer.duration - this.state.currentTime);
        let scoreTime = Math.floor(50 * 2. * (timeMax - timeUse) / timeMax);
        if (scoreTime < 0) {
            scoreTime = 0;
        }
        if (scoreTime > 50) {
            scoreTime = 50;
        }

        let nbErrors = this.state.nbMachineBad + this.state.nbCodeBad + this.state.nbCodeUnknown;
        let nbHelps  = this.state.nbHelp;

        let scoreBad = 50 - 3 * nbErrors - nbHelps;
        if (scoreBad < 0) {
            scoreBad = 0;
        }
        return scoreTime + scoreBad;
    }

    closeScore() {
        window.location.reload();
    }
}
