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

    switch(skill.method){

        case "multiply":
            // 後で実装
            break;

        case "add":
            // 後で実装
            break;
    }

}
