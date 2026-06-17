function setFlag(flagName){

    gameState.flags[flagName] = true;

}

function hasFlag(flagName){

    return gameState.flags[flagName] === true;

}

const eventHandlers = {

    mirror: mirrorEvent

};

function mirrorEvent(){

    startMessage(events.mirror);

}
