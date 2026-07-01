maps.omoriShellMounds = {
    name: "縄文時代　大森貝塚",

    description: [
        "現在の東京都。",
        "貝がらや動物の骨など",
        "食べたものを捨てていたようだ。"
    ],
    allowHimikoFollower: true,
    encounterRate: 7,
    maxEncounterCount: 2,
    encounterTable: [
        "shell",
        "rabbit"
    ],
    
    tiles: [

        [3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,5,4],
        [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,5,5,4],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
        [2,2,2,2,2,5,5,5,5,5,5,2,2,2,5,5,5,2,2,4,4],
        [2,2,2,5,5,4,4,2,2,2,2,5,5,5,2,2,2,2,2,4,4],

        [2,2,2,5,5,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
        [2,2,2,5,5,4,2,2,5,5,2,2,2,2,2,2,2,5,5,4,4],
        [2,2,2,4,4,4,2,2,2,2,5,5,5,5,5,5,5,2,2,4,4],
        [2,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
        [2,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
        
        [2,2,2,4,4,2,2,5,5,5,5,5,5,5,5,5,2,2,2,4,4],
        [2,2,2,2,2,5,5,2,2,2,2,2,2,2,2,2,2,2,2,4,4],
        [2,2,2,2,2,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,4],
        [3,2,2,2,2,4,2,2,2,2,2,6,6,2,2,2,2,2,2,2,4],
        [3,2,2,5,5,4,2,2,2,2,2,6,6,2,2,2,2,2,2,2,4],
        
        [2,2,2,5,5,4,5,5,2,2,2,2,2,2,2,2,2,2,2,2,4],
        [2,2,2,2,2,4,4,4,2,2,2,2,2,2,2,2,2,5,5,5,4],
        [5,5,2,2,2,2,2,4,2,2,2,2,2,2,2,5,5,2,3,3,4],
        [5,5,2,2,2,2,2,4,2,2,2,2,2,2,2,2,2,2,2,3,4],
        [2,2,2,2,2,2,2,4,5,5,2,2,2,2,2,2,2,2,2,2,4],

        [2,2,2,2,2,5,5,4,4,4,5,5,5,5,5,2,2,3,3,2,4],
        [3,2,2,5,5,2,2,2,2,4,4,4,4,4,4,2,2,2,2,2,4],
        [2,2,2,2,2,2,2,2,2,2,2,3,4,2,2,2,2,2,2,5,4],
        [2,2,2,2,2,2,2,2,2,3,2,2,4,2,2,2,2,2,2,4,4],
        [5,5,5,5,5,5,5,5,5,5,2,2,4,5,5,5,5,5,5,4,4]

    ],

    objects: [
        {
            id: "mirrorReturn",
            x: 11,
            y: 24,
            active: true,
            solid: true,
            event: "returnMirror"
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
            id: "mob",
            x: 18,
            y: 10,
            active: true,
            solid: true,
            direction: "right",
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
            id: "mobF",
            x: 16,
            y: 9,
            active: true,
            solid: true,
            direction: "right",
            event: "omorimobF1"
        },
        {
            id: "houseL",
            x: 10,
            y: 12,
            active: true,
            solid: true,
            event: "omoriHouse"
        },
        {
            id: "houseR",
            x: 11,
            y: 12,
            active: true,
            solid: true,
            event: "omoriHouse"
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
            event: "omoriHouse2"
        },
        {
            id: "houseR",
            x: 17,
            y: 22,
            active: true,
            solid: true,
            event: "omoriHouse2"
        }
    ],


    tileEvents: [
        {
            x: 9,
            y: 22,
            event: "omoriShell"
        }
    ]
};
