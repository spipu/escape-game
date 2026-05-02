class Modal {
    /** @type {string}      */ image
    /** @type {string}      */ title;
    /** @type {string}      */ message;
    /** @type {string|null} */ imageClose;
    /** @type {Action|null} */ actionConfirm;
    /** @type {Action|null} */ actionCancel;
    /**                     */ overlay;
    /** @type {Size}        */ size;
    /** @type {Position}    */ position;
    /** @type {Sprite}      */ sprite;
    /** @type {Button[]}    */ buttons;
    /** @type {string}      */ modalBodyClass;

    /**
     * @param {string} image
     * @param {string} message
     */
    constructor(image, message) {
        this.image   = image;
        this.title   = '';
        this.message = this.prepareMessage(message);
        this.imageClose = null;
        this.actionConfirm = null;
        this.actionCancel  = null;
        this.size = new Size(600, 468);
        this.position = new Position(75, 500);
        this.overlay = null;
        this.sprite = null;
        this.buttons = [];
        this.modalBodyClass = 'modal-body';
    }

    /**
     * @param {string} message
     * @return {string}
     */
    prepareMessage(message) {
        message = message.replaceAll("\n", "<br/>");
        message = message.replaceAll(/#ICON\[([^\]]+)\]/gi,        '<i class="$1"></i>');
        message = message.replaceAll(/#PUZZLE_RED\[([^\]]+)\]/gi,  '<div class="puzzle puzzle-red"><i class="fa-solid fa-puzzle-piece"></i> $1</div>');
        message = message.replaceAll(/#PUZZLE_BLUE\[([^\]]+)\]/gi, '<div class="puzzle puzzle-blue"><i class="fa-solid fa-puzzle-piece"></i> $1</div>');
        message = message.replaceAll(/#CARD\[([^\]]+)\]/gi,        '<span class="card card-info">$1</span>');
        message = message.replaceAll(/#CARD_DEL\[([^\]]+)\]/gi,    '<span class="card card-del">$1</span>');
        message = message.replaceAll(/#CARD_ADD\[([^\]]+)\]/gi,    '<span class="card card-add">$1</span>');

        return message;
    }

    /**
     * @param {string} title
     * @return {Modal}
     */
    setTitle(title) {
        this.title = title;
        return this;
    }

    /**
     * @param {string} image
     * @return {Modal}
     */
    addCloseButton(image) {
        this.imageClose = image;
        return this;
    }

    /**
     * @param {Action} action
     * @return {Modal}
     */
    addConfirmAction(action) {
        this.actionConfirm = action;
        return this;
    }

    /**
     * @param {Action} action
     * @return {Modal}
     */
    addConfirmCancel(action) {
        this.actionCancel = action;
        return this;
    }

    /**
     * @param {GameDisplay} display
     */
    open(display) {
        this.overlay = document.createElement('div');
        this.overlay.className = 'overlay';
        display.screen.appendChild(this.overlay);

        this.sprite = new Sprite(this.size, this.position);
        this.sprite.htmlTag = document.createElement('div');
        this.sprite.htmlTag.className = 'sprite modal';
        display.resource.applyImage(this.sprite.htmlTag, this.image);
        this.sprite.htmlTag.style.fontWeight = 'bold';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'modal-title';
        titleDiv.textContent = this.title;
        this.sprite.htmlTag.appendChild(titleDiv);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'modal-content';
        contentDiv.innerHTML = this.message;

        const bodyDiv = document.createElement('div');
        bodyDiv.className = this.modalBodyClass;
        bodyDiv.appendChild(contentDiv);
        this.sprite.htmlTag.appendChild(bodyDiv);

        display.addSprite(this.sprite);

        if (this.imageClose) {
            this.addButton(this.prepareButtonClose(display));
        }

        if (this.actionConfirm) {
            this.addButton(this.prepareButton(display, this.actionConfirm, 30));
        }

        if (this.actionCancel) {
            this.addButton(this.prepareButton(display, this.actionCancel, - 30 - 250));
        }
    }

    /**
     * @param {GameDisplay} display
     * @return {Button}
     */
    prepareButtonClose(display) {
        let btn = new Button(
            new Size(70, 70),
            new Position(this.position.x + this.size.width - 80, this.position.y + 20),
            this.imageClose
        );
        display.addButton(btn);
        btn.htmlTag.addEventListener('click', () => { this.close(display); });
        return btn;
    }

    /**
     * @param {GameDisplay} display
     * @param {Action}      action
     * @param {int}         deltaX
     */
    prepareButton(display, action, deltaX) {
        let btn = new Button(
            new Size(250, 50),
            new Position(
                this.position.x + this.size.width * 0.5 + deltaX,
                this.position.y + this.size.height - 68
            ),
            null
        );

        let content = action.label;
        if (action.icon) {
            content = '<i class="' + action.icon + ' mr"></i>' + content;
        }

        btn.add(display);
        btn.htmlTag.innerHTML = content;
        btn.htmlTag.style.color = action.colorText;
        if (action.colorBackground) {
            btn.htmlTag.style.backgroundColor = action.colorBackground;
        }
        btn.htmlTag.addEventListener('click', () => { action.callback(this); });

        return btn;
    }

    /**
     * @param {Button} button
     * @return {Modal}
     */
    addButton(button) {
        this.buttons[this.buttons.length] = button;
        return this;
    }

    /**
     * @param {GameDisplay} display
     */
    close(display) {
        for (let key in this.buttons) {
            display.removeButton(this.buttons[key]);
        }
        display.removeSprite(this.sprite);
        this.overlay.remove();

        this.overlay = null;
        this.sprite = null;
        this.buttons = [];
    }
}
