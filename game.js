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
    mode: "field",
    lockInput: false,
    eventLock: false,
    progress: 0,
    flags: {}
};
let renderEnabled = true;
let animationEnabled = true;
let encounterSteps = 0;

//状態管理
function setGameMode(mode){
    gameState.mode = mode;
}
function lockInput(){
    gameState.lockInput = true;
}

function unlockInput(){
    gameState.lockInput = false;
}
function lockInputFor(ms){

    lockInput();

    setTimeout(()=>{
        unlockInput();
    }, ms);

}
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
const tileImages = {};

for(const key in tileTypes){

    const tile = tileTypes[key];

    if(tile.image){

        const img = new Image();
        img.src = tile.image;

        tileImages[key] = img;
    }
}

//オブジェクトID取得
function getObject(id){

    return currentMap.objects.find(
        object => object.id === id
    );

}

//ウェイト
function wait(ms){

    return new Promise(resolve=>{

        setTimeout(resolve, ms);

    });

}

// =====================
//   マップとカメラ
// =====================
const camera = {
    x: 0,
    y: 0
};

function updateCamera(){

    camera.x =
        player.x - Math.floor(MAP_SIZE / 2);

    camera.y =
        player.y - Math.floor(MAP_SIZE / 2);

    const maxX =
        currentMap.tiles[0].length - MAP_SIZE;

    const maxY =
        currentMap.tiles.length - MAP_SIZE;

    camera.x =
        Math.max(
            0,
            Math.min(camera.x,maxX)
        );

    camera.y =
        Math.max(
            0,
            Math.min(camera.y,maxY)
        );

}
let currentMap = maps.himikoHouse;


// =====================
//   描画
// =====================
// マップ
function drawMap(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let y=0;y<currentMap.tiles.length;y++){

        for(let x=0;x<currentMap.tiles[y].length;x++){

            const tile = currentMap.tiles[y][x];

const tileData = tileIds[tile];

if(tileData.image){

ctx.drawImage(
    tileImages[tileData.id],
    (x - camera.x) * TILE_SIZE,
    (y - camera.y) * TILE_SIZE,
    TILE_SIZE,
    TILE_SIZE
);

}else{

    ctx.fillStyle = tileData.color;

    ctx.fillRect(
    (x - camera.x) * TILE_SIZE,
    (y - camera.y) * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
    );

}
        }
    }
}

//オブジェクト描画
function drawObjects(){

    currentMap.objects.forEach(obj=>{

        if (
            obj.hideAfter !== undefined &&
            gameState.progress >= obj.hideAfter
        ){
            obj.active = false;
        }

        if(!obj.active) return;

        const asset = assets[obj.id];
        if(!asset) return;

        const drawX =
            (obj.x - camera.x) * TILE_SIZE;

        const drawY =
            (obj.y - camera.y) * TILE_SIZE +
            (obj.jumpOffset ?? 0);

        if(asset.animated){

            const img =
                loadedAssets[obj.id]
                [obj.direction]
                [animationFrame];

            ctx.drawImage(
                img,
                drawX,
                drawY,
                TILE_SIZE,
                TILE_SIZE
            );

        }else{

            const img =
                loadedAssets[obj.id];

            ctx.drawImage(
                img,
                drawX,
                drawY,
                TILE_SIZE,
                TILE_SIZE
            );
        }
    });

}

// 主人公描画
function drawPlayer(){

const px =
    (player.x - camera.x)
    * TILE_SIZE;

const py =
    (player.y - camera.y)
    * TILE_SIZE;

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
function drawHimiko(){

if(
    !isHimikoFollowing ||
    !currentMap.allowHimikoFollower
){
    return;
}

    if(!currentMap.allowHimikoFollower){
        return;
    }

    const px =
        (himiko.x - camera.x)
        * TILE_SIZE;

    const py =
        (himiko.y - camera.y)
        * TILE_SIZE;

    const image =
        loadedAssets.himiko
            [himiko.direction]
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

    updateCamera();

    drawMap();
    drawObjects();
    drawPlayer();
    drawHimiko();

}


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

    if(!animationEnabled) return;
    animationFrame = animationFrame === 0 ? 1 : 0;
    render();

}, 500);

//オブジェクト取得
function getObjectAt(x, y){
    return currentMap.objects.find(obj=>

        obj.active &&
        obj.x === x &&
        obj.y === y
    );
}


//オブジェクト移動
function moveObject(id, dx, dy){

    return new Promise(resolve=>{

        const obj = getObject(id);

        if(!obj){
            resolve();
            return;
        }

        obj.x += dx;
        obj.y += dy;

        render();

        resolve();

    });
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

    gameState.eventLock = true;
    const handler = eventHandlers[eventId];

    if(handler){
        handler();
        return;
    }

    const eventData = events[eventId];

    if(eventData){
        startMessage(eventData);
    }
}
//イベント終了
function endEvent(){

    gameState.eventLock = false;
    lockInputFor(250);
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

//オブジェクト消滅
function despawnObject(id){

    const obj =
        currentMap.objects.find(
            o => o.id === id
        );

    if(obj){

        obj.active = false;
    }
}

//ワープ
function changeMap(mapName, startX, startY){

    fadeOut();

    setTimeout(() => {

        currentMap = mapName;

        player.x = startX;
        player.y = startY;

        render();

        fadeIn();

    }, 500);

}

//エンカウント
function checkEncounter(){

    if(!currentMap.encounterTable){
        return;
    }
    if(
        currentMap === maps.nojiriLake &&
        !hasFlag("nojiriTutorialFinished")
    ){
        return;
    }

    encounterSteps++;

    if(encounterSteps < 5){
        return;
    }

    if(
        Math.random() * 100 >=
        currentMap.encounterRate
    ){
        return;
    }

    //==========================
    // エンカウント成立
    //==========================

    encounterSteps = 0;

    const maxEncounterCount =
        currentMap.maxEncounterCount ?? 1;

    const enemyCount =
        Math.floor(
            Math.random() *
            maxEncounterCount
        ) + 1;

    const enemyIds = [];
    for(let i = 0; i < enemyCount; i++){

        enemyIds.push(
            currentMap.encounterTable[
                Math.floor(
                    Math.random() *
                    currentMap.encounterTable.length
                )
            ]
        );
    }
    startBattle(enemyIds);
}

// =====================
//   タイトル
// =====================

document
.getElementById("startBtn")
.addEventListener("click", ()=>{

initializeStatus(playerStatus);
initializeStatus(himikoStatus);

    document.getElementById("titleScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    render();
    startOpening();
});

//ロード
document
.getElementById("continueBtn")
.addEventListener("click", ()=>{

    const spell = prompt(
        "ふっかつのじゅもんをいれてください"
    );

    if(!spell){
        return;
    }

    loadGame(spell);

    initializeStatus(playerStatus);
    initializeStatus(himikoStatus);

    gameState.mode = "field";
    gameState.eventLock = false;
    gameState.lockInput = false;

    document.getElementById(
        "titleScreen"
    ).style.display = "none";

    document.getElementById(
        "gameScreen"
    ).style.display = "block";

    currentMap = maps.himikoHouse;

    player.x = 5;
    player.y = 3;
    player.direction = "up";
    render();
    startMessage(
    ["壱与「おかえりなさい！またお会いできて嬉しいです！」"],
    startLoadQuiz
    );
});
