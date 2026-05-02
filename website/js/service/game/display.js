class GameDisplay {
    /** @type {GameResource} */ resource;
    /** @type {int}          */ width;
    /** @type {int}          */ height;
    /** @type {number}       */ ratio;
    /** @type {Button[]}     */ buttons;
    /** @type {Sprite[]}     */ sprites;
    /** @type {int}          */ maxButtonId;
    /** @type {int}          */ maxSpriteId;
    /**                      */ screen;
    /** @type {Timer}        */ timer;
    /** @type {string}       */ quickModalImageBackground;
    /** @type {string}       */ quickModalImageButtonClose;

    /**
     * @param {GameResource} resource
     */
    constructor(resource) {
        this.resource = resource;
        this.width = 750;
        this.height = 1288;
        this.ratio = 1.;
        this.buttons = [];
        this.sprites = [];
        this.maxButtonId = 0;
        this.maxSpriteId = 0;
        this.screen = document.getElementById('screen');
        this.screen.innerHTML = '';
        this.resizeProxy = this.resizeWait.bind(this);
    }

    init() {
        this.screen.classList.add('scenario-' + this.resource.scenario.code);

        this.resize();
        window.addEventListener('resize', this.resizeProxy);
    }

    reset() {
        window.removeEventListener('resize', this.resizeProxy);

        this.timer.stop(this);

        for (let key = 0; key < this.maxButtonId; key ++) {
            if (this.buttons[key]) {
                this.buttons[key].remove(this);
            }
        }

        for (let key = 0; key < this.maxSpriteId; key ++) {
            if (this.sprites[key]) {
                this.sprites[key].remove(this);
            }
        }

        this.resource.removeImage(this.screen);
        this.screen.classList.remove('scenario-' + this.resource.scenario.code);
    }

    resizeWait() {
        setTimeout(this.resize.bind(this), 250);
    }

    resize() {
        const main = document.getElementById('main');
        const maxW = window.innerWidth;
        const maxH = window.innerHeight;
        main.style.width  = maxW + 'px';
        main.style.height = maxH + 'px';

        if (maxW * this.height < maxH * this.width) {
            this.ratio = maxW / this.width;
            this.screen.style.width  = maxW + 'px';
            this.screen.style.height = (maxW * this.height / this.width) + 'px';
        } else {
            this.ratio = maxH / this.height;
            this.screen.style.width  = (maxH * this.width / this.height) + 'px';
            this.screen.style.height = maxH + 'px';
        }

        this.screen.style.fontSize = (30. * this.ratio) + 'px';

        for (let key = 0; key < this.maxButtonId; key ++) {
            if (this.buttons[key]) {
                this.buttons[key].updatePosition(this);
            }
        }

        for (let key = 0; key < this.maxSpriteId; key ++) {
            if (this.sprites[key]) {
                this.sprites[key].updatePosition(this);
            }
        }

        this.resizeTimer();
    }

    /**
     * @param {string} image
     */
    setBackground(image) {
        this.resource.applyImage(this.screen, image);
    }

    /**
     * @param {string} imageBackground
     * @param {string} imageButtonClose
     */
    prepareQuickAlert(imageBackground, imageButtonClose) {
        this.quickModalImageBackground = imageBackground;
        this.quickModalImageButtonClose = imageButtonClose;
    }

    /**
     * @param {string} message
     * @param {string} title
     */
    showQuickAlert(message, title = '')
    {
        let modal = (new ModalTextSmall(message));
        modal.setTitle(title)
        modal.addCloseButton(this.quickModalImageButtonClose);
        modal.open(this);
    }

    /**
     * @param {Timer} timer
     * @param {GameState} state
     */
    setTimer(timer, state) {
        this.timer = timer;

        this.timer.start(this, state);
    }

    resizeTimer() {
        if (this.timer) {
            this.timer.resize(this);
        }
    }

    /**
     * @param {Button} button
     */
    addButton(button) {
        button.add(this);
    }

    /**
     * @param {Button} button
     */
    removeButton(button) {
        button.remove(this);
    }

    /**
     * @param {Button} button
     */
    enableButton(button) {
        button.enable();
    }

    /**
     * @param {Button} button
     */
    disableButton(button) {
        button.disable();
    }

    /**
     * @param {Button} button
     */
    showButton(button) {
        button.show();
    }

    /**
     * @param {Button} button
     */
    hideButton(button) {
        button.hide();
    }

    /**
     * @param {Sprite} sprite
     */
    addSprite(sprite) {
        sprite.add(this);
    }

    /**
     * @param {Sprite} sprite
     */
    removeSprite(sprite) {
        sprite.remove(this);
    }

    /**
     * @param {Theme} theme
     */
    applyTheme(theme) {
        this.resource.applyImage(this.screen, theme.background);
        this.resource.startMusic(theme.music);
        this.resource.playSound(theme.sound);
        if (theme.text) {
            let modal = (new ModalTextBig(theme.text));
            modal.addCloseButton(this.quickModalImageButtonClose);
            modal.open(this);
        }
    }
}
