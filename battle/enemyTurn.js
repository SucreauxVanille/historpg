//敵ターン
function enemyTurn(){

    if(battleState !== "enemy") return;

    setBattlePhase("action");
    setBattleLog(
        currentEnemy.name + " の攻撃！"
    );

    setTimeout(() => {

        // 生存者からランダム選択
        const targets =
            [playerStatus, himikoStatus]
            .filter(member => member.hp > 0);

        const target =
            targets[
                Math.floor(
                    Math.random() * targets.length
                )
            ];

        const targetStatus =
            getStatus(target);

        // ダメージ計算
        let damage =
            Math.floor(
                currentEnemy.atk -
                targetStatus.def / 2
            );

        if(damage < 0){
            damage = 0;
        }

        damage +=
            1 + Math.floor(Math.random() * 2);

        // ダメージ適用
        target.hp -= damage;

        if(target.hp < 0){
            target.hp = 0;
        }

        setBattleLog(
            target.name +
            " は " +
            damage +
            " のダメージをうけた！"
        );

        updateBattleStatus();

setTimeout(() => {
    if(target.hp <= 0){

        setBattleLog(
            target.name +
            " は倒れた！"
        );

        setTimeout(() => {

            if(isPartyAllDead()){
                gameOver();
                return;
            }

            nextBattleState();
        }, 800);

    }else{

        nextBattleState();
    }

}, 600);
}, 800);
}
