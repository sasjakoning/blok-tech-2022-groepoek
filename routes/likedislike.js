// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user")

// ---

const router = express.Router();


router.get("/", async (req, res) => {
    const users = await userModel.find({}).lean();
    res.render("main", {
        layout: "index",
        data: users
    })
})

router.post("/like/:id", async (req, res) => {
    console.log("succes")
})

module.exports = router;