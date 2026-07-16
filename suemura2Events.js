async function yongEvent(){
    await startMessage([
        "渡来人「こんにちはアル！」",
        "渡来人「僕はヨン、海の向こうから来たアル」"
    ]);
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
