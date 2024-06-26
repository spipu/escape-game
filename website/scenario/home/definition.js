class ScenarioHome extends Scenario {
    constructor() {
        super('home', 'Home');
    }

    addResources() {
        this
            .addResourceImage('bkg_main',        'bkg_main.jpg', true)
            .addResourceImage('bkg_timer',       'timer.png', true)
            .addResourceImage('bkg_params',      'modal_parameters.png', true)
            .addResourceImage('bkg_modal_small', 'modal_message_small.png', true)
            .addResourceImage('bkg_modal_big',   'modal_message_big.png', true)

            .addResourceImage('btn_close',      'action_close.png', true)
            .addResourceImage('btn_parameters', 'action_parameters.png', true)
            .addResourceImage('btn_pause',      'action_pause.png', true)
            .addResourceImage('btn_play',       'action_play.png', true)
            .addResourceImage('btn_penalty',    'action_penalty.png', true)
            .addResourceImage('btn_help',       'action_help.png', true)
            .addResourceImage('btn_code',       'action_code.png', true)
            .addResourceImage('btn_machine',    'action_machine.png', true)

            .addResourceImage('kb_background', 'keyboard_background.png', true)
            .addResourceImage('btn_blue',      'btn_blue.png', true)
            .addResourceImage('btn_green',     'btn_green.png', true)
            .addResourceImage('btn_red',       'btn_red.png', true)
            .addResourceImage('btn_grey',      'btn_grey.png', true)
            .addResourceImage('btn_orange',    'btn_orange.png', true)

            .addResourceImage('machine_connector', 'bkg_machine_connector.jpg', true)
            .addResourceImage('machine_digicode',  'bkg_machine_digicode.jpg', true)

            .addResourceSound('sound_alert',   'sound_alert.mp3',   0.15, true)
            .addResourceSound('sound_bad',     'sound_bad.mp3',     0.10, true)
            .addResourceSound('sound_click',   'sound_click.mp3',   1.00, true)
            .addResourceSound('sound_good',    'sound_good.mp3',    0.80, true)
            .addResourceSound('sound_timeout', 'sound_timeout.mp3', 0.50, true)
        ;
    }

    load() {
        this
            .setBackgroundModalParameters('bkg_params')
            .setBackgroundModalText('bkg_modal_small')
            .setSounds('sound_click', 'sound_good', 'sound_bad', 'sound_alert', 'sound_timeout')
            .addTheme((new Theme('main')).setBackground('bkg_main'))

            .setButtonClose(     new Button(new Size(100, 100), new Position(635, 15),   'btn_close'))
            .setButtonParameters(new Button(new Size(100, 100), new Position(15, 15),    'btn_parameters'))
            .setButtonPause(     new Button(new Size(180, 180), new Position(285, 560),  'btn_pause'))
            .setButtonPlay(      new Button(new Size(180, 180), new Position(285, 560),  'btn_play'))
            .setButtonHelp(      new Button(new Size(180, 180), new Position(35, 840),   'btn_help'))
            .setButtonMachine(   new Button(new Size(180, 180), new Position(535, 840),  'btn_machine'))

            .setTimer((new Timer(60*30, true)).setDisplay('bkg_timer', new Size(560, 232), new Position(85, 160), 160))
            .setKeyboard(new Keyboard('kb_background', 'btn_blue', 'btn_green', 'btn_red', 'btn_close'))

            .setStepOpening(
                (new StepOpening())
                    .setTimeStartDirectly(false)
                    .addText(
                        "Votre aventure commence dans la salle de bain d'un appartement.\n" +
                        "\n" +
                        "Toutes les portes de l'appartement sont fermées par des digicodes.\n" +
                        "\n" +
                        "Vous devez réussir à sortir de l'appartement."
                    )
            )

            .addHelp(
                new Help('11', "Serait-ce pour ouvrir une trappe ?")
                    .addHelp('Il y a une trappe juste à côté\nde là où vous avez trouvez\ncette carte')
                    .addHelp("Juste à gauche des toilettes,\nmais comment l'ouvrir ?")
                    .addHelp('Poussez les coins indiqués pour ouvrir la trappe.')
            )
            .addHelp(new Help('13', "On dirait un programme\nde lave-linge."))
            .addHelp(new Help('19', "Où pouvez-vous trouver\nun code à 3 chiffres ?"))
            .addHelp(new Help('21', "Il faut 4 chiffres,\n peut-être une année ?"))
            .addHelp(new Help('22', "Cette porte est vraiment fermée.\nCela ne sert à rien d'insister..."))
            .addHelp(new Help('23', "Il faut 4 chiffres,\n peut-être une année ?"))
            .addHelp(new Help('24', "Cette porte est vraiment fermée.\nCela ne sert à rien d'insister..."))
            .addHelp(new Help('25', "Un code à 6 chiffres ?\n\nIl faut surement trouver\nles 2 parties qui le composent."))
            .addHelp(new Help('27', "Donc le code de chaque pièce est lié à la personne qui l'occupe ?"))
            .addHelp(new Help('31', "Serait-ce une partie d'un code ?"))
            .addHelp(new Help('32', "Ecouter un CD aiderait sûrement..."))
            .addHelp(new Help('33', "Serait-ce une partie d'un code ?"))
            .addHelp(new Help('34', "Pauvre Cendrillon,\n\ntoute seule dans\nla tour de son château..."))
            .addHelp(new Help('41', "Une forte odeur se dégage\nde cette porte.\n\n#ICON[fa-solid fa-poo fa-3x]\n\nIl vaut mieux de pas l'ouvrir..."))
            .addHelp(new Help('42', "Cette porte est vraiment fermée.\nCela ne sert à rien d'insister..."))
            .addHelp(
                new Help('49', "Un code à 6 chiffres en 3 parties ?\nUne date importante peut-être ?")
                    .addHelp("Cherchez dans la pièce principale des indices sur une date importante.")
                    .addHelp("Cherchez la date du mariage.")
                    .addHelp("Le code est 010709")
            )
            .addHelp(new Help('51', "Il faut utiliser quelque chose\npour pouvoir le lire."))
            .addHelp(new Help('53', "Mais pour ouvrir quoi ?\n\nDans la cuisine peut-être..."))
            .addHelp(new Help('55', "Quel symbole doit-on faire\npour ouvrir cette porte ?"))
            .addHelp(new Help('57', "Il y a un souvenir\nd'une réunion de famille\ndans cette pièce ?"))
            .addHelp(
                new Help('59', "C'était un très bel anniversaire\n\nMais quelle était la\ndate du mariage ?")
                    .addHelp("Si l'anniversaire était en 2019\nEn quelle année était le mariage ?")
                    .addHelp("Le mariage était donc en 2019")
            )

            .addStepMachine(this.createStepDigicode('19', 3, '314'))
            .addStepMachine(this.createStepDigicode('21', 4, '2018'))
            .addStepMachine(this.createStepDigicode('23', 4, '2014'))
            .addStepMachine(this.createStepDigicode('25', 6, '437198'))
            .addStepMachine(this.createStepDigicode('49', 6, '010709', true))

            .addStepMachine(
                (new StepMachine('55'))
                    .setCallbackStartMachine(
                        function (code, actions) {
                            (new MachineConnector(code, actions))
                                .setButtonCloseImage('btn_close')
                                .setButtonCancelImage('btn_red')
                                .setButtonConfirmImage('btn_green')
                                .addButtonSwitch(new ButtonSwitch('A', new Position( 74, 445), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('B', new Position(207, 448), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('C', new Position(340, 448), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('D', new Position(472, 448), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('E', new Position(604, 445), new Size(58, 58), 'btn_orange'))

                                .addButtonSwitch(new ButtonSwitch('F', new Position( 74, 618), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('G', new Position(207, 618), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('H', new Position(340, 618), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('I', new Position(472, 618), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('J', new Position(604, 618), new Size(58, 58), 'btn_orange'))

                                .addButtonSwitch(new ButtonSwitch('K', new Position( 74, 793), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('L', new Position(207, 793), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('M', new Position(340, 793), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('N', new Position(472, 786), new Size(58, 58), 'btn_orange'))
                                .addButtonSwitch(new ButtonSwitch('O', new Position(604, 786), new Size(58, 58), 'btn_orange'))
                                .addStepCode(
                                    (new StepCode('AEHKO'))
                                        .setText(
                                            "La porte est maintenant dévérouillée.\n" +
                                            "\n" +
                                            "Vous pouvez ouvrir la porte."
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
                        "Vous avez réussi à sortir de l'appartement !\n" +
                        "\n" +
                        "#ICON[fa-regular fa-thumbs-up fa-3x]"
                    )
            )
            .setInitCallback($.proxy(this.initEvents, this))
        ;
    }

    createStepDigicode(key, nbDigits, expected, isEnd = false) {
        return (new StepMachine(key))
            .setCallbackStartMachine(
                function (code, actions) {
                    let step = new StepCode(expected);
                    if (isEnd) {
                        step.setEnd('good')
                    } else {
                        step.setText(
                            "La porte est maintenant dévérouillée.\n" +
                            "\n" +
                            "Vous pouvez ouvrir la porte."
                        );
                    }

                    (new MachineDigicode(code, actions))
                        .setButtonCloseImage('btn_close')
                        .setMinDigit(nbDigits)
                        .setMaxDigit(nbDigits)
                        .setDisplayDigits(!isEnd)
                        .setDisplayEmptyDigits(true)
                        .setScreen(500, 160, 100)
                        .setDigitsPosition(183, 1, 36, 44, 50)
                        .addStepCode(step)
                        .start();
                }
            );
    }

    initEvents(actions) {
    }
}
