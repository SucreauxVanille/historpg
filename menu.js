let isMenuOpen = false;

function openMenu(html){

    const menuBox =
        document.getElementById("menuBox");

    const menuContent =
        document.getElementById("menuContent");
    isMenuOpen = true;
    menuContent.innerHTML = html;

    menuBox.style.display = "block";

}

function closeMenu(){

    document.getElementById(
        "menuBox"
    ).style.display = "none";
    isMenuOpen = false;
}

//メニューリスト
function showMainMenu(){

    openMenu(`

        <div class="menuItem"
             onclick="showStatus()">
            つよさ
        </div>

        <div class="menuItem"
             onclick="showItems()">
            どうぐ
        </div>

        <div class="menuItem"
             onclick="showLocation()">
            げんざいち
        </div>

        <div class="menuItem"
             onclick="closeMenu()">
            とじる
        </div>

    `);

}

//つよさ
function showStatus(){

    const status =
        getStatus();

    openMenu(`

        ${status.name}<br><br>

        Lv ${status.level}<br><br>

        体力 ${status.hp}<br>
        気力 ${status.mp}<br><br>

        攻撃 ${status.atk}<br>
        守備 ${status.def}<br><br>

        <div class="menuItem"
             onclick="showMainMenu()">
            もどる
        </div>

    `);

}

//どうぐ
function showItems(){

    openMenu(`

        まだ何も持っていない。<br><br>

        <div class="menuItem"
             onclick="showMainMenu()">
            もどる
        </div>

    `);

}

//げんざいち
function showLocation(){

    openMenu(`

        ${currentMap.name}
        <br><br>

        ${currentMap.description.join("<br>")}

        <br><br>

        <div class="menuItem"
             onclick="showMainMenu()">
            もどる
        </div>

    `);

}
