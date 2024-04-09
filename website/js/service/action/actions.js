class Actions  {
    /** @type {GameDisplay} */ display;
    /** @type {Scenario}    */ scenario;
    /** @type {GameState}   */ state;
    /** @type {ActionBegin}      */ begin;
    /** @type {ActionClose}      */ close;
    /** @type {ActionCode}       */ code;
    /** @type {ActionEnd}        */ end;
    /** @type {ActionHelp}       */ help;
    /** @type {ActionMachine}    */ machine;
    /** @type {ActionPause}      */ pause;
    /** @type {ActionParameters} */ parameters;
    /** @type {ActionPenalty}    */ penalty;
    /** @type {ActionPlay}       */ play;

    /**
     * @param {GameDisplay} display
     * @param {Scenario}    scenario
     * @param {GameState}   state
     */
    constructor(display, scenario, state) {
        this.display  = display;
        this.scenario = scenario;
        this.state    = state;

        this.begin      = new ActionBegin(this);
        this.close      = new ActionClose(this);
        this.code       = new ActionCode(this);
        this.end        = new ActionEnd(this);
        this.help       = new ActionHelp(this);
        this.machine    = new ActionMachine(this);
        this.pause      = new ActionPause(this);
        this.parameters = new ActionParameters(this);
        this.penalty    = new ActionPenalty(this);
        this.play       = new ActionPlay(this);
    }
}
