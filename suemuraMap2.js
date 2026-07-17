maps.suemuraMap2 = {
    name: "古墳時代　陶邑",

    description: [
        "現在の大阪府。",
        "焼き物を作るための",
        "窯を多く設置した集落。"
    ],
    allowHimikoFollower: true,
    encounterRate: 3,
    clearEncounterRate: 1,
    clearFlag: "haniwaDefeated",
    maxEncounterCount: 3,
    encounterTable: [
        "boar",
        "rabbit",
        "haniwa"
    ],
    
    tiles: [

        [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
        [7,2,2,2,3,3,3,3,3,7,7,7,7,5,5,5,5,5,5],
        [7,2,2,2,2,3,5,5,5,5,5,5,5,2,2,2,2,3,7],
        [7,2,2,2,5,5,7,7,7,2,2,2,2,2,2,2,3,3,7],
        [7,5,5,5,2,2,2,2,2,2,3,2,2,2,2,2,3,3,7],

        [7,5,5,5,2,7,7,7,2,2,3,7,7,2,2,2,7,7,7],
        [7,2,2,2,7,7,7,7,2,2,2,7,2,2,2,2,7,7,7],
        [7,2,2,2,2,7,7,2,2,2,2,7,2,2,7,7,7,7,7],
        [7,2,2,2,2,7,7,2,2,2,7,7,2,2,7,7,7,7,7],
        [7,2,2,2,7,7,7,2,2,2,7,7,2,2,7,7,2,2,2],
        
        [7,7,2,2,2,7,7,7,2,2,7,7,2,2,7,7,2,2,7],
        [7,7,3,2,2,7,7,7,2,2,2,7,2,2,7,2,2,2,7],
        [7,7,3,3,2,2,2,2,2,2,7,2,2,2,2,2,2,7,7],
        [7,7,7,7,7,7,3,3,2,2,7,2,2,2,2,2,2,7,7],
        [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]

    ],
    
    objects: [
        {
            id: "yong",
            x: 1,
            y: 6,
            active: true,
            solid: true,
            direction: "down",
            event: "yong"
        },
        {
            id: "kiln",
            x: 2,
            y: 5,
            active: true,
            solid: true,
            direction: "down",
            event: "kiln"
        },
        {
            id: "mobF",
            x: 9,
            y: 10,
            active: true,
            solid: true,
            direction: "right",
            event: "omorimobF1"
        }
    ],

    tileEvents: [
        {
            x: 18,
            y: 9,
            event: "moveSuemura1"
        }
    ]
};
