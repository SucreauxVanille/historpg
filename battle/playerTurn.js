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
    battleEffects.playerAttackMultiplier *
    (0.9 + Math.random() * 0.2)
                );

            currentEnemy.hp -= damage;
            battleEffects.playerAttackMultiplier = 1;
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
    const hero = getStatus(playerStatus);

    setTimeout(() => {
        // 詠唱・使用ログ
        setBattleLog(skill.castMessage);

        setTimeout(() => {

            // MP不足
            if(hero.mp < skill.mp){
                setBattleLog(
                    "しかし 気力がたりない！"
                );

                setTimeout(() => {
                    nextBattleState();
                }, 600);
                return;
            }

            // MP消費
            playerStatus.mp -= skill.mp;
            updateBattleStatus();

            // 技効果
            applySkill(skill);
            if(skill.stat === "hp"){
            playHealEffect();
            }
            updateBattleStatus();
            
            // 成功ログ
            setBattleLog(skill.successMessage);
            setTimeout(() => {
                nextBattleState();
            }, 600);
            
        }, 600);
    }, 400);
}
