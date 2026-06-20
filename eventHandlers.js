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
    mirror: mirrorEvent,
    iyo: iyoEvent,
    brother: brotherEvent,
    returnMirror: returnMirrorEvent,
    nojiriTutorial: nojiriTutorialEvent,
    naumannBoss: naumannBossEvent
};

