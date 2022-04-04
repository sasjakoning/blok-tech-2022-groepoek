// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const adminUserModel = require("../models/adminUser");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const multer = require("multer")
const { authenticate } = require('../config/auth');


// ---

const router = express.Router();
const upload = multer({dest: "public/uploads/"})

// get all users from database etc
const getUsers = async () => {
  // find the admin user (which is being used as "logged in user" for demo purposes)
  const admin = await adminUserModel.findOne({});

  // find which users admin has matched
  const adminMatches = admin.matches;

  // return all users except the already matched ones
  const usersList = await userModel
    .find({
      _id: { $nin: adminMatches },
    })
    .lean();

  const adminLeaned = await adminUserModel
    .findOne({
      username: "adminuser",
    })
    .lean();

  return [usersList, admin, adminLeaned];
};

router.get("/", authenticate, profile);

async function profile(req, res) {
  getUsers().then(([result, admin, adminLeaned]) => {
    res.render("profile", {
      layout: "index",
      data: adminLeaned,
    });
  });
}

router.post("/updateprofile", upload.none(), updateProfile);

async function update(updatedata) {
  const result = await adminUserModel.updateOne(
    { email: "admin@hotmail.com" },
    { $set: updatedata },
    { upsert: true }
  );
}

async function updateProfile(req, res) {
  update({
    firstname: req.body.voornaam,
    aboutme: {
      description: req.body.omschrijving,
      age: req.body.leeftijd,
      place: req.body.plaats,
      height: req.body.lengte,
    },
    interests: req.body.interesses,
    platform: {
      discord: req.body.discord,
      xbox: req.body.xbox,
      playstation: req.body.playstation,
      whatsapp: req.body.whatsapp,
      messenger: req.body.messenger,
      skype: req.body.skype,
    },
  });

  getUsers().then(([result, admin, adminLeaned]) => {
    res.render("profile", {
      layout: "index",
      data: adminLeaned,
    });
  });
}

router.post("/avatarupdate", upload.single("avatar"), avatarUpdate);

async function avatarUpdate(req, res) {
  const avatar = (await "uploads/") + req.file.filename;

  update({
    images: {
      avatar: avatar,
    },
  });

  getUsers().then(([result, admin, adminLeaned]) => {
    res.render("profile", {
      layout: "index",
      data: adminLeaned,
    });
  });
}


module.exports = router;