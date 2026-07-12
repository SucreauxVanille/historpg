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
    closeMenu();
    await fadeOut();
    currentMap = maps.omoriShellMounds;
    player.x = 10;
    player.y = 24;
    himiko.x = player.x;
    himiko.y = player.y - 1;
    himiko.direction = "down";
    isHimikoFollowing = true;
    playerTrail = [];
    render();
    await fadeIn();
    await startMessage([
        "壱与の声「邪馬台国に戻るときは、青いうずまきに触れてください」"
    ]);
    endEvent();
}
