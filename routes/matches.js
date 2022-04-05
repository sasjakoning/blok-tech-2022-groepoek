// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

const { authenticate } = require('../config/auth');

// ---

const router = express.Router();

// get all users from database etc
const getUsers = async () => {

  // return all users except the already matched ones
  const usersList = await userModel.find({}).lean();

  return usersList;
};

// to count the amount of times the page has been visited by the user. this to serve the correct object from array
let counter1 = 0;
let counter2 = 6;

router.get("/", authenticate,  async (req, res) => {
  try {

    const userid = req.session.userid
    const currentUser = await userModel.findOne({
      email: userid,
    }).populate("matches").lean();

    let userMatches = currentUser.matches

    console.log(userMatches)

    counter1 = 0;
    counter2 = 6;
    // for demo purposes, counter is always reset when on start page

    console.log(`counter1 is ${counter1}`);
    console.log(`counter2 is ${counter2}`);

    // only return two users from the array
    userMatches = userMatches.slice(counter1, counter2);

    // send result to handlebars
    res.render("matches", {
      layout: "index",
      data: userMatches,
    })

  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
