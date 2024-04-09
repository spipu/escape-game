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
        this.overlay = $('<div class="overlay"></div>');
        display.screen.append(this.overlay);

        this.sprite = new Sprite(this.size, this.position);
        this.sprite.htmlTag = $('<div class="sprite modal"></div>');
        display.resource.applyImage(this.sprite.htmlTag, this.image);
        this.sprite.htmlTag.css('font-weight', 'bold');
        this.sprite.htmlTag.append($('<div class="modal-title"></div>').text(this.title));
        this.sprite.htmlTag.append($('<div class="' + this.modalBodyClass + '"></div>').append($('<div class="modal-content"></div>').html(this.message)));
        display.addSprite(this.sprite);

        if (this.imageClose) {
            this.buttons[this.buttons.length] = this.prepareButtonClose(display);
        }

        if (this.actionConfirm) {
            this.buttons[this.buttons.length] = this.prepareButton(display, this.actionConfirm, 30);
        }

        if (this.actionCancel) {
            this.buttons[this.buttons.length] = this.prepareButton(display, this.actionCancel, - 30 - 250);
        }
    }

    /**
     * @param {GameDisplay} display
     * @return {Button}
     */
    prepareButtonClose(display)
    {
        let btn = new Button(
            new Size(70, 70),
            new Position(this.position.x + this.size.width - 80, this.position.y + 20),
            this.imageClose
        );
        display.addButton(btn)
        btn.htmlTag.on('click', $.proxy(function() { this.close(display); }, this));
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
        )

        let content = action.label;
        if (action.icon) {
            content = '<i class="' + action.icon + ' mr"></i>' + content;
        }

        btn.add(display);
        btn.htmlTag.html(content);
        btn.htmlTag.css('color', action.colorText);
        if (action.colorBackground) {
            btn.htmlTag.css('background-color', action.colorBackground);
        }
        btn.htmlTag.on('click', $.proxy(function() { action.callback(this); }, this));

        return btn;
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
