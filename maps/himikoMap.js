maps.himikoHouse = {
name: "弥生時代　邪馬台国",

description: [
    "現在の都道府県は不明。",
    "女王・卑弥呼が統治し、",
    "中国に使者を送った。"
],
allowHimikoFollower: false,
        tiles: [
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
        y: 9,
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

        event: "himiko"
    },
            
    {
    id:"iyo",
    x:5,
    y:9,
    active:false,
    solid: true,
    direction:"up",
    event:"iyo"
    },
            
         {
        id: "brother",
        x: 4,
        y: 8,

        direction: "right",

        active: true,
        solid: true,

        event: "brother"
    },
             {
                id: "stamp",
                x: 8,
                y: 1,
                active: true,
                solid: true,
                event: "stamp"
            },
            {
                id: "mirror",
                x: 4,
                y: 1,
                active: true,
                solid: true,
                event: "mirror"
            },
            {
                id: "bed",
                x: 8,
                y: 5,
                active: true,
                solid: true,
                event: "bed"
            }
        ]

    }
