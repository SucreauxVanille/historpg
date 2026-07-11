//========================
// 弟
//========================

// 壱与登場前
function brotherOpening(){

    startMessage(
        events.prologue_brother,
        () => {

            showChoice([
                {
                    text:"はい",
                    action: brotherAnswer
                },
                {
                    text:"いいえ",
                    action: brotherAnswer
                }
            ]);

        }
    );

}

// 野尻湖攻略中
function brotherNojiri(){

    startMessage(
        events.prologue_brother_after,
        endEvent
    );

}

// 第2章導入
async function brotherOmoriIntro(){

    // 仮実装
    await startMessage([
        "卑弥呼の弟「そういえば、民が気になることを言っていたんだ」",
        "卑弥呼の弟「なんでも、いつの間にか地面に貝殻が埋まっているんだとか」",
      //卑弥呼振り向く
        "卑弥呼「民の困り事ならワシに報告せぬか！」",
        "卑弥呼の弟「すみません、姉上は野尻湖に行かれていたので…」",
        "壱与「何にしても、不思議な話ですね」",
        "卑弥呼の弟「そうなんです。まるで、ずっと昔に貝殻が飛んで来たような…」",
        "壱与「でも、今までは埋まっていなかったんですよね？」",
        "卑弥呼の弟「そう。そのせいで歩くと痛いし、農作業にも困ると言っていました」",
        "卑弥呼「ふむ…これも歴史の異変かもしれんのう」",
        "壱与「貝殻なら…過去の貝塚に向かえば、解決の糸口が見つかるかもしれません！」",
        "卑弥呼「貝塚か、行ってみるかのう」"
    ]);

    // TODO:
    // progress更新
    // 鏡アップデート
    // updateHouse()

    endEvent();

}

// 第2章攻略中
function brotherOmori(){

    startMessage([
        "卑弥呼の弟「邪馬台国！」"
    ], endEvent);

}
