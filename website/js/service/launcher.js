class Launcher {
    /** @type {string}     */ version;
    /** @type {boolean}    */ offline;
    /** @type {Scenario[]} */ list;

    /**
     * @param {string}  version
     * @param {boolean} offline
     */
    constructor(version, offline) {
        this.version = version;
        this.offline = offline;
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
    }

    displayMenu() {
        let listTag = $('<ul class="main-menu"></ul>');
        for (let key in this.list) {
            let rowTag = $('<li></li>');
            rowTag.text(this.list[key].name);
            rowTag.on('click', $.proxy(function () { this.startGame(key); }, this));
            listTag.append(rowTag);
        }

        let versionTag = $('<div class="main-version"></div>');
        versionTag.text(this.version + (this.offline ? ' (OffLine)' : ''));

        let debugTag = $('<div class="main-version" id="appDebug" style="font-size: 50%"></div>');

        $('#screen')
            .append(listTag)
            .append(versionTag)
            .append(debugTag)
        ;
    }

    startGame(key) {
        (new Game(this.list[key])).start();
    }

    reload() {
        window.location.reload();
    }
}
