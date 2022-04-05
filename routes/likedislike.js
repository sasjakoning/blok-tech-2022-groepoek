// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const adminUserModel = require("../models/adminUser");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const compression = require('compression')
const minify = require('express-minify');
const multer = require("multer")

const cookieParser = require("cookie-parser");
let session = require("express-session");

const { authenticate } = require('../config/auth');
const async = require("hbs/lib/async");
const { log } = require("npmlog");

const upload = multer({dest: "public/uploads/"})

// ---

const router = express.Router();
router.use(compression());
router.use(minify());


let genderFilter = [];
let ageFilter = [];
let interestsFilter = [];
let platformFilter = [];

// get all users from database etc
const getUsers = async () => {
  // find the admin user (which is being used as "logged in user" for demo purposes)
  const admin = await adminUserModel.findOne({});

  // find which users admin has matched
  const adminMatches = admin.matches;

  console.log(platformFilter)

  // return all users except the already matched ones
  const usersList = await userModel.find({
    _id: { $nin: adminMatches },
    // gender: {$in: genderFilter},
    // age: {$in: ageFilter},
    // interests: {$in: interestsFilter},
    // platform: {$cond: {if: platformFilter, then: {$in: platformFilter}}}
  }).lean();

  console.log(usersList)

  const adminLeaned = await adminUserModel.findOne({
    username: "adminuser",
  }).lean();

  return [usersList, admin, adminLeaned];
};

// to count the amount of times the page has been visited by the user. this to serve the correct object from array
let counter1 = 0;
let counter2 = 5;

router.post("/filtered", upload.none(), async (req, res) => {
  const {gender, age, interests , platform} = req.body;

  console.log(gender + age + interests + platform)

  genderFilter.push(gender)
  ageFilter.push(age)
  interestsFilter.push(interests)
  platformFilter.push(platform)

  if(platformFilter.includes(undefined)){
    console.log(`content of platformfilter should be undefined and cleared`)
    platformFilter = {};
    console.log(platformFilter);
  }else {
    console.log(`content of platformfilter has content`)
    console.log(platformFilter);
  }

  // platformFilter = {
  //   $cond: {
  //     if: platformFilter, then: platformFilter, else: {}
  //   }
  // }


  let users = await userModel.find({
    interests,
    gender,
    age,
    platform
  }) 

  console.log(users)

  res.render("main", {
    layout: "index"
  });
})

router.get("/", authenticate, async (req, res) => {
  try {

    counter1 = 0;
    counter2 = 5;
    // for demo purposes, counter is always reset when on start page

    const filtered = await userModel.find({interests: "callofduty"})

    // get users
    getUsers().then(([result, admin]) => {
      console.log(`counter1 is ${counter1}`);
      console.log(`counter2 is ${counter2}`);


      // only return two users from the array
      result = result.slice(counter1, counter2);

      // send result to handlebars
      res.render("main", {
        layout: "index",
        data: result,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

/****************************/
/* if like has been pressed */
/****************************/

router.post("/like/:id", authenticate , async (req, res) => {
  console.log("like");

  try {
    // turns id into ObjectId instead of a string with number
    req.params.id = toId(req.params.id);

    // find the user that's been liked
    const likedUser = await userModel.findById(req.params.id).lean();

    // put all users in variable to check length
    const userCount = await userModel.find({}).lean();

    // find users
    getUsers().then(([result, admin, adminLeaned]) => {
      // add to the counter everytime "like" is pressed aka: link is visited
      console.log("Adding to counter");
      counter1++;
      counter2++;

      console.log(`counter1 is ${counter1}`);
      console.log(`counter2 is ${counter2}`);

      // only send 2 users
      result = result.slice(counter1, counter2);

      console.log(userCount.length);

      // if the counter goes beyond the amount of users in array, reset back to original
      if (counter2 == userCount.length) {
        counter1 = 0;
        counter2 = 5;
      }

      // add likeduser to likes array of admin (Not included in this feature)
      // admin.likes.push(likedUser)
      // admin.save();

      // check if the liked user has own likes as well
      if (likedUser.likes[0]) {
        // if true, check if the like in the likedUser is equal to the admin user's id
        if (likedUser.likes[0].equals(admin._id)) {
          console.log("Match!");

          let isMatched = true;

          // fix for database update which offsets the array
          console.log("pulling from counter");
          counter1--;
          counter2--;

          if (admin.matches.includes(likedUser._id)) {
            console.log("admin matches includes the id of liked user");
          } else {
            console.log("admin matches does not yet include this liked user");

            console.log("adding liked user to database");

            admin.matches.push(likedUser);
            admin.save();
          }

          // let handlebars know that there's a match, will insert a new template with a popup
          res.render("main", {
            layout: "index",
            data: result,
            likedUser: likedUser,
            isMatched: isMatched,
            adminUser: adminLeaned,
          });
        }
      } else {
        console.log("likedUser does not have likes");

        res.render("main", {
          layout: "index",
          data: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

/*******************************/
/* if dislike has been pressed */
/*******************************/

router.post("/dislike/:id", authenticate , async (req, res) => {
  console.log("dislike");

  try {
    // turns id into ObjectId instead of a string with number
    req.params.id = toId(req.params.id);

    // find the user that's been liked
    const disLikedUser = await userModel.findById(req.params.id).lean();

    // put all users in variable to check length
    const userCount = await userModel.find({}).lean();

    // find users
    getUsers().then(([result, admin]) => {
      // add to the counter everytime "dislike" is pressed aka: link is visited
      counter1++;
      counter2++;

      console.log(`counter1 is ${counter1}`);
      console.log(`counter2 is ${counter2}`);

      // only send 2 users
      result = result.slice(counter1, counter2);

      console.log(userCount.length);

      // if the counter goes beyond the amount of users in array, reset back to original
      if (counter2 == userCount.length) {
        counter1 = 0;
        counter2 = 5;
      }

      // add likeduser to likes array of admin (Not included in this feature)
      // admin.dislikes.push(likedUser)
      // admin.save();

      res.render("main", {
        layout: "index",
        data: result,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/reset", authenticate, async (req, res) => {
  try {
    adminUserModel.updateMany(
      { name: "admin" },
      { $set: { matches: [] } },
      (err, affected) => {
        console.log("affected", affected);
      }
    );

    res.render("reset", {
      layout: "index",
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
