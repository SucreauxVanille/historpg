let playerAttackMultiplier = 1;

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
if(!target) return;
if(!(skill.stat in target)) return;
    if(skill.duration === "nextAttack"){
    playerAttackMultiplier = skill.value;
    return;
}
    switch(skill.method){
        case "multiply":
            target[skill.stat] *= skill.value;
            break;

        case "add":
            target[skill.stat] += skill.value;
            break;
    }

}
