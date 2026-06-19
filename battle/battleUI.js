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

function startBattle(enemyId){

    currentEnemy = {
        ...enemies[enemyId]
    };

    document.getElementById(
        "enemyName"
    ).textContent = currentEnemy.name;

    showBattleScreen();

}
function endBattle(){

    document.getElementById("battleScreen")
        .style.display = "none";

    document.getElementById("controls")
        .style.display = "flex";

}
document
.getElementById("battleTestBtn")
.addEventListener(
    "click",
    endBattle
);
