//全滅めつめつ
function isPartyAllDead(){
    return (
        playerStatus.hp <= 0 &&
        himikoStatus.hp <= 0
    );
}
function gameOver(){

    setBattleLog("ゆうしゃたちは全滅した！");

    setTimeout(() => {

        endBattle("gameover");

        // 全回復（先にやる）
        playerStatus.hp = getStatus(playerStatus).maxHp;
        playerStatus.mp = getStatus(playerStatus).maxMp;

        himikoStatus.hp = getStatus(himikoStatus).maxHp;
        himikoStatus.mp = getStatus(himikoStatus).maxMp;

        updateBattleStatus();

        // ここで一拍置く（無）
        setTimeout(() => {

            changeMap(maps.himikoHouse, 5, 5);

            // changeMapのフェード後に表示したいなら
            setTimeout(() => {

                showMessage(
                    "壱与「大丈夫でしたか？邪馬台国にお戻ししました」"
                );
            }, 500); // ←フェード時間に合わせる
        }, 1000);
    }, 2000);
}

//勝利
function processVictory(){

    const heroLevelBefore =
        getLevel(playerStatus);

    const himikoLevelBefore =
        getLevel(himikoStatus);

    playerStatus.exp += battleExp;
    himikoStatus.exp += battleExp;

    const heroLevelAfter =
        getLevel(playerStatus);

    const himikoLevelAfter =
        getLevel(himikoStatus);

    let victoryText =
        currentEnemy.name + "をたおした！\n" +
        battleExp + " の経験値を獲得！";

    if(heroLevelAfter > heroLevelBefore){
        victoryText +=
            "\nゆうしゃは Lv" +
            heroLevelAfter +
            " になった！";
    }

    if(himikoLevelAfter > himikoLevelBefore){
        victoryText +=
            "\n卑弥呼は Lv" +
            himikoLevelAfter +
            " になった！";
    }

    setBattlePhase("victory");
    updateBattleUI();

    setBattleLog(victoryText);
}
