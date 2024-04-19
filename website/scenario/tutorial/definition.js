class ScenarioTutorial extends Scenario {
    constructor() {
        super('tutorial', 'Tutoriel');
    }

    addResources() {
        this
            .addResourceImage('bkg_main',        'bkg_main.jpg')
            .addResourceImage('bkg_timer',       'timer.png')
            .addResourceImage('bkg_params',      'modal_parameters.png')
            .addResourceImage('bkg_modal_small', 'modal_message_small.png')
            .addResourceImage('bkg_modal_big',   'modal_message_big.png')

            .addResourceImage('btn_close',      'action_close.png')
            .addResourceImage('btn_parameters', 'action_parameters.png')
            .addResourceImage('btn_pause',      'action_pause.png')
            .addResourceImage('btn_play',       'action_play.png')
            .addResourceImage('btn_penalty',    'action_penalty.png')
            .addResourceImage('btn_help',       'action_help.png')
            .addResourceImage('btn_code',       'action_code.png')
            .addResourceImage('btn_machine',    'action_machine.png')

            .addResourceImage('kb_background', 'keyboard_background.png')
            .addResourceImage('btn_blue',      'btn_blue.png')
            .addResourceImage('btn_green',     'btn_green.png')
            .addResourceImage('btn_red',       'btn_red.png')
            .addResourceImage('btn_orange',    'btn_orange.png')

            .addResourceImage('machine_connector', 'bkg_machine_connector.jpg')
            .addResourceImage('machine_digicode',  'bkg_machine_digicode.jpg')

            .addResourceSound('sound_alert',   'sound_alert.mp3',   0.15)
            .addResourceSound('sound_bad',     'sound_bad.mp3',     0.10)
            .addResourceSound('sound_click',   'sound_click.mp3',   1.00)
            .addResourceSound('sound_good',    'sound_good.mp3',    0.80)
            .addResourceSound('sound_timeout', 'sound_timeout.mp3', 0.50)
        ;
    }

    load() {
        this
            .setBackgroundModalParameters('bkg_params')
            .setBackgroundModalText('bkg_modal_small')
            .setSounds('sound_click', 'sound_good', 'sound_bad', 'sound_alert', 'sound_timeout')
            .addTheme(
                (new Theme('main'))
                    .setBackground('bkg_main')
            )

            .setButtonClose(     new Button(new Size(100, 100), new Position(635, 15),   'btn_close'))
            .setButtonParameters(new Button(new Size(100, 100), new Position(15, 15),    'btn_parameters'))
            .setButtonPause(     new Button(new Size(180, 180), new Position(285, 500),  'btn_pause'))
            .setButtonPlay(      new Button(new Size(180, 180), new Position(285, 500),  'btn_play'))
            .setButtonPenalty(   new Button(new Size(180, 180), new Position(285, 760),  'btn_penalty'))
            .setButtonHelp(      new Button(new Size(180, 180), new Position(285, 1020), 'btn_help'))
            .setButtonCode(      new Button(new Size(180, 180), new Position(35, 760),   'btn_code'))
            .setButtonMachine(   new Button(new Size(180, 180), new Position(535, 760),  'btn_machine'))

            .setTimer(
                (new Timer(600, true))
                    .setDisplay('bkg_timer', new Size(560, 232), new Position(85, 160), 160)
            )

            .setKeyboard(
                new Keyboard('kb_background', 'btn_blue', 'btn_green', 'btn_red', 'btn_close')
            )

            .setStepOpening(
                (new StepOpening())
                    .setTimeStartDirectly(false)
                    .addText(
                        "Vous passez un entretien\n" +
                        "dans la société secrète SPIPU,\n" +
                        "au dernier étage\n" +
                        "d'un immeuble de bureaux #ICON[fa-solid fa-building]."
                    )
                    .addText(
                        "Le directeur qui vous accueille\n" +
                        "a un sourire narquois #ICON[fa-regular fa-face-grin-tongue-wink].\n" +
                        "\n" +
                        "Il vous laisse dans une pièce\n" +
                        "en apparence anodine et ferme\n" +
                        "la porte à clé #ICON[fa fa-key] derrière lui."
                    )
                    .addText(
                        "Vous avez 10 minutes #ICON[fa-regular fa-clock] pour sortir.\n" +
                        "\n" +
                        "Bonne chance !"
                    )
            )

            .addHelp(new Help('11', "Une clé.\nIdéal pour ouvrir le coffre."))
            .addHelp(new Help('16', "Ce fil de 10 cm semble pouvoir s'insérer sur la machine."))
            .addHelp(new Help('21', "Si vous avez trouvé les chiffres,\nvous devriez vous interesser\nau texte EXIT."))
            .addHelp(new Help('25', "Avec du courant,\nl'écran fonctionnerait sûrement."))
            .addHelp(new Help('35', "Avant tout, il vous faut\nune clé pour l'ouvrir !"))
            .addHelp(new Help('42', "Il n'y aura rien à en tirer\ntant qu'il n'y aura pas\nde courant."))
            .addHelp(new Help('46', "Il y a un numéro caché au fond du coffre. Et ce motif sur le côté gauche rappelle beaucoup la machine."))
            .addHelp(new Help('48', "Ce sont les 4 chiffres du digicode de la porte. Reste à les mettre dans le bon ordre avec les couleurs."))
            .addHelp(new Help('69', "Vous devez chercher dans la pièce pour trouver un schéma vous montrant quels sont les bons picots. Ensuite entrez le numéro de la machine sur l'application."))

            .addStepCode(
                (new StepCode('0666'))
                    .setPenalty(30)
                    .setText(
                        "Pourquoi ce nombre ?\n" +
                        "\n" +
                        "Vous perdez 30 secondes...\n" +
                        "\n" +
                        "#ICON[fa-solid fa-skull-crossbones fa-3x]"
                    )
            )
            .addStepCode(
                (new StepCode('7239'))
                    .setText(
                        "Non. Ce sont les bons chiffres mais ils ne sont pas dans le bon ordre.\n" +
                        "\n" +
                        "Réfléchissez : les couleurs doivent vous guider.\n" +
                        "\n" +
                        "#ICON[fa-solid fa-triangle-exclamation fa-3x]"
                    )
            )
            .addStepCode(
                (new StepCode('9372'))
                    .setEnd('good')
            )

            .addStepMachine(
                (new StepMachine('21'))
                    .setCallbackStartMachine(
                        function (code, actions) {
                            (new MachineDigicode(code, actions))
                                .setButtonCloseImage('btn_close')
                                .setMaxDigit(4)
                                .setScreen(500, 160, 100)
                                .setDigitsPosition(183, 1, 36, 44, 50)
                                .addStepCode(
                                    (new StepCode('7239'))
                                        .setText(
                                            "Non. Ce sont les bons chiffres mais ils ne sont pas dans le bon ordre.\n" +
                                            "\n" +
                                            "Réfléchissez : les couleurs doivent vous guider.\n" +
                                            "\n" +
                                            "#ICON[fa-solid fa-triangle-exclamation fa-3x]"
                                        )
                                )
                                .addStepCode(
                                    (new StepCode('9372'))
                                        .setEnd('good')
                                )
                                .start();
                        }
                    )
            )

            .addStepMachine(
                (new StepMachine('69'))
                    .setCallbackStartMachine(
                        function (code, actions) {
                            (new MachineConnector(code, actions))
                                .setButtonCloseImage('btn_close')
                                .setButtonCancelImage('btn_red')
                                .setButtonConfirmImage('btn_green')
                                .addButtonSwitch(new ButtonSwitch('1', new Position(74, 445),  new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('2', new Position(340, 448), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('3', new Position(603, 445), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('4', new Position(73, 793),  new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('5', new Position(340, 793), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('6', new Position(605, 786), new Size(58, 58), 'btn_orange'))
                                .setHelpMessage(
                                    "Pour utiliser cette machine vous devez appuyer sur les boutons correspondant aux bons picots et appuyer sur OK.\n" +
                                    "Chaque erreur vous fait perdre une minute, il est donc préférable d'attendre de comprendre quels sont les bons picots avant de l'utiliser."
                                )
                                .addStepCode(
                                    (new StepCode('25'))
                                        .setText(
                                            "#PUZZLE_RED[9]\n" +
                                            "\n" +
                                            "\n" +
                                            "Additionnez ce résultat\n" +
                                            "avec un numéro bleu\n"
                                        )
                                )
                                .start();
                        }
                    )
            )

            .addStepEnding(
                (new StepEnding('good'))
                    .setIsGood(true)
                    .setText(
                        "Bravo !\n" +
                        "Vous avez terminé le tutoriel !\n" +
                        "\n" +
                        "Vous pouvez maintenant regarder votre score et votre temps.\n" +
                        "\n" +
                        "#ICON[fa-regular fa-thumbs-up fa-3x]"
                    )
            )
            .addStepEnding(
                (new StepEnding('timeout'))
                    .setIsGood(false)
                    .setText(
                        "Le temps est écoulé...\n" +
                        "\n" +
                        "Vous pouvez reessayer !\n" +
                        "\n" +
                        "#ICON[fa-solid fa-clock fa-3x]"
                    )
            )
            .setInitCallback($.proxy(this.initEvents, this))
        ;
    }

    initEvents(actions) {
        window.addEventListener(
            'escape-game.end',
            (e) => { this.eventOnEnd(e.detail.actions); },
            false
        );
    }

    eventOnEnd(actions) {
        console.log(actions.state);
    }
}
