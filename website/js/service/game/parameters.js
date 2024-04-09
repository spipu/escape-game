class GameParameters {
    /** @Type {boolean} */ musics;
    /** @Type {boolean} */ soundEffects;
    /** @Type {boolean} */ timer;

    constructor() {
        this.musics       = true;
        this.soundEffects = true;
        this.timer        = true;
        this.load();
    }

    load() {
        let values = localStorage.getItem("parameters");
        if (!values) {
            return false;
        }
        values = JSON.parse(values);

        this.musics       = values.musics;
        this.soundEffects = values.soundEffects;
        this.timer        = values.timer;
    }

    save() {
        localStorage.setItem(
            "parameters",
            JSON.stringify(
                {
                    'musics':       this.musics,
                    'soundEffects': this.soundEffects,
                    'timer':        this.timer,
                }
            )
        );
    }
}
