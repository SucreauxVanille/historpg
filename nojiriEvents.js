function returnMirrorEvent(){

    if(
        hasFlag("obsidianObtained") &&
        !hasFlag("demoClear")
    ){

        startDemoEnding();
        return;
    }

    showMessage(
        "壱与「邪馬台国にお戻ししますね！」"
    );

    changeMap(
        maps.himikoHouse,
        5,
        5
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

    startMessage(
        [
            "卑弥呼「なんと巨大な獣じゃ…背後にあるのは、黒曜石のようじゃな」",
            "卑弥呼「手に入れるには、こやつを倒さねばなるまい」"
        ],
        () => {

            startBattle(
                "naumann",
                (result)=>{

                    if(result !== "win"){
                        endEvent();
                        return;
                    }

                    const obj =
                        getObjectById("naumann");

                    if(obj){
                        flashElement(canvas);
                        setTimeout(()=>{

                            setFlag(
                                "naumannDefeated"
                            );
                            despawnObject(
                                "naumann"
                            );
                            render();
                            startMessage(
                                [
                                    "卑弥呼「恐ろしい強さじゃった…これも異変の影響かのう」",
                                    "卑弥呼「よし、黒曜石の矢じりを回収じゃ」"
                                ],
                                endEvent
                            );
                        },300);
                    }else{
                        endEvent();
                    }
                }
            );
        }
    );
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
