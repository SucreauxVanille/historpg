const tileTypes = {
    floor: {
        id: "floor",
        image: "images/tiles/floor.png",
        passable: true
    },

    wall: {
        color: "#666",
        passable: false
    },
    grass: {
        id: "grass",
        image: "images/tiles/grass.png",
        passable: true
    },

    rock: {
        id: "rock",
        image: "images/tiles/rock.png",
        passable: false
    },

    water: {
        id: "water",
        image: "images/tiles/water.png",
        passable: false
    },
    
    cliff: {
        id: "cliff",
        image: "images/tiles/cliff.png",
        passable: false
    }

};
const tileIds = {
    0: tileTypes.floor,
    1: tileTypes.wall,
    2: tileTypes.grass,
    3: tileTypes.rock,
    4: tileTypes.water,
    5: tileTypes.cliff
};
