// =====================
//   主人公
// =====================

const player = {
    x: 8,
    y: 5,
    direction: "down",
    moving: false,
};
const playerStatus = {
    id: "hero",
    name: "ゆうしゃ",

    exp: 0,

    hp: null,
    mp: null
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
const tile =
    currentMap.tiles[nextY][nextX];

if(!tileIds[tile].passable){
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
    render();
    return;
}

render();

checkEncounter();

}

//ステータス計算
function getLevel(){

    const exp = playerStatus.exp;

    if(exp < 1000){
        return 1 + Math.floor(exp / 100);
    }

    if(exp < 2500){
        return 11 + Math.floor((exp - 1000) / 150);
    }

    return 21 + Math.floor((exp - 2500) / 200);
}

function getMaxHP(){
    const lv = getLevel();
    return Math.floor(20 + lv * 1.5);
}

function getMaxMP(){
    const lv = getLevel();
    return Math.floor(1 + lv);
}

function getATK(){
    const lv = getLevel();
    return Math.floor(10 + lv * 1.2);
}

function getDEF(){
    const lv = getLevel();
    return Math.floor(5 + lv * 0.5);
}

//ステータス取得
function getStatus(){
    return {
        name: playerStatus.name,
        level: getLevel(),

        hp: playerStatus.hp,
        mp: playerStatus.mp,

        maxHp: getMaxHP(),
        maxMp: getMaxMP(),

        atk: getATK(),
        def: getDEF()
    };
}
function initializePlayerStatus(){

    playerStatus.hp = getMaxHP();
    playerStatus.mp = getMaxMP();

}

//回復
function recoverAll(){

    playerStatus.hp = getMaxHP();
    playerStatus.mp = getMaxMP();

}
