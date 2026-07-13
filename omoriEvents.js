function omoriShellEvent(){

    if(hasFlag("omoriShellFinished")){
        endEvent();
        return;
    }

    startMessage(
        [
            "卑弥呼「ふむ…海がすぐそばなのじゃな」",
            "卑弥呼「確かに貝殻とも関係がありそうじゃ」",
            "？？？「カタカタ…」",
            "卑弥呼「これ、おかしな声を出すでない」",
            "？？？「カタカタカタ…！」",
            "卑弥呼「貝殻！？貝殻が動いておるのか！？」"
        ],
        () => {

startBattle(
    ["shell"],
    (result)=>{

        if(result !== "win"){
            endEvent();
            return;
        }

        setFlag("omoriShellFinished");
        gameState.progress = PROGRESS.OMORI_SHELL;

        startMessage(
            [
                "卑弥呼「何で貝殻に目玉がついて動くんじゃ！」",
                "壱与の声「イノシシやゾウはともかく、貝殻が動くのは妙ですね」",
                "卑弥呼「うむ。何者かが、悪意を持って異変を起こしておるようじゃ」"
            ],
            endEvent
        );
    }
);
        }
    );
}

async function morseStopEvent(){
    const morse = getObject("morse");
    
    if(hasFlag("metMorse")){
        endEvent();
        return;
    }
        await jumpElement(morse,8);
        await jumpElement(morse,8);
        await startMessage(
        [
            "？？？「ノー！無視しないでクダサーイ！」",
            "卑弥呼「む…さすがに素通りというわけにはいかぬか…」"
        ],
        );
       await forceMovePlayer(0, 1);
       endEvent();
       return;
    }

//回復の泉
function recoverySpringEvent(){
    startMessage(
        [
            "卑弥呼「ふむ…ここの水からは神聖な力を感じるのう」"
        ],
        () => {
            flashScreen();

            recoverAll(playerStatus);
            recoverAll(himikoStatus);

            setTimeout(() => {
                startMessage(
                    [
                        "卑弥呼「ほう！力がみなぎるようじゃ！」"
                    ],
                    endEvent
                );
            }, 400);
        }
    );
}

//モースイベント
async function meetMorseEvent(){
    const morse = getObject("morse");
    //==========================
    //④ クリア後
    //==========================
    if(hasFlag("savedMorse")){

        await startMessage([
            "モース「このコードみたいなマークの土器！土器土器しちゃいマース！」",
            "モース「コードのマーク、日本語で言うと縄文デース！」"
        ]);

        endEvent();
        return;
    }

    //==========================
    //③ 救出イベント
    //==========================
    if(hasFlag("doguDefeated")){

        await startMessage([
            "卑弥呼「モースとやら、大丈夫じゃったか？」",
            "モース「サンキュー！モースこしで死ぬところデシタ！」"
        ]);

        await jumpElement(morse,8);
        await jumpElement(morse,8);

        await startMessage([
            "卑弥呼「む？まだ貝殻が付いたままじゃぞ？」",
            "モース「イエス！せっかくなので、このまま貝塚の気持ちを体験しマース！」"
        ]);

        await rotateObject(morse,8);

        await startMessage([
            "卑弥呼「…なんと力強いのじゃ…」",
            "壱与の声「貝塚の気持ちって何なんでしょう…」"
        ]);
        setFlag("savedMorse");
        endEvent();
        return;
    }

    //==========================
    // 初回会話後
    //==========================
    if(hasFlag("metMorse")){

        await startMessage([
            "モース「ワタシは大森貝塚を発掘調査していたのデース」",
            "モース「モースこしで調査が終わる時、おかしな光に吸い込まれてしまいマシタ」",
            "モース「気が付くとここにワープして、貝殻に襲われたのデース」",
            "卑弥呼「他の時代から転移してきたわけじゃな」",
            "卑弥呼「となれば、おぬしら二人は似た事情なのかもしれぬのう」"
        ]);
        await rotateObject(morse);
        await startMessage([
            "モース「帽子ボーイ！君も光に吸い込まれたのデスネ！」"
        ]);

        endEvent();
        return;
    }

    //==========================
    // 初回遭遇
    //==========================
    await startMessage([
        "妙な男「ヘルプミー！」"
    ]);

    await jumpElement(morse,8);
    await jumpElement(morse,8);

    await startMessage([
        "卑弥呼「何じゃ何じゃ！？」",
        "妙な男「ハロー！ワタシはモースと申ス者デース！」"
    ]);

    await rotateObject(morse);

    await startMessage([
        "モース「体に貝殻がまとわりついて動けマセーン！助けてクダサーイ！」"
    ]);

    await rotateObject(morse);

    await startMessage([
        "卑弥呼「おぬしの胴体、貝殻じゃったのか…」",
        "モース「イエス！不思議な力で貝殻が動いているようデース！」",
        "卑弥呼「力の源を断てば、おぬしも自由になれそうじゃのう」",
        "モース「オー！キュートガール、ベリーカインド！お頼み申ス！」"
    ]);

    await jumpElement(morse,8);

    setFlag("metMorse");
    gameState.progress = PROGRESS.MET_MORSE;
    endEvent();

}

//土偶
async function doguEvent(){
    const dogu = getObject("doguonMap");
    // 撃破済み
    if(hasFlag("doguDefeated")){
        endEvent();
        return;
    }

    // 初回発見
    if(!hasFlag("doguFound")){

        await startMessage(events.doguFind);

        setFlag("doguFound");
        endEvent();
        return;
    }

    // ヒント不足
    if(
        !hasFlag("doguHintA") ||
        !hasFlag("doguHintB") ||
        !hasFlag("doguHintC")
    ){

        await startMessage([
            "卑弥呼「手足が無傷なのも妙じゃな」",
            "壱与の声「土偶は、おまじないのために手足を折られますよね」"
        ]);
        endEvent();
        return;
    }

// 決戦前会話
await startMessage(events.doguBattle);

// 土偶が動く
await jumpElement(dogu, 8);

await startMessage([
    "卑弥呼「む！？こやつ動くぞ！」"
]);

startBattle(
    ["shell","shell","doguBoss"],
    doguBattleResult
);

}
function doguBattleResult(result){

    if(result !== "win"){
        endEvent();
        return;
    }

    setFlag("doguDefeated");
    gameState.progress = PROGRESS.DOGU_DEFEATED;
    despawnObject("doguonMap");

    startMessage(
        events.doguAfter,
        endEvent
    );

}

//土偶ヒント
function doguHintAEvent(){

    // ③ ボス撃破後
    if(hasFlag("doguDefeated")){

        startMessage(
            [
                "男「まさか土人形が貝殻を暴れさせてただなんてなあ」",
                "男「世の中、わからねえこともあるもんだべ」"
            ],
            endEvent
        );
        return;
    }

    // ② ヒント取得後
    if(hasFlag("doguHintA")){

        startMessage(
            [
                "男「あの土人形、誰の物なんだべなあ」",
                "男「ひげもじゃのおっちゃんも違うって言うし、不思議だべ」"
            ],
            endEvent
        );
        return;
    }

    // ① 初回
    startMessage(
        [
            "男「向こうの丘に、おかしな土人形が落ちてるだ」",
            "男「あんたたちの持ち物じゃねえのか？」",
            "壱与の声「やはり、ここで作られてはいないようですね」",
            "卑弥呼「誰かが持ち込んだとしか思えぬが…」"
        ],
        () => {
            setFlag("doguHintA");
            endEvent();
        }
    );
}

function doguHintBEvent(){
    // ③ ボス撃破後
    if(hasFlag("doguDefeated")){

        startMessage(
            [
                "男「やっぱり土人形が動いたんだろ？」",
                "男「オラの見間違いじゃなかったべ！」"
            ],
            endEvent
        );
        return;
    }

    // ② ヒント取得後
    if(hasFlag("doguHintB")){

        startMessage(
            [
                "男「動いただけじゃなくて、光ったような気もするべ…」",
                "男「ううっ、思い出したら怖くなってきたべ」"
            ],
            endEvent
        );
        return;
    }

    // ① 初回
    startMessage(
        [
            "男「お、オラ見ただよ！」",
            "男「丘の土人形が、ひとりでに動いてたんだ！」",
            "男「みんなは見間違いだって言うんだが、そんなわけねえ！」",
            "卑弥呼「土偶が勝手に動くじゃと…？」"
        ],
        () => {

            setFlag("doguHintB");
            endEvent();
        }
    );
}

function doguHintCEvent(){
    // ③ ボス撃破後
    if(hasFlag("doguDefeated")){
        startMessage(
            [
                "男「土人形、あんたたちが壊したんだべか？」",
                "男「破片は貝塚に葬ってやるといいべよ」",
                "卑弥呼「ふむ…貝塚は弔いの場でもあるのじゃな」"
            ],
            endEvent
        );
        return;
    }

    // ② ヒント取得後
    if(hasFlag("doguHintC")){

        startMessage(
            [
                "男「オラたちが作ってるのは、土人形じゃなくて土器だ」",
                "男「ひげもじゃのおっちゃんが熱心に眺めてたなあ」"
            ],
            endEvent
        );
        return;
    }

    // ① 初回
    startMessage(
        [
            "男「妙なこともあるもんだな。土人形も暴れる貝殻も、同じくらいに現れたべよ」",
            "男「変なことは続くもんだべなあ」",
            "卑弥呼「む？土偶と異変が同時に起きたということか？」",
            "壱与の声「これは…」"
        ],
        () => {

            setFlag("doguHintC");
            endEvent();
        }
    );
}

//------------------
//ここからモブと建造物
//------------------
function omorimob1Event(){
    startMessage(
        [
            "男「オラたちはこの集落に住んでるだ」",
            "男「食いもんは豊富だし、屋根のある家に帰れるしな」"
        ],
        endEvent
    );
}
function omorimob2Event(){
    npcDialogue(
        "doguDefeated", 
        [
            "男「オラ達は食い終わった貝殻や骨を貝塚に捨ててるだ」",
            "男「ただのゴミでなく、食べたことを感謝する場でもあるだよ」",
            "男「だけども、近頃はおかしな貝殻が暴れ出して困っとるだ」"
        ],
        [
            "男「オラ達は食い終わった貝殻や骨を貝塚に捨ててるだ」",
            "男「ただのゴミでなく、食べたことを感謝する場でもあるだよ」",
            "男「暴れる貝殻も、やっつけてここに葬ってやるだ」"
        ]
    );
}

function omorimob3Event(){
    startMessage(
        [
            "男「オラたちは土を焼いた器を使ってるだ」",
            "男「これで魚や堅い木の実も、火を通しておいしく食えるだよ」"
        ],
        endEvent
    );
}

function omorimobF1Event(){
    npcDialogue(
        "doguDefeated",  
        [
            "女「ここが貝塚だ」",
            "女「さっき、ひげもじゃの騒がしいおっちゃんが熱心に見学してたなあ」",
            "女「暴れる貝殻に追い回されてたけど、どこ行ったやら…」"
        ],
        [
            "女「ここが貝塚だ」", 
            "女「オラ達にとっては大切な場所だよ」",
            "女「って、ひげもじゃの騒がしいおっちゃんに伝えたら、妙に嬉しそうだったなあ」"
 
        ]
    );
}

function omorimobF2Event(){
    startMessage(
        [
            "女「このあたりは木の実が豊富なんだ」",
            "女「ドングリやトチの実を集めるのがウチらの役目だよ」"
        ],
        endEvent
    );
}

function omorimobF3Event(){
    startMessage(
        [
            "女「海の水はしょっぱくて飲めないからね」",
            "女「ここの湧き水が、ウチらの命の源だ」"
        ],
        endEvent
    );
}

function omoriHouseEvent(){
    startMessage(
        [
            "卑弥呼「これは竪穴式住居というやつじゃな」",
            "卑弥呼「民の住む家は、ワシらの時代と変わらんのう」"
        ],
        endEvent
    );
}

function omoriHouse2Event(){
    startMessage(
        [
            "卑弥呼「竪穴という名前の通り、この家は穴を掘って造られておるんじゃ」",
            "卑弥呼「穴に柱を立てて、そこに屋根をかぶせてるんじゃよ」"
        ],
        endEvent
    );
}

function omoriHouse3Event(){
    startMessage(
        [
            "卑弥呼「む？中で赤子が寝ておるようじゃ」",
            "卑弥呼「そっとしておいてやらねばのう」"
        ],
        endEvent
    );
}

//------------------
//復帰とエンディング
//------------------
async function omoriReturnEvent(){

    if(
        hasFlag("savedMorse") &&
        !hasFlag("omoriClear")
    ){
        await startOmoriEnding();
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

//------------------
//復帰とエンディング
//------------------
async function startOmoriEnding(){

    await startMessage([
        "壱与の声「無事に解決したんですね！邪馬台国で一休みしましょう」"
    ]);

    changeMap(
        maps.himikoHouse,
        5,
        5
    );

    await wait(600);
const himiko = getObject("himiko");
    setObjectDirection("iyo","down");
    setObjectDirection("himiko","left");

    await startMessage([
        "壱与「今回も本当にお疲れさまでした！」"
    ]);
    
    setObjectDirection("himiko","up");
    await jumpElement("himiko",8);
    await jumpElement("himiko",8);

    await startMessage([
        "卑弥呼「まったく、ひどい目に遭ったのじゃ！」",
        "壱与「でも、モースさんが元気そうで良かったです」"
    ]);
    
    setObjectDirection("brother","up");

    await startMessage([
        "卑弥呼の弟「邪馬台国の異常も解決したようです」"
    ]);
    
    setObjectDirection("himiko","down");

    await startMessage([
        "卑弥呼「うむ、それは何よりじゃ！」",
        "卑弥呼「じゃが…」"
    ]);
    await wait(300);
    
    setObjectDirection("iyo","right");
    await startMessage([
        "壱与「誰かが土偶を送り込んで、呪術で貝殻や骨を暴れさせていた…」"
    ]);   

    setObjectDirection("himiko","left");
    await startMessage([
        "卑弥呼「そこじゃ。これは明らかに、何者かの悪意じゃ」",
        "壱与「他の時代でも、何かが起きているかもしれませんね」"
    ]);  

    await rotateObject(himiko);
    await startMessage([
        "卑弥呼「そういうわけじゃ、もう少し一緒に戦ってもらうぞ」",
        "壱与「よろしく願いしますね！」",
        "",
        "体験版はここまでです。続きをお楽しみに！"
    ]);

    
    setFlag("omoriClear");
    gameState.progress = PROGRESS.OMORI_CLEAR;

    endEvent();

}
