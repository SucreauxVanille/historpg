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
                    action: cancelSave
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
function cancelSave(){

    startMessage(
        [
            "壱与「わかりました！必要な時は声をかけてくださいね」"
        ],
        endEvent
    );

}

//卑弥呼クイズ
function startLoadQuiz(){

    
    setObjectDirection(
        "himiko",
        "left"
    );

    setTimeout(()=>{
        setObjectDirection(
            "himiko",
            "down"
        );
    },200);

    setTimeout(()=>{
        setObjectDirection(
            "himiko",
            "right"
        );
    },400);

    setTimeout(()=>{
        setObjectDirection(
            "himiko",
            "up"
        );
    },600);

    setTimeout(()=>{
        setObjectDirection(
            "himiko",
            "left"
        );

        showProgressQuiz();

    },800);
    startMessage(
        [
            "卑弥呼「おぬし、よもや寝ぼけてはおるまいな？」",
            "卑弥呼「少し試してみようかのう」",
            ""
        ],
        );
}
function showProgressQuiz(){

    const quiz = getLoadQuiz();
    startMessage(
        [quiz.question],
        () => {

            showChoice([
                {
                    text: quiz.correct,
                    action: loadQuizCorrect
                },
                {
                    text: quiz.wrong,
                    action: loadQuizWrong
                }
            ]);
        }
    );
}
function getLoadQuiz(){

    switch(gameState.progress){

        case PROGRESS.IYO_APPEARED:
            return {
                question:
                    "卑弥呼「邪馬台国の女王である、ワシの名前は何じゃ？」",
                correct:"卑弥呼",
                wrong:"花子"
            };

        case PROGRESS.NOJIRI_TUTORIAL:
            return {
                question:
                    "卑弥呼「ワシが治める国の名前は何じゃ？」",
                correct:"邪馬台国",
                wrong:"琉球王国"
            };

        case PROGRESS.NAUMANN_DEFEATED:
            return {
                question:
                    "卑弥呼「ワシらが黒曜石の回収に向かう湖の名前は覚えておるな？」",
                correct:"野尻湖",
                wrong:"琵琶湖"
            };

        case PROGRESS.OBSIDIAN_OBTAINED:
            return {
                question:
                    "卑弥呼「ワシらが野尻湖の奥で戦った大きな獣は何じゃったかの？」",
                correct:"ナウマンゾウ",
                wrong:"ティラノサウルス"
            };

        default:
            return {
                question:
                    "卑弥呼「少し難しめじゃぞ。野尻湖で見かけた男はどこから来たと言っておった？」",
                correct:"岩宿",
                wrong:"吉野ケ里"
            };
    }

}
function loadQuizCorrect(){

    startMessage(
        [
            "卑弥呼「うむ！寝ぼけてはおらぬようじゃな」"
        ],
        endEvent
    );

}
function loadQuizWrong(){

    startMessage(
        [
            "卑弥呼「たわけ！もう一度だけ問うぞ！」"
        ],
        startLoadQuiz
    );

}
