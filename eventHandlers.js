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
        setTimeout(()=>{
        setObjectDirection("himiko", "up");
        }, 100);    
    startMessage(
        events.mirrorIntro,
        () => {
            
        spawnObject("iyo");
        setTimeout(()=>{
        setObjectDirection("himiko", "down");
        }, 200);    
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
        }, 1600);    
        setTimeout(()=>{
        setObjectDirection("brother", "up");
        }, 1600); 
    startIyoArrival();
 });            

}
function startIyoArrival(){
    setObjectDirection("iyo", "down");
    startMessage(
        events.iyoArrival1,
        () => {
            setObjectDirection("iyo", "left");
            startMessage(
                events.iyoArrival2,
                () => {
                    setObjectDirection("himiko", "up");
                    startMessage(
                        events.iyoArrival3
                    );}
            );}
    );
}
