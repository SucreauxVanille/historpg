const PROGRESS = {
    START: 0,
    IYO_APPEARED: 1,
    NOJIRI_TUTORIAL: 2,
    NAUMANN_DEFEATED: 3,
    OBSIDIAN_OBTAINED: 4,
    DEMO_CLEAR: 5,
    OMORI_START: 6,
    OMORI_SHELL: 7,
    MET_MORSE: 8,
    DOGU_DEFEATED: 9,
    OMORI_CLEAR: 10
};
const SAVE_WORDS = {
    0: ["はる", "つき"],
    1: ["すな", "よる"],
    2: ["かに", "うみ"],
    3: ["そら", "ほし"],
    4: ["とり", "くも"],
    5: ["さる", "もり"],
    6: ["たに", "かわ"],
    7: ["いし", "きり"],
    8: ["はな", "ゆめ"],
    9: ["あき", "しろ"]
};

const WORD_TO_NUMBER = {
    "はる":"0",
    "つき":"0",
    "すな":"1",
    "よる":"1",
    "かに":"2",
    "うみ":"2",
    "そら":"3",
    "ほし":"3",
    "とり":"4",
    "くも":"4",
    "さる":"5",
    "もり":"5",
    "たに":"6",
    "かわ":"6",
    "いし":"7",
    "きり":"7",
    "はな":"8",
    "ゆめ":"8",
    "あき":"9",
    "しろ":"9"
};

function applyProgress(progress){

if(progress >= PROGRESS.IYO_APPEARED){
    setFlag("iyoAppeared");
    spawnObject("iyo");
    const iyo =
        getObjectById("iyo");
    if(iyo){
        iyo.x = 5;
        iyo.y = 2;
        iyo.direction = "down";
    }
}

if(progress >= PROGRESS.NOJIRI_TUTORIAL){
        setFlag("nojiriTutorialFinished");
    }

if(progress >= PROGRESS.NAUMANN_DEFEATED){
    setFlag("naumannDefeated");
    despawnObject(
        "naumann"
    );
}

if(progress >= PROGRESS.OBSIDIAN_OBTAINED){
    setFlag("obsidianObtained");
    despawnObject(
        "obsidian"
    );
}

if(progress >= PROGRESS.DEMO_CLEAR){
        setFlag("demoClear");
    }
    
if(progress >= PROGRESS.OMORI_SHELL){
        setFlag("omoriShellFinished");
    }
if(progress >= PROGRESS.MET_MORSE){
        setFlag("metMorse");
    }
if(progress >= PROGRESS.DOGU_DEFEATED){
        setFlag("doguDefeated");
    }
if(progress >= PROGRESS.OMORI_CLEAR){
        setFlag("savedMorse");
        setFlag("omoriClear");
    despawnObject(
        "doguonMap"
    );
    }
}
function resetWorld(){

    gameState.flags = {};
    spawnObject("naumann");
    spawnObject("obsidian");

    despawnObject("iyo");
}

//ランダム単語取得
function getSaveWord(num){

    const words = SAVE_WORDS[num];

    return words[
        Math.floor(Math.random() * words.length)
    ];
}

//暗号化
function encodeSaveCode(){

const expCode =
    String(playerStatus.exp)
        .split("")
        .map(getSaveWord)
        .join("");

const progressCode =
    String(gameState.progress)
        .split("")
        .map(getSaveWord)
        .join("");
    
    return (
        expCode +
        "いのり" +
        progressCode
    );
}

//デコード
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

let progress = "";

for(
    let i = 0;
    i < progressSpell.length;
    i += 2
){

    const word =
        progressSpell.slice(i, i + 2);

    progress +=
        WORD_TO_NUMBER[word];

}

progress = Number(progress);

    return {
        exp: Number(exp),
        progress
    };

}
function loadGame(spell){

    const saveData =
        decodeSaveCode(spell);

    playerStatus.exp =
        saveData.exp;
    himikoStatus.exp =
        saveData.exp + 120;
    gameState.progress =
        saveData.progress;

    resetWorld();

    applyProgress(
        gameState.progress
    );

}
