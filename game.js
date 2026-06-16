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

// 主人公
const heroImages = {
    down: [],
    up: [],
    left: [],
    right: []
};
heroImages.down[0] = new Image();
heroImages.down[0].src =
    "images/characters/hero_front1.png";

heroImages.down[1] = new Image();
heroImages.down[1].src =
    "images/characters/hero_front2.png";

heroImages.up[0] = new Image();
heroImages.up[0].src =
    "images/characters/hero_back1.png";

heroImages.up[1] = new Image();
heroImages.up[1].src =
    "images/characters/hero_back2.png";

heroImages.left[0] = new Image();
heroImages.left[0].src =
    "images/characters/hero_left1.png";

heroImages.left[1] = new Image();
heroImages.left[1].src =
    "images/characters/hero_left2.png";

heroImages.right[0] = new Image();
heroImages.right[0].src =
    "images/characters/hero_right1.png";

heroImages.right[1] = new Image();
heroImages.right[1].src =
    "images/characters/hero_right2.png";

//アセット
const loadedAssets = {};
for(const key in assets){

    const img = new Image();

    img.src = assets[key].image;

    loadedAssets[key] = img;
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
    x: 9,
    y: 4,
    direction: "down",

    moving: false
};

// =====================
//   描画
// =====================

function drawMap(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let y=0;y<MAP_SIZE;y++){
        for(let x=0;x<MAP_SIZE;x++){

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

//オブジェクト
function drawObjects(){

    if(!currentMap.objects){
        return;
    }

    currentMap.objects.forEach(obj=>{

        if(!obj.active){
            return;
        }

        const img = loadedAssets[obj.id];

        if(!img){
            return;
        }

        ctx.drawImage(
            img,
            obj.x * TILE_SIZE,
            obj.y * TILE_SIZE,
            TILE_SIZE,
            TILE_SIZE
        );

    });

}

function drawPlayer(){

    const px = player.x * TILE_SIZE;
    const py = player.y * TILE_SIZE;

    ctx.fillStyle = "blue";

const image =
    heroImages[player.direction][animationFrame];

ctx.drawImage(
    image,
    px,
    py,
    TILE_SIZE,
    TILE_SIZE
);
}

function render(){

    drawMap();
    drawObjects();
    drawPlayer();

}
//メッセージウインドウ
let messages = [];
let messageIndex = 0;
function showMessage(text){

    messageText.textContent = text;

    messageBox.style.display = "block";

    isMessageOpen = true;
    canAdvanceMessage = false;

    setTimeout(()=>{
        canAdvanceMessage = true;
    }, 1000);

}
function startMessage(messageArray){

    messages = messageArray;
    messageIndex = 0;

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

function searchObject(){

    const frontTile = getFrontTile();

    const obj = getObjectAt(
        frontTile.x,
        frontTile.y
    );

    if(!obj){
        showMessage("なにもない。");
        return;
    }

const eventData = events[obj.event];

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
 
    render();
}

//キー操作
document.addEventListener("keydown", (e)=>{

    switch(e.key){

        case "ArrowUp":

            if(!pressedKeys.up){
                movePlayer(0,-1,"up");
            }

            pressedKeys.up = true;
            break;

        case "ArrowDown":

            if(!pressedKeys.down){
                movePlayer(0,1,"down");
            }

            pressedKeys.down = true;
            break;

        case "ArrowLeft":

            if(!pressedKeys.left){
                movePlayer(-1,0,"left");
            }

            pressedKeys.left = true;
            break;

        case "ArrowRight":

            if(!pressedKeys.right){
                movePlayer(1,0,"right");
            }

            pressedKeys.right = true;
            break;
    }

});

document.addEventListener("keyup", (e)=>{

    switch(e.key){

        case "ArrowUp":
            pressedKeys.up = false;
            break;

        case "ArrowDown":
            pressedKeys.down = false;
            break;

        case "ArrowLeft":
            pressedKeys.left = false;
            break;

        case "ArrowRight":
            pressedKeys.right = false;
            break;
    }

});

//ボタン
function pressDirection(direction){

    if(!pressedKeys[direction]){

        switch(direction){

            case "up":
                movePlayer(0,-1,"up");
                break;

            case "down":
                movePlayer(0,1,"down");
                break;

            case "left":
                movePlayer(-1,0,"left");
                break;

            case "right":
                movePlayer(1,0,"right");
                break;
        }
    }

    pressedKeys[direction] = true;
}

function releaseDirection(direction){
    pressedKeys[direction] = false;
}

const buttons = [
    ["upBtn","up"],
    ["downBtn","down"],
    ["leftBtn","left"],
    ["rightBtn","right"]
];
buttons.forEach(([id, direction])=>{

    const btn = document.getElementById(id);

    btn.addEventListener("pointerdown", ()=>{

        pressDirection(direction);

    });

    btn.addEventListener("pointerup", ()=>{

        releaseDirection(direction);

    });

    btn.addEventListener("pointerleave", ()=>{

        releaseDirection(direction);

    });

});

//インターバル
setInterval(()=>{

    if(pressedKeys.up){
        movePlayer(0,-1,"up");
    }

    else if(pressedKeys.down){
        movePlayer(0,1,"down");
    }

    else if(pressedKeys.left){
        movePlayer(-1,0,"left");
    }

    else if(pressedKeys.right){
        movePlayer(1,0,"right");
    }

}, 150);

// =====================
//   タイトル
// =====================

document
.getElementById("startBtn")
.addEventListener("click", ()=>{

    document.getElementById("titleScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    render();
});
