let canAdvanceMessage = false;
//メッセージウインドウ
let messages = [];
let messageIndex = 0;
let messageFinishedCallback = null;
let inputLocked = false;

function showMessage(text){

    messageText.textContent = text;
    messageBox.style.display = "block";

    gameState.mode = "message";

    canAdvanceMessage = false;

    setTimeout(()=>{
        canAdvanceMessage = true;
    }, 500);
}

function startMessage(messageArray, onFinish = null){

    gameState.mode = "message";
    messages = messageArray;
    messageIndex = 0;

    messageFinishedCallback = onFinish;
    showMessage(messages[0]);
}

//ウインドウ消去
function hideMessage(){

    messageBox.style.display = "none";
    gameState.mode = "field";

    lockInputFor(250);

}
//次メッセージ
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

if(gameState.mode !== "message"){
    return;
}

    if(!canAdvanceMessage){
        return;
    }

    nextMessage();

});

//モブ用
function npcDialogue(flag, beforeLines, afterLines){

    const lines = hasFlag(flag)
        ? afterLines
        : beforeLines;

    startMessage(lines, endEvent);

}

//選択肢
function showChoice(choices){
document.getElementById(
    "messageBox"
).style.display = "block";
    const container =
        document.getElementById(
            "choiceContainer"
        );

    container.innerHTML = "";

    choices.forEach(choice=>{

        const button =
            document.createElement("button");

        button.textContent = choice.text;
        button.className = "choiceButton";

button.addEventListener(
    "click",
    () => {

        container.innerHTML = "";
        hideMessage();

        if(choice.action){
            choice.action();
        }
    }
);
        container.appendChild(button);
    });
}
