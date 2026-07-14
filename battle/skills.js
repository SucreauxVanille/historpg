const skills = {

    sandAttack:{

        name:"砂けむり",
        learnLevel:4,

        mp:3,

        castMessage:"ゆうしゃは 砂けむりをおこした！",
        successMessage:"敵の攻撃が よわまった！",

        target:"enemy",
        stat:"atk",
        method:"multiply",
        value:0.8,
        duration:"battle"

    },
    
    firstAid:{

    name:"応急手当",
    learnLevel:7,

    mp:3,

    castMessage:"ゆうしゃは 応急手当をした！",
    successMessage:"ゆうしゃのキズが回復した！",

    target:"player",
    stat:"hp",
    method:"add",
    value:30

    },
    powerCharge:{

        name:"力ため",
        learnLevel:10,

        mp:4,

        castMessage:"ゆうしゃは 力をためた！",

        successMessage:"次の攻撃に 力をこめている！",

        target:"player",
        stat:"atk",
        method:"multiply",
        value:2.4,
        duration:"nextAttack"

    },

    mudShot:{

        name:"泥とばし",
        learnLevel:19,

        mp:8,

        castMessage:"ゆうしゃは 泥を投げつけた！",
        successMessage:"敵の攻撃が かなり よわまった！",

        target:"enemy",
        stat:"atk",
        method:"multiply",
        value:0.65,
        duration:"battle"

    },
    
    healing:{

    name:"集中回復",
    learnLevel:25,

    mp:7,

    castMessage:"ゆうしゃは 回復に集中した！",
    successMessage:"ゆうしゃのキズが回復した！",

    target:"player",
    stat:"hp",
    method:"add",
    value:80

    },
    soulCharge:{

        name:"気合込め",
        learnLevel:30,

        mp:8,

        castMessage:"ゆうしゃは 全力で 気合を込めた！",

        successMessage:"次の攻撃に 魂をのせる！",

        target:"player",
        stat:"atk",
        method:"multiply",
        value:3,
        duration:"nextAttack"

    }
    

};
