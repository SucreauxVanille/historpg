async function yongEvent(){
    await startMessage([
        "ヨン「こんにちはアル！」",
        "ヨン「今は仮イベントアル！」"
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
