const screenEffect =
    document.getElementById(
        "screenEffect"
    );

function fadeOut(){

    screenEffect.style.opacity = 1;

}

function fadeIn(){

    screenEffect.style.opacity = 0;

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
