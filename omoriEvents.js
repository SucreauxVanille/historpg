function omoriShellEvent(){

    if(hasFlag("omoriShellFinished")){
        endEvent();
        return;
    }

    startMessage(
        [
            "卑弥呼「ふむ…海がすぐそばなのじゃな」",
            "卑弥呼「確かにこれなら貝とも関係がありそうじゃ」",
            "？？？「カタカタ…」",
            "卑弥呼「これ、おかしな声を出すでない」",
            "？？？「カタカタカタ…！」",
            "卑弥呼「なんじゃなんじゃ！？」"
        ],
        () => {

            startBattle(
                ["shell"],
                (result) => {

                    if(result === "win"){
                        setFlag("omoriShellFinished");
                        gameState.progress = PROGRESS.OMORI_SHELL;
                    }
                }
            );

            endEvent();
        }
    );
}

function meetMorseEvent(){
    startMessage(
        [
            "妙な男「ハロー！」",
            "妙な男「私はモースと申す者デース！」"
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
