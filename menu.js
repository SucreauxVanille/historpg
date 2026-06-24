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

//        <div class="menuItem"
//             onclick="showItems()">
//            どうぐ
//        </div>

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

    const hero = getStatus(playerStatus);
    const himiko = getStatus(himikoStatus);

    openMenu(`

        ${hero.name}<br>
        Lv ${hero.level}<br>
        体力 ${hero.hp}/${hero.maxHp}<br>
        気力 ${hero.mp}/${hero.maxMp}<br>
        攻撃 ${hero.atk}<br>
        守備 ${hero.def}<br>

        <hr>

        ${himiko.name}<br>
        Lv ${himiko.level}<br>
        体力 ${himiko.hp}/${himiko.maxHp}<br>
        気力 ${himiko.mp}/${himiko.maxMp}<br>
        攻撃 ${himiko.atk}<br>
        守備 ${himiko.def}<br><br>

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
