class MachineConnector extends AbstractMachine {
    start() {
        this.displayBackground('machine_connector')
        this.displayButtonClose();
        this.displayButtonReset(120, 15, '120%');
        this.displayButtonConfirm(120, 15, '120%');
        this.displayButtonSwitches();
        this.displayHelpMessage();
    }
}
