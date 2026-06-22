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

    if(hasFlag("nojiriTutorialFinished")){
        endEvent();
        return;
    }

    startMessage(
        [
            "卑弥呼「む！？この時代にも狂暴化した獣がいるようじゃ！」",
            "卑弥呼「やむを得ぬ！戦うぞ！」"
        ],
        () => {

            startBattle(
                "boar",
                (result) => {

                    if(result === "win"){

                        setFlag(
                            "nojiriTutorialFinished"
                        );

                    }

                }
            );

            endEvent();

        }
    );

}
function naumannBossEvent(){

    showMessage(
        "卑弥呼「なんと巨大な獣じゃ…背後にあるのは黒曜石のようじゃな」"
    );
    endEvent();
}
function obsidianEvent(){

    if(hasFlag("obsidianObtained")){

        showMessage(
            "黒曜石があった場所だ。"
        );

        endEvent();
        return;
    }

    setFlag(
        "obsidianObtained"
    );

    startMessage(
        [
            "卑弥呼「やはり！これは黒曜石の矢じりじゃ！」",
            "卑弥呼「これを使って壱与が祈れば、獣たちも落ち着くじゃろう」"
        ],
        endEvent
    );

}
