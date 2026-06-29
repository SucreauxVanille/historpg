//卑弥呼のターン
function himikoTurn(){

    if(battleState !== "partner") return;

    setBattlePhase("action");
    const himiko = getStatus(himikoStatus);
    if(himikoStatus.hp <= 0){
    nextBattleState();
    return;
}
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
                " のキズが回復した！"
            );
        nextBattleState();

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
                getCurrentEnemyImage()
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
        removeCurrentEnemy();
    }else{
        nextBattleState();
    }

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
            getCurrentEnemyImage()
        );

        setBattleLog(
            currentEnemy.name +
            " に " +
            damage +
            " のダメージ！"
        );

setTimeout(() => {

    if(currentEnemy.hp <= 0){
        removeCurrentEnemy();
    }else{
        nextBattleState();
    }

}, 800);
    }, 600);
}
