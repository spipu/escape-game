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

            .setBackgroundModalParameters('bkg_params')
            .setBackgroundModalText('bkg_modal_small')

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
