// models for mongodb here, like users

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    firstname: {
        type: String,
        required: [true, "Firstname is required"]
    },
    lastname: {
        type: String,
        required: [true,  "Lastname is required"]
    },
    gender: {
        type: String,
        required: [false]
    },
    aboutme: {
        type: String,
        required: [false]
    },
    interests: {
        type: Array,
        required: [false]
    },
    location: {
        type: String,
        required: [false]
    },
    age: {
        type: Number,
        required: [false]
    },
    height: {
        type: Number,
        required: [false]
    },
    images: {
        avatar: {type: String, required: [false]},
    },
    platform:{
        discord: {type: String, required: [false]},
        xbox: {type: String, required: [false]},
        playstation: {type: String, required: [false]},
        whatsapp: {type: String, required: [false]},
        messenger: {type: String, required: [false]},
        skype: {type: String, required: [false]},
    },
    likes: [{type: mongoose.Types.ObjectId, ref: "user"}],
    dislikes: [{type: mongoose.Types.ObjectId, ref: "user"}],
    matches: [{type: mongoose.Types.ObjectId, ref: "user"}]
})

const userModel = mongoose.model("user", userSchema)

// manually add users

// const user = userModel.insertMany([
//     {
//         email: "sasjakoning@hotmail.com",
//         password: "123",
//         firstname: "Sasja",
//         lastname: "Koning",
//         gender: "male",
//         aboutme: "Ruth Ocean Blackman is a 40-year-old chef at own restaurant who enjoys blogging.",
//         interests: [
//             "minecraft",
//             "fortnite",
//             "overwatch"
//           ],
//         location: "Amsterdam",
//         age: 23,
//         height: 163,
//         platform: {
//             discord: "sasja#1234",
//             whatsapp: "06123456"
//         }
//     },
//     {
//         email: "griffinrolling@hotmail.com",
//         password: "123",
//         firstname: "Griffin",
//         lastname: "Rollins",
//         gender: "male",
//         aboutme: "She is an Australian Sikh who defines herself as bisexual. She started studying food science at college but never finished the course.",
//         interests: [
//             "overwatch",
//             "jentiegarden"
//           ],
//         location: "Amsterdam",
//         age: 23,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker",
//             xbox: "player"
//         }    
//     },
//     {
//         email: "valentintanner@hotmail.com",
//         password: "123",
//         firstname: "Valentin",
//         lastname: "Tanner",
//         gender: "male",
//         aboutme: "Physically, Ruth is slightly overweight but otherwise in good shape. She is short with pale skin, grey hair and black eyes.",
//         interests: [
//             "minecraft",
//             "valorant"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             whatsapp: "06123456"
//         }    
//     },
//     {
//         email: "noahpowell@hotmail.com",
//         password: "123",
//         firstname: "Noah",
//         lastname: "Powell",
//         gender: "male",
//         aboutme: "She grew up in an upper class neighbourhood. She was raised by her father, her mother having left when she was young.",
//         interests: [
//             "valorant",
//             "minecraft"
//           ],
//         location: "Amsterdam",
//         age: 27,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
//     {
//         email: "royyu@hotmail.com",
//         password: "123",
//         firstname: "Roy",
//         lastname: "Yu",
//         gender: "non-binary",
//         aboutme: "She is currently single. Her most recent romance was with a personal trainer called Alvin Rae Simmons,",
//         interests: [
//             "overwatch",
//             "minecraft"
//           ],
//         location: "Amsterdam",
//         age: 19,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
//     {
//         email: "alfredmunoz@hotmail.com",
//         password: "123",
//         firstname: "Alfred",
//         lastname: "Munoz",
//         gender: "male",
//         aboutme: "who was 2 years older than her. They broke up because Alvin wanted somebody more 'badass'.",
//         interests: [
//             "fortnite",
//             "minecraft"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
//     {
//         email: "auggilbert@hotmail.com",
//         password: "123",
//         firstname: "Augustus",
//         lastname: "Gilbert",
//         gender: "female",
//         aboutme: "Ruth's best friend is a chef at own restaurant called Dillon Bell. They are inseparable.",
//         interests: [
//             "overwatch",
//             "valorant"
//           ],
//         location: "Amsterdam",
//         age: 20,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             whatsapp: "06123456"
//         }    
//     },
//     {
//         email: "keithgoodwin@hotmail.com",
//         password: "123",
//         firstname: "Keith",
//         lastname: "Goodwin",
//         gender: "non-binary",
//         aboutme: "She also hangs around with Finlay O'Brien and Abdul Evans. They enjoy playing card games together. ",
//         interests: [
//             "overwatch",
//             "valorant"
//           ],
//         location: "Amsterdam",
//         age: 21,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker",
//             skype: "killerqueen"
//         }    
//     },
//     {
//         email: "ellicemartins@hotmail.com",
//         password: "123",
//         firstname: "Ellice",
//         lastname: "Martins",
//         gender: "male",
//         aboutme: "She is addicted to chocolate, something which her friend Shirley Betsy Walker pointed out when she was 18. The problem intensified in 2022. ",
//         interests: [
//             "minecraft",
//             "jentlegarden"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker",
//             skype: "killerqueen"
//         }    
//     },
//     {
//         email: "avianawilliam@hotmail.com",
//         password: "123",
//         firstname: "Aviana",
//         lastname: "William",
//         gender: "female",
//         aboutme: "She is a Spanish Buddhist who defines herself as asexual. She has a degree in sports science. She is obsessed with zombies.",
//         interests: [
//             "callofduty",
//             "valorant"
//           ],
//         location: "Amsterdam",
//         age: 34,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
//     {
//         email: "kubafrencis@hotmail.com",
//         password: "123",
//         firstname: "Kuba",
//         lastname: "Frencis",
//         gender: "male",
//         aboutme: "Physically, Flora is not in great shape. She needs to lose quite a lot of weight. She is average-height with pale skin, grey hair and brown eyes. ",
//         interests: [
//             "callofduty",
//             "minecraft"
//           ],
//         location: "Amsterdam",
//         age: 32,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker",
//             skype: "killerqueen"
//         }    
//     },
//     {
//         email: "eamonmc@hotmail.com",
//         password: "123",
//         firstname: "Eamonn",
//         lastname: "Mcknight",
//         gender: "male",
//         aboutme: "She grew up in a middle class neighbourhood. Having never really known her parents, she was raised in a series of foster homes.",
//         interests: [
//             "overwatch",
//             "fortnite"
//           ],
//         location: "Amsterdam",
//         age: 18,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
//     {
//         email: "kasimsteven@hotmail.com",
//         password: "123",
//         firstname: "Kasim",
//         lastname: "Stevenson",
//         gender: "female",
//         aboutme: "Flora's best friend is a gym assistant called Shirley Walker. They have a very firey friendship.",
//         interests: [
//             "overwatch",
//             "minecraft"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
//     {
//         email: "bethanygall@hotmail.com",
//         password: "123",
//         firstname: "Bethany",
//         lastname: "Gallagher",
//         gender: "female",
//         aboutme: "She also hangs around with Everly Yates and Angelica Adam. They enjoy social media together. ",
//         interests: [
//             "callofduty",
//             "valorant"
//           ],
//         location: "Amsterdam",
//         age: 23,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
//     {
//         email: "riyarossi@hotmail.com",
//         password: "123",
//         firstname: "Riya",
//         lastname: "Rossi",
//         gender: "male",
//         aboutme: "Christiana Suzanne Blacksmith is a 20-year-old P.P.E. student who enjoys travelling, walking and watching television.",
//         interests: [
//             "valorant",
//             "jentlegarden"
//           ],
//         location: "Amsterdam",
//         age: 24,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
//     {
//         email: "devvilla@hotmail.com",
//         password: "123",
//         firstname: "Dev",
//         lastname: "Villalobos",
//         gender: "female",
//         aboutme: "She is entertaining and gentle, but can also be very disloyal and a bit unfriendly.",
//         interests: [
//             "callofduty",
//             "fortnite"
//           ],
//         location: "Amsterdam",
//         age: 19,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
//     {
//         email: "eviebevan@hotmail.com",
//         password: "123",
//         firstname: "Evie-Mai",
//         lastname: "Bevan",
//         gender: "male",
//         aboutme: "She is Dutch who defines herself as asexual. She is currently at college. studying philosophy, politics and economics. ",
//         interests: [
//             "overwatch",
//             "fortnite"
//           ],
//         location: "Amsterdam",
//         age: 26,
//         height: 182,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
//     {
//         email: "asiyaredfern@hotmail.com",
//         password: "123",
//         firstname: "Asiya",
//         lastname: "Redfern",
//         gender: "female",
//         aboutme: " She is allergic to hazelnuts. She has a severe phobia of balloons, and is obsessed with milkshake. ",
//         interests: [
//             "overwatch"
//           ],
//         location: "Amsterdam",
//         age: 20,
//         height: 120,
//         platform: {
//             discord: "kaas",
//             playstation: "lekker"
//         }    
//     },
// ]) 



 module.exports = userModel;