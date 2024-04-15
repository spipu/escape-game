class Launcher {
    /** @type {AppVersion} */ version;
    /** @type {Scenario[]} */ list;

    /**
     * @param {AppVersion} version
     */
    constructor(version) {
        this.version = version;
        this.list = [];
    }

    /**
     * @param {Scenario} scenario
     */
    addScenario(scenario) {
        this.list[scenario.code] = scenario;
        return this;
    }

    start() {
        this.displayMenu();
        // this.startGame('broceliande');
    }

    displayMenu() {
        let listTag = $('<ul class="main-menu"></ul>');
        for (let key in this.list) {
            let rowTag = $('<li></li>');
            rowTag.text(this.list[key].name);
            rowTag.on('click', $.proxy(function () { this.startGame(key); }, this));
            listTag.append(rowTag);
        }

        let reloadTag = $('<i class="fa fa-rotate"></i>');
        reloadTag.on('click', $.proxy(this.reload, this));

        let containerTag = $('<div class="main-reload"></div>');
        containerTag.append(reloadTag);

        let versionTag = $('<div class="main-version"></div>');
        versionTag.text('Version 1.' + this.version.currentVersion);

        $('#screen')
            .append(listTag)
            .append(containerTag)
            .append(versionTag)
        ;
    }

    startGame(key) {
        (new Game(this.list[key], this.version)).start();
    }

    reload() {
        window.location.reload();
    }
}
