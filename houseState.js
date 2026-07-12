function updateHouse(){

    const state = getHouseState();

    updateIyo(state);

}

//iyo
function updateIyo(state){
    if(state === HOUSE_STATE.OPENING){
        despawnObject("iyo");
    }else{
        spawnObject("iyo");
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
            
        case PROGRESS.OMORI_START:
        case PROGRESS.OMORI_SHELL:
            return HOUSE_STATE.OMORI_PLAYING;
            
        default:
            return HOUSE_STATE.OPENING;
    }
}
