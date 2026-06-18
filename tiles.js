const tileTypes = {
    floor: {
        color: "#c9a063",
        passable: true
    },

    wall: {
        color: "#666",
        passable: false
    },
    grass: {
        color: "#4caf50",
        passable: true
    },

    rock: {
        color: "#666666",
        passable: false
    },

    water: {
        color: "#4aa3ff",
        passable: false
    }

};
const tileIds = {
    0: tileTypes.floor,
    1: tileTypes.wall,
    2: tileTypes.grass,
    3: tileTypes.rock,
    4: tileTypes.water

};
