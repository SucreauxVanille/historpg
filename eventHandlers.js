function setFlag(flagName){
    gameState.flags[flagName] = true;
}

function hasFlag(flagName){
    return gameState.flags[flagName] === true;
}


const eventHandlers = {
    houseExit: houseExitEvent,
    bed: bedEvent,
    mirror: mirrorEvent
};

function houseExitEvent(){
    showMessage("卑弥呼「外は危険じゃ！出てはならぬ！」");
    player.y--;
    render();
}

function bedEvent(){

    startMessage(
        events.prologue_bed,
        () => {

            fadeOut();

            setTimeout(()=>{

                fadeIn();

            },1500);

        }
    );

}

//銅鏡
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
        setObjectDirection("himiko", "left");
        setObjectDirection("brother", "up");
    startIyoArrival();

}, 7 * 200 + 100);

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
        startProphecy
    );
        }
    );
}
function startProphecy(){

    setObjectDirection("himiko", "up");

    moveObject("himiko", 0, -1);

    startMessage(
        events.iyoArrival3
    );

}
