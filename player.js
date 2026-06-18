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
//移動
function movePlayer(dx, dy, direction){

    player.direction = direction;

    const nextX = player.x + dx;
    const nextY = player.y + dy;

    // マップ外防止
if(
    nextX < 0 ||
    nextX >= currentMap.tiles[0].length ||
    nextY < 0 ||
    nextY >= currentMap.tiles.length
){
    render();
    return;
}
    // 壁判定
    if(currentMap.tiles[nextY][nextX] === 1){
        render();
        return;
    }
if(isObjectBlocked(nextX,nextY)){
    render();
    return;
}
    player.x = nextX;
    player.y = nextY;
 
    const tileEvent =
    getTileEvent(player.x, player.y);

if(tileEvent){
    runEvent(tileEvent.event);
}
       render();
}


