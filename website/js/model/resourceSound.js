class ResourceSound {
    /** @type {string} */ code;
    /** @type {string} */ filename;
    /** @type {number} */ volumeMax;
    /** @type {string} */ url;
    /** @type          */ player;
    /** @type          */ playerId;

    /**
     * @param {string} code
     * @param {string} filename
     * @param {number} volumeMax
     */
    constructor(
        code,
        filename,
        volumeMax
    ) {
        this.code          = code;
        this.filename      = filename;
        this.volumeMax     = volumeMax;
        this.url           = '';
        this.player        = null;
        this.playerId      = null;
    }

    /**
     * @param {string} scenarioCode
     * @param {AppVersion} version
     * @return {ResourceSound}
     */
    init(scenarioCode, version) {
        this.url = '/scenario/' + scenarioCode + '/sound/' + this.filename;
        this.url += '?_v=' + version.currentVersion;

        this.player = new Howl(
            {
                src:      this.url,
                autoplay: false,
                preload:  true,
                loop:     false,
                volume:   this.volumeMax
            }
        );

        return this;
    }

    /**
     * @param {boolean} autoPlay
     */
    startMusic(autoPlay = true) {
        this.player.volume(0.0);
        this.player.loop(true);
        this.playerId = this.player.play();
        if (autoPlay) {
            this.player.fade(0.0, this.volumeMax, 1000, this.playerId);
        } else {
            this.player.volume(this.volumeMax);
            this.player.pause();
        }
    }

    stopMusic() {
        if (!this.playerId) {
            return;
        }
        this.player.loop(false);
        this.player.fade(this.volumeMax, 0.0, 1000, this.playerId);
        this.player.once(
            'fade',
            $.proxy(
                function () {
                    this.player.stop(this.playerId);
                    this.playerId = null;
                },
                this
            )
        );
    }

    pauseMusic() {
        this.player.pause();
    }

    resumeMusic() {
        this.player.play();
    }

    playSound() {
        this.player.play();
    }
}
