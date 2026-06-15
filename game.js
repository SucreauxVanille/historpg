// =====================
//   基本設定
// =====================

const TILE_SIZE = 32;
const MAP_SIZE = 11;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = TILE_SIZE * MAP_SIZE;
canvas.height = TILE_SIZE * MAP_SIZE;

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
    direction: "down"
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

            ctx.strokeStyle = "#000";
            ctx.strokeRect(
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

    ctx.fillRect(
        px + 4,
        py + 4,
        TILE_SIZE - 8,
        TILE_SIZE - 8
    );

// 向き表示
    ctx.fillStyle = "white";

    let arrow = "▼";

    if(player.direction === "up"){
        arrow = "▲";
    }

    if(player.direction === "left"){
        arrow = "◀";
    }

    if(player.direction === "right"){
        arrow = "▶";
    }

    ctx.font = "16px sans-serif";
    ctx.fillText(
        arrow,
        px + 8,
        py + 20
    );
}

function render(){
    drawMap();
    drawPlayer();
}

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
