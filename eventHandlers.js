function setFlag(flagName){
    gameState.flags[flagName] = true;
}

function hasFlag(flagName){
    return gameState.flags[flagName] === true;
}

const eventHandlers = {
    startOpening: startOpening,
    houseExit: houseExitEvent,
    himiko: prologueHimiko,
    bed: bedEvent,
    stamp: stampEvent,
    mirror: mirrorEvent,
    iyo: iyoEvent,
    brother: brotherEvent,

    //汎用オブジェクト
    returnMirror: returnMirrorEvent,
    recoverySpring: recoverySpringEvent,

    //マップ別
    nojiriTutorial: nojiriTutorialEvent,
    nojirimob1: nojirimob1Event,
    nojirimob2: nojirimob2Event,
    nojirimob3: nojirimob3Event,
    naumannBoss: naumannBossEvent,
    obsidian: obsidianEvent,
    meetMorse: meetMorseEvent,
    morseStop: morseStopEvent,
    dogu: doguEvent,
    doguHintA: doguHintAEvent,
    doguHintB: doguHintBEvent,
    doguHintC: doguHintCEvent,
    omoriShell: omoriShellEvent,
    omorimob1: omorimob1Event,
    omorimob2: omorimob2Event,
    omorimob3: omorimob3Event,
    omorimobF1: omorimobF1Event,
    omorimobF2: omorimobF2Event,
    omorimobF3: omorimobF3Event,
    omoriHouse: omoriHouseEvent,
    omoriHouse2: omoriHouse2Event,
    omoriHouse3: omoriHouse3Event,
    omoriReturn: omoriReturnEvent,
    potter: potterEvent,
    suemuraHouse: suemuraHouseEvent,
    moveSuemura2: moveSuemura2,
    moveSuemura1: moveSuemura1,
    gateMan: gateManEvent,
    suemuramob1: suemuramob1Event,
    suemuramob2: suemuramob2Event,
    yong:yongEvent,
    kiln: kilnEvent
};
