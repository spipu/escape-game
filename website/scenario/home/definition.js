class ScenarioHome extends Scenario {
    constructor() {
        super('home', 'Home');
    }

    load() {
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
            .addResourceSound('sound_good',    'sound_good.mp3',    0.50)
            .addResourceSound('sound_timeout', 'sound_timeout.mp3', 0.50)

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

            .addHelp(new Help('11', "Serait-ce pour ouvrir une trappe ?"))
            .addHelp(new Help('13', "On dirait un programme de lave-linge."))
            .addHelp(new Help('19', "Où pouvez-vous trouver un code à 3 chiffres ?"))
            .addHelp(new Help('21', "Il faut 4 chiffres,\n peut-être une année ?"))
            .addHelp(new Help('22', "Cette porte est vraiment fermée.\nCela ne sert à rien d'insister..."))
            .addHelp(new Help('23', "Il faut 4 chiffres,\n peut-être une année ?"))
            .addHelp(new Help('24', "Cette porte est vraiment fermée.\nCela ne sert à rien d'insister..."))
            .addHelp(new Help('25', "Un code à 6 chiffres ?!\nIl faut surement trouver les 2 parties qui le composent."))
            .addHelp(new Help('27', "Donc le code de chaque pièce est lié à la personne qui l'occupe ?"))
            .addHelp(new Help('31', "Serait-ce une partie d'un code ?"))
            .addHelp(new Help('32', "Ecouter un CD aiderait sûrement..."))
            .addHelp(new Help('33', "Serait-ce une partie d'un code ?"))
            .addHelp(new Help('34', "Pauvre Cendrillon, toute seule dans la tour de son château..."))
            .addHelp(new Help('41', "Cette porte est vraiment fermée.\nCela ne sert à rien d'insister..."))
            .addHelp(new Help('42', "Cette porte est vraiment fermée.\nCela ne sert à rien d'insister..."))
            .addHelp(new Help('49', "Un code à 6 chiffres en 3 parties ?\nUne date importante peut-être ?"))
            .addHelp(new Help('51', "Il faut utiliser quelque chose pour pouvoir le lire"))
            .addHelp(new Help('53', "Mais pour ouvrir quoi ?"))
            .addHelp(new Help('55', "Il faudrait trouver un indice pour cette machine."))
            .addHelp(new Help('57', "Il y a un souvenir d'une réunion de famille dans cette pièce ?"))
            .addHelp(new Help('59', "C'était un très bel anniversaire\nMais quelle était la date du mariage ?"))

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
