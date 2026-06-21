//フェイズ管理
let battlePhase = "none";

//プレイヤー＆敵状態
let battleState = "player"; // player / enemy
let currentEnemy = null;

function setBattlePhase(phase){
    battlePhase = phase;
}
document.getElementById("battleLog").addEventListener(
    "click",
    function(){

        if(
    battlePhase === "intro" ||
    battlePhase === "waiting"
){
    setCommandVisible(true);

    setBattleLog("");

    setBattlePhase("command");
}

    }
);
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

//コマンド管理
function setCommandVisible(flag){

    document.getElementById("battleCommand")
        .style.display = flag ? "flex" : "none";

}

function setBattleLog(text){

    document.getElementById(
        "battleLog"
    ).textContent = text;

}

//バトル開始
let battleFinishedCallback = null;

function startBattle(enemyId, onFinish = null){
    battleFinishedCallback = onFinish;
    battleState = "player";
    battlePhase = "none";
    currentEnemy = {
        ...enemies[enemyId]
    };

document.getElementById("enemyImage").src =
    currentEnemy.image;

document.getElementById("enemyImage")
    .style.display = "block";

document.getElementById("enemyName").textContent =
    currentEnemy.name;
    
    updateBattleStatus();

    // コマンドは最初隠す
   setCommandVisible(false);

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

    // 次の操作を待つ
    setBattlePhase("intro");

}
function endBattle(){
    battleState = "player";
    battlePhase = "none";
    setCommandVisible(false);
    if(battleFinishedCallback){

        const callback =
            battleFinishedCallback;

        battleFinishedCallback = null;

        callback();
    }

    fadeOut();

    setTimeout(() => {

        hideBattleScreen();

        document.getElementById("controls")
            .style.display = "flex";

        fadeIn();

    }, 500);

}

//ステータス
function updateBattleStatus(){

    const hero =
        getStatus();

    document.getElementById(
        "battleStatus"
    ).innerHTML =

        "ゆうしゃ： Lv" +
        hero.level +
        "<br>" +

        "体力： " +
        hero.hp +
        "/" +
        hero.hp +
        "<br>" +

        "気力： " +
        hero.mp +
        "/" +
        hero.mp;

}

//攻撃
function attackEnemy(){

    if(battleState !== "player") return;

    battleState = "enemy";
    setBattlePhase("message");
    setCommandVisible(false);

    currentEnemy.hp -= 10;
    flashElement(
    document.getElementById("enemyImage")
    );
    setBattleLog(
        "ゆうしゃの攻撃！\n" +
        currentEnemy.name +
        " に 10 のダメージ！"
    );

    if(currentEnemy.hp <= 0){
        setBattlePhase("victory");
        document.getElementById("enemyImage")
        .style.display = "none";

        document.getElementById("enemyName")
        .textContent = "";
        setTimeout(() => {

            startMessage(
                [
                    currentEnemy.name + "をたおした！"
                ],
                endBattle
            );

        }, 500);

        return;
    }

    // 敵ターンへ
    setTimeout(enemyTurn, 600);
}
function enemyTurn(){

    setBattleLog(
        currentEnemy.name + " のこうげき！"
    );

    setTimeout(() => {

        setBattleLog(
            "ゆうしゃはダメージをうけた！"
        );

        setTimeout(() => {

battleState = "player";

setBattlePhase("waiting");

        }, 600);

    }, 600);
}

//攻撃ボタン
document
.getElementById("attackBtn")
.addEventListener(
    "click",
    attackEnemy
);
