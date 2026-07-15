async function returnMirrorEvent(){

    if(
        hasFlag("obsidianObtained") &&
        !hasFlag("demoClear")
    ){
        startDemoEnding();
        return;
    }

    await startMessage([
        "壱与の声「邪馬台国にお戻ししますね！」"
    ]);
    changeMap(
        maps.himikoHouse,
        5,
        5
    );
    endEvent();
}

async function nojiriTutorialEvent(){

    if(hasFlag("nojiriTutorialFinished")){
        endEvent();
        return;
    }

    await startMessage([
        "卑弥呼「む！？この時代にも狂暴化した獣がいるようじゃ！」",
        "卑弥呼「やむを得ぬ！戦うぞ！」"
    ]);

    const result = await startBattle(["boar"]);

    if(result === "win"){
        setFlag("nojiriTutorialFinished");
        gameState.progress = PROGRESS.NOJIRI_TUTORIAL;
    }

    endEvent();
}

//モブ1
function nojirimob1Event(){
    startMessage(
        [
            "男「ここは野尻湖って呼ばれてるだ」",
            "男「オラたちは獲物を求めて、あっちこっちを移動してるだ。おめえたちは違うんか？」"
        ],
        endEvent
    );
}
//モブ2
async function nojirimob2Event(){
    npcDialogue(
        "obsidianObtained",
        [
            "男「ちょっと前から不気味な気配がするだよ」",
            "男「獣が急に狂暴になっちまって、おちおちドングリも拾えねえだ」"
        ],
        [
            "男「まだ狂暴な獣もおるけども、不気味な気配は弱まったべな」"
        ]
    );
}
//モブ3
async function nojirimob3Event(){
    npcDialogue(
        "obsidianObtained",
        [
            "男「オラは岩宿ってところから来たんだが、やたら狂暴なゾウに出会ってな」",
            "男「びっくらこいて、黒曜石の矢じりを落っことしちまっただ」",
            "男「あんなおっかない思いはもう勘弁だ。欲しければあんたたちに譲るだよ」"
        ],
        [
           "男「でっけえゾウをやっつけたべか！？」",
           "男「その矢じりは譲るべ、大事に使ってくれ」"
        ]
    );
}

//ナウマンゾウ戦
async function naumannBossEvent(){

    // 撃破済み
    if(hasFlag("naumannDefeated")){

        await startMessage([
            "卑弥呼「なんじゃ、ずいぶん穏やかになったではないか」",
            "卑弥呼「これが異変の影響を受けておらぬ、本来の姿なのじゃろうな」"
        ]);

        endEvent();
        return;
    }

    await startMessage([
        "卑弥呼「なんと巨大な獣じゃ…背後にあるのは、黒曜石のようじゃな」",
        "卑弥呼「手に入れるには、こやつを倒さねばなるまい」"
    ]);

    const result = await startBattle(["naumann"]);

    if(result !== "win"){
        endEvent();
        return;
    }

    const obj = getObjectById("naumann");

    // 念のため存在確認
    if(!obj){
        endEvent();
        return;
    }

    flashElement(canvas);

    await wait(600);

    setFlag("naumannDefeated");
    gameState.progress = PROGRESS.NAUMANN_DEFEATED;

    despawnObject("naumann");
    render();

    await startMessage([
        "卑弥呼「恐ろしい強さじゃった…これも異変の影響かのう」",
        "卑弥呼「よし、黒曜石の矢じりを回収じゃ」"
    ]);

    endEvent();
}

//黒曜石
function obsidianEvent(){

    if(hasFlag("obsidianObtained")){

        showMessage(
            "卑弥呼「地面に矢じり形の跡が残っておるのう」"
        );

        endEvent();
        return;
    }

    setFlag("obsidianObtained");
    gameState.progress = PROGRESS.OBSIDIAN_OBTAINED;
    despawnObject("obsidian");

    render();
    startMessage(
        [
            "卑弥呼「やはり！これは黒曜石の矢じりじゃ！」",
            "卑弥呼「これを使って壱与が祈れば、獣たちも落ち着くじゃろう」"
        ],
        endEvent
    );

}

//エンディング
function startDemoEnding(){

    changeMap(
        maps.himikoHouse,
        5,
        5
    );

    setTimeout(()=>{

        setObjectDirection(
            "iyo",
            "down"
        );

        setObjectDirection(
            "himiko",
            "left"
        );

        startMessage(
            events.demoEnding,
            showDemoEndingChoice
        );

    },600);

}
function showDemoEndingChoice(){

    showChoice([
        {
            text:"はい",
            action: demoEndingYes
        },
        {
            text:"いいえ",
            action: demoEndingNo
        }
    ]);

}
function demoEndingYes(){

    startMessage(
        events.demoEndingYes,
        finishDemoEnding
    );

}
function demoEndingNo(){

    startMessage(
        events.demoEndingNo,
        finishDemoEnding
    );

}
function finishDemoEnding(){

    startMessage(
        events.demoEndingFinal,
        () => {

            setFlag("demoClear");
            gameState.progress = PROGRESS.DEMO_CLEAR;

            endEvent();

        }
    );

}
