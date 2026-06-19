console.log("battleUI loaded");
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
function startBattle(enemyId){

    document.getElementById("battleScreen")
        .style.display = "block";

    document.getElementById("controls")
        .style.display = "none";

    document.getElementById("messageBox")
        .style.display = "none";

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
