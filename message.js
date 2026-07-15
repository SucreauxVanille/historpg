let canAdvanceMessage = false;
//メッセージウインドウ
let messages = [];
let messageIndex = 0;
let inputLocked = false;
let messageResolve = null;

function showMessage(text){
    messageText.textContent = text;
    messageBox.style.display = "block";

    gameState.mode = "message";
    canAdvanceMessage = false;

    setTimeout(()=>{
        canAdvanceMessage = true;
    }, 500);
}

//メッセージ開始
function startMessage(
    messageArray,
    onFinish = null
){
    return new Promise(resolve=>{
        gameState.mode = "message";
        messages = messageArray;
        messageIndex = 0;

        messageResolve = ()=>{

            if(onFinish){
                onFinish();
            }
            resolve();
        };

        showMessage(messages[0]);
    });
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
const resolve = messageResolve;
messageResolve = null;

if(resolve){
    resolve();
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
async function npcDialogue(flag, beforeLines, afterLines){
    const lines = hasFlag(flag)
        ? afterLines
        : beforeLines;
    await startMessage(lines);
    endEvent();
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
