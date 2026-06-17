const maps = {

    himikoHouse: {

        tiles: [
            [1,1,1,1,1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1,1],
            [1,1,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,1,1],
            [1,1,0,0,0,0,0,0,0,1,1],
            [1,1,1,1,1,0,1,1,1,1,1]
        ],
tileEvents: [
    {
        x: 5,
        y: 10,
        event: "houseExit"
    }
],
        objects: [
                {
        id: "himiko",
        x: 7,
        y: 5,

        direction: "right",

        active: true,
        solid: true,

        event: "prologue_himiko"
    },
            
    {
    id:"iyo",
    x:5,
    y:10,
    active:false,
    solid: true,
    direction:"up"
    },
            
         {
        id: "brother",
        x: 4,
        y: 9,

        direction: "right",

        active: true,
        solid: true,

        event: "prologue_brother"
    },
             {
                id: "stamp",
                x: 8,
                y: 2,
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
                x: 8,
                y: 5,
                active: true,
                solid: true,
                event: "prologue_bed"
            }
        ]


    }

};
