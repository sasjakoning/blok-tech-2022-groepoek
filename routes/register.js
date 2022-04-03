// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js");
const userModel = require("../models/user");
const adminUserModel = require("../models/adminUser");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

// ---

const router = express.Router();


router.get("/", async (req, res) => {
    console.log("hello dit is register")

    res.render("register", {
        layout: "index"
    });
})

module.exports = router;