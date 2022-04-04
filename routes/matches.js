// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const adminUserModel = require("../models/adminUser");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

const { authenticate } = require('../config/auth');

// ---

const router = express.Router();

// get all users from database etc
const getUsers = async () => {
  // find the admin user (which is being used as "logged in user" for demo purposes)
  const admin = await adminUserModel.findOne({}).lean();

  console.log(admin)

  // find which users admin has matched
  const adminMatches = admin.matches;

  // return all users except the already matched ones
  const usersList = await userModel.find({
    _id: { $nin: adminMatches },
  }).lean();

  const adminLeaned = await adminUserModel.findOne({
    username: "adminuser",
  }).lean();

  return [usersList, admin, adminLeaned];
};

// to count the amount of times the page has been visited by the user. this to serve the correct object from array
let counter1 = 0;
let counter2 = 6;

router.get("/", authenticate,  async (req, res) => {
  try {
    counter1 = 0;
    counter2 = 6;
    // for demo purposes, counter is always reset when on start page

    // get users
    getUsers().then(([result, admin]) => {
      console.log(`counter1 is ${counter1}`);
      console.log(`counter2 is ${counter2}`);

      // only return two users from the array
      result = result.slice(counter1, counter2);

      // send result to handlebars
      res.render("matches", {
        layout: "index",
        data: result,
      });
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
