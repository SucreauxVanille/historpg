maps.suemuraMap1 = {
    name: "古墳時代　陶邑",

    description: [
        "現在の大阪府。",
        "焼き物を作るための",
        "窯を多く設置した集落。"
    ],
    allowHimikoFollower: true,
    encounterRate: 7,
    clearEncounterRate: 2,
    clearFlag: "doguDefeated",
    maxEncounterCount: 3,
    encounterTable: [
        "boar",
        "rabbit"
    ],
    
    tiles: [

        [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
        [7,7,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,7],
        [7,2,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,7],
        [7,2,2,2,4,4,2,2,2,2,2,2,2,2,7,7,2,2,2,3,7],
        [7,2,2,2,2,4,7,7,2,2,2,5,5,2,2,2,2,2,2,2,7],

        [7,2,2,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4,7],
        [7,2,2,4,2,7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [7,2,2,1,2,7,2,2,2,2,2,2,2,5,5,5,5,2,2,2,7],
        [2,2,2,4,2,7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [2,2,2,4,4,7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        
        [2,2,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [2,2,2,2,4,2,2,7,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [7,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [7,2,2,2,4,7,7,2,2,2,2,7,7,2,2,2,2,2,2,2,7],
        [7,2,2,2,4,2,7,2,2,2,2,2,7,2,2,2,2,2,2,2,7],
        
        [7,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [7,2,2,4,2,2,7,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [7,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,7,7,7],
        [7,2,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,7],
        [7,7,7,7,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]

    ],

    objects: [
        {
            id: "mirrorReturn",
            x: 18,
            y: 18,
            active: true,
            solid: true,
            event: "returnMirror"
        },

        {
            id: "mob",
            x: 18,
            y: 7,
            active: true,
            solid: true,
            direction: "down",
            event: "omorimob1"
        },
        {
            id: "mob",
            x: 7,
            y: 12,
            active: true,
            solid: true,
            direction: "right",
            event: "omorimob2"
        },

        {
            id: "mobF",
            x: 10,
            y: 13,
            active: true,
            solid: true,
            direction: "right",
            event: "omorimobF1"
        },

        {
            id: "houseL",
            x: 8,
            y: 11,
            active: true,
            solid: true,
            event: "omoriHouse2"
        },
        {
            id: "houseR",
            x: 9,
            y: 11,
            active: true,
            solid: true,
            event: "omoriHouse2"
        },
        {
            id: "houseL",
            x: 17,
            y: 13,
            active: true,
            solid: true,
            event: "omoriHouse"
        },
        {
            id: "houseR",
            x: 18,
            y: 13,
            active: true,
            solid: true,
            event: "omoriHouse"
        },
        {
            id: "houseL",
            x: 16,
            y: 16,
            active: true,
            solid: true,
            event: "omoriHouse3"
        },
        {
            id: "houseR",
            x: 17,
            y: 16,
            active: true,
            solid: true,
            event: "omoriHouse3"
        },        
        {
            id: "spring",
            x: 17,
            y: 10,
            active: true,
            solid: true,
            event: "recoverySpring"
        }
    ],


    tileEvents: [
        {
            x: 9,
            y: 11,
            event: "omoriShell"
        }
    ]
};
