let allowHimikoFollower = false;

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
const himikoStatus = {
    id: "himiko",
    name: "卑弥呼",
    exp: 120,
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
function getLevel(status){

    const exp = status.exp;

    if(exp < 1000){
        return 1 + Math.floor(exp / 100);
    }

    if(exp < 2500){
        return 11 + Math.floor((exp - 1000) / 150);
    }

    return 21 + Math.floor((exp - 2500) / 200);
}

function getHeroMaxHP(lv){
    return Math.floor(20 + lv * 1.5);
}

function getHeroMaxMP(lv){
    return Math.floor(1 + lv);
}

function getHeroATK(lv){
    return Math.floor(10 + lv * 1.2);
}

function getHeroDEF(lv){
    return Math.floor(5 + lv * 0.5);
}

function getHimikoMaxHP(lv){
    return Math.floor(18 + lv * 1);
}

function getHimikoMaxMP(lv){
    return Math.floor(47 + lv * 3);
}

function getHimikoATK(lv){
    return Math.floor(6 + lv * 0.5);
}

function getHimikoDEF(lv){
    return Math.floor(2 + lv * 0.8);
}

//ステータス取得
function getStatus(status){

    const level = getLevel(status);

    switch(status.id){

        case "hero":
            return {
                name: status.name,
                level,

                hp: status.hp,
                mp: status.mp,

                maxHp: getHeroMaxHP(level),
                maxMp: getHeroMaxMP(level),

                atk: getHeroATK(level),
                def: getHeroDEF(level)
            };

        case "himiko":
            return {
                name: status.name,
                level,

                hp: status.hp,
                mp: status.mp,

                maxHp: getHimikoMaxHP(level),
                maxMp: getHimikoMaxMP(level),

                atk: getHimikoATK(level),
                def: getHimikoDEF(level)
            };
    }
}
function initializeStatus(status){

    const currentStatus = getStatus(status);

    status.hp = currentStatus.maxHp;
    status.mp = currentStatus.maxMp;

}

//回復
function recoverAll(status){

    const currentStatus = getStatus(status);

    status.hp = currentStatus.maxHp;
    status.mp = currentStatus.maxMp;

}
