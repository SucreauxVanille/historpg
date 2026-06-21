(() => {
    // --------------------------------------------------------------------
    // A. 状態管理変数 (IIFE内部のプライベート変数)
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
     * 指定ミリ秒だけ処理を一時停止する
     * @param {number} ms 待機するミリ秒
     * @returns {Promise}
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 戦闘用メッセージログを表示し、プレイヤーのクリックを待つ関数
     * ※即時関数内に閉じ込めているため、message.js の同名関数と衝突しません。
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

    const battleLogEl = document.getElementById("battleLog");
    if (battleLogEl) {
        battleLogEl.addEventListener("click", () => {
            if (resolveMessageClick) {
                const resolve = resolveMessageClick;
                resolveMessageClick = null; // リセット
                resolve();
            }
        });
    }

    // --------------------------------------------------------------------
    // E. コマンドボタンのイベント
    // --------------------------------------------------------------------

    const attackBtnEl = document.getElementById("attackBtn");
    if (attackBtnEl) {
        attackBtnEl.addEventListener("click", () => {
            if (battlePhase === "command" && resolveCommandSelect) {
                const resolve = resolveCommandSelect;
                resolveCommandSelect = null;
                resolve("attack");
            }
        });
    }

    const runBtnEl = document.getElementById("runBtn");
    if (runBtnEl) {
        runBtnEl.addEventListener("click", () => {
            if (battlePhase === "command" && resolveCommandSelect) {
                const resolve = resolveCommandSelect;
                resolveCommandSelect = null;
                resolve("escape");
            }
        });
    }

    // --------------------------------------------------------------------
    // F. バトル開始 ＆ メイン進行ループ
    // --------------------------------------------------------------------

    /**
     * 戦闘を開始する（外部マップから呼び出される）
     */
    function startBattle(enemyId, onFinish = null) {
        battleFinishedCallback = onFinish;
        battlePhase = "none";

        currentEnemy = { ...enemies[enemyId] };

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

        const controls = document.getElementById("controls");
        if (controls) controls.style.display = "none";

        fadeOut();
        setTimeout(() => {
            showBattleScreen();
            fadeIn();
            runBattleSequence();
        }, 500);
    }

    /**
     * 完全に一本道で進行する、戦闘の実行シーケンス
     */
    async function runBattleSequence() {
        setBattlePhase("intro");
        await showMessage(`${currentEnemy.name} が あらわれた！`);

        while (true) {
            const hero = getStatus();

            setBattlePhase("command");
            const action = await waitForCommand();
            setBattlePhase("action");

            if (action === "attack") {
                await showMessage("ゆうしゃの攻撃！");
                await sleep(200);

                const damage = Math.floor(hero.atk * (0.9 + Math.random() * 0.2));
                currentEnemy.hp -= damage;

                flashElement(document.getElementById("enemyImage"));
                await showMessage(`${currentEnemy.name} に ${damage} のダメージ！`);

                if (currentEnemy.hp <= 0) {
                    await executeVictory();
                    return;
                }

            } else if (action === "escape") {
                await showMessage("ゆうしゃは にげだした！");
                await sleep(300);

                const success = Math.random() < 0.9;
                if (success) {
                    await showMessage("うまく にげきれた！");
                    endBattle("escape");
                    return;
                } else {
                    await showMessage("しかし まわりこまれてしまった！");
                }
            }

            await showMessage(`${currentEnemy.name} のこうげき！`);
            await sleep(300);
            await showMessage("ゆうしゃは ダメージをうけた！");
        }
    }

    /**
     * 勝利時の処理
     */
    async function executeVictory() {
        setBattlePhase("victory");
        
        playerStatus.exp += currentEnemy.exp;

        await showMessage(`${currentEnemy.name} をたおした！`);
        await showMessage(`${currentEnemy.exp} の経験値を獲得！`);

        const enemyImg = document.getElementById("enemyImage");
        if (enemyImg) enemyImg.style.display = "none";
        const enemyNameEl = document.getElementById("enemyName");
        if (enemyNameEl) enemyNameEl.textContent = "";

        endBattle("win");
    }

    /**
     * 戦闘を終了し、マップ画面に戻す
     */
    function endBattle(result = "win") {
        battlePhase = "none";

        if (battleFinishedCallback) {
            const callback = battleFinishedCallback;
            battleFinishedCallback = null;
            callback(result);
        }

        fadeOut();
        setTimeout(() => {
            hideBattleScreen();
            
            const controls = document.getElementById("controls");
            if (controls) controls.style.display = "flex";

            fadeIn();
        }, 500);
    }

    // --------------------------------------------------------------------
    // G. 外部連携用のAPI公開（グローバル・インターフェース）
    // --------------------------------------------------------------------
    
    // マップシステム等から呼び出すため、スタート関数をwindowに登録
    window.startBattle = startBattle;

    // 他のスクリプト（game.js等）が、battlePhase や currentEnemy を参照・変更できるように
    // 安全なゲッター・セッターを window オブジェクトに定義して互換性を維持します
    Object.defineProperty(window, 'battlePhase', {
        get: () => battlePhase,
        set: (val) => { setBattlePhase(val); },
        configurable: true
    });

    Object.defineProperty(window, 'currentEnemy', {
        get: () => currentEnemy,
        set: (val) => { currentEnemy = val; },
        configurable: true
    });

})();
