// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const adminUserModel = require("../models/adminUser");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
const compression = require("compression");
const minify = require("express-minify");
const multer = require("multer");

const cookieParser = require("cookie-parser");
let session = require("express-session");

const { authenticate } = require("../config/auth");
const async = require("hbs/lib/async");
const { log } = require("npmlog");

const upload = multer({ dest: "public/uploads/" });

// ---

const router = express.Router();
router.use(compression());
router.use(minify());

// save filter values to these variables
let genderFilter;
let ageFilter;
let interestsFilter;
let platformFilter;

// save session user id to this variable
let userid;

// get all users from database etc
const getUsers = async (req, res) => {
  // find logged in user based on session id
  const currentUser = await userModel
    .findOne({
      email: userid,
    })
    .lean();

  // get matches of current user
  const currentUserMatches = currentUser.matches;
  const currentUserLikes = currentUser.likes;
  const currentUserDislikes = currentUser.dislikes;

  const currentUserConcat = [];

  const currentUserInfo = currentUserConcat.concat(currentUserMatches, currentUserLikes, currentUserDislikes)

  console.log("currentuser info is")
  console.log(currentUserInfo)

  // return all users except the already matched ones
  const usersList = await userModel
    .find({
      _id: { $nin: currentUserInfo},
    })
    .lean();

  return [usersList, currentUser];
};

// to count the amount of times the page has been visited by the user. this to serve the correct object from array
let counter1 = 0;
let counter2 = 5;

router.post("/filtered", upload.none(), async (req, res) => {
  const { gender, age, interests, platform } = req.body;

  console.log(gender + age + interests + platform);

  genderFilter = gender;
  ageFilter = age;
  interestsFilter = interests;
  platformFilter = platform;

  let query = {};
  query["$and"] = [];
  if (genderFilter != undefined) {
    query["$and"].push({ gender: { $in: genderFilter } });
  }
  if (ageFilter != undefined) {
    query["$and"].push({ age: { $in: ageFilter } });
  }
  if (interestsFilter != undefined) {
    query["$and"].push({ interests: { $in: interestsFilter } });
  }

  let usersList = await userModel.find(query).lean();

  //  usersList.forEach(user => {
  //    if(user.interests.includes(interestsFilter)){
  //      actualUsers.push(user)
  //    }
  //  })

  // only return two users from the array
  // usersList = usersList.slice(counter1, counter2);

  // send result to handlebars
  res.render("main", {
    layout: "index",
    data: usersList,
  });
});

router.get("/", authenticate, upload.none(), async (req, res) => {
  try {
    userid = req.session.userid;

    genderFilter = undefined;
    ageFilter = undefined;
    interestsFilter = undefined;
    platformFilter = undefined;

    counter1 = 0;
    counter2 = 5;
    // for demo purposes, counter is always reset when on start page

    // get users
    getUsers().then(([result, currentUser]) => {
      console.log(currentUser);

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

router.post("/like/:id", authenticate, async (req, res) => {
  console.log("like");

  try {
    // turns id into ObjectId instead of a string with number
    req.params.id = toId(req.params.id);

    // find the user that's been liked
    const likedUser = await userModel.findById(req.params.id).lean();

    // put all users in variable to check length
    const userCount = await userModel.find({}).lean();

    // find users
    getUsers().then(([result, currentUser]) => {
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

      console.log("adding liked user to database");

      userModel.findOneAndUpdate(
        {_id: currentUser._id},
        {$push: {likes: likedUser}},
        function (err, success) {
          if (err){
            console.log(err)
          }else {
            console.log("added user to likes!")
          }
        }
      )

      // check if the liked user has own likes as well
      if (likedUser.likes) {
        const likedUserLikes = likedUser.likes;

        likedUserLikes.forEach((like) => {

          // als de likeduser jou terug liked:
          if (like.equals(currentUser._id)) {

            console.log("liked user likes you back");
            let isMatched = true;

            // fix for database update which offsets the array
            console.log("pulling from counter");
            counter1--;
            counter2--;

            // als de ingelogde user al gematched heeft met de likeduser
            if (currentUser.matches.includes(likedUser._id)) {
              console.log("admin matches includes the id of liked user");
            } else {
              // als de currentuser not niet gematched heeft, voeg toe aan matches
              console.log("admin matches does not yet include this liked user");

              console.log("adding liked user to database");

              console.log(currentUser._id)
              console.log(likedUser._id);

              userModel.findOneAndUpdate(
                {_id: currentUser._id},
                {$push: {matches: likedUser}},
                function (err, success) {
                  if (err){
                    console.log(err)
                  }else {
                    console.log("added user to matches!")
                  }
                }
              )
            }

            // let handlebars know that there's a match, will insert a new template with a popup
            res.render("main", {
              layout: "index",
              data: result,
              likedUser: likedUser,
              isMatched: isMatched,
              adminUser: currentUser,
            });
          } else {
            console.log("likeduser does not like currentuser back");

            console.log("adding liked user to database");

            userModel.findOneAndUpdate(
              {_id: currentUser._id},
              {$push: {likes: likedUser}},
              function (err, success) {
                if (err){
                  console.log(err)
                }else {
                  console.log("added user to likes!")
                }
              }
            )
          }
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

router.post("/dislike/:id", authenticate, async (req, res) => {
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
