const skills = {

    sandAttack:{

        name:"砂けむり",
        learnLevel:5,

        mp:3,

        castMessage:"ゆうしゃは 砂けむりをおこした！",
        successMessage:"敵の攻撃が よわまった！",

        target:"enemy",
        stat:"atk",
        method:"multiply",
        value:0.8,
        duration:"battle"

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
        value:2.2,
        duration:"nextAttack"

    }

};
