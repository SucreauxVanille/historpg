// 現在行動中の敵スロット取得
function getCurrentEnemySlot(){

    const slots =
        document.querySelectorAll(".enemySlot");

    const enemyIndex =
        battleEnemies.indexOf(currentEnemy);

    let slotNumber;

    switch(battleEnemies.length){

        case 1:
            slotNumber = 1;
            break;

        case 2:
            slotNumber =
                enemyIndex === 0 ? 0 : 2;
            break;

        default:
            slotNumber = enemyIndex;
            break;

    }

    return slots[slotNumber];

}

// 敵ジャンプ演出
function playEnemyJump(){

    const slot =
        getCurrentEnemySlot();

    if(!slot){
        return;
    }

    slot.classList.add("enemyJump");

    setTimeout(() => {

        slot.classList.remove("enemyJump");

    }, 250);

}
