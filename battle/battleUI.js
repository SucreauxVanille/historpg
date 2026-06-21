// --------------------------------------------------------------------
// A. 状態管理変数
// --------------------------------------------------------------------
let battlePhase = "none";      // "none" | "intro" | "command" | "action" | "victory" | "gameover"
let currentEnemy = null;       // 現在戦闘中の敵のデータ
let battleFinishedCallback = null; // 戦闘終了後に実行するコールバック

// 非同期で「クリック待ち」や「コマンド選択」を制御するためのリゾルバ（Promiseの鍵）
let resolveMessageClick = null;
let resolveCommandSelect = null;

// --------------------------------------------------------------------
// B. 汎用ユーティリティ（非同期タイマー ＆ クリック待ち）
// --------------------------------------------------------------------

/**
 * 指定ミリ秒だけ処理を一時停止する（従来の setTimeout をスマートにしたもの）
 * @param {number} ms 待機するミリ秒
 * @returns {Promise}
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * ドラクエ風に「メッセージログを表示し、プレイヤーのクリックを待つ」関数
 * @param {string} text 表示するメッセージ
 */
async function showMessage(text) {
    setBattleLog(text);
    
    // プレイヤーがクリックして進めるまで、ここで処理を「一時停止」する
    await new Promise(resolve => {
        resolveMessageClick = resolve;
    });
}

/**
 * プレイヤーが「たたかう」や「にげる」を押すまで処理を「一時停止」して待つ関数
 * @returns {Promise<string>} 選択されたアクション ("attack" | "escape")
 */
function waitForCommand() {
    return new Promise(resolve => {
        resolveCommandSelect = resolve;
    });
}

// --------------------------------------------------------------------
// C. UI表示・操作
// --------------------------------------------------------------------

/**
 * 現在のフェーズに応じて戦闘UI（ボタン、ログ枠）の表示を切り替える
 * @param {string} phase 
 */
function setBattlePhase(phase) {
    battlePhase = phase;
    const isCommand = (battlePhase === "command");

    // コマンドボタン群の表示切り替え (flex ⇔ none)
    const commandEl = document.getElementById("battleCommand");
    if (commandEl) {
        commandEl.style.display = isCommand ? "flex" : "none";
    }

    // メッセージログ領域の表示切り替え (block ⇔ none)
    // コマンド選択中はログ領域を隠すか、または「なにをする？」等に固定する
    const logEl = document.getElementById("battleLog");
    if (logEl) {
        logEl.style.display = isCommand ? "none" : "block";
    }
}

/**
 * メッセージログにテキストを反映する
 * @param {string} text 
 */
function setBattleLog(text) {
    const logEl = document.getElementById("battleLog");
    if (logEl) {
        logEl.textContent = text;
    }
}

/**
 * 戦闘画面を表示する
 */
function showBattleScreen() {
    const screen = document.getElementById("battleScreen");
    if (screen) screen.style.display = "flex";
}

/**
 * 戦闘画面を非表示にする
 */
function hideBattleScreen() {
    const screen = document.getElementById("battleScreen");
    if (screen) screen.style.display = "none";
}

/**
 * ステータスウィンドウの更新（Lv, HP, MP）
 */
function updateBattleStatus() {
    // 既存のグローバル関数 getStatus() から主人公のステータスを取得
    const hero = getStatus(); 
    const statusEl = document.getElementById("battleStatus");
    
    if (statusEl && hero) {
        statusEl.innerHTML = 
            `ゆうしゃ： Lv${hero.level}<br>` +
            `体力： ${hero.hp}/${hero.hp}<br>` +
            `気力： ${hero.mp}/${hero.mp}`;
    }
}

// --------------------------------------------------------------------
// D. クリックイベント（メッセージ送り）
// --------------------------------------------------------------------

// メッセージログ枠がクリックされた時の処理
document.getElementById("battleLog").addEventListener("click", () => {
    // もし今「メッセージ送り待ち」の状態であれば、Promiseの待機を解除して次に進める
    if (resolveMessageClick) {
        const resolve = resolveMessageClick;
        resolveMessageClick = null; // リセット
        resolve();
    }
});

// --------------------------------------------------------------------
// E. コマンドボタンのイベント
// --------------------------------------------------------------------

// 「たたかう」ボタン
document.getElementById("attackBtn").addEventListener("click", () => {
    if (battlePhase === "command" && resolveCommandSelect) {
        const resolve = resolveCommandSelect;
        resolveCommandSelect = null;
        resolve("attack"); // 選択されたアクションをループに通知
    }
});

// 「にげる」ボタン
document.getElementById("runBtn").addEventListener("click", () => {
    if (battlePhase === "command" && resolveCommandSelect) {
        const resolve = resolveCommandSelect;
        resolveCommandSelect = null;
        resolve("escape"); // 選択されたアクションをループに通知
    }
});

// --------------------------------------------------------------------
// F. バトル開始 ＆ メイン進行ループ (★ここが心臓部です)
// --------------------------------------------------------------------

/**
 * 戦闘を開始する（外部マップから呼び出される）
 * @param {string} enemyId 敵のID
 * @param {function} onFinish 戦闘終了時のコールバック
 */
function startBattle(enemyId, onFinish = null) {
    battleFinishedCallback = onFinish;
    battlePhase = "none";

    // 敵データのディープコピー（enemiesはグローバル配列を想定）
    currentEnemy = { ...enemies[enemyId] };

    // 敵UIのセットアップ
    const enemyImg = document.getElementById("enemyImage");
    if (enemyImg) {
        enemyImg.src = currentEnemy.image;
        enemyImg.style.display = "block";
    }
    const enemyNameEl = document.getElementById("enemyName");
    if (enemyNameEl) {
        enemyNameEl.textContent = currentEnemy.name;
    }

    updateBattleStatus();

    // マップ移動用の操作パッド等を非表示にする
    const controls = document.getElementById("controls");
    if (controls) controls.style.display = "none";

    // 画面フェードアウト＆フェードインで戦闘画面へ切り替え
    fadeOut();
    setTimeout(() => {
        showBattleScreen();
        fadeIn();
        
        // 演出が終わったタイミングで、一本道の戦闘シーケンスを起動する
        runBattleSequence();
    }, 500);
}

/**
 * 完全に一本道で進行する、戦闘の実行シーケンス
 */
async function runBattleSequence() {
    // 1. 出現メッセージの表示
    setBattlePhase("intro");
    await showMessage(`${currentEnemy.name} が あらわれた！`);

    // 2. 敵味方どちらかが倒れるまで続く、戦闘ターン無限ループ
    while (true) {
        const hero = getStatus();

        // ----------------- プレイヤーのターン -----------------
        setBattlePhase("command");
        
        // プレイヤーがボタン（こうげき/にげる）を押すまで、ここで待機する
        const action = await waitForCommand();
        
        // アクションが決定したら即座にコマンドUIを隠し、行動フェーズに移行
        setBattlePhase("action");

        if (action === "attack") {
            // 攻撃メッセージと演出
            await showMessage("ゆうしゃの攻撃！");
            await sleep(200); // 攻撃直前の短いタメ

            // ダメージ計算と反映
            const damage = Math.floor(hero.atk * (0.9 + Math.random() * 0.2));
            currentEnemy.hp -= damage;

            // 敵画像の被ダメージ点滅演出
            flashElement(document.getElementById("enemyImage"));
            
            await showMessage(`${currentEnemy.name} に ${damage} のダメージ！`);

            // 敵を倒したか判定
            if (currentEnemy.hp <= 0) {
                // 勝利シーケンスへ
                await executeVictory();
                return; // ループ終了、戦闘終了処理へ
            }

        } else if (action === "escape") {
            await showMessage("ゆうしゃは にげだした！");
            await sleep(300);

            const success = Math.random() < 0.9;
            if (success) {
                await showMessage("うまく にげきれた！");
                endBattle("escape");
                return; // 戦闘終了
            } else {
                await showMessage("しかし まわりこまれてしまった！");
            }
        }

        // ----------------- 敵のターン -----------------
        await showMessage(`${currentEnemy.name} のこうげき！`);
        await sleep(300);

        // ※ここでは簡易的にプレイヤーのHPを減らすダミー処理にしています。
        // 必要に応じて、プレイヤーのHP減少ロジックやゲームオーバー判定を追加してください。
        await showMessage("ゆうしゃは ダメージをうけた！");
        
        // ターンが1周したので、whileループの最初（プレイヤーのコマンド入力）に戻る
    }
}

/**
 * 勝利時の処理
 */
async function executeVictory() {
    setBattlePhase("victory");
    
    // 経験値を獲得
    playerStatus.exp += currentEnemy.exp; // playerStatusはグローバルを想定

    await showMessage(`${currentEnemy.name} をたおした！`);
    await showMessage(`${currentEnemy.exp} の経験値を獲得！`);

    // 敵グラフィックを消去
    const enemyImg = document.getElementById("enemyImage");
    if (enemyImg) enemyImg.style.display = "none";
    const enemyNameEl = document.getElementById("enemyName");
    if (enemyNameEl) enemyNameEl.textContent = "";

    // 戦闘終了
    endBattle("win");
}

/**
 * 戦闘を終了し、マップ画面に戻す
 * @param {string} result "win" | "escape" | "lose"
 */
function endBattle(result = "win") {
    battlePhase = "none";

    // 外部（マップ側など）から渡されていたコールバックを実行
    if (battleFinishedCallback) {
        const callback = battleFinishedCallback;
        battleFinishedCallback = null;
        callback(result);
    }

    // マップ画面への復帰演出
    fadeOut();
    setTimeout(() => {
        hideBattleScreen();
        
        const controls = document.getElementById("controls");
        if (controls) controls.style.display = "flex";

        fadeIn();
    }, 500);
}
