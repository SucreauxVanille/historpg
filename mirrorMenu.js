function openMirrorStageMenu(){

    openMenu(`

        <div class="menuTitle">
            壱与「どこへ向かいますか？」
        </div>

        <hr>

        <div class="menuItem"
             onclick="goToNojiri()">
            野尻湖
        </div>

        <div class="menuItem"
             onclick="goToOmori()">
            大森貝塚
        </div>

        <hr>

        <div class="menuItem"
             onclick="closeMirrorMenu()">
            やめる
        </div>

    `, "mirrorMenu");

}
function closeMirrorMenu(){

    closeMenu();

    endEvent();

}
async function goToOmori(){

}
