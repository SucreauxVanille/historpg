const maps = {

    himikoHouse: {

        tiles: [
            [1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,1],
            [1,1,1,1,0,1,1,1,1]
        ],

        objects: [
                {
        id: "himiko",
        x: 6,
        y: 4,

        direction: "right",

        active: true,
        solid: true,

        event: "prologue_himiko"
    },
                            {
        id: "brother",
        x: 3,
        y: 7,

        direction: "right",

        active: true,
        solid: true,

        event: "prologue_brother"
    },
             {
                id: "stamp",
                x: 7,
                y: 1,
                active: true,
                solid: true,
                event: "prologue_stamp"
            },
            {
                id: "mirror",
                x: 4,
                y: 2,
                active: true,
                solid: true,
                event: "prologue_mirror"
            },
            {
                id: "bed",
                x: 7,
                y: 4,
                active: true,
                solid: true,
                event: "prologue_bed"
            }
        ]


    }

};
