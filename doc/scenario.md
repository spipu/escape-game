# Escape Game

## Créer un scénario

### Structure des fichiers

Pour créer un nouveau scénario `Exemple`, vous devez :

* créer le répertoire `./website/scenario/example/`
* mettre les images dans `./website/scenario/example/image/` (ou utiliser les assets par défaut avec `useDefault = true`)
* mettre les sons dans `./website/scenario/example/sound/` (idem)
* créer le fichier de définition `./website/scenario/example/definition.js`
* ajouter le fichier JS dans `./website/js/appVersion.json` (section `js`, en fin de liste) et incrémenter la version
* ajouter `.addScenario(new ScenarioExample())` dans `AppBootstrap.loadLauncher()`

***ATTENTION*** : n'utilisez que des images et des sons libres de droit.  
***ATTENTION*** : à chaque modification du code ou des assets, **incrémentez la version** dans `appVersion.json`.

---

### Structure de la classe

```js
class ScenarioExample extends Scenario {
    constructor() {
        super('example', 'Exemple');
    }

    addResources() {
        // Déclarer ici toutes les images et sons
    }

    load() {
        // Configurer ici le scénario complet
    }
}
```

---

### addResources() — Déclarer les ressources

#### Images

```js
this.addResourceImage('code_interne', 'nom_fichier.jpg', useDefault);
```

* `code_interne` : identifiant utilisé dans le reste du code
* `nom_fichier.jpg` : nom du fichier dans `./website/scenario/example/image/`
* `useDefault` : si `true`, cherche dans `./website/scenario/_default/image/` à la place

**Images obligatoires** (pour les modales et paramètres) :

```js
.addResourceImage('bkg_modal_small', 'modal_message_small.png', true)  // petite modale
.addResourceImage('bkg_modal_big',   'modal_message_big.png',   true)  // grande modale
.addResourceImage('bkg_params',      'modal_parameters.png',    true)  // fenêtre paramètres
```

**Images des boutons** (toutes optionnelles selon les boutons utilisés) :

```js
.addResourceImage('btn_close',      'action_close.png',      true)
.addResourceImage('btn_parameters', 'action_parameters.png', true)
.addResourceImage('btn_pause',      'action_pause.png',      true)
.addResourceImage('btn_play',       'action_play.png',       true)
.addResourceImage('btn_penalty',    'action_penalty.png',    true)
.addResourceImage('btn_help',       'action_help.png',       true)
.addResourceImage('btn_code',       'action_code.png',       true)
.addResourceImage('btn_machine',    'action_machine.png',    true)
```

**Images du clavier numérique** (si vous utilisez `setKeyboard`) :

```js
.addResourceImage('kb_background', 'keyboard_background.png', true)
.addResourceImage('btn_blue',      'btn_blue.png',            true)
.addResourceImage('btn_green',     'btn_green.png',           true)
.addResourceImage('btn_red',       'btn_red.png',             true)
.addResourceImage('btn_grey',      'btn_grey.png',            true)
.addResourceImage('btn_orange',    'btn_orange.png',          true)
```

**Images des machines** (si vous utilisez `MachineDigicode` ou `MachineConnector`) :

```js
.addResourceImage('machine_digicode',  'bkg_machine_digicode.jpg',  true)
.addResourceImage('machine_connector', 'bkg_machine_connector.jpg', true)
```

#### Sons

```js
this.addResourceSound('code_interne', 'nom_fichier.mp3', volume, useDefault);
```

* `volume` : entre `0.0` et `1.0`
* `useDefault` : si `true`, cherche dans `./website/scenario/_default/sound/`

**Sons standards** :

```js
.addResourceSound('sound_click',   'sound_click.mp3',   1.00, true)
.addResourceSound('sound_good',    'sound_good.mp3',    0.80, true)
.addResourceSound('sound_bad',     'sound_bad.mp3',     0.10, true)
.addResourceSound('sound_alert',   'sound_alert.mp3',   0.15, true)
.addResourceSound('sound_timeout', 'sound_timeout.mp3', 0.50, true)
```

---

### load() — Configurer le scénario

#### Fond et sons globaux

```js
.setBackgroundModalText('bkg_modal_big')       // image de fond des modales de texte
.setBackgroundModalParameters('bkg_params')    // image de fond de la fenêtre paramètres
.setSounds('sound_click', 'sound_good', 'sound_bad', 'sound_alert', 'sound_timeout')
```

#### Chronomètre

```js
.setTimer(
    (new Timer(600, false))   // durée en secondes, canContinue (continuer après la fin)
        .setDisplay('bkg_timer', new Size(350, 130), new Position(160, 30), 90)
)
```

#### Clavier numérique

Utilisé pour les boutons Code, Indice et Machine :

```js
.setKeyboard(new Keyboard('kb_background', 'btn_blue', 'btn_green', 'btn_red', 'btn_close'))
// paramètres : fond, bouton chiffre, bouton OK, bouton C, bouton fermer
```

#### Boutons

Tous les boutons sont optionnels. Un bouton sans image est simplement invisible.

```js
.setButtonClose(     new Button(new Size(100, 100), new Position(635, 15),   'btn_close'))
.setButtonParameters(new Button(new Size(100, 100), new Position(15, 15),    'btn_parameters'))
.setButtonPause(     new Button(new Size(180, 180), new Position(285, 500),  'btn_pause'))
.setButtonPlay(      new Button(new Size(180, 180), new Position(285, 500),  'btn_play'))
.setButtonPenalty(   new Button(new Size(180, 180), new Position(285, 760),  'btn_penalty'))
.setButtonHelp(      new Button(new Size(180, 180), new Position(285, 1020), 'btn_help'))
.setButtonCode(      new Button(new Size(180, 180), new Position(35, 760),   'btn_code'))
.setButtonMachine(   new Button(new Size(180, 180), new Position(535, 760),  'btn_machine'))
```

`new Button(size, position, imageCode)` — l'espace de jeu fait 730 × 1300 px (ratio fixe).

#### Thèmes (optionnel)

Un thème change le fond et/ou la musique en cours de partie (ex. passage jour/nuit). Le thème `main` est appliqué au démarrage.

```js
.addTheme(
    (new Theme('main'))
        .setBackground('bkg_main')   // image de fond (code déclaré dans addResources)
        .setMusic('music_main')      // musique (optionnel)
)
.addTheme(
    (new Theme('night'))
        .setBackground('bkg_night')
        .setMusic('music_night')
        .setSound('sound_wolf')       // son joué une fois au changement de thème (optionnel)
        .setText("Il fait nuit...\n") // message affiché au changement de thème (optionnel)
)
```

Pour changer de thème depuis un `initCallback` : `actions.display.setTheme('night')`.

#### Séquence d'ouverture (optionnel)

```js
.setStepOpening(
    (new StepOpening())
        .setTimeStartDirectly(false)  // false = le timer démarre après le dernier texte
        .addText("Premier texte d'introduction.")
        .addText("Deuxième texte.")
        .addText("Bonne chance !")    // dernier texte → bouton "Commencer"
        .setMusic('music_intro')      // musique pendant l'intro (optionnel)
)
```

Si `setTimeStartDirectly(true)` (valeur par défaut), le timer démarre dès le lancement sans afficher de texte.

#### Indices

```js
.addHelp(new Help('11', "Texte de l'indice pour l'objet 11."))
.addHelp(new Help('46', "Texte de l'indice pour l'objet 46."))
```

Le code correspond au numéro que le joueur saisit sur le clavier d'indices. Un `Help` peut avoir plusieurs textes (affichés avec des boutons 1, 2, 3…) :

```js
.addHelp((new Help('11', "Premier indice.")).addHelp("Deuxième indice plus détaillé."))
```

#### Codes secrets

```js
.addStepCode(
    (new StepCode('1234'))            // code saisi par le joueur
        .setText("Mauvais code.\n#ICON[fa-solid fa-skull fa-3x]")  // message si ce code est entré (optionnel)
        .setPenalty(2)                // minutes de pénalité supplémentaires (optionnel, défaut = 1)
)
.addStepCode(
    (new StepCode('5678'))
        .setEnd('good')              // déclenche la fin de partie avec le StepEnding 'good'
)
```

Si `.setText()` n'est pas défini, un message par défaut "Code Faux" est affiché.  
Si `.setEnd()` est défini, la partie se termine avec le `StepEnding` correspondant.

#### Machines

```js
.addStepMachine(
    (new StepMachine('21'))           // code machine saisi par le joueur
        .setCallbackStartMachine(function(code, actions) {
            // instancier et démarrer la machine ici
        })
)
```

**MachineDigicode** — clavier numérique intégré à la machine :

```js
(new MachineDigicode(code, actions))
    .setButtonCloseImage('btn_close')
    .setMaxDigit(4)                    // nombre de chiffres attendus
    .setMinDigit(1)                    // nombre minimum avant validation (défaut = 1)
    .setScreen(500, 160, 100)          // largeur, hauteur, décalage Y de l'écran
    .setDigitsPosition(36, 44, 50, 1, 1) // taille, margeX, margeY, deltaX, deltaY
    .addStepCode((new StepCode('9372')).setEnd('good'))
    .addStepCode((new StepCode('1234')).setText("Mauvais ordre !"))
    .start();
```

**MachineConnector** — sélecteur de picots (boutons on/off + OK) :

```js
(new MachineConnector(code, actions))
    .setButtonCloseImage('btn_close')
    .setButtonCancelImage('btn_red')
    .setButtonConfirmImage('btn_green')
    .addButtonSwitch(new ButtonSwitch('1', new Position(74,  445), new Size(58, 58), 'btn_orange'))
    .addButtonSwitch(new ButtonSwitch('2', new Position(340, 448), new Size(58, 58), 'btn_orange'))
    // ... jusqu'à 6 picots
    .setHelpMessage("Instructions pour le joueur.")
    .addStepCode((new StepCode('25')).setText("Résultat intermédiaire."))
    .addStepCode((new StepCode('14')).setEnd('good'))
    .start();
```

La valeur soumise correspond aux codes des `ButtonSwitch` activés, concaténés dans l'ordre (ex. picots 1 et 4 cochés → `'14'`).

**MachineCode** — sélecteur de symboles/images :

```js
(new MachineCode(code, actions))
    .setButtonCloseImage('btn_close')
    .setButtonCancelImage('btn_red')
    .setButtonConfirmImage('btn_green')
    .setBackgroundImage('machine_custom')
    .addButtonCode('A', 'btn_a', new Size(80, 80), new Position(100, 200))
    .addButtonCode('B', 'btn_b', new Size(80, 80), new Position(200, 200))
    .addSlotCode(new Size(80, 80), new Position(300, 100))  // emplacement de résultat
    .setHelpMessage("Instructions pour le joueur.")
    .addStepCode((new StepCode('AB')).setEnd('good'))
    .start();
```

#### Fins de partie

```js
.addStepEnding(
    (new StepEnding('good'))
        .setText("Bravo !\nVous avez réussi !\n#ICON[fa-regular fa-thumbs-up fa-3x]")
        .setIsGood(true)              // true = victoire, false = échec
        .setMusic('music_end')        // musique de fin (optionnel)
)
```

Si aucun `StepEnding` n'est défini pour un code donné, un message par défaut "Bravo" est utilisé.

#### Callback d'initialisation (optionnel)

Appelé une fois la partie démarrée, permet d'écouter les événements pour déclencher des actions custom (changement de thème, etc.) :

```js
.setInitCallback(function(actions) {
    window.addEventListener('escape-game.code.good', function(e) {
        if (e.detail.stepCode === '1069') {
            actions.display.setTheme('night');
        }
    });
})
```

---

### Tags spéciaux dans les textes

Utilisables dans `.setText()`, `.addText()` et `.setText()` des `StepEnding` :

| Tag | Rendu |
|---|---|
| `#ICON[fa-solid fa-skull fa-3x]` | Icône Font Awesome (`<i class="...">`) |
| `#PUZZLE_RED[9]` | Résultat de puzzle en rouge (icône puzzle + valeur) |
| `#PUZZLE_BLUE[9]` | Résultat de puzzle en bleu |

Pour les icônes Font Awesome colorées : `#ICON[fa-solid fa-lock red]` ou `#ICON[fa-solid fa-lock green]`.

---

### Exemple minimal complet

```js
class ScenarioExample extends Scenario {
    constructor() {
        super('example', 'Exemple');
    }

    addResources() {
        this
            .addResourceImage('bkg_main',        'bkg_main.jpg',              false)
            .addResourceImage('bkg_timer',        'timer.png',                 true)
            .addResourceImage('bkg_modal_small',  'modal_message_small.png',   true)
            .addResourceImage('bkg_modal_big',    'modal_message_big.png',     true)
            .addResourceImage('bkg_params',       'modal_parameters.png',      true)
            .addResourceImage('btn_close',        'action_close.png',          true)
            .addResourceImage('btn_parameters',   'action_parameters.png',     true)
            .addResourceImage('btn_pause',        'action_pause.png',          true)
            .addResourceImage('btn_play',         'action_play.png',           true)
            .addResourceImage('btn_code',         'action_code.png',           true)
            .addResourceImage('kb_background',    'keyboard_background.png',   true)
            .addResourceImage('btn_blue',         'btn_blue.png',              true)
            .addResourceImage('btn_green',        'btn_green.png',             true)
            .addResourceImage('btn_red',          'btn_red.png',               true)
            .addResourceImage('btn_close',        'action_close.png',          true)
            .addResourceSound('sound_click',      'sound_click.mp3',   1.00,   true)
            .addResourceSound('sound_good',       'sound_good.mp3',    0.80,   true)
            .addResourceSound('sound_bad',        'sound_bad.mp3',     0.10,   true)
            .addResourceSound('sound_alert',      'sound_alert.mp3',   0.15,   true)
            .addResourceSound('sound_timeout',    'sound_timeout.mp3', 0.50,   true)
        ;
    }

    load() {
        this
            .setBackgroundModalText('bkg_modal_big')
            .setBackgroundModalParameters('bkg_params')
            .setSounds('sound_click', 'sound_good', 'sound_bad', 'sound_alert', 'sound_timeout')
            .setTimer(
                (new Timer(1800, false))
                    .setDisplay('bkg_timer', new Size(350, 130), new Position(160, 30), 90)
            )
            .setKeyboard(new Keyboard('kb_background', 'btn_blue', 'btn_green', 'btn_red', 'btn_close'))
            .addTheme(
                (new Theme('main'))
                    .setBackground('bkg_main')
            )
            .setButtonClose(     new Button(new Size(100, 100), new Position(635,  15), 'btn_close'))
            .setButtonParameters(new Button(new Size(100, 100), new Position( 15,  15), 'btn_parameters'))
            .setButtonPause(     new Button(new Size(180, 180), new Position(285, 500), 'btn_pause'))
            .setButtonPlay(      new Button(new Size(180, 180), new Position(285, 500), 'btn_play'))
            .setButtonCode(      new Button(new Size(180, 180), new Position( 35, 760), 'btn_code'))
            .setStepOpening(
                (new StepOpening())
                    .setTimeStartDirectly(false)
                    .addText("Bienvenue dans ce scénario.")
                    .addText("Vous avez 30 minutes. Bonne chance !")
            )
            .addHelp(new Help('42', "Un indice pour l'objet 42."))
            .addStepCode(
                (new StepCode('1234'))
                    .setText("Ce n'est pas le bon code.")
            )
            .addStepCode(
                (new StepCode('5678'))
                    .setEnd('good')
            )
            .addStepEnding(
                (new StepEnding('good'))
                    .setText("Bravo !\n#ICON[fa-regular fa-thumbs-up fa-3x]")
                    .setIsGood(true)
            )
        ;
    }
}
```
