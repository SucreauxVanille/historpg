// =====================
//   基本設定
// =====================

const TILE_SIZE = 32;
const MAP_SIZE = 11;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = TILE_SIZE * MAP_SIZE;
canvas.height = TILE_SIZE * MAP_SIZE;

const pressedKeys = {
    up: false,
    down: false,
    left: false,
    right: false
};
const gameState = {

    flags: {}

};

//アセット
const loadedAssets = {};

for(const key in assets){

    const asset = assets[key];

    if(asset.animated){

        loadedAssets[key] = {
            down: [],
            up: [],
            left: [],
            right: []
        };

        ["down","up","left","right"].forEach(direction=>{

            asset[direction].forEach((path,index)=>{
                const img = new Image();
                img.src = path;
                loadedAssets[key][direction][index] = img;
            });
        });
    }

    else{

        const img = new Image();
        img.src = asset.image;
        loadedAssets[key] = img;

    }
}

// =====================
//   マップ
// =====================

let currentMap = maps.himikoHouse;
let isMessageOpen = false;
let canAdvanceMessage = false;

// =====================
//   主人公
// =====================

const player = {
    x: 8,
    y: 5,
    direction: "down",

    moving: false
};

// =====================
//   描画
// =====================

function drawMap(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let y=0;y<currentMap.tiles.length;y++){

        for(let x=0;x<currentMap.tiles[y].length;x++){

            const tile = currentMap.tiles[y][x];

            if(tile === 1){
                ctx.fillStyle = "#666";
            }else{
                ctx.fillStyle = "#c9a063";
            }

            ctx.fillRect(
                x * TILE_SIZE,
                y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );
        }
    }
}

//オブジェクト描画
function drawObjects(){

    currentMap.objects.forEach(obj=>{

        if(!obj.active) return;

        const asset = assets[obj.id];

        if(!asset) return;

        if(asset.animated){
    
        const img =
            loadedAssets[obj.id]
            [obj.direction]
            [animationFrame];

            ctx.drawImage(
                img,
                obj.x * TILE_SIZE,
                obj.y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );

        }else{

            const img =
                loadedAssets[obj.id];

            ctx.drawImage(
                img,
                obj.x * TILE_SIZE,
                obj.y * TILE_SIZE,
                TILE_SIZE,
                TILE_SIZE
            );

        }
    });
}

// 主人公
function drawPlayer(){

    const px = player.x * TILE_SIZE;
    const py = player.y * TILE_SIZE;

    ctx.fillStyle = "blue";

const image =
    loadedAssets.hero
        [player.direction]
        [animationFrame];

ctx.drawImage(
    image,
    px,
    py,
    TILE_SIZE,
    TILE_SIZE
);
}
function facePlayer(obj){

    if(!obj.direction){
        return;
    }

    const oppositeDirection = {
        up: "down",
        down: "up",
        left: "right",
        right: "left"
    };

    obj.direction =
        oppositeDirection[player.direction];
}
function render(){

    drawMap();
    drawObjects();
    drawPlayer();
}


//メッセージウインドウ
let messages = [];
let messageIndex = 0;
let messageFinishedCallback = null;
function showMessage(text){

    messageText.textContent = text;
    messageBox.style.display = "block";

    isMessageOpen = true;
    canAdvanceMessage = false;

    setTimeout(()=>{
        canAdvanceMessage = true;
    }, 500);
}

function startMessage(messageArray, onFinish = null){
    messages = messageArray;
    messageIndex = 0;

    messageFinishedCallback = onFinish;
    showMessage(messages[0]);
}

function hideMessage(){
    document.getElementById("messageBox").style.display = "none";
    isMessageOpen = false;
}
function nextMessage(){
    messageIndex++;
if(messageIndex >= messages.length){

    hideMessage();
const callback = messageFinishedCallback;
messageFinishedCallback = null;

if(callback){
    callback();
}
    return;
}
    showMessage(messages[messageIndex]);
}
messageBox.addEventListener("pointerdown", ()=>{

    if(!isMessageOpen){
        return;
    }

    if(!canAdvanceMessage){
        return;
    }

    nextMessage();

});

//地雷式イベント
function getTileEvent(x, y){

    if(!currentMap.tileEvents){
        return null;
    }

    return currentMap.tileEvents.find(event=>

        event.x === x &&
        event.y === y

    );

}

//アニメーション
let animationFrame = 0;

setInterval(() => {

    animationFrame =
        animationFrame === 0 ? 1 : 0;

    render();

}, 500);

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
//オブジェクト取得
function getObjectAt(x, y){
    return currentMap.objects.find(obj=>

        obj.active &&
        obj.x === x &&
        obj.y === y
    );
}
document.getElementById("searchBtn")
.addEventListener("click", searchObject);
function moveObject(id, dx, dy){

    const obj = getObjectById(id);

    if(!obj){
        return;
    }

    obj.x += dx;
    obj.y += dy;

    render();

}
function getObjectById(id){

    return currentMap.objects.find(
        obj => obj.id === id
    );

}
function setObjectDirection(id, direction){

    const obj = getObjectById(id);

    if(!obj){
        return;
    }

    obj.direction = direction;

    render();

}
//イベント起動
function runEvent(eventId){

    const handler =
        eventHandlers[eventId];

    if(handler){
        handler();
        return;
    }

    const eventData =
        events[eventId];

    if(eventData){
        startMessage(eventData);
    }
}

//オブジェクト検出
function searchObject(){

    const frontTile = getFrontTile();

    const obj = getObjectAt(
        frontTile.x,
        frontTile.y
    );

    if(!obj){
        showMessage("特に何もないようだ。");
        return;
    }
    facePlayer(obj);
    render();

runEvent(obj.event);
}

//衝突ブロック
function isObjectBlocked(x,y){

    if(!currentMap.objects){
        return false;
    }

    return currentMap.objects.some(obj=>

        obj.active &&
        obj.solid &&
        obj.x === x &&
        obj.y === y

    );
}

//スポーン
function spawnObject(id){

    const obj =
        currentMap.objects.find(
            o => o.id === id
        );

    if(obj){

        obj.active = true;

    }

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



// =====================
//   タイトル
// =====================

document
.getElementById("startBtn")
.addEventListener("click", ()=>{

    document.getElementById("titleScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

render();
startOpening();
});
