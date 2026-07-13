function playEnemyJump(index){

    const slots = document.querySelectorAll(".enemySlot");

    if(!slots[index]) return;

    slots[index].classList.add("enemyJump");

    setTimeout(()=>{
        slots[index].classList.remove("enemyJump");
    },250);

}
