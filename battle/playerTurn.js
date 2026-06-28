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
           document.querySelector(".enemyImage")
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
