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
    brother: brotherEvent
};

//起きるのじゃ
function startOpening(){
    fadeOut();

    startMessage(
        events.wakeUp,
        () => {

            fadeIn();

            startMessage(
                events.prologueStart
            );

        }
    );
}
function houseExitEvent(){
    showMessage("卑弥呼「外は危険じゃ！出てはならぬ！」");
    player.y--;
    render();
}

function brotherEvent(){
    if(hasFlag("iyoAppeared")){

        startMessage(
            events.prologue_brother_after
        );

        return;
    }
    startMessage(
        events.prologue_brother,
        () => {

            showChoice([
                {
                    text:"はい",
                    action: brotherAnswer
                },
                {
                    text:"いいえ",
                    action: brotherAnswer
                }
            ]);

        }
    );

}
function brotherAnswer(){

    startMessage([
        "男「そうかそうか、そうだよな…」"
    ]);

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
            setObjectDirection("himiko", "up");
    startMessage(
        events.iyoArrival2,
        startProphecy
    );
        }
    );
}
function startProphecy(){

    flashScreen();

    setTimeout(()=>{
        setObjectDirection("himiko", "up");

for(let i = 1; i <= 2; i++){
    setTimeout(()=>{
        moveObject("himiko", 0, -1);
    }, i * 200);
}
    setTimeout(()=>{
    setObjectDirection("iyo", "right");
    setObjectDirection("himiko", "left");
}, 2 * 200 + 100);
        
        startMessage(
            events.iyoArrival3,
            heroReveal
        );

    },300);

}
function heroReveal(){
    setTimeout(()=>{
    setObjectDirection("iyo", "left");

    startMessage(
        events.iyoArrival4
    );
        }
    300);
}
