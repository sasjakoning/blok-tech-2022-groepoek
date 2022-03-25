const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
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

const adminUserModel = mongoose.model("adminUser", adminUserSchema)

// const admin = new adminUserModel({
//     email: "admin@hotmail.com",
//     password: "123",
//     firstname: "Admin",
//     lastname: "User",
//     aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis",
//     interests: "",
//     images: ""    
// })

// admin.save((err, doc) => {
//     console.log(doc._id)
// })

module.exports = adminUserModel;