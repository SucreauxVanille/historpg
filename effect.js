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

    screenEffect.style.backgroundColor =
        "white";

    screenEffect.style.opacity = 1;

    setTimeout(()=>{

        screenEffect.style.opacity = 0;

    },150);

    setTimeout(()=>{

        screenEffect.style.backgroundColor =
            "black";

    },300);

}
