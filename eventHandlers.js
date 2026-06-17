function setFlag(flagName){

    gameState.flags[flagName] = true;

}

function hasFlag(flagName){

    return gameState.flags[flagName] === true;

}

const eventHandlers = {

    mirror: mirrorEvent

};

function houseExitEvent(){

    showMessage("卑弥呼「外は危険じゃ！出てはならぬ！」");

    player.y--;

    render();

}
function mirrorEvent(){

    if(!hasFlag("iyoAppeared")){

        setFlag("iyoAppeared");

        startMessage(events.mirrorFirst);

        return;

    }

    startMessage(events.mirrorAfter);

}
