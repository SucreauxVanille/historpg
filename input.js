function canControl(){
    return (
        gameState.mode === "field" &&
        !gameState.lockInput &&
        !gameState.eventLock
    );
}

function attemptMove(direction){

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
//キー操作
document.addEventListener("keydown", (e)=>{

if(!canControl()){
    return;
}
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

if(!canControl()){
    return;
}
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
//しらべる
document
.getElementById("searchBtn")
.addEventListener("click", ()=>{

    if(!canControl()){
        return;
    }

    searchObject();

});

//メニュー
document
.getElementById("menuBtn")
.addEventListener("click", ()=>{

    if(!canControl()){
        return;
    }

    showMainMenu();

});

//インターバル
setInterval(()=>{

if(!canControl()){
    return;
}

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
