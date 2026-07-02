//クリック動作
document.getElementById("battleLog").addEventListener("click", function(){

    if(battlePhase === "intro" || battlePhase === "waiting"){

        setBattleState("command");
        setBattlePhase("none");

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


//にげる
function runAway(){
    
if(battleState !== "command") return;
    
    if(currentEnemy.boss){
    setBattleLog("だめだ！にげられない！");
    setBattlePhase("waiting");
    return;
    }
    
    setBattleState("enemy");
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

//技
function openSkillMenu(){

    const skills =
        getAvailableSkills(playerStatus);

    const menu =
        document.getElementById("skillMenu");

    menu.innerHTML = "";

    if(skills.length === 0){

        menu.innerHTML =
            "<button>技を覚えていない！</button>";

    }else{

skills.forEach(skill => {

    const button =
        document.createElement("button");

    button.textContent =
        skill.name;

    button.addEventListener(
        "click",
        () => {

            closeSkillMenu();

            useSkill(skill);

        }
    );

    menu.appendChild(button);

});

    }
const backButton =
    document.createElement("button");

backButton.textContent = "もどる";
backButton.className = "menuButton";

backButton.addEventListener(
    "click",
    closeSkillMenu
);

menu.appendChild(backButton);

    menu.style.display = "block";
}

function closeSkillMenu(){

    document.getElementById("skillMenu")
        .style.display = "none";

    document.getElementById("battleCommand")
        .style.display = "flex";

}
//ボタン
document
.getElementById("skillBtn")
.addEventListener(
    "click",
    openSkillMenu
);

document
.getElementById("runBtn")
.addEventListener(
    "click",
    runAway
); 
