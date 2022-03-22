// models for mongodb here, like users

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likedislikeUserSchema = new Schema({
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
    lookingfor: {
        type: Array,
        required: [false]
    },
    likes: [{type: mongoose.Types.ObjectId, ref: "adminuser"}],
    dislikes: [{type: mongoose.Types.ObjectId, ref: "adminuser"}]
})

const likedislikeUserModel = mongoose.model("likedislike-user", likedislikeUserSchema)

// manually add users

// const user = likedislikeUserModel.insertMany([
//     {
//         firstname: "Sasja",
//         lastname: "Koning",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Griffin",
//         lastname: "Rollins",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Valentin",
//         lastname: "Tanner",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Noah",
//         lastname: "Powell",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Roy",
//         lastname: "Yu",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Alfred",
//         lastname: "Munoz",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Augustus",
//         lastname: "Gilbert",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Keith",
//         lastname: "Goodwin",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Ellice",
//         lastname: "Martins",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Aviana",
//         lastname: "William",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Kuba",
//         lastname: "Frencis",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Eamonn",
//         lastname: "Mcknight",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Kasim",
//         lastname: "Stevenson",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Bethany",
//         lastname: "Gallagher",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Riya",
//         lastname: "Rossi",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Dev",
//         lastname: "Villalobos",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Evie-Mai",
//         lastname: "Bevan",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Asiya",
//         lastname: "Redfern",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
// ])


module.exports = likedislikeUserModel;