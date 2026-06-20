//フェイズ管理
let battlePhase = "none";

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
let currentEnemy = null;
function setBattleLog(text){

    document.getElementById(
        "battleLog"
    ).textContent = text;

}
function startBattle(enemyId){

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

    // ここが重要：次の操作を待つ
    setBattlePhase("intro");

}
function endBattle(){

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

    currentEnemy.hp -= 10;

    setBattleLog(
        "ゆうしゃの攻撃！\n" +
        currentEnemy.name +
        " に 10 のダメージ！"
    );

    if(currentEnemy.hp <= 0){

        startMessage(
            [
                currentEnemy.name +
                "をたおした！"
            ],
            endBattle
        );

    }

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
