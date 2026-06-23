//起きるのじゃ
function startOpening(){
    fadeOut();

    startMessage(
        events.wakeUp,
        () => {

            fadeIn();

            startMessage(events.prologueStart, endEvent);

        }
    );
}
function houseExitEvent(){
    startMessage(
    ["卑弥呼「外は危険じゃ！出てはならぬ！」"],
    endEvent
);
    player.y--;
    render();
}

function prologueHimiko(){
        startMessage(events.prologue_himiko, endEvent);
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

    startMessage(["男「そうかそうか、そうだよな…」"], endEvent);

}
function stampEvent(){

    startMessage(events.prologue_stamp, endEvent);

}
function bedEvent(){

    startMessage(
        ["卑弥呼「疲れたじゃろう。寝床で少し休むがよい」"],
        () => {

            fadeOut();

            setTimeout(()=>{

                recoverAll(playerStatus);
                recoverAll(himikoStatus);

                fadeIn();

                startMessage(
                    ["卑弥呼「うむ！すっかり元気になったようじゃの」"],
                    endEvent
                );

            },1500);

        }
    );

}

//銅鏡
function mirrorEvent(){

    if(hasFlag("iyoAppeared")){

        mirrorWarpMenu();
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

for(let i = 1; i <= 3; i++){
    setTimeout(()=>{
        moveObject("himiko", 0, -1);
    }, i * 200);
}
    setTimeout(()=>{
    setObjectDirection("iyo", "right");
    setObjectDirection("himiko", "left");
}, 3 * 200 + 100);
        
        startMessage(
            events.iyoArrival3,
            heroReveal
        );

    },300);

}
function heroReveal(){
    let isHimikoFollowing = true;
    setTimeout(()=>{
    setObjectDirection("iyo", "left");

    startMessage(events.iyoArrival4, endEvent);
        },
    300);
}
function mirrorWarpMenu(){

    startMessage(
        ["壱与「野尻湖へ出発しますか？」"],
        () => {

            showChoice([
                {
                    text:"はい",
                    action: goToNojiri
                },
                {
                    text:"いいえ",
                    action: cancelWarp
                }
            ]);

        }
    );

}
function goToNojiri(){

    fadeOut();

    setTimeout(() => {

        currentMap = maps.nojiriLake;

        player.x = 2;
        player.y = 25;

        himiko.x = player.x - 1;
        himiko.y = player.y;
        himiko.direction = "right";
        isHimikoFollowing = true;
        playerTrail = [];
        render();

        fadeIn();

        startMessage(
            [
                "壱与「邪馬台国に戻るときは、青いうずまきに触れてください」"
            ],
            endEvent
        );

    }, 500);
}
function cancelWarp(){
    hideMessage();
    endEvent();
}
function iyoEvent(){

    startMessage(["壱与「冒険が長引いたら、私が記録しますね」"], endEvent);

}
