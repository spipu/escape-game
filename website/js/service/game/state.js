class GameState {
    /** @Type {Scenario}  */ scenario;
    /** @type {boolean}   */ isPause;
    /** @type {boolean}   */ isBegin;
    /** @type {boolean}   */ isEnd;
    /** @type {boolean}   */ isEndSuccess;
    /** @type {boolean}   */ isEndFail;
    /** @type {boolean}   */ isFirstPenalty;
    /** @type {boolean}   */ isPenalty;
    /** @type {boolean}   */ isTimeOver;
    /** @type {int}       */ currentTime;
    /** @type {int|null}  */ timerInterval;
    /** @type {function}  */ callbackTimeChange;
    /** @type {int}       */ nbHelp;
    /** @type {int}       */ nbCodeUnknown;
    /** @type {int}       */ nbCodeBad;
    /** @type {int}       */ nbCodeGood;
    /** @type {int}       */ nbMachineUnknown;
    /** @type {int}       */ nbMachineStart;
    /** @type {int}       */ nbMachineBad;
    /** @type {int}       */ nbMachineGood;
    /** @type {int}       */ nbPenalty;
    /** @type {int}       */ penaltyTime;
    /** @type {boolean[]} */ listHelp;
    /** @type {boolean[]} */ listCode;
    /** @type {boolean[]} */ listMachine;

     /**
     * @param {Scenario} scenario
     */
    constructor(scenario) {
        this.scenario       = scenario;
        this.parameters     = new GameParameters();
        this.isPause        = true;
        this.isBegin        = false;
        this.isEnd          = false;
        this.isEndSuccess   = false;
        this.isEndFail      = false;
        this.isFirstPenalty = true;
        this.isPenalty      = false;
        this.isTimeOver     = false;
        this.currentTime    = scenario.timer.duration;

        this.nbHelp             = 0;
        this.nbCodeUnknown      = 0;
        this.nbCodeBad          = 0;
        this.nbCodeGood         = 0;
        this.nbMachineUnknown   = 0;
        this.nbMachineStart     = 0;
        this.nbMachineBad       = 0;
        this.nbMachineGood      = 0;
        this.nbPenalty          = 0;
        this.penaltyTime        = 0;

        this.listHelp    = [];
        this.listCode    = [];
        this.listMachine = [];
        this.listEvents  = [];
    }

    /**
     * @param {string} code
     */
    addHelp(code) {
        this.listHelp[code] = true;
    }

    /**
     * @param {string} code
     */
    addCode(code) {
        this.listCode[code] = true;
    }

    /**
     * @param {string} code
     */
    addMachine(code) {
        this.listMachine[code] = true;
    }

    /**
     * @param {int} deltaTime
     * @param {function} callback
     */
    addEvent(deltaTime, callback) {
        this.listEvents[this.currentTime - deltaTime] = callback;
    }

    /**
     * @param {function} callbackTimeChange
     */
    init(callbackTimeChange) {
        this.callbackTimeChange = callbackTimeChange;
        this.timerInterval  = setInterval($.proxy(this.incrementTimer, this), 1000);
    }

    stop() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.isEnd = true;
        this.scenario.timer.refresh(this);
    }

    incrementTimer() {
        if (this.isPause) {
            return;
        }

        this.currentTime --;
        this.callbackTimeChange();

        if (this.listEvents[this.currentTime]) {
            this.listEvents[this.currentTime]();
        }
    }

    /**
     * @param {int} penalty
     */
    applyTimerPenalty(penalty = 60) {
        this.nbPenalty++;
        this.penaltyTime += penalty;
        this.applyTimerPenaltyStep(penalty);
    }

    /**
     * @param {int} penalty
     */
    applyTimerPenaltyStep(penalty) {
        if (penalty === 0) {
            this.isPenalty = false;
            return;
        }

        if (!this.scenario.timer.canContinue && this.currentTime === 0) {
            this.isPenalty = false;
            return;
        }

        this.isPenalty = true;

        setTimeout(
            $.proxy(
                function () {
                    this.incrementTimer();
                    this.applyTimerPenaltyStep(penalty - 1); },
                this
            ),
            20
        );
    }
}
