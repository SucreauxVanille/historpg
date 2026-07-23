async function moveSuemura2(){

    await changeMap(
        maps.suemuraMap2,
        18,
        9
    );
    endEvent();
}

async function potterEvent(){
    await startMessage([
        "老人「ワシはこの村の職人や」",
        "老人「土師器（はじき）づくりでこの村を支えてきた」"
    ]);
    endEvent();
}

async function bonfireEvent(){
    npcDialogue(
        "haniwaDefeated", 
        [
            "老人「土師器は窯を使わず、穴を掘った中で焼くんや」"
        ],
        [
            "土師器じいさん「土師器の技術も守り続けるで」"
        ]
    );
}

async function gateManEvent(){
    await startMessage([
        "男「この先に行くんか？」",
        "男「怪しい渡来人が住んどるだけやで」"
    ]);
    endEvent();
}

async function suemuramob1Event(){
    await startMessage([
        "男「ここは陶邑（すえむら）や」",
        "男「焼き物を作っとるさかい、そう呼ばれとるんや」"
    ]);
    endEvent();
}

async function suemuramob2Event(){
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

async function suemuramobF1Event(){
    await startMessage([
        "女「田んぼに入ったらダメやで」",
        "女「ウチらの大事なお米やさかいな」"
    ]);
    endEvent();
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
