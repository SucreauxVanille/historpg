//==========================================
// battleManager.js
// 戦闘全体の進行管理
//==========================================

//フェイズ管理
let battlePhase = "none";

//プレイヤー＆敵状態
let battleState = "player"; // player / enemy
let currentEnemy = null;

let battleFinishedCallback = null;

//UI管理
function updateBattleUI(){
    const isCommand = battlePhase === "command";

    document.getElementById("battleCommand")
        .style.display = isCommand ? "flex" : "none";
    document.getElementById("battleLog")
        .style.display = isCommand ? "none" : "block";
}

function setBattlePhase(phase){
    battlePhase = phase;
    updateBattleUI();
}

//バトル開始
function startBattle(enemyId, onFinish = null){
    battleFinishedCallback = onFinish;
    battleState = "player";
    battlePhase = "none";
    currentEnemy = {
        ...enemies[enemyId]
    }

document.getElementById("enemyImage").src =
    currentEnemy.image;
document.getElementById("enemyImage")
    .style.display = "block";
document.getElementById("enemyName").textContent =
    currentEnemy.name;
    updateBattleStatus();

    // 出現ログだけ出す
    setBattleLog(
        currentEnemy.name + " が あらわれた！"
    );

fadeOut();
document.getElementById("controls")
    .style.display = "none";

setTimeout(() => {
    showBattleScreen();
    fadeIn();

}, 500);
    updateBattleUI(); 
    // 次の操作を待つ
    setBattlePhase("intro");
}

function endBattle(result = "win"){
    battleState = "player";
    battlePhase = "none";

    if(battleFinishedCallback){
        const callback = battleFinishedCallback;
        battleFinishedCallback = null;
        callback(result);
    }

    fadeOut();

    setTimeout(() => {
        hideBattleScreen();
        document.getElementById("controls")
            .style.display = "flex";
        fadeIn();
    }, 500);
}
document
.getElementById("attackBtn")
.addEventListener(
    "click",
    attackEnemy
);
