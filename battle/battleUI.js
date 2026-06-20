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
    document.getElementById(
        "enemyImage"
    ).src = currentEnemy.image;
    document.getElementById(
        "enemyName"
    ).textContent = currentEnemy.name;
    setBattleLog(
        currentEnemy.name +
        " が あらわれた！"
    );
    updateBattleStatus();

    showBattleScreen();

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

        "ゆうしゃ Lv" +
        hero.lv +
        "<br>" +

        "体力 " +
        hero.hp +
        "/" +
        hero.hp +
        "<br>" +

        "気力 " +
        hero.mp +
        "/" +
        hero.mp;

}

//攻撃
function attackEnemy(){

    currentEnemy.hp -= 10;

    setBattleLog(
        "ゆうしゃのこうげき！\n" +
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
document
.getElementById("attackBtn")
.addEventListener(
    "click",
    attackEnemy
);
