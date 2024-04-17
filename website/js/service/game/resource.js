class GameResource {
    /** @type {Scenario}        */ scenario;
    /** @type {GameState}       */ state;
    /** @type {AppVersion}      */ version;
    /** @type {string|null}     */ currentMusic;
    /** @type {boolean}         */ forcePause;
    /** @type {ResourceImage[]} */ images;
    /** @type {ResourceSound[]} */ sounds;

    /**
     * @param {Scenario}  scenario
     * @param {GameState} state
     * @param {AppVersion} version
     */
    constructor(scenario, state, version) {
        this.scenario     = scenario;
        this.state        = state;
        this.version      = version;
        this.currentMusic = null;
        this.forcePause   = false;

        this.initImages();
        this.initSounds();
    }

    initImages() {
        this.images = [];
        for (let key in this.scenario.images) {
            this.images[key] = this.scenario.images[key].init(this.scenario.code, this.version);
        }
    }

    initSounds() {
        this.sounds = [];
        for (let key in this.scenario.sounds) {
            this.sounds[key] = this.scenario.sounds[key].init(this.scenario.code, this.version);
        }

        document.addEventListener('visibilitychange', $.proxy(this.visibilitychange, this));
    }

    visibilitychange() {
        if (this.state.parameters.musics && this.currentMusic) {
            if (document.visibilityState === "visible") {
                if (this.forcePause) {
                    this.forcePause = false;
                    this.state.isPause = false;
                    this.resumeMusic();
                }
            } else {
                if (!this.state.isPause) {
                    this.forcePause = true;
                    this.state.isPause = true;
                    this.pauseMusic();
                }
            }
        }
    }

    applyImage(htmlElement, imageCode) {
        htmlElement.css('background-image', 'url(' + this.images[imageCode].url + ')');
    }

    removeImage(htmlElement) {
        htmlElement.css('background-image', '');
    }

    startMusic(soundCode) {
        this.stopMusic();
        if (soundCode) {
            this.currentMusic = soundCode;
            this.sounds[this.currentMusic].startMusic(this.state.parameters.musics);
        }
    }

    pauseMusic() {
        if (this.currentMusic) {
            this.sounds[this.currentMusic].pauseMusic();
        }
    }

    resumeMusic() {
        if (this.currentMusic) {
            this.sounds[this.currentMusic].resumeMusic();
        }
    }

    stopMusic() {
        if (this.currentMusic) {
            this.sounds[this.currentMusic].stopMusic();
        }
        this.currentMusic = null;
    }

    playSoundClick() {
        this.playSound(this.scenario.soundClick);
    }

    playSoundGood() {
        this.playSound(this.scenario.soundGood);
    }

    playSoundBad() {
        this.playSound(this.scenario.soundBad);
    }

    playSoundAlert() {
        this.playSound(this.scenario.soundAlert);
    }

    playSoundTimeout() {
        this.playSound(this.scenario.soundTimeout);
    }

    playSound(soundCode) {
        if (soundCode && this.state.parameters.soundEffects) {
            this.sounds[soundCode].playSound();
        }
    }
}
