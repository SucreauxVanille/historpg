nojiriLake: {

    tiles: [

        [2,2,2,2,2,2,2,2,2,3,3],
        [4,4,4,4,4,4,2,2,2,2,3],
        [4,4,4,4,4,4,4,2,2,2,3],
        [4,4,4,4,4,4,4,2,2,2,3],
        [4,4,4,4,4,4,2,2,2,2,3],
        [4,4,4,4,4,4,2,2,2,2,3],
        [4,4,4,4,4,4,4,4,2,2,3],
        [4,4,4,4,4,4,4,4,2,2,3],
        [4,4,4,4,4,4,4,4,2,2,3],
        [4,4,4,4,4,4,4,2,2,2,3],
        [2,2,2,2,2,2,2,2,2,2,3]

    ],

    objects: [

        // 帰還用銅鏡
        {
            id: "mirrorReturn",
            x: 0,
            y: 10,
            active: true,
            solid: true,
            event: "returnMirror"
        },

        // 仮ボス（ナウマンゾウ）
        {
            id: "naumann",
            x: 1,
            y: 0,
            active: true,
            solid: true,
            event: "naumannBoss"
        }

    ],

    tileEvents: [

        {
            x: 5,
            y: 10,
            event: "nojiriTutorial"
        }

    ]

},
