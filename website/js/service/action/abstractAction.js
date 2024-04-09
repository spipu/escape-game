class AbstractAction {
    /** @type {Actions}     */ actions;
    /** @type {GameDisplay} */ display;
    /** @type {Scenario}    */ scenario;
    /** @type {GameState}   */ state;
    /** @type {Keyboard}    */ keyboard;
    /** @type {Timer}       */ timer;

    /**
     * @param {Actions}     actions
     */
    constructor(actions) {
        this.actions  = actions;
        this.display  = actions.display;
        this.scenario = actions.scenario;
        this.state    = actions.state;
        this.keyboard = actions.scenario.keyboard;
        this.timer    = actions.scenario.timer;
    }

    /**
     * @param {string}      eventCode
     * @param {string|null} stepCode
     * @param {string|null} stepValue
     */
    dispatchEvent(eventCode, stepCode = null, stepValue = null) {
        let event = new CustomEvent(
            'escape-game.' + eventCode,
            {
                detail: {
                    'eventCode': eventCode,
                    'stepCode':  stepCode,
                    'stepValue': stepValue,
                    'actions': this.actions
                }
            }
        );

        // console.log(event.type, event.detail);
        window.dispatchEvent(event);
    }
}
