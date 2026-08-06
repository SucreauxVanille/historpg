async function moveSuemura2(){

    await changeMap(
        maps.suemuraMap2,
        18,
        9
    );
    endEvent();
}

async function potterEvent(){
   if(hasFlag("villageAttacked")){

        await startMessage([
        "土師器じいさん「ワシはええ！女子供や家を守るんや！」",
        "土師器じいさん「こちとら毎日、火を使うてきた職人や！」",
        "土師器じいさん「火の玉になんか負けへんで！」"
        ]);
        endEvent();
        return;
    }
    await startMessage([
        "老人「ワシはこの村の職人や」",
        "老人「土師器（はじき）づくりでこの村を支えてきた」",
        "老人「近ごろは外国の焼き物を広めようとする連中もおるが…」",
        "老人「ワシはこの村の伝統を変えるつもりはあらへん」"
    ]);
    endEvent();
}

async function bonfireEvent(){
    npcDialogue(
        "haniwaDefeated", 
        [
            "老人「土師器は窯を使わず、穴を掘った中で焼くんや」",
            "老人「おかしな窯なんて必要あらへん」"
        ],
        [
            "土師器じいさん「ワシはずっと焼き物を作り続けてきた」",
            "土師器じいさん「土師器も須恵器も、魂を込めて作ってみせるで」"
        ]
    );
}
async function hajikiEvent(){

    if(!hasFlag("metYong")){
        await startMessage([
            "卑弥呼「ふむ、これがこの村で作られている土器じゃな」"
        ]);
        endEvent();
        return;
    }

    if(!hasFlag("checkedHajiki")){

        await startMessage([
            "卑弥呼「これがヨンの話しておった土師器じゃな」",
            "卑弥呼「ふむ…形も整っておるし、丈夫そうじゃ」",
            "壱与の声「丁寧に手作りされているのが分かりますね」"
        ]);

        setFlag("checkedHajiki");

        endEvent();
        return;
    }

    await startMessage([
        "卑弥呼「うむ、見事な土師器じゃな」"
    ]);

    endEvent();
}

async function gateManEvent(){
    await startMessage([
        "男「この先に行くんか？」",
        "男「物好きな渡来人が一人で住んどるだけやで」"
    ]);
    endEvent();
}

async function suemuramob1Event(){
    if(hasFlag("villageAttacked")){

        await startMessage([
        "男「ここは陶邑（すえむら）や」",
        "男「火の玉の化け物が現れるなんて、聞いてへんで！」"
        ]);
        endEvent();
        return;
    }
    await startMessage([
        "男「ここは陶邑（すえむら）や」",
        "男「焼き物を作っとるさかい、そう呼ばれとるんや」"
    ]);
    endEvent();
}

async function suemuramob2Event(){
    if(hasFlag("villageAttacked")){

        await startMessage([
            "男「くそっ！何なんだこの火の玉！」"
        ]);
        endEvent();
        return;
    }
    npcDialogue(
        "haniwaDefeated", 
        [
            "男「渡来人って知っとるか？」",
            "男「海の向こうの国から来た人たちやで」"
        ],
        [
            "男「渡来人って知っとるか？」",
            "男「海の向こうの技術を教えてくれたんやで」"
        ]
    );
}
async function suemuramob3Event(){
    npcDialogue(
        "haniwaDefeated", 
        [
            "男「隣の村では、古墳づくりに男が駆り出されているらしい」",
            "男「俺も呼ばれたらイヤだなあ…」"
        ],
        [
            "男「隣の村では、古墳づくりに男が駆り出されているらしい」",
            "男「でも、誰の墓なのか誰も知らないんだよな」"
        ]
    );
}
async function suemuramobF1Event(){
    await startMessage([
        "女「田んぼに入ったらダメやで」",
        "女「ウチらの大事なお米やさかいな」"
    ]);
    endEvent();
}

async function suemuramobF2Event(){
    if(hasFlag("villageAttacked")){

        await startMessage([
            "女「キャー！助けてーや！」"
        ]);
        endEvent();
        return;
    }
    npcDialogue(
        "haniwaDefeated", 
        [
            "女「渡来人なぁ、ちょっと怖いな」",
            "女「急に現れて、技術を教えたい言うてもなぁ…」"
        ],
        [
            "女「渡来人なぁ、ええ人やんな」",
            "女「しかもよく見ると、ちょっと男前やん？」",
            "卑弥呼「おい」"
        ]
    );
}

async function suemuraboy1Event(){
    npcDialogue(
        "haniwaDefeated", 
        [
            "男「ここだけの話、俺は渡来人さんの言うことにも興味あるわけよ」",
            "男「でもさ、うちの村は土師器じいさんの職人技に支えられてるからさ～」"
        ],
        [
            "男「やっぱりな！ヨンさんはすごい人だって俺は信じてたよ！」",
            "卑弥呼「なんでおぬしが偉そうなんじゃ…」"
        ]
    );
}

async function suemuraHouseEvent(){
    await startMessage([
        "卑弥呼「これも竪穴式住居じゃのう」",
        "卑弥呼「この時代でも使われておるのじゃな」"
    ]);
    endEvent();
}

async function suemuraHouse2Event(){
    await startMessage([
        "卑弥呼「邪馬台国よりも調理の技術が進んでおるようじゃな」",
        "卑弥呼「腹が減るのう…」"
    ]);
    endEvent();
}
async function suemuraHouse3Event(){
    await startMessage([
        "卑弥呼「家の中にも土器が置かれておるのう」",
        "壱与の声「生活に役立てられているんですね」"
    ]);
    endEvent();
}

async function fireballAEvent(){

    if(hasFlag("fireballADefeated")){
        endEvent();
        return;
    }

    await startMessage([
        "火の玉「燃ヤセ！燃ヤセ！」",
        "卑弥呼「させぬ！」"
    ]);

    const result = await startBattle(["fireball"]);

    if(result !== "win"){
        endEvent();
        return;
    }

    setFlag("fireballADefeated");

    // ここでボス出現判定

    endEvent();
}

//帰還
async function suemuraReturnEvent(){
    if(hasFlag("villageAttacked")){

        await startMessage([
            "卑弥呼「ならぬ！今ここを見捨てるわけにはゆかぬ！」"
        ]);
        endEvent();
        return;
    }

    await startMessage([
        "壱与の声「邪馬台国にお戻ししますね！」"
    ]);
await changeMap(
    maps.himikoHouse,
    5,
    5
);
    endEvent();
}
