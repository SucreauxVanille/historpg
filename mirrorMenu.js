function openMirrorStageMenu(){

    openMenu(`

        <div class="menuItem"
             onclick="goToNojiri()">
            野尻湖
        </div>

        <div class="menuItem"
             onclick="goToOmori()">
            大森貝塚
        </div>

        <div class="menuItem"
             onclick="closeMirrorMenu()">
            やめる
        </div>

    `);

}
function closeMirrorMenu(){

    closeMenu();

    endEvent();

}
async function goToOmori(){

}
