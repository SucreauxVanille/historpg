const screenEffect =
    document.getElementById(
        "screenEffect"
    );

function fadeOut(duration = 1000){

    return new Promise(resolve=>{

        screenEffect.style.opacity = 1;

        setTimeout(resolve, duration);

    });

}

function fadeIn(duration = 1000){

    return new Promise(resolve=>{

        screenEffect.style.opacity = 0;

        setTimeout(resolve, duration);

    });

}
function flashScreen(){

    screenEffect.style.transition =
        "opacity 0.15s";

    screenEffect.style.backgroundColor =
        "white";

    screenEffect.style.opacity = 1;

    setTimeout(()=>{

        screenEffect.style.opacity = 0;

    },150);

    setTimeout(()=>{

        screenEffect.style.backgroundColor =
            "black";

        screenEffect.style.transition =
            "opacity 1s";

    },300);

}

//敵キャラ点滅
function flashElement(element){

    let count = 0;

    const interval = setInterval(()=>{

        element.style.visibility =
            element.style.visibility === "hidden"
            ? "visible"
            : "hidden";

        count++;

        if(count >= 6){

            clearInterval(interval);

            element.style.visibility = "visible";
        }

    },100);

}

//ジャンプ
function jumpElement(
    element,
    height = 8,
    duration = 250
){

    return new Promise(resolve=>{

        const start = performance.now();

        function animate(now){

            const progress =
                (now - start) / duration;

            if(progress >= 1){

                element.style.transform = "";

                resolve();

                return;

            }

            const y =
                Math.sin(progress * Math.PI)
                * height;

            element.style.transform =
                `translateY(${-y}px)`;

            requestAnimationFrame(animate);

        }

        requestAnimationFrame(animate);

    });

}

//回転
function rotateObject(
    object,
    count = 4,
    interval = 80
){

    return new Promise(resolve=>{

        const directions = [
            "up",
            "right",
            "down",
            "left"
        ];

        const originalDirection =
            object.direction;

        let index =
            directions.indexOf(originalDirection);

        let rotated = 0;

        const timer = setInterval(()=>{

            index =
                (index + 1) % directions.length;

            object.direction =
                directions[index];

            render();

            rotated++;

            if(rotated >= count){

                clearInterval(timer);

                object.direction =
                    originalDirection;

                render();

                resolve();

            }

        }, interval);

    });

}
