//フェイズ管理
let battlePhase = "none";

//プレイヤー＆敵状態
let battleState = "player"; // player / enemy
let currentEnemy = null;

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

//クリック動作
document.getElementById("battleLog").addEventListener("click", function(){
    if(battlePhase === "intro" || battlePhase === "waiting"){

        setBattlePhase("command");

        setBattleLog("");
        return;
    }
    if(battlePhase === "victory"){
        endBattle();
    }
});

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

//ステータス

function updateBattleStatus(){

    const hero = getStatus(playerStatus);
    const himiko = getStatus(himikoStatus);

document.getElementById(
    "battleStatus"
).innerHTML =

`
<div>
${hero.name} Lv${hero.level}<br>
体力 ${hero.hp}/${hero.maxHp}<br>
気力 ${hero.mp}/${hero.maxMp}
</div>

<div>
${himiko.name} Lv${himiko.level}<br>
体力 ${himiko.hp}/${himiko.maxHp}<br>
気力 ${himiko.mp}/${himiko.maxMp}
</div>
`;
}

//攻撃
function attackEnemy(){

    if(battleState !== "player") return;

    battleState = "enemy";
    setBattlePhase("action");

    const hero = getStatus(playerStatus);

    // 勇者が倒れている場合は攻撃を飛ばす

    if(hero.hp <= 0){
        himikoTurn();
        return;
    }

    setTimeout(() => {
        setBattleLog("ゆうしゃの攻撃！");
        setTimeout(() => {

            const damage =
                Math.floor(
                    hero.atk *
                    (0.9 + Math.random() * 0.2)
                );

            currentEnemy.hp -= damage;

            flashElement(
                document.getElementById("enemyImage")
            );

            setBattleLog(
                currentEnemy.name +
                " に " +
                damage + " のダメージ！"
            );

            // ダメージ表示時間
            setTimeout(() => {

if(currentEnemy.hp <= 0){
    processVictory();
    return;
}
                setTimeout(himikoTurn, 600);
           }, 600);
        }, 500);
    }, 400);
}

//にげる
function runAway(){
    
    if(battleState !== "player") return;
    
    if(currentEnemy.boss){
    setBattleLog("だめだ！にげられない！");
    setBattlePhase("waiting");
    return;
    }
    
    battleState = "enemy";
    setBattlePhase("action");
    setBattleLog("ゆうしゃはにげだした！");
    setTimeout(() => {

        const success = Math.random() < 0.9;
        if(success){
            setBattleLog("うまくにげきれた！");
            setTimeout(() => {
                endBattle("escape");
            }, 600);

        } else {

            setBattleLog("しかし まわりこまれた！");

            setTimeout(() => {
                enemyTurn();
            }, 800);
        }
    }, 500);
}     

//ボタン
document
.getElementById("attackBtn")
.addEventListener(
    "click",
    attackEnemy
);

document
.getElementById("runBtn")
.addEventListener(
    "click",
    runAway
); 
