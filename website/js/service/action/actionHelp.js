class ActionHelp extends AbstractAction {
    execute() {
        if (this.state.isPause || this.state.isEnd) {
            return;
        }

        this.keyboard.open(1, 4, false, $.proxy(this.actionCallback, this));
    }

    /**
     * @param {string} value
     */
    actionCallback(value) {
        this.keyboard.close();
        this.state.nbHelp++;

        if (this.scenario.helps[value] === undefined) {
            this.display.showQuickAlert(
                "#ICON[fa-regular fa-lightbulb fa-3x]\n" +
                "\n" +
                "Rien à signaler...",
                "Indice n°" + value
            );
            this.dispatchEvent('help.unknown', value);
            return;
        }

        let help = this.scenario.helps[value];
        this.display.resource.playSoundGood();

        if (help.helps.length > 1) {
            this.displayComplexHelp(help);
        } else {
            this.displaySimpleHelp(help);
        }
    }

    /**
     * @param {Help} help
     */
    displaySimpleHelp(help) {
        this.state.addHelp(help.code);

        let modal = (new ModalTextBig(help.helps[0]));
        modal.setTitle("Indice n°" + help.code)
        modal.addCloseButton(this.scenario.buttonClose.image);
        modal.open(this.display);

        this.dispatchEvent('help.good', help.code);
    }

    /**
     * @param {Help} help
     * @param {int}  position
     */
    displayComplexHelp(help, position = 0) {
        this.state.addHelp(help.code);

        let modal = (new ModalTextBig(help.helps[position]));
        modal.setTitle("Indice n°" + help.code)
        modal.addCloseButton(this.scenario.buttonClose.image);
        modal.open(this.display);

        let nb = help.helps.length;
        let margeX = 40;
        let margeY = 20;
        let size = 100;
        let deltaX = (modal.size.width - 2 * margeX - size) / (nb-1);
        for (let k=0; k<nb; k++) {
            let btn = new Button(
                new Size(size, size),
                new Position(
                    modal.position.x + margeX + deltaX * k,
                    modal.position.y + modal.size.height - size - margeY
                ),
                ((k === position) ? 'btn_green' : 'btn_grey')
            )
            if (k === nb-1) {
                btn.image = 'btn_red';
                btn.setLabel('Solution');
            }

            btn.add(this.display);
            btn.htmlTag.html(k+1);
            btn.htmlTag.on(
                'click',
                $.proxy(
                    function() {
                        modal.close(this.display);
                        this.displayComplexHelp(help, k);
                    },
                    this
                )
            );
            modal.addButton(btn);
        }

        this.dispatchEvent('help.good', help.code);
    }
}
