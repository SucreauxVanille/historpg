function showBattleScreen(){

    document
        .getElementById("battleScreen")
        .style.display = "block";

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
    showBattleScreen();

}
function endBattle(){

    document.getElementById("battleScreen")
        .style.display = "none";

    document.getElementById("controls")
        .style.display = "flex";

}
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
