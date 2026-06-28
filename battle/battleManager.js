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
