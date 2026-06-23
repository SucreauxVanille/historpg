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
HP ${hero.hp}/${hero.maxHp}<br>
MP ${hero.mp}/${hero.maxMp}
</div>

<div>
${himiko.name} Lv${himiko.level}<br>
HP ${himiko.hp}/${himiko.maxHp}<br>
MP ${himiko.mp}/${himiko.maxMp}
</div>
`;
}

//攻撃
function attackEnemy(){

    if(battleState !== "player") return;

    battleState = "enemy";
    setBattlePhase("action");

    const hero = getStatus(playerStatus);

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

                    playerStatus.exp += currentEnemy.exp;

                    setBattlePhase("victory");
                    updateBattleUI();

                    setBattleLog(
                        currentEnemy.name + "をたおした！\n" +
                        currentEnemy.exp + " の経験値を獲得！"
                    );

                    setTimeout(() => {

                        document.getElementById("enemyImage")
                            .style.display = "none";

                        document.getElementById("enemyName")
                            .textContent = "";

                    }, 500);

                    return;
                }

                setTimeout(himikoTurn, 600);

            }, 600);

        }, 500);

    }, 400);

}
function himikoTurn(){

    const himiko = getStatus(himikoStatus);

    const lowHpMember =
        [playerStatus, himikoStatus].find(member =>
            member.hp > 0 &&
            member.hp < 15
        );

    // 回復
    if(lowHpMember && himikoStatus.mp >= 4){

        setBattleLog("卑弥呼は癒しの呪術を使った！");

        setTimeout(() => {

            flashScreen();

            lowHpMember.hp =
                getStatus(lowHpMember).maxHp;

            himikoStatus.mp -= 4;

            updateBattleStatus();

            setBattleLog(
                lowHpMember.name +
                " の傷が癒えた！"
            );

            setTimeout(enemyTurn, 800);

        }, 600);

        return;
    }

    // 火の呪術
    if(himikoStatus.mp >= 4){

        setBattleLog("卑弥呼は火の呪術を使った！");

        setTimeout(() => {

            const damage =
                himiko.level +
                8 +
                Math.floor(Math.random() * 3);

            currentEnemy.hp -= damage;

            himikoStatus.mp -= 4;

            flashElement(
                document.getElementById("enemyImage")
            );

            setBattleLog(
                currentEnemy.name +
                " に " +
                damage +
                " のダメージ！"
            );

            updateBattleStatus();

            setTimeout(() => {

                if(currentEnemy.hp <= 0){

                    playerStatus.exp += currentEnemy.exp;

                    setBattlePhase("victory");
                    updateBattleUI();

                    setBattleLog(
                        currentEnemy.name +
                        "をたおした！\n" +
                        currentEnemy.exp +
                        " の経験値を獲得！"
                    );

                    return;
                }

                enemyTurn();

            }, 800);

        }, 600);

        return;
    }

    // MP不足なら通常攻撃
    setBattleLog("卑弥呼の攻撃！");

    setTimeout(() => {

        const damage =
            Math.floor(
                himiko.atk *
                (0.9 + Math.random() * 0.2)
            );

        currentEnemy.hp -= damage;

        flashElement(
            document.getElementById("enemyImage")
        );

        setBattleLog(
            currentEnemy.name +
            " に " +
            damage +
            " のダメージ！"
        );

        setTimeout(() => {

            if(currentEnemy.hp <= 0){

                playerStatus.exp += currentEnemy.exp;

                setBattlePhase("victory");
                updateBattleUI();

                setBattleLog(
                    currentEnemy.name +
                    "をたおした！\n" +
                    currentEnemy.exp +
                    " の経験値を獲得！"
                );

                return;
            }

            enemyTurn();

        }, 800);

    }, 600);
}
//敵ターン
function enemyTurn(){

    setBattlePhase("action");
    setBattleLog(currentEnemy.name + " の攻撃！");

    setTimeout(() => {

        const damage = currentEnemy.atk;

        playerStatus.hp -= damage;
        if(playerStatus.hp < 0){
        playerStatus.hp = 0;
        }

        setBattleLog(
            "ゆうしゃは " +
            damage +
            " のダメージをうけた！"
        );

        updateBattleStatus();

        setTimeout(() => {

            battleState = "player";
            setBattlePhase("waiting");

        }, 600);

    }, 600);

}
//にげる
function runAway(){
    if(battleState !== "player") return;

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
