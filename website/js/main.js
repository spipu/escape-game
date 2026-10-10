function loadApp()
{
    const wakeLock = new ScreenWakeLock();
    wakeLock.init();
    window.addEventListener('escape-game.start', () => wakeLock.init());
    window.addEventListener('escape-game.end',   () => wakeLock.release());
    window.addEventListener('escape-game.close', () => wakeLock.release());

    const launcher = new Launcher(appBootstrap.getVersion(), appBootstrap.offline);
    launcher
        .addScenario(new ScenarioTutorial())
        .addScenario(new ScenarioBroceliande())
        .addScenario(new ScenarioHome())
    ;
    for (const key in launcher.list) {
        launcher.list[key].addResources();
    }
    launcher.start();

    setInterval(refreshDebugStats, DEBUG_STATS_REFRESH_MS);
}

function refreshDebugStats()
{
    const debug = document.getElementById('appDebug');
    if (debug) {
        debug.innerText = appBootstrap.getStatsText();
    }
}

const DEBUG_STATS_REFRESH_MS = 1000;

appBootstrap.setReadyCallback(loadApp);
