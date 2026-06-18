function setFlag(flagName){
    gameState.flags[flagName] = true;
}

function hasFlag(flagName){
    return gameState.flags[flagName] === true;
}


const eventHandlers = {
    houseExit: houseExitEvent,
    mirror: mirrorEvent
};

function houseExitEvent(){
    showMessage("卑弥呼「外は危険じゃ！出てはならぬ！」");
    player.y--;
    render();
}

function mirrorEvent(){

    if(hasFlag("iyoAppeared")){
        return;
    }

    setFlag("iyoAppeared");

    startMessage(
        events.mirrorIntro,
        () => {
        setTimeout(()=>{
        setObjectDirection("himiko", "up");
        }, 300);    
            
        spawnObject("iyo");
        setTimeout(()=>{
        setObjectDirection("himiko", "down");
        }, 600);    
for(let i = 1; i <= 7; i++){

    setTimeout(()=>{
        moveObject("iyo", 0, -1);
    }, i * 200);

}
setTimeout(()=>{
    setObjectDirection("iyo", "down");
    }, 1600);   
        setTimeout(()=>{
        setObjectDirection("himiko", "left");
        }, 1800);    
        }
    );
}
