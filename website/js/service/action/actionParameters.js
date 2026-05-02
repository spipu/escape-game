class ActionParameters extends AbstractAction {
    execute() {
        let content =
            '<div class="modal-parameters">' +
                "<i id='parameter-musics'       class='parameter fa-regular'></i> Musiques\n" +
                "\n" +
                "<i id='parameter-soundEffects' class='parameter fa-regular'></i> Effets Sonores\n" +
                "\n" +
                "<i id='parameter-timer'        class='parameter fa-regular'></i> Chronomètre\n" +
            '</div>'
        ;

        let modal = (new ModalParameters(content));
        modal.open(this.display);

        this.updateChecks();

        document.getElementById('parameter-musics').addEventListener('click',       this.changeMusics.bind(this));
        document.getElementById('parameter-soundEffects').addEventListener('click', this.changeSoundEffects.bind(this));
        document.getElementById('parameter-timer').addEventListener('click',        this.changeTimer.bind(this));
    }

    changeMusics() {
        this.state.parameters.musics = !this.state.parameters.musics;
        this.state.parameters.save();
        this.updateChecks();

        if (this.state.parameters.musics) {
            if (!this.state.isPause) {
                this.display.resource.resumeMusic();
            }
        } else {
            this.display.resource.pauseMusic();
        }

        this.display.resource.playSoundClick();
    }

    changeSoundEffects() {
        this.state.parameters.soundEffects = !this.state.parameters.soundEffects;
        this.state.parameters.save();
        this.display.resource.playSoundClick();
        this.updateChecks();
    }

    changeTimer() {
        this.state.parameters.timer = !this.state.parameters.timer;
        this.state.parameters.save();
        this.display.resource.playSoundClick();
        this.updateChecks();

        this.scenario.timer.refresh(this.state);
    }

    updateChecks() {
        this.updateCheck('parameter-musics',       this.state.parameters.musics);
        this.updateCheck('parameter-soundEffects', this.state.parameters.soundEffects);
        this.updateCheck('parameter-timer',        this.state.parameters.timer);
    }

    updateCheck(id, value) {
        const el = document.getElementById(id);
        el.classList.remove('fa-square-check', 'fa-square');
        el.classList.add(value ? 'fa-square-check' : 'fa-square');
    }
}
