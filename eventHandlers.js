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

    if(!hasFlag("iyoAppeared")){

        setFlag("iyoAppeared");

        startMessage(events.mirrorFirst);

        return;

    }

    startMessage(events.mirrorAfter);

}
