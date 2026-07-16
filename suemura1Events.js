async function moveSuemura2(){

    await changeMap(
        maps.suemuraMap2,
        18,
        9
    );
    endEvent();
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

async function suemuraHouseEvent(){
    await startMessage([
        "卑弥呼「これも竪穴式住居じゃのう」",
        "卑弥呼「この時代でも使われておるのじゃな」"
    ]);
    endEvent();
}
