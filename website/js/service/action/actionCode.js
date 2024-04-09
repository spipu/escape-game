class ActionCode extends AbstractAction {
    execute() {
        if (this.state.isPause || this.state.isEnd) {
            return;
        }

        this.keyboard.open(4, 4, true, $.proxy(this.actionCallback, this));
    }

    /**
     * @param {string} value
     */
    actionCallback(value) {
        this.keyboard.close();
        if (this.scenario.stepCodes[value] === undefined) {
            this.displayUnknown(value);
            return;
        }

        let step = this.scenario.stepCodes[value];
        if (step.penalty) {
            this.displayBadCode(step);
            return;
        }

        this.displayGoodCode(step);
    }

    /**
     * @param {string} value
     */
    displayUnknown(value) {
        this.display.resource.playSoundBad();
        this.state.nbCodeUnknown++;
        this.state.applyTimerPenalty();

        this.display.showQuickAlert(
            "Code Faux.\n" +
            "Vous perdez 1 minute.\n" +
            "\n" +
            "#ICON[fa-solid fa-lock fa-3x]",
            value
        );

        this.dispatchEvent('code.unknown', value);
    }

    /**
     * @param {StepCode} step
     */
    displayBadCode(step) {
        this.display.resource.playSoundBad();
        this.state.nbCodeBad++;
        this.state.applyTimerPenalty(step.penalty);

        this.display.showQuickAlert(
            step.text,
            step.code
        );

        this.dispatchEvent('code.bad', step.code);
    }

    /**
     * @param {StepCode} step
     */
    displayGoodCode(step) {
        this.display.resource.playSoundGood();
        this.state.addCode(step.code);
        this.state.nbCodeGood++;

        if (step.end) {
            this.actions.end.execute(step.end);
            return;
        }

        let modal = (new ModalTextBig(step.text));
        modal.setTitle(step.code)
        modal.addCloseButton(this.scenario.buttonClose.image);
        modal.open(this.display);

        this.dispatchEvent('code.good', step.code);
    }
}
