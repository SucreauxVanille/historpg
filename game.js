// =====================
//   基本設定
// =====================

const TILE_SIZE = 32;
const MAP_SIZE = 11;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = TILE_SIZE * MAP_SIZE;
canvas.height = TILE_SIZE * MAP_SIZE;

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
// =====================
//   マップ
//   0 = 床
//   1 = 壁
// =====================

const map = [
 [1,1,1,1,1,1,1,1,1,1,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,0,0,0,0,0,0,0,0,0,1],
 [1,1,1,1,1,0,1,1,1,1,1]
];

// =====================
//   主人公
// =====================

const player = {
    x: 5,
    y: 5,
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

            const tile = map[y][x];

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
    drawPlayer();
}

//アニメーション
let animationFrame = 0;

setInterval(() => {

    animationFrame =
        animationFrame === 0 ? 1 : 0;

    render();

}, 500);

//移動
function movePlayer(dx, dy, direction){

    player.direction = direction;

    const nextX = player.x + dx;
    const nextY = player.y + dy;

    // マップ外防止
if(
    nextX < 0 ||
    nextX >= map[0].length ||
    nextY < 0 ||
    nextY >= map.length
    ){
        render();
        return;
    }

    // 壁判定
    if(map[nextY][nextX] === 1){
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
            movePlayer(0,-1,"up");
            break;

        case "ArrowDown":
            movePlayer(0,1,"down");
            break;

        case "ArrowLeft":
            movePlayer(-1,0,"left");
            break;

        case "ArrowRight":
            movePlayer(1,0,"right");
            break;
    }

});
document.getElementById("upBtn")
.addEventListener("click", ()=>{
    movePlayer(0,-1,"up");
});

document.getElementById("downBtn")
.addEventListener("click", ()=>{
    movePlayer(0,1,"down");
});

document.getElementById("leftBtn")
.addEventListener("click", ()=>{
    movePlayer(-1,0,"left");
});

document.getElementById("rightBtn")
.addEventListener("click", ()=>{
    movePlayer(1,0,"right");
});

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
