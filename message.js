let isMessageOpen = false;
let canAdvanceMessage = false;
//メッセージウインドウ
let messages = [];
let messageIndex = 0;
let messageFinishedCallback = null;
function showMessage(text){

    messageText.textContent = text;
    messageBox.style.display = "block";

    isMessageOpen = true;
    canAdvanceMessage = false;

    setTimeout(()=>{
        canAdvanceMessage = true;
    }, 500);
}

function startMessage(messageArray, onFinish = null){
    messages = messageArray;
    messageIndex = 0;

    messageFinishedCallback = onFinish;
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

    if(!isMessageOpen){
        return;
    }

    if(!canAdvanceMessage){
        return;
    }

    nextMessage();

});
