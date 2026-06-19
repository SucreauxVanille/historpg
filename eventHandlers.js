function setFlag(flagName){
    gameState.flags[flagName] = true;
}

function hasFlag(flagName){
    return gameState.flags[flagName] === true;
}


const eventHandlers = {
    startOpening: startOpening,
    houseExit: houseExitEvent,
    bed: bedEvent,
    mirror: mirrorEvent,
    brother: brotherEvent,
    returnMirror,
    nojiriTutorial,
    naumannBoss
};

