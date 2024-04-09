class Launcher {
    /** @type {boolean}    */ forceReload;
    /** @type {Scenario[]} */ list;

    constructor(forceReload) {
        this.forceReload = forceReload;
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

        let reloadTag = $('<i class="fa fa-rotate"></i>');
        reloadTag.on('click', $.proxy(this.reload, this));

        let containerTag = $('<div class="main-reload"></div>');
        containerTag.append(reloadTag);

        $('#screen').append(listTag).append(containerTag);
    }

    startGame(key) {
        (new Game(this.list[key], this.forceReload)).start();
    }

    reload() {
        window.location.reload();
    }
}
