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
    returnMirror: returnMirrorEvent,
    nojiriTutorial: nojiriTutorialEvent,
    nojirimob1: nojirimob1Event,
    nojirimob2: nojirimob2Event,
    nojirimob3: nojirimob3Event,
    naumannBoss: naumannBossEvent,
    obsidian: obsidianEvent,
    meetMorse: meetMorseEvent
};

