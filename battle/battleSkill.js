function getAvailableSkills(){

    const heroLevel =
        getLevel(playerStatus);

    return Object.entries(skills)
        .filter(([id, skill]) =>
            skill.learnLevel <= heroLevel
        );

}
