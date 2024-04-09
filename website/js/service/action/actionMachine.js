class ActionMachine extends AbstractAction {
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
        if (this.scenario.stepMachines[value] === undefined) {
            this.displayUnknown(value);
            return;
        }

        let step = this.scenario.stepMachines[value];
        this.displayGood(step);
    }

    displayUnknown(value) {
        this.display.resource.playSoundBad();
        this.state.nbMachineUnknown++;
        this.display.showQuickAlert("Machine non trouvée.", value);
        this.dispatchEvent('machine.unknown', value);
    }

    /**
     * @param {StepMachine} step
     */
    displayGood(step) {
        this.display.resource.playSoundGood();
        this.state.nbMachineStart++;

        this.dispatchEvent('machine.start', step.code);
        step.callback(step.code, this.actions);
    }
}
