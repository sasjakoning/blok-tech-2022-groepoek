// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const adminUserModel = require("../models/adminUser");
const mongoose = require("mongoose");
const multer = require("multer")
const toId = mongoose.Types.ObjectId;

// ---

const upload = multer({ dest: "public/uploads/" })

const router = express.Router();


router.post("/", upload.none(), async (res, req) => {
    // console.log(req.body.man)
})


module.exports = router;
