# Escape Game

## Événements JS

Tous les événements sont dispatchés sur `window`. Ils peuvent être écoutés depuis un `setInitCallback` ou depuis n'importe quel script externe.

```js
window.addEventListener('escape-game.start', function(e) {
    console.log(e.detail);
});
```

### Structure de `event.detail`

Chaque événement expose :

| Propriété | Type | Description |
|---|---|---|
| `eventCode` | `string` | Code de l'événement (ex. `'code.good'`) |
| `stepCode` | `string\|null` | Code de l'étape concernée (code saisi, code machine, code indice…) |
| `stepValue` | `string\|null` | Valeur supplémentaire (ex. valeur saisie dans la machine) |
| `actions` | `object` | Référence aux actions du jeu en cours |

---

### Liste des événements

#### Cycle de vie

| Événement | `stepCode` | `stepValue` | Déclenchement |
|---|---|---|---|
| `escape-game.start` | `null` | `null` | La partie démarre (après le dernier texte d'intro) |
| `escape-game.play` | `null` | `null` | Le timer reprend (bouton Play) |
| `escape-game.pause` | `null` | `null` | Le timer est mis en pause (bouton Pause) |
| `escape-game.end` | `null` | `null` | La partie se termine (code de fin atteint) |
| `escape-game.close` | `null` | `null` | Le joueur quitte la partie (bouton Fermer confirmé) |
| `escape-game.penalty` | `null` | `null` | Une pénalité manuelle est appliquée (bouton Pénalité) |

#### Codes secrets

| Événement | `stepCode` | `stepValue` | Déclenchement |
|---|---|---|---|
| `escape-game.code.unknown` | valeur saisie | `null` | Code saisi inconnu (absent du scénario) |
| `escape-game.code.bad` | code du `StepCode` | `null` | Code saisi reconnu mais mauvais (pénalité appliquée) |
| `escape-game.code.good` | code du `StepCode` | `null` | Code saisi correct (déclenche la fin si `.setEnd()` est défini) |

#### Indices

| Événement | `stepCode` | `stepValue` | Déclenchement |
|---|---|---|---|
| `escape-game.help.unknown` | valeur saisie | `null` | Numéro d'indice inconnu (absent du scénario) |
| `escape-game.help.good` | code du `Help` | `null` | Indice affiché avec succès |

#### Machines

| Événement | `stepCode` | `stepValue` | Déclenchement |
|---|---|---|---|
| `escape-game.machine.unknown` | valeur saisie | `null` | Numéro de machine inconnu (absent du scénario) |
| `escape-game.machine.start` | code du `StepMachine` | `null` | Machine lancée |
| `escape-game.machine.wrong` | code du `StepMachine` | valeur saisie | Valeur soumise à la machine, résultat inconnu |
| `escape-game.machine.bad` | code du `StepMachine` | code du `StepCode` | Valeur soumise reconnue mais mauvaise (pénalité) |
| `escape-game.machine.good` | code du `StepMachine` | code du `StepCode` | Valeur soumise correcte |

---

### Exemple — changer de thème sur un code

```js
.setInitCallback(function(actions) {
    window.addEventListener('escape-game.code.good', function(e) {
        if (e.detail.stepCode === '1069') {
            actions.display.setTheme('night');
        }
    });
})
```

### Exemple — intégration externe (statistiques, affichage tiers)

```js
window.addEventListener('escape-game.end', function(e) {
    // La partie est terminée, envoyer les stats
});

window.addEventListener('escape-game.code.bad', function(e) {
    console.log('Mauvais code :', e.detail.stepCode);
});
```
