function getAvailableSkills(){
    const heroLevel =
        getLevel(playerStatus);

    return Object.values(skills)
        .filter(skill =>
            skill.learnLevel <= heroLevel
        );

}
function applySkill(skill){

    let target;

    switch(skill.target){

        case "player":
            target = playerStatus;
            break;

        case "partner":
            target = himikoStatus;
            break;

        case "enemy":
            target = currentEnemy;
            break;
    }
        if(skill.duration === "nextAttack"){
    battleEffects.playerAttackMultiplier = skill.value;
           
    return;
}
if(!target) return;
if(!(skill.stat in target)) return;

    switch(skill.method){
        case "multiply":
            target[skill.stat] *= skill.value;
            break;

case "add":

    target[skill.stat] += skill.value;

    if(skill.stat === "hp"){

        const status = getStatus(target);

        if(target.hp > status.maxHp){
            target.hp = status.maxHp;
        }

    }

    break;
    }

}
