//起きるのじゃイベント
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
//外出禁止
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

        startMessage(events.prologue_brother_after, endEvent);

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
    gameState.progress = PROGRESS.IYO_APPEARED;
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

    startMessage(
        [
            "壱与「ここまでの冒険を、復活の呪文として記録しますか？」"
        ],
        ()=>{

            showChoice([
                {
                    text:"はい",
                    action: createSaveSpell
                },
                {
                    text:"いいえ",
                    action: endEvent
                }
            ]);

        }
    );

}
function createSaveSpell(){

    startMessage(
        [
            "壱与「わかりました！」",
            "壱与「では、お告げを聞きますね…」"
        ],
        ()=>{

            flashScreen();

            setTimeout(()=>{

                const spell =
                    encodeSaveCode();

                startMessage(
                    [
                        "壱与「聞こえました！」",
                        `壱与「復活の呪文は『${spell}』です」`,
                        "壱与「忘れずに記録してくださいね」"
                    ],
                    endEvent
                );

            },500);

        }
    );

}
