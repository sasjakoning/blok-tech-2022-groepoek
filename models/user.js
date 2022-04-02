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
        required: [true,  "gender is required"]
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
    images: {
        type: Array,
        required: [false]
    },
    likes: [{type: mongoose.Types.ObjectId, ref: "adminuser"}],
    dislikes: [{type: mongoose.Types.ObjectId, ref: "adminuser"}],
    matches: [{type: mongoose.Types.ObjectId, ref: "adminuser"}]
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
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "minecraft",
//             "fortnite",
//             "overwatch"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "griffinrolling@hotmail.com",
//         password: "123",
//         firstname: "Griffin",
//         lastname: "Rollins",
//         gender: "male",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "overwatch",
//             "jentiegarden"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "valentintanner@hotmail.com",
//         password: "123",
//         firstname: "Valentin",
//         lastname: "Tanner",
//         gender: "male",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "minecraft",
//             "valorant"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "noahpowell@hotmail.com",
//         password: "123",
//         firstname: "Noah",
//         lastname: "Powell",
//         gender: "male",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "valorant",
//             "minecraft"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "royyu@hotmail.com",
//         password: "123",
//         firstname: "Roy",
//         lastname: "Yu",
//         gender: "non-binary",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "overwatch",
//             "minecraft"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "alfredmunoz@hotmail.com",
//         password: "123",
//         firstname: "Alfred",
//         lastname: "Munoz",
//         gender: "male",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "fortnite",
//             "minecraft"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "auggilbert@hotmail.com",
//         password: "123",
//         firstname: "Augustus",
//         lastname: "Gilbert",
//         gender: "female",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "overwatch",
//             "valorant"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "keithgoodwin@hotmail.com",
//         password: "123",
//         firstname: "Keith",
//         lastname: "Goodwin",
//         gender: "non-binary",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "overwatch",
//             "valorant"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "ellicemartins@hotmail.com",
//         password: "123",
//         firstname: "Ellice",
//         lastname: "Martins",
//         gender: "male",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "minecraft",
//             "jentlegarden"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "avianawilliam@hotmail.com",
//         password: "123",
//         firstname: "Aviana",
//         lastname: "William",
//         gender: "female",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "callofduty",
//             "valorant"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "kubafrencis@hotmail.com",
//         password: "123",
//         firstname: "Kuba",
//         lastname: "Frencis",
//         gender: "male",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "callofduty",
//             "minecraft"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "eamonmc@hotmail.com",
//         password: "123",
//         firstname: "Eamonn",
//         lastname: "Mcknight",
//         gender: "male",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "overwatch",
//             "fortnite"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "kasimsteven@hotmail.com",
//         password: "123",
//         firstname: "Kasim",
//         lastname: "Stevenson",
//         gender: "female",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "overwatch",
//             "minecraft"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "bethanygall@hotmail.com",
//         password: "123",
//         firstname: "Bethany",
//         lastname: "Gallagher",
//         gender: "female",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "callofduty",
//             "valorant"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "riyarossi@hotmail.com",
//         password: "123",
//         firstname: "Riya",
//         lastname: "Rossi",
//         gender: "male",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "valorant",
//             "jentlegarden"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "devvilla@hotmail.com",
//         password: "123",
//         firstname: "Dev",
//         lastname: "Villalobos",
//         gender: "female",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "callofduty",
//             "fortnite"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "eviebevan@hotmail.com",
//         password: "123",
//         firstname: "Evie-Mai",
//         lastname: "Bevan",
//         gender: "male",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "overwatch",
//             "fortnite"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
//     {
//         email: "asiyaredfern@hotmail.com",
//         password: "123",
//         firstname: "Asiya",
//         lastname: "Redfern",
//         gender: "female",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: [
//             "overwatch"
//           ],
//         location: "Amsterdam",
//         age: 22,
//         images: "",    
//     },
// ])


 module.exports = userModel;