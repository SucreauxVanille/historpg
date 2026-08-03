async function yongEvent(){

    // ① 初対面
    if(gameState.progress < PROGRESS.MET_YONG){

        await startMessage([
            "渡来人「こんにちはアル！」",
            "渡来人「僕はヨン、海の向こうから来たアル」",
            "卑弥呼「ヨンとやら、言いづらいが…村人たちは、おぬしを避けておるようじゃ」",
            "卑弥呼「故郷を離れ、おぬしがここに留まる理由は何じゃ？」",
            "ヨン「それは…」",
            "ヨン「僕の口から言うより、この村のおじいさんが作った土器を見てきてほしいアル」",
            "壱与の声「土器、ですか…？」",
            "卑弥呼「ふむ、見てみるかのう」"
        ]);

        gameState.progress = PROGRESS.MET_YONG;
        setFlag("metYong");

        endEvent();
        return;
    }

    // ② 土師器確認前
    if(!hasFlag("checkedHajiki")){

        await startMessage([
            "ヨン「僕が作っている土器は須恵器（すえき）アル」",
            "ヨン「そして、この村で作っている土器は土師器（はじき）というアル」",
            "ヨン「まずは、おじいさんの土師器を見てきてほしいアル！」"
        ]);

        endEvent();
        return;
    }

    // ③ 土師器確認後
    if(!hasFlag("reportedYong")){

        await startMessage([
            "ヨン「見たアルか！？」",
            "卑弥呼「うむ、素人目に見ても見事な土器じゃった」",
            "ヨン「そうアルそうアル！」",
            "ヨン「おじいさんの土師器は、とても高度な職人技で作られているアル！」",
            "ヨン「あの技術なら、きっと素晴らしい須恵器も作れるアル！」",
            "卑弥呼「おお…めちゃくちゃ張り切っておるのう…」",
            "ヨン「だから僕は、仲間が去った後もここに残ったアル！」",
            "ヨン「おじいさんに、最高の須恵器を作ってほしいアル！」",
            "壱与の声「だから、お一人でずっとここに…」",
            "卑弥呼「ふむ…そこまで言うなら力になってやりたいが…」",
            "ヨン「本当アルか！？嬉しいアル！」",
            "卑弥呼「ええい！期待するでない！」",
            "壱与の声「村の人たちの気持ちを変えるのは、大変でしょうしね…」",
            "卑弥呼「ひとまず、もう一度村へ行ってみるかのう」"
        ]);

        setFlag("reportedYong");
        endEvent();
        return;
    }

    // ④ 報告後
    await startMessage([
        "ヨン「仲間たちは仏教を広めたり、交易を望んだりしていたアル」",
        "ヨン「それぞれ、もっと人の多いところを目指していったアルよ」"
    ]);

    endEvent();
}

async function kilnEvent(){
    await startMessage([
        "ヨン「これは登り窯というアル！」",
        "ヨン「崖の上の煙突につながってるアル」"
    ]);
    endEvent();
}
async function sueki1Event(){
    await startMessage([
        "ヨン「これが僕たちの須恵器（すえき）アル」",
        "ヨン「灰色をしているのが特徴アル」"
    ]);
    endEvent();
}
async function sueki2Event(){
    await startMessage([
        "卑弥呼「中には水が入っておるようじゃな」",
        "ヨン「そうアル、昔からの土器は水がしみこんでしまうアル」",
        "ヨン「でも、須恵器はしみこまずに水をためられるアル」",
        "壱与の声「それは便利ですね！」"
    ]);
    endEvent();
}

//タイルイベント①
async function suemuraConversation(){

    if(
        !hasFlag("reportedYong") ||
        hasFlag("suemuraConversationFinished")
    ){
        endEvent();
        return;
    }

    await startMessage([
        "卑弥呼「ううむ…ヨンの力になってやりたいが…」",
        "壱与の声「村の人たちの考えを変えるのは、難しいですよね」",
        "卑弥呼「何より、ヨン自身も村人と争いたくはないじゃろう」",
        "壱与の声「…あれ？」",
        "卑弥呼「どうした？」",
        "壱与の声「何か声がしませんか…？」",
    ]);

    setFlag("suemuraConversationFinished");

    endEvent();
}

//タイルイベント②
async function suemuraAttackedTrigger(){

    if(
        !hasFlag("suemuraConversationFinished") ||
        hasFlag("villageAttacked")
    ){
        endEvent();
        return;
    }

    await startMessage([

        "卑弥呼「壱与、お主の言う通りじゃ」",
        "壱与「え？」"
        "卑弥呼「村の方じゃ！明らかに焼き物づくりではない煙が上がっておる！」",
        "壱与の声「確かに、悲鳴のような声も聞こえます！」",
        "卑弥呼「村に何かあったのじゃ！急ぐぞ！」"
    ]);

    setFlag("villageAttacked");

    // ヨン移動
    // 火の玉スポーン
    
    endEvent();
}

async function moveSuemura1(){

    await changeMap(
        maps.suemuraMap1,
        1,
        9
    );

    endEvent();
}
