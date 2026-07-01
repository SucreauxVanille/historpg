function omoriShellEvent(){

    if(hasFlag("omoriShellFinished")){
        endEvent();
        return;
    }

    startMessage(
        [
            "卑弥呼「ふむ…海がすぐそばなのじゃな」",
            "卑弥呼「確かにこれなら貝とも関係がありそうじゃ」",
            "？？？「カタカタ…」",
            "卑弥呼「これ、おかしな声を出すでない」",
            "？？？「カタカタカタ…！」",
            "卑弥呼「貝！？貝が動いておるのか！？」"
        ],
        () => {

startBattle(
    ["shell"],
    (result)=>{

        if(result !== "win"){
            endEvent();
            return;
        }

        setFlag("omoriShellFinished");
        gameState.progress = PROGRESS.OMORI_SHELL;

        startMessage(
            [
                "卑弥呼「何で貝殻に目玉がついて動くんじゃ！」",
                "卑弥呼「命なきものが暴れ出すなど…何者かが悪意を持って異変を起こしておるようじゃ」"
            ],
            endEvent
        );

    }
);
        }
    );
}

function meetMorseEvent(){
        if(hasFlag("metMorse")){
            startMessage(
        [
            "モース「ワタシは大森貝塚を発掘調査していたのデース」",
            "モース「モースこしで調査が終わるところで、おかしな光に吸い込まれてしまいマシタ」",
            "モース「気が付くとここにワープして、貝殻に襲われたのデース」",
            "卑弥呼「他の時代から転移してきた…ふむ、おぬしら二人は似た事情なのかもしれぬな」",
            "モース「帽子ボーイ！君も光に吸い込まれたのデスネ！」"
        ],  
        endEvent
    );
        return;
    }
    startMessage(
        [
            "妙な男「ヘルプミー！」",
            "卑弥呼「今度は何じゃ！？」",
            "妙な男「ハロー！私はモースと申ス者デース！」",
            "モース「体に貝殻がまとわりついて動けマセーン！助けてクダサーイ！」",
            "卑弥呼「おぬしの体、何かおかしいと思ったら貝殻じゃったのか！」",
            "モース「イエス！貝殻が動く、何か不思議な力が働いてマース！」",
            "卑弥呼「ふむ…力の源を断てば、お主の体も自由になりそうじゃのう」",
            "モース「オー！キュートガール、ベリーカインド！お頼み申ス！」"
        ],  
    () => {
        setFlag("metMorse");
        endEvent();
    }
    );
}

function omorimob1Event(){
    npcDialogue(
        "omoriShellFinished",   //仮置き。土偶イベントに差し替え予定
        [
            "男「オラ達は食い終わった貝殻や骨を貝塚に捨ててるだ」",
            "男「ただのゴミでなく、食べたことを感謝する場でもあるだよ」"
        ],
        [
            "男「残ってるヘンテコな貝殻は、オラ達もやっつけるだよ」",
            "男「普通の貝殻に戻ったら、貝塚に葬ってやるだ」"
        ]
    );
}

function omorimobF1Event(){
    npcDialogue(
        "omoriShellFinished",   //仮置き。土偶イベントに差し替え予定
        [
            "女「ここが貝塚だ」",
            "女「捨てたはずの貝殻が飛び出しちまって困ってるべよ」"
        ],
        [
            "女「ここが貝塚だ」",
            "女「オラ達にとっては大切な場所だべよ」"
        ]
    );
}

function omoriHouseEvent(){
    startMessage(
        [
            "卑弥呼「これは竪穴式住居というやつじゃな」",
            "卑弥呼「民の住む家は、ワシらの時代と変わらんのう」"
        ],
        endEvent
    );
}
