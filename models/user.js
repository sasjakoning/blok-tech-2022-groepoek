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
    aboutme: {
        type: String,
        required: [false]
    },
    interests: {
        type: Array,
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
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "griffinrolling@hotmail.com",
//         password: "123",
//         firstname: "Griffin",
//         lastname: "Rollins",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "valentintanner@hotmail.com",
//         password: "123",
//         firstname: "Valentin",
//         lastname: "Tanner",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "noahpowell@hotmail.com",
//         password: "123",
//         firstname: "Noah",
//         lastname: "Powell",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "royyu@hotmail.com",
//         password: "123",
//         firstname: "Roy",
//         lastname: "Yu",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "alfredmunoz@hotmail.com",
//         password: "123",
//         firstname: "Alfred",
//         lastname: "Munoz",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "auggilbert@hotmail.com",
//         password: "123",
//         firstname: "Augustus",
//         lastname: "Gilbert",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "keithgoodwin@hotmail.com",
//         password: "123",
//         firstname: "Keith",
//         lastname: "Goodwin",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "ellicemartins@hotmail.com",
//         password: "123",
//         firstname: "Ellice",
//         lastname: "Martins",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "avianawilliam@hotmail.com",
//         password: "123",
//         firstname: "Aviana",
//         lastname: "William",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "kubafrencis@hotmail.com",
//         password: "123",
//         firstname: "Kuba",
//         lastname: "Frencis",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "eamonmc@hotmail.com",
//         password: "123",
//         firstname: "Eamonn",
//         lastname: "Mcknight",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "kasimsteven@hotmail.com",
//         password: "123",
//         firstname: "Kasim",
//         lastname: "Stevenson",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "bethanygall@hotmail.com",
//         password: "123",
//         firstname: "Bethany",
//         lastname: "Gallagher",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "riyarossi@hotmail.com",
//         password: "123",
//         firstname: "Riya",
//         lastname: "Rossi",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "devvilla@hotmail.com",
//         password: "123",
//         firstname: "Dev",
//         lastname: "Villalobos",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "eviebevan@hotmail.com",
//         password: "123",
//         firstname: "Evie-Mai",
//         lastname: "Bevan",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
//     {
//         email: "asiyaredfern@hotmail.com",
//         password: "123",
//         firstname: "Asiya",
//         lastname: "Redfern",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//         interests: "",
//         images: "",    
//     },
// ])


module.exports = userModel;