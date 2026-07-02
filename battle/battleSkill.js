function getAvailableSkills(){

    const heroLevel =
        getLevel(playerStatus);

    return Object.values(skills)
        .filter(skill =>
            skill.learnLevel <= heroLevel
        );

}
