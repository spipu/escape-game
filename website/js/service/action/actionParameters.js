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

        $('#parameter-musics').on('click', $.proxy(this.changeMusics, this));
        $('#parameter-soundEffects').on('click', $.proxy(this.changeSoundEffects, this));
        $('#parameter-timer').on('click', $.proxy(this.changeTimer, this));
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
        $('#parameter-musics')
            .removeClass('fa-square-check')
            .removeClass('fa-square')
            .addClass(this.state.parameters.musics ? 'fa-square-check' : 'fa-square')
        ;

        $('#parameter-soundEffects')
            .removeClass('fa-square-check')
            .removeClass('fa-square')
            .addClass(this.state.parameters.soundEffects ? 'fa-square-check' : 'fa-square')
        ;

        $('#parameter-timer')
            .removeClass('fa-square-check')
            .removeClass('fa-square')
            .addClass(this.state.parameters.timer ? 'fa-square-check' : 'fa-square')
        ;
    }
}
