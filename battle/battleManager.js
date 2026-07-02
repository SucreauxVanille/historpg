//==========================================
// battleManager.js
// 戦闘全体の進行管理
//==========================================

//フェイズ管理
let battlePhase = "none";

//プレイヤー＆敵状態
let battleState = "none";
let battleEnemies = [];
let currentEnemy = null;
let selectedSkill = null;

let battleFinishedCallback = null;
let battleExp = 0;

//UI管理
function updateBattleUI(){

    const isCommand =
        battleState === "command";

    document.getElementById("battleCommand")
        .style.display =
            isCommand ? "flex" : "none";

    document.getElementById("battleLog")
        .style.display =
            isCommand ? "none" : "block";
}

function setBattlePhase(phase){
    battlePhase = phase;
    updateBattleUI();
}
function setBattleState(state){
    battleState = state;
    updateBattleUI();
}

//バトルステート切り替え
function nextBattleState(){

    switch(battleState){

case "player":
    if(himikoStatus.hp > 0){
        setBattleState("partner");
        himikoTurn();
    }else{
        setBattleState("enemy");
        enemyTurn();
    }
    break;

case "partner":
    setBattleState("enemy");
    enemyTurn();
    break;

case "enemy":
    setBattleState("command");
    setBattlePhase("waiting");
    setBattleLog("");
    break;
    }

}

//敵情報取得
function getCurrentEnemyImage(){

    const slots =
        document.querySelectorAll(".enemySlot");

    const enemyIndex =
        battleEnemies.indexOf(currentEnemy);

    let slotNumber;

    switch(battleEnemies.length){

        case 1:
            slotNumber = 1;
            break;

        case 2:
            slotNumber =
                enemyIndex === 0 ? 0 : 2;
            break;

        default:
            slotNumber = enemyIndex;
            break;
    }

    return slots[slotNumber]
        .querySelector(".enemyImage");
}

//バトル開始
function startBattle(enemyIds, onFinish = null){
    battleFinishedCallback = onFinish;
setBattleState("none");
setBattlePhase("none");
    battleExp = 0;
battleEnemies = enemyIds.map(id => ({
    ...enemies[id]
}));

currentEnemy = battleEnemies[0];

updateEnemyDisplay();
    updateBattleStatus();

    // 出現ログ
const appearText =
    battleEnemies
        .map(enemy => enemy.name + " が あらわれた！")
        .join("\n");

setBattleLog(appearText);

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
function updateEnemyDisplay(){

    const slots =
        document.querySelectorAll(".enemySlot");

    //一度すべて非表示
    slots.forEach(slot => {
        slot.style.display = "none";
    });

    //表示に使うスロット番号
    let slotIndex = [];

    switch(battleEnemies.length){

        case 1:
            slotIndex = [1];
            break;

        case 2:
            slotIndex = [0, 2];
            break;

        default:
            slotIndex = [0, 1, 2];
            break;
    }

    //敵を表示
    battleEnemies.forEach((enemy, i) => {

        const slot = slots[slotIndex[i]];

        slot.style.display = "flex";

        slot.querySelector(".enemyImage").src =
            enemy.image;

        slot.querySelector(".enemyName").textContent =
            enemy.name;

    });

}

//敵撃破
function removeCurrentEnemy(){

    battleExp += currentEnemy.exp;

    const defeatedEnemyName =
        currentEnemy.name;

    // 現在の敵を削除
    battleEnemies.shift();

    // 撃破ログ
    setBattleLog(
        defeatedEnemyName + " をたおした！"
    );

    // ログ表示時間
    setTimeout(() => {

        // 全滅した
        if(battleEnemies.length === 0){

            currentEnemy = null;

            updateEnemyDisplay();

            processVictory();
            return;
        }

        // 次の敵へ
        currentEnemy = battleEnemies[0];

        updateEnemyDisplay();

        // 今の行動者に応じて次へ進める
        nextBattleState();

    }, 600);

}

//バトル終了
function endBattle(result = "win"){
setBattleState("none");
setBattlePhase("none");

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
