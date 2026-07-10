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
