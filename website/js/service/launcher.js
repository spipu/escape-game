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
        const listTag = document.createElement('ul');
        listTag.className = 'main-menu';

        for (let key in this.list) {
            const rowTag = document.createElement('li');
            rowTag.textContent = this.list[key].name;
            rowTag.addEventListener('click', () => { this.startGame(key); });
            listTag.appendChild(rowTag);
        }

        const versionTag = document.createElement('div');
        versionTag.className = 'main-version';
        versionTag.textContent = this.version + (this.offline ? ' (OffLine)' : '');

        const debugTag = document.createElement('div');
        debugTag.className = 'main-version';
        debugTag.id = 'appDebug';
        debugTag.style.fontSize = '50%';

        const screen = document.getElementById('screen');
        screen.appendChild(listTag);
        screen.appendChild(versionTag);
        screen.appendChild(debugTag);
    }

    startGame(key) {
        (new Game(this.list[key])).start();
    }

    reload() {
        window.location.reload();
    }
}
