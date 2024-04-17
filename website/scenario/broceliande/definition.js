class ScenarioBroceliande extends Scenario {
    constructor() {
        super('broceliande', 'Les légendes de la forêt de Brocéliande');
    }

    load() {
        this
            .addResourceImage('bkg_main',        'bkg_main.jpg')
            .addResourceImage('bkg_night',       'bkg_night.jpg')
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
            .addResourceImage('btn_grey',      'btn_grey.png')
            .addResourceImage('btn_blue',      'btn_blue.png')
            .addResourceImage('btn_green',     'btn_green.png')
            .addResourceImage('btn_red',       'btn_red.png')
            .addResourceImage('btn_orange',    'btn_orange.png')

            .addResourceImage('machine_background', 'machine_background.jpg')
            .addResourceImage('machine_btn_1',      'machine_btn_1.png')
            .addResourceImage('machine_btn_2',      'machine_btn_2.png')
            .addResourceImage('machine_btn_3',      'machine_btn_3.png')
            .addResourceImage('machine_btn_4',      'machine_btn_4.png')
            .addResourceImage('machine_btn_5',      'machine_btn_5.png')
            .addResourceImage('machine_btn_6',      'machine_btn_6.png')
            .addResourceImage('machine_btn_7',      'machine_btn_7.png')
            .addResourceImage('machine_btn_8',      'machine_btn_8.png')

            .addResourceSound('music_main',    'music_main.mp3',    0.50)
            .addResourceSound('music_night',   'music_night.mp3',   1.00)
            .addResourceSound('sound_alert',   'sound_alert.mp3',   0.15)
            .addResourceSound('sound_bad',     'sound_bad.mp3',     0.10)
            .addResourceSound('sound_click',   'sound_click.mp3',   1.00)
            .addResourceSound('sound_good',    'sound_good.mp3',    0.80)
            .addResourceSound('sound_timeout', 'sound_timeout.mp3', 0.50)
            .addResourceSound('sound_wolf',    'sound_wolf.mp3',    0.50)

            .setBackgroundModalParameters('bkg_params')
            .setBackgroundModalText('bkg_modal_small')
            .setSounds('sound_click', 'sound_good', 'sound_bad', 'sound_alert', 'sound_timeout')
            .addTheme(
                (new Theme('main'))
                    .setBackground('bkg_main')
                    .setMusic('music_main')
            )
            .addTheme(
                (new Theme('night'))
                    .setBackground('bkg_night')
                    .setMusic('music_night')
                    .setSound('sound_wolf')
                    .setText(
                        "Il fait à présent nuit.\n" +
                        "\n" +
                        "Dehors tout est noir... \n"
                    )
            )

            .setButtonClose(     new Button(new Size(100, 100), new Position(635, 15),   'btn_close'))
            .setButtonParameters(new Button(new Size(100, 100), new Position(15, 15),    'btn_parameters'))
            .setButtonPause(     new Button(new Size(180, 180), new Position(285, 500),  'btn_pause'))
            .setButtonPlay(      new Button(new Size(180, 180), new Position(285, 500),  'btn_play'))
            .setButtonPenalty(   new Button(new Size(180, 180), new Position(285, 760),  'btn_penalty'))
            .setButtonHelp(      new Button(new Size(180, 180), new Position(35, 760),   'btn_help'))
            .setButtonCode(      new Button(new Size(180, 180), new Position(535, 760),  'btn_code'))
            .setButtonMachine(   new Button(new Size(180, 180), new Position(285, 1020), 'btn_machine'))

            .setTimer((new Timer(30*60, true)).setDisplay('bkg_timer', new Size(560, 329), new Position(85, 120), 160))

            .setKeyboard(new Keyboard('kb_background', 'btn_blue', 'btn_green', 'btn_red', 'btn_close'))

            .setStepOpening((new StepOpening()).setTimeStartDirectly(true))
            .setInitCallback($.proxy(this.initEvents, this))

            .addHelp(new Help('6', "Sans ses piles,\nla lampe ne peut fonctionner\npour le moment."))
            .addHelp(
                new Help('52', "Avez-vous bien regardé\nde plus près le coffre ?")
                    .addHelp("Sur le coffre est caché\nle numéro 19.\n\nPrenez la carte #CARD_ADD[19]")
            )
            .addHelp(
                new Help('19', "Retournez la carte.\n\nPeut-être y verrez-vous\nplus claire...")
                    .addHelp("Dans cette suite de symboles,\ncachez certaines parties\njusqu'à y voir un nombre\nà quatre chiffres.")
                    .addHelp("Tapez le code 1352.")
            )
            .addHelp(
                new Help('14', "C #ICON[fa-solid fa-right-long] A\n\nE #ICON[fa-solid fa-right-long] C\n\nG #ICON[fa-solid fa-right-long] E")
                    .addHelp("Conseil : pour vous aider,\nécrivez l'alphabet.\n\nRemontez ensuite deux\nlettres en arrière.")
                    .addHelp("En suivant la méthode,\nle texte dit :\n\n\"Ce ne sont pas les chapeaux\nqui intéressent les Korrigans\nmais les objets de valeurs.\nAjoutez dix à votre objet de valeur.\"")
            )
            .addHelp(
                new Help('16', "Si vous n'avez pas de clé,\npeut-être l'avez-vous\nloupée quelque part.")
                    .addHelp("Faites demi-tour :\nquelque chose paraît briller\nau fond de l'eau de la fontaine.")
                    .addHelp("Dans l'eau de la fontaine\nse cache le numéro 2\nqui correspond à la clé.\n\nFaites alors #CARD_ADD[16] + #CARD_ADD[2]\n\nPrenez la carte #CARD_ADD[18]")
            )
            .addHelp(
                new Help('39', "Cette page déchirée servira\nsûrement plus tard.")
            )

            .addHelp(
                new Help('4', "Il faudrait avoir de la lumière pour\nregarder autour du digicode.")
            )

            .addHelp(
                new Help('33', "\"Allumettes\" correspond\nsûrement à une date.\n\nLes symboles semblent\navoir été coupés.")
                    .addHelp("Utilisez le miroir.")
                    .addHelp("En plaçant le miroir sous le symbole,\non peut apercevoir le numéro 810\n\n\"Allumettes\" = date de sortie des allumettes.\n\nDonc 1879 - 810 = 1069\n\nTapez le code 1069.")
            )
            .addHelp(
                new Help('49', "Objet caché:\nquelque chose semble briller dans l'herbe près du rocher.")
            )
            .addHelp(
                new Help('24', "Si deux diamants\nvalent 24,combien vaut\nun seul diamant ?")
                    .addHelp("Donc un diamant vaut\n\n#PUZZLE_RED[12]\n")
            )
            .addHelp(
                new Help('45', "1. Avez-vous un objet\nprécieux à échanger ?\nSi non, cherchez bien dans\nl'herbe de la carte 49.\n\n2. Comme le dit la carte 7,\nil faudrait INVERSER le SORT.")
                    .addHelp("Inversez le MOT sort.")
                    .addHelp("Prenez la carte #CARD_ADD[34]")
            )
            .addHelp(
                new Help('34', "Pour inverser le sort, il faut\nverser la potion \"tros\" dessus.")
            )

            .addHelp(
                new Help('7', "Le texte en latin\nn'est pas forcément utile.\nRegardez plutôt\nle texte en dessous.\n\n(Pour plus d'indice,\ncherchez carte 45.)")
            )
            .addHelp(
                new Help('41', "Il faudrait montrer\ntout ça à Viviane.")
            )

            .addHelp(
                new Help('1', "Viviane à l'air\nd'avoir besoin d'aide.\nTrouvez un moyen de\nrésoudre son problème.")
            )
            .addHelp(
                new Help('37', "N'y aurait-il pas une\nautre carte avec\ndes symboles semblables ?")
                    .addHelp("Pour résoudre cette énigme,\nvous allez avoir besoin\nde la carte 39.")
                    .addHelp("Sur la carte 39, les lignes\nsont numérotées et les\ncases de la carte 37 aussi.\n\nLes formes de la carte 37\nsemblent être un assemblage\nde plusieurs formes simples.")
                    .addHelp("1. 2e ligne / 2e symbole\n2. 1ère ligne / 1er symbole\n3. 2e ligne / 3e symbole\n4. 3e ligne / 1er symbole")
            )
            .addHelp(
                new Help('47', "Pour libérer Merlin, il\nfaudrait prononcer la formule.")
                    .addHelp("Faites 47 + 6 = 53.\n\nPrenez la carte #CARD_ADD[53]")
            )

            .addHelp(
                new Help('53', "Vérifiez que vous avez bien\nreconstitué la carte de la forêt.\nIl faut savoir ce qui se\ncache DERRIERE chaque lieu.")
                    .addHelp("Il faut savoir ce qui\nse cache derrière chaque\nCARTE des lieux.")
                    .addHelp("Retournez sans changer\nl'ordre du circuit\nles cartes du plan.")
                    .addHelp("Au dos des cartes\nse forme le code 5183.")
            )

            .addHelp(
                new Help('20', "Il faudrait le réveiller.")
                    .addHelp("N'y aurait-il pas une\npotion dédiée à ce problème?")
                    .addHelp("Achetez la potion \"Révèytoi\".\nFaites 12 + 31 = 43.\n\nPrenez la carte #CARD_ADD[43]")
            )

            .addHelp(
                new Help('43', "Avez-vous réellement besoin\nd'aide pour savoir sur QUI\nappliquer cette potion ? ")
            )


            .addStepCode(
                (new StepCode('1352'))
                    .setText("Bravo !\nLe coffre s'ouvre.\n\nDéfaussez les cartes\n#CARD_ADD[52] et #CARD_ADD[19]\n\nPrenez les cartes\n#CARD_ADD[5] et #CARD_ADD[25]")
            )
            .addStepCode(
                (new StepCode('1069'))
                    .setText("La porte s'ouvre et vous\ny découvrez une nouvelle pièce.\n\nDéfaussez les cartes\n#CARD_ADD[17] et #CARD_ADD[33]\n\nPrenez la carte\n#CARD_ADD[30]")
            )
            .addStepCode(
                (new StepCode('5183'))
                    .setText("C'est bon !\nLe cercueil s'ouvre !\n\nDéfaussez les cartes\n#CARD_ADD[25], #CARD_ADD[23], #CARD_ADD[28], #CARD_ADD[51] et #CARD_ADD[53]\n\nPrenez la carte\n#CARD_ADD[20]")
            )
            .addStepCode(
                (new StepCode('8436'))
                    .setEnd('good')
            )

            .addStepMachine(
                (new StepMachine('37'))
                    .setCallbackStartMachine(
                        function (code, actions) {
                            (new MachineCode(code, actions))
                                .setBackgroundImage('machine_background')
                                .setButtonCloseImage('btn_close')
                                .setButtonConfirmImage('btn_green')
                                .setButtonCancelImage('btn_red')
                                .addButtonCode('1', 'machine_btn_1', new Size(180, 180), new Position( 40, 580))
                                .addButtonCode('2', 'machine_btn_2', new Size(180, 180), new Position(280, 560))
                                .addButtonCode('3', 'machine_btn_3', new Size(180, 180), new Position(530, 550))
                                .addButtonCode('4', 'machine_btn_4', new Size(180, 180), new Position( 30, 830))
                                .addButtonCode('5', 'machine_btn_5', new Size(180, 180), new Position(240, 800))
                                .addButtonCode('6', 'machine_btn_6', new Size(180, 180), new Position(470, 780))
                                .addButtonCode('7', 'machine_btn_7', new Size(180, 180), new Position(195,1020))
                                .addButtonCode('8', 'machine_btn_8', new Size(180, 180), new Position(445,1025))
                                .addSlotCode(new Size(170, 170), new Position( 24, 339))
                                .addSlotCode(new Size(170, 170), new Position(204, 336))
                                .addSlotCode(new Size(170, 170), new Position(380, 333))
                                .addSlotCode(new Size(170, 170), new Position(560, 330))
                                .addStepCode(
                                    (new StepCode('5167'))
                                        .setText("Bravo !\n\nAprès avoir fait\nla bonne combinaison,\nViviane, la fée du lac\ndu château de Comper, apparaît.\n\nDéfaussez les cartes\n#CARD_ADD[39] et #CARD_ADD[37]\n\nPrenez la carte #CARD_ADD[1]")
                                )
                                .start();
                        }
                    )
                )
            .addStepEnding(
                (new StepEnding('good'))
                    .setIsGood(true)
                    .setText("Sans même vous en rendre compte, vous atterrissez chez vous. Bravo, vous avez réussi à rentrer !")
            )
    }

    initEvents(actions) {
        window.addEventListener(
            'escape-game.code.good',
            (e) => {
                if (e.detail.stepCode === '1069') {
                    actions.state.addEvent(
                        30,
                        $.proxy(function() { this.eventNight(actions); }, this)
                    );
                }
            },
            false
        );
    }

    eventNight(actions) {
        actions.display.applyTheme(actions.scenario.themes['night']);
    }
}
