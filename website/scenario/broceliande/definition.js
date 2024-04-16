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

            .addResourceSound('sound_alert',   'sound_alert.mp3',   0.15)
            .addResourceSound('sound_bad',     'sound_bad.mp3',     0.10)
            .addResourceSound('sound_click',   'sound_click.mp3',   1.00)
            .addResourceSound('sound_good',    'sound_good.mp3',    0.50)
            .addResourceSound('sound_timeout', 'sound_timeout.mp3', 0.50)

            .setBackgroundModalParameters('bkg_params')
            .setBackgroundModalText('bkg_modal_small')
            .setSounds('sound_click', 'sound_good', 'sound_bad', 'sound_alert', 'sound_timeout')
            .addTheme((new Theme('main')).setBackground('bkg_main'))
            .addTheme(
                (new Theme('night'))
                    .setBackground('bkg_night')
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
                new Help('20', "Avez-vous bien regardé\nde plus près le coffre ?")
                    .addHelp("Sur le coffre est caché\nle numéro 19.\n\nPrenez la carte #CARD_ADD[19]")
            )
            .addHelp(
                new Help('19', "Retournez la carte.\n\nPeut-être y verrez-vous\nplus claire...")
                    .addHelp("Dans cette suite de symboles,\ncachez certaines parties\njusqu'à y voir un nombre\nà quatre chiffres.")
                    .addHelp("Tapez le code 1352.")
            )
            .addHelp(
                new Help('14', "C #ICON[fa-solid fa-right-long] A\n\nE #ICON[fa-solid fa-right-long] C\n\nG #ICON[fa-solid fa-right-long] E")
                    .addHelp("Conseil : pour vous aidez,\nécrivez l'alphabet.\n\nRemonter ensuite deux\nlettres en arrière.")
                    .addHelp("En suivant la méthode,\nle texte dit :\n\nCe ne sont pas les chapeaux\nqui intéressent les Korrigans\nmais les objets de valeurs.")
            )
            .addHelp(
                new Help('16', "Si vous n'avez pas de clé,\npeut-être l'avez-vous\nloupé quelque part.")
                    .addHelp("Faites demi-tour :\nquelque chose parait briller\nau fond de l'eau de la fontaine.")
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
                new Help('49', "Objet caché:\nquelque chose semble briller dans l'herbe près du rocher")
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

    }

    initEvents(actions) {
        actions.state.addEvent(
            6*60,
            $.proxy(function() { this.eventNight(actions); }, this)
        );
    }

    eventNight(actions) {
        actions.display.applyTheme(actions.scenario.themes['night']);
    }
}
