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

    loadScenarioResources() {
         for (let key in this.list) {
             this.loadScenarioResource(this.list[key]);
         }
    }

    /**
     * @param {Scenario} scenario
     */
    loadScenarioResource(scenario) {
        scenario.addResources();

        for (let key in scenario.images) {
            fetch(scenario.images[key].url);
        }

        for (let key in scenario.sounds) {
            fetch(scenario.sounds[key].url);
        }
    }

    start() {
        this.displayMenu();
        setTimeout(this.loadScenarioResources.bind(this), 50);
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

        $('#screen')
            .append(listTag)
            .append(versionTag)
        ;
    }

    startGame(key) {
        (new Game(this.list[key])).start();
    }

    reload() {
        window.location.reload();
    }
}
