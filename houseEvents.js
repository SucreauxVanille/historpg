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

    switch(getHouseState()){

        case HOUSE_STATE.OPENING:
            return brotherOpening();

        case HOUSE_STATE.NOJIRI_PLAYING:
            return brotherNojiri();

        case HOUSE_STATE.OMORI_READY:
            return brotherOmoriIntro();

        case HOUSE_STATE.OMORI_PLAYING:
            return brotherOmori();

    }

}

function stampEvent(){

    startMessage(events.prologue_stamp, endEvent);

}
async function bedEvent(){

    await startMessage([
        "卑弥呼「疲れたじゃろう。寝床で少し休むがよい」"
    ]);

    await fadeOut();

    recoverAll(playerStatus);
    recoverAll(himikoStatus);

    await fadeIn();

    await startMessage([
        "卑弥呼「うむ！すっかり元気になったようじゃの」"
    ]);

    endEvent();

}
//銅鏡
async function mirrorEvent(){

    // すでに壱与登場済み
    if(hasFlag("iyoAppeared")){
        mirrorWarpMenu();
        return;
    }

    setFlag("iyoAppeared");
    gameState.progress = PROGRESS.IYO_APPEARED;

    // ===== 鏡を調べる =====

    await wait(100);

    setObjectDirection("himiko", "up");

    await startMessage(events.mirrorIntro);

    // ===== 壱与出現 =====

    spawnObject("iyo");

    await wait(200);

    setObjectDirection("himiko", "down");

    // ===== 壱与が歩いてくる =====

    for(let i = 0; i < 7; i++){

        await moveObject("iyo", 0, -1);

        await wait(200);

    }

    setObjectDirection("iyo", "down");
    setObjectDirection("himiko", "left");
    setObjectDirection("brother", "up");

    // ===== 壱与との会話① =====

    await startMessage(events.iyoArrival1);

    setObjectDirection("iyo", "left");
    setObjectDirection("himiko", "up");

    await startMessage(events.iyoArrival2);

    // ===== 予言 =====

    flashScreen();

    await wait(300);

    setObjectDirection("himiko", "up");

    for(let i = 0; i < 3; i++){

        await moveObject("himiko", 0, -1);

        await wait(200);

    }

    setObjectDirection("iyo", "right");
    setObjectDirection("himiko", "left");

    await startMessage(events.iyoArrival3);

    // ===== 主人公の使命 =====

    await wait(300);

    setObjectDirection("iyo", "left");

    await startMessage(events.iyoArrival4);

    // ===== イベント終了 =====

    endEvent();

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
async function goToNojiri(){

    await fadeOut();

    currentMap = maps.nojiriLake;

    player.x = 2;
    player.y = 25;

    himiko.x = player.x - 1;
    himiko.y = player.y;
    himiko.direction = "right";

    isHimikoFollowing = true;
    playerTrail = [];

    render();

    await fadeIn();

    await startMessage([
        "壱与の声「邪馬台国に戻るときは、青いうずまきに触れてください」"
    ]);

    endEvent();

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
        "himiko","left"
    );

    setTimeout(()=>{
        setObjectDirection(
            "himiko","down"
        );
    },100);

    setTimeout(()=>{
        setObjectDirection(
            "himiko","right"
        );
    },200);

    setTimeout(()=>{
        setObjectDirection(
            "himiko","up"
        );
    },300);

    setTimeout(()=>{
        setObjectDirection(
            "himiko",
            "left"
        );
    startMessage(
        [
            "卑弥呼「おぬし、よもや寝ぼけてはおるまいな？」",
            "卑弥呼「少し試してみようかのう」"
        ],
        showProgressQuiz
    );
    },400);

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
                wrong:"マンモス"
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
        showProgressQuiz
    );

}
