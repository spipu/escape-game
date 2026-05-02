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
        const screen = document.getElementById('screen');

        const titleTag = document.createElement('div');
        titleTag.className = 'main-title';
        titleTag.innerHTML = '<i class="fa-solid fa-lock"></i> Escape Game';
        screen.appendChild(titleTag);

        const listTag = document.createElement('ul');
        listTag.className = 'main-menu';

        for (let key in this.list) {
            const scenario  = this.list[key];
            const bgUrl     = scenario.images['bkg_main']?.url ?? '';
            const duration  = scenario.duration ? scenario.duration + ' min' : '';
            const rowTag    = document.createElement('li');

            if (bgUrl) {
                rowTag.style.backgroundImage = 'url(' + bgUrl + ')';
            }

            const contentTag = document.createElement('div');
            contentTag.className = 'menu-card-content';

            const nameTag = document.createElement('div');
            nameTag.className = 'menu-card-name';
            nameTag.textContent = scenario.name;

            const descTag = document.createElement('div');
            descTag.className = 'menu-card-desc';
            descTag.textContent = scenario.description;

            const metaTag = document.createElement('div');
            metaTag.className = 'menu-card-meta';
            if (duration) {
                metaTag.innerHTML = '<i class="fa-regular fa-clock"></i> ' + duration;
            }

            contentTag.appendChild(nameTag);
            contentTag.appendChild(descTag);
            contentTag.appendChild(metaTag);

            const playTag = document.createElement('div');
            playTag.className = 'menu-card-play';
            playTag.innerHTML = '<i class="fa-solid fa-circle-play"></i>';

            rowTag.appendChild(contentTag);
            rowTag.appendChild(playTag);
            rowTag.addEventListener('click', () => { this.startGame(key); });
            listTag.appendChild(rowTag);
        }

        screen.appendChild(listTag);

        const versionTag = document.createElement('div');
        versionTag.className = 'main-version';
        versionTag.textContent = this.version + (this.offline ? ' (OffLine)' : '');

        const debugTag = document.createElement('div');
        debugTag.className = 'main-version';
        debugTag.id = 'appDebug';
        debugTag.style.fontSize = '50%';

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
