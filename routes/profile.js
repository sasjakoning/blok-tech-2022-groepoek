// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const adminUserModel = require("../models/adminUser");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const multer = require("multer")
const {
  authenticate
} = require('../config/auth');


// ---

const router = express.Router();
const upload = multer({
  dest: "public/uploads/"
})

const error = new Error("Plaatsgevonden error")

const getCurrentUsers = async () => {
  const userid = req.session.userid
  const currentUser = await userModel.findOne({
    email: userid,
  }).lean();

  return [userid, currentUser]
}



router.get("/", authenticate, profile);

async function profile(req, res) {
  try {
    const userid = req.session.userid
    const currentUser = await userModel.findOne({
      email: userid,
    }).lean();


    await res.render("profile", {
      layout: "index",
      data: currentUser,
    });
  } catch (error) {
    console.error(error)
  }
}



router.post("/updateprofile", upload.none(), updateProfile);

async function update(userid, updatedata) {
  try {
    const result = await userModel.updateOne({
      email: userid
    }, {
      $set: updatedata
    }, {
      upsert: true
    });
  } catch (error) {
    console.error(error)
  }

}

async function updateProfile(req, res) {
  try {
    const userid = req.session.userid

    update(userid, {
      firstname: req.body.voornaam,
      aboutme: req.body.omschrijving,
      gender: req.body.geslacht,
      age: req.body.leeftijd,
      location: req.body.plaats,
      height: req.body.lengte,
      // interests: req.body.interesses,
      platform: {
        discord: req.body.discord,
        xbox: req.body.xbox,
        playstation: req.body.playstation,
        whatsapp: req.body.whatsapp,
        messenger: req.body.messenger,
        skype: req.body.skype,
      },
    });

    const currentUser = await userModel.findOne({
      email: userid,
    }).lean();

    res.render("profile", {
      layout: "index",
      data: currentUser,
    });
  } catch (error) {
    console.error(error)
  }
}



router.post("/avatarupdate", upload.single("avatar"), avatarUpdate);

async function avatarUpdate(req, res) {
  try {
    const userid = req.session.userid

    const avatar = (await "uploads/") + req.file.filename;

    update(userid, {
      images: {
        avatar: avatar,
      }
    });

    const currentUser = await userModel.findOne({
      email: userid,
    }).lean();

    await res.render("profile", {
      layout: "index",
      data: currentUser,
    });
  } catch (error) {
    console.error(error)
  }
}


module.exports = router;