const PROGRESS = {
    START: 0,
    IYO_APPEARED: 1,
    NOJIRI_TUTORIAL: 2,
    NAUMANN_DEFEATED: 3,
    OBSIDIAN_OBTAINED: 4,
    DEMO_CLEAR: 5
};
const SAVE_WORDS = {
    0: "はる",
    1: "すな",
    2: "かに",
    3: "そら",
    4: "とり",
    5: "ほし",
    6: "くも",
    7: "さる",
    8: "たに",
    9: "あき"
};

const WORD_TO_NUMBER = {
    "はる": "0",
    "すな": "1",
    "かに": "2",
    "そら": "3",
    "とり": "4",
    "ほし": "5",
    "くも": "6",
    "さる": "7",
    "たに": "8",
    "あき": "9"
};
function applyProgress(progress){

    if(progress >= PROGRESS.IYO_APPEARED){
        setFlag("iyoAppeared");
    }

    if(progress >= PROGRESS.NOJIRI_TUTORIAL){
        setFlag("nojiriTutorialFinished");
    }

    if(progress >= PROGRESS.NAUMANN_DEFEATED){
        setFlag("naumannDefeated");
    }

    if(progress >= PROGRESS.OBSIDIAN_OBTAINED){
        setFlag("obsidianObtained");
    }

    if(progress >= PROGRESS.DEMO_CLEAR){
        setFlag("demoClear");
    }

}
function resetWorld(){

    gameState.flags = {};

}
function createSaveCode(){

    return (
        playerStatus.exp +
        "-" +
        gameState.progress
    );

}

function parseSaveCode(code){

    const parts = code.split("-");

    return {
        exp: Number(parts[0]),
        progress: Number(parts[1])
    };

}

//暗号化
function encodeSaveCode(){

    const expCode =
        String(playerStatus.exp)
        .split("")
        .map(num => SAVE_WORDS[num])
        .join("");

    const progressCode =
        SAVE_WORDS[gameState.progress];

    return (
        expCode +
        "いのり" +
        progressCode
    );

}

function decodeSaveCode(spell){

    const parts =
        spell.split("いのり");

    const expSpell =
        parts[0];

    const progressSpell =
        parts[1];

    let exp = "";

    for(
        let i = 0;
        i < expSpell.length;
        i += 2
    ){

        const word =
            expSpell.slice(i, i + 2);

        exp +=
            WORD_TO_NUMBER[word];

    }

    const progress =
        Number(
            WORD_TO_NUMBER[
                progressSpell
            ]
        );

    return {
        exp: Number(exp),
        progress
    };

}
