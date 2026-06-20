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

        if(battlePhase === "intro"){

            document.getElementById("battleCommand")
                .style.display = "flex";

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
    currentEnemy = {
        ...enemies[enemyId]
    };

    document.getElementById("enemyImage").src = currentEnemy.image;
    document.getElementById("enemyName").textContent = currentEnemy.name;

    updateBattleStatus();

    // コマンドは最初隠す
    document.getElementById("battleCommand").style.display = "none";

    // 出現ログだけ出す
    setBattleLog(
        currentEnemy.name + " が あらわれた！"
    );

    showBattleScreen();

    // 次の操作を待つ
    setBattlePhase("intro");

}
function endBattle(){
    if(battleFinishedCallback){

        const callback =
            battleFinishedCallback;

        battleFinishedCallback = null;

        callback();
    }
    document.getElementById("battleScreen")
        .style.display = "none";

    document.getElementById("controls")
        .style.display = "flex";

}

//ステータス
function updateBattleStatus(){

    const hero =
        getStatus();

    document.getElementById(
        "battleStatus"
    ).innerHTML =

        "ゆうしゃ： Lv" +
        status.level +
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

    setCommandVisible(false);

    currentEnemy.hp -= 10;

    setBattleLog(
        "ゆうしゃの攻撃！\n" +
        currentEnemy.name +
        " に 10 のダメージ！"
    );

    if(currentEnemy.hp <= 0){

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
            setCommandVisible(true);

        }, 600);

    }, 600);
}
//コマンド出現
function showBattleCommand(){

    document.getElementById(
        "battleCommand"
    ).style.display = "flex";

}
//攻撃ボタン
document
.getElementById("attackBtn")
.addEventListener(
    "click",
    attackEnemy
);
