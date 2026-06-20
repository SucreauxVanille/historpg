function returnMirrorEvent(){
    showMessage(
        "壱与「邪馬台国にお戻ししますね！」"
    );
    changeMap(
        maps.himikoHouse,
        5,5
    );
    endEvent();
}
function nojiriTutorialEvent(){

    startMessage(
        [
            "卑弥呼「む！？この時代にも狂暴化した獣がいるようじゃ！」",
            "卑弥呼「やむを得ぬ！戦うぞ！」"
        ],
        () => {

            startBattle("boar");
            endEvent();
        }
    );

}
function naumannBossEvent(){

    showMessage(
        "巨大なナウマンゾウが立ちはだかっている。"
    );
    endEvent();
}
