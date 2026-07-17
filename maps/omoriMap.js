maps.omoriShellMounds = {
    name: "縄文時代　大森貝塚",

    description: [
        "現在の東京都。",
        "貝がらや動物の骨など",
        "食べたものを捨てていたようだ。"
    ],
    allowHimikoFollower: true,
    encounterRate: 7,
    clearEncounterRate: 2,
    clearFlag: "doguDefeated",
    maxEncounterCount: 2,
    encounterTable: [
        "shell",
        "rabbit"
    ],
    
    tiles: [

        [7,7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,7,7,4],
        [7,7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,4],
        [7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
        [2,2,2,2,2,5,5,5,5,5,5,2,2,2,5,5,5,2,2,4,4],
        [2,2,2,5,5,4,4,2,2,2,2,5,5,5,2,2,2,2,2,4,4],

        [2,2,2,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
        [2,2,2,4,4,7,2,2,5,5,2,2,2,2,2,2,2,5,5,4,4],
        [2,2,2,4,4,7,2,2,2,2,5,5,5,5,5,5,5,2,2,4,4],
        [2,2,2,4,4,7,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
        [2,2,2,4,4,7,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
        
        [2,2,2,4,4,2,2,5,5,5,5,5,5,5,5,5,2,2,2,4,4],
        [2,2,2,2,2,5,5,7,2,2,2,2,2,2,2,2,2,2,2,4,4],
        [7,2,2,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4],
        [7,2,2,2,2,4,7,2,2,2,2,6,6,2,2,2,2,2,2,2,4],
        [7,2,2,2,2,4,7,2,2,2,2,6,6,2,2,2,2,2,2,2,4],
        
        [2,2,2,2,2,4,5,5,2,2,2,2,2,2,2,2,2,2,2,2,4],
        [5,5,2,2,2,4,4,4,2,2,2,2,2,2,2,2,2,5,5,5,4],
        [2,2,5,5,2,2,2,4,2,2,2,2,2,2,2,5,5,2,7,7,4],
        [2,2,2,2,2,2,2,4,2,2,2,2,2,2,2,2,2,2,2,7,4],
        [7,2,2,2,2,2,2,4,5,5,2,2,2,2,2,2,2,2,2,2,4],

        [7,2,2,2,2,5,5,4,4,4,5,5,5,5,5,2,2,2,2,2,4],
        [7,2,2,5,5,2,2,2,2,4,4,4,4,4,4,2,2,2,2,2,4],
        [2,2,2,2,2,2,2,2,2,2,2,7,4,7,2,2,2,2,2,5,4],
        [2,2,2,2,2,2,2,2,2,7,2,2,4,7,7,2,2,2,2,4,4],
        [5,5,5,5,5,5,5,5,5,5,2,2,4,5,5,5,5,5,5,4,4]

    ],

    objects: [
        {
            id: "mirrorReturn",
            x: 11,
            y: 24,
            active: true,
            solid: true,
            event: "omoriReturn"
        },
        {
            id: "morse",
            x: 6,
            y: 17,
            active: true,
            solid: true,
            direction: "left",
            event: "meetMorse"
        },
        {
            id: "doguonMap",
            x: 11,
            y: 0,
            active: true,
            solid: true,
            event: "dogu"
        },
        {
            id: "mob",
            x: 17,
            y: 11,
            active: true,
            solid: true,
            direction: "left",
            event: "doguHintA"
        },
        {
            id: "mob",
            x: 19,
            y: 15,
            active: true,
            solid: true,
            direction: "left",
            event: "doguHintB"
        },
        {
            id: "mob",
            x: 19,
            y: 21,
            active: true,
            solid: true,
            direction: "left",
            event: "doguHintC"
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
            id: "mob",
            x: 8,
            y: 18,
            active: true,
            solid: true,
            direction: "right",
            event: "omorimob3"
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
            id: "mobF",
            x: 15,
            y: 16,
            active: true,
            solid: true,
            direction: "up",
            event: "omorimobF2"
        },
        {
            id: "mobF",
            x: 16,
            y: 19,
            active: true,
            solid: true,
            direction: "right",
            event: "omorimobF3"
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
            y: 22,
            active: true,
            solid: true,
            event: "omoriHouse3"
        },
        {
            id: "houseR",
            x: 17,
            y: 22,
            active: true,
            solid: true,
            event: "omoriHouse3"
        },        
        {
            id: "spring",
            x: 17,
            y: 19,
            active: true,
            solid: true,
            event: "recoverySpring"
        }
    ],


    tileEvents: [
        {
            x: 9,
            y: 22,
            event: "omoriShell"
        },
        {
            x: 4,
            y: 16,
            event: "morseStop"
        }
    ]
};
