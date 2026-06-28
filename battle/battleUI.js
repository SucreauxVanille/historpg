//クリック動作
document.getElementById("battleLog").addEventListener("click", function(){
    if(battlePhase === "intro" || battlePhase === "waiting"){

        setBattlePhase("command");

        setBattleLog("");
        return;
    }
    if(battlePhase === "victory"){
        endBattle();
    }
});

function showBattleScreen(){
    document
        .getElementById("battleScreen")
        .style.display = "flex";
}

function hideBattleScreen(){
    document
        .getElementById("battleScreen")
        .style.display = "none";
}

function setBattleLog(text){
    document.getElementById(
        "battleLog"
    ).textContent = text;
}

//ステータス
function updateBattleStatus(){

    const hero = getStatus(playerStatus);
    const himiko = getStatus(himikoStatus);

document.getElementById(
    "battleStatus"
).innerHTML =

`
<div>
${hero.name} Lv${hero.level}<br>
体力 ${hero.hp}/${hero.maxHp}<br>
気力 ${hero.mp}/${hero.maxMp}
</div>

<div>
${himiko.name} Lv${himiko.level}<br>
体力 ${himiko.hp}/${himiko.maxHp}<br>
気力 ${himiko.mp}/${himiko.maxMp}
</div>
`;
}


//にげる
function runAway(){
    
    if(battleState !== "player") return;
    
    if(currentEnemy.boss){
    setBattleLog("だめだ！にげられない！");
    setBattlePhase("waiting");
    return;
    }
    
    battleState = "enemy";
    setBattlePhase("action");
    setBattleLog("ゆうしゃはにげだした！");
    setTimeout(() => {

        const success = Math.random() < 0.9;
        if(success){
            setBattleLog("うまくにげきれた！");
            setTimeout(() => {
                endBattle("escape");
            }, 600);

        } else {

            setBattleLog("しかし まわりこまれた！");

            setTimeout(() => {
                enemyTurn();
            }, 800);
        }
    }, 500);
}     

//ボタン

document
.getElementById("runBtn")
.addEventListener(
    "click",
    runAway
); 
