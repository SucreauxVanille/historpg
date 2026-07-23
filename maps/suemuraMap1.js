maps.suemuraMap1 = {
    name: "古墳時代　陶邑",

    description: [
        "現在の大阪府。",
        "焼き物を作るための",
        "窯を多く設置した集落。"
    ],
    allowHimikoFollower: true,
    encounterRate: 2,
    clearEncounterRate: 0.1,
    clearFlag: "haniwaDefeated",
    maxEncounterCount: 3,
    encounterTable: [
        "boar",
        "rabbit"
    ],
    
    tiles: [

        [7,7,4,5,5,5,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],
        [5,5,4,4,4,4,5,5,5,5,5,7,7,7,7,5,5,5,5,5,5],
        [7,2,2,4,2,2,2,2,2,2,2,5,5,5,5,2,2,2,2,3,7],
        [7,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,7],
        [7,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,7],

        [7,7,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7,7],
        [7,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [7,2,2,0,2,2,2,2,2,2,2,2,2,2,7,7,7,2,2,2,7],
        [7,2,2,4,7,7,2,2,2,2,2,2,2,3,3,2,2,2,2,2,7],
        [2,2,2,4,7,7,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        
        [7,2,2,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [7,2,2,4,2,2,2,7,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [7,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,7],
        [7,2,2,4,2,7,7,2,2,2,2,7,7,2,2,2,2,2,2,2,7],
        [7,4,4,4,2,7,7,8,8,8,2,2,7,2,2,2,2,2,2,2,7],
        
        [7,4,2,2,2,2,2,8,8,8,2,2,2,2,8,8,8,2,2,2,7],
        [7,4,2,2,2,2,7,8,8,8,2,2,2,2,8,8,8,2,2,2,7],
        [7,4,2,2,2,2,2,2,2,2,2,2,2,2,8,8,8,2,7,7,7],
        [7,4,3,2,2,2,2,2,2,2,2,2,2,7,7,2,2,2,2,7,7],
        [7,4,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7]

    ],
// 0:木の床(橋)　2:草　3:岩　4:水　5:崖　7:木
// 川を渡ると渡来人が一人で住む村外れマップへ
    
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
            id: "potter",
            x: 6,
            y: 5,
            active: true,
            solid: true,
            direction: "down",
            event: "potter"
        },
        {
            id: "bonfire",
            x: 7,
            y: 4,
            active: true,
            solid: true,
            direction: "down",
            event: "bonfire"
        },        
        {
            id: "mob",
            x: 14,
            y: 17,
            active: true,
            solid: true,
            direction: "right",
            event: "suemuramob1"
        },
        {
            id: "mob",
            x: 7,
            y: 10,
            active: true,
            solid: true,
            direction: "down",
            event: "suemuramob2"
        },

        {
            id: "mob",
            x: 1,
            y: 8,
            active: true,
            solid: true,
            direction: "down",
            event: "gateMan"
        },

        {
            id: "houseL",
            x: 8,
            y: 11,
            active: true,
            solid: true,
            event: "suemuraHouse"
        },
        {
            id: "houseR",
            x: 9,
            y: 11,
            active: true,
            solid: true,
            event: "suemuraHouse"
        },
        {
            id: "houseL",
            x: 17,
            y: 13,
            active: true,
            solid: true,
            event: "suemuraHouse2"
        },
        {
            id: "houseR",
            x: 18,
            y: 13,
            active: true,
            solid: true,
            event: "suemuraHouse2"
        },
        {
            id: "houseL",
            x: 16,
            y: 5,
            active: true,
            solid: true,
            event: "omoriHouse3"
        },
        {
            id: "houseR",
            x: 17,
            y: 5,
            active: true,
            solid: true,
            event: "omoriHouse3"
        },        
        {
            id: "spring",
            x: 15,
            y: 10,
            active: true,
            solid: true,
            event: "recoverySpring"
        }
    ],

    tileEvents: [
        {
            x: 0,
            y: 9,
            event: "moveSuemura2"
        }
    ]
};
