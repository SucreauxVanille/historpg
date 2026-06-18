// =====================
//   主人公
// =====================

const player = {
    x: 8,
    y: 5,
    direction: "down",

    moving: false
};

//正面タイル取得
function getFrontTile(){

    let x = player.x;
    let y = player.y;

    switch(player.direction){

        case "up":
            y--;
            break;

        case "down":
            y++;
            break;

        case "left":
            x--;
            break;
        case "right":
            x++;
            break;
    }
    return {x, y};
}
