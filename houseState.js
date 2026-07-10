function updateHouse(){

    updateIyo();

}

//iyo
function updateIyo(){

    if(gameState.progress >= PROGRESS.IYO_APPEARED){

        spawnObject("iyo");

    }else{

        hideObject("iyo");

    }

}
const HOUSE_STATE = {

    OPENING: 0,

    NOJIRI_PLAYING: 1,

    OMORI_READY: 2,

    OMORI_PLAYING: 3

};

function getHouseState(){

    switch(gameState.progress){

        case PROGRESS.IYO_APPEARED:
        case PROGRESS.NOJIRI_TUTORIAL:
        case PROGRESS.NAUMANN_DEFEATED:
        case PROGRESS.OBSIDIAN_OBTAINED:
            return HOUSE_STATE.NOJIRI_PLAYING;

        case PROGRESS.DEMO_CLEAR:
            return HOUSE_STATE.OMORI_READY;

        default:
            return HOUSE_STATE.OPENING;

    }

}
