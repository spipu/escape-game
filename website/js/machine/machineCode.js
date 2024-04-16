class MachineCode extends AbstractMachine {
    /** @type {string}         */ backgroundImage;

    /**
     * @param {string} image
     * @return {MachineCode}
     */
    setBackgroundImage(image) {
        this.backgroundImage = image;
        return this;
    }

    start() {
        this.displayBackground(this.backgroundImage)
        this.displayButtonClose();
        this.displayButtonReset(120, 15, '120%');
        this.displayButtonConfirm(120, 15, '120%');
        this.displayHelpMessage();
    }
}
