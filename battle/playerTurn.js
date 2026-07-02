//攻撃
function attackEnemy(){

if(battleState !== "command") return;

setBattleState("player");
setBattlePhase("action");

    const hero = getStatus(playerStatus);

    // 勇者が倒れている場合は攻撃を飛ばす

    if(hero.hp <= 0){
    nextBattleState();
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
            getCurrentEnemyImage()
        );

            setBattleLog(
                currentEnemy.name +
                " に " +
                damage + " のダメージ！"
            );

            // ダメージ表示時間
            setTimeout(() => {

if(currentEnemy.hp <= 0){
    removeCurrentEnemy();
    return;
}

nextBattleState();
           }, 600);
        }, 500);
    }, 400);
}

//技
function useSkill(skill){

    if(battleState !== "command") return;

    setBattleState("player");
    setBattlePhase("action");

    setTimeout(() => {

setBattleLog(skill.castMessage);

setTimeout(() => {

    applySkill(skill);

    setBattleLog(skill.successMessage);

    setTimeout(() => {

        nextBattleState();

    }, 600);

}, 600);
    }, 400);

}
