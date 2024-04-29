# Escape Game

## Créer un scénario

Pour créer un nouveau scénario `Exemple`, vous devez :

* créer le répertoire `./website/scenario/example/`
* mettre les images dans le répertoire `./website/scenario/example/image/` si vous ne voulez pas utiliser les images par défaut.
* mettre les sons dans le répertoire `./website/scenario/example/sound/` si vous ne voulez pas utiliser les images par défaut.
* créer le fichier de définition `./website/scenario/example/definition.js` avec la trame suivante : 

```js
class ScenarioExample extends Scenario {
    constructor() {
        super('example', 'Exemple');
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
        
    }
}
```

* modifier le fichier `./website/js/appVersion.json` pour modifier la version et rajouter à la fin le chargement du nouveau fichier js.
* modifier le fichier `./website/js/appBootstrap.js` pour rajouter le scénario à la liste des scénarios disponibles dans la fonction `loadLauncher`

* compléter votre fichier de définition avec votre scénario en vous aidant des scénarios déjà existants. Attention, à chaque modification, vous devez incrémenter le numéro de version.

***ATTENTION*** : n'utilisez que des images et des sons libres de droit.
