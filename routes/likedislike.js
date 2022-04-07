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
// Bewaard filter waarden in deze variables, zorgt dat de waarde van de filter globaal worden opgeslagen,zodat je ze ook op andere plekken kan oproepen.
let genderFilter;
let ageFilter;
let interestsFilter;
let platformFilter;

// save session user id to this variable
// global variable, kijkt naar de user die is ingelogt, cookies etc.
let userid;

// dingen opslaan
let globalQuery = {};

// get all users from database etc
// function, die de gebruikers ophaalt.
const getUsers = async (req, res) => {
  // find logged in user based on session id
  // haalt de ingelogde gebruiker op
  const currentUser = await userModel
    .findOne({
      email: userid,
    })
    // zonder.lean krijg je een hele lap tekst, laat alleen relefante/essentiele info zien. het versimpeld/meer leesbaar maken.
    .lean(); 


  // get matches, likes and dislikes of current user
  // eerst de ingelogde gebruiker kijken of die matches heeft door de .matches
  const currentUserMatches = currentUser.matches;
  const currentUserLikes = currentUser.likes;
  const currentUserDislikes = currentUser.dislikes;

  const currentUserConcat = [];

  // door deze lijn te gebruiken zorgt die ervoor dat alles in 1 array komt.
  const currentUserInfo = currentUserConcat.concat(currentUserMatches, currentUserLikes, currentUserDislikes)

  // haal alle gebruikers op behalve jezelf. 
  globalQuery["_id"] = { $nin: currentUserInfo }

  console.log(globalQuery);

  // return all users except the already matched ones
  // zoekt de gebruikers, alle waarde geven we mee.
  const usersList = await userModel.find(globalQuery).lean();

  return [usersList, currentUser];
};

// to count the amount of times the page has been visited by the user. this to serve the correct object from array
let counter1 = 0;
let counter2 = 5;

/****************************/
/**********  Filter *********/
/****************************/
router.post("/filtered", upload.none(), async (req, res) => {
  // variable aanmaken met onderstaande kenmerken
  const { gender, age, interests, platform } = req.body; // req.body haalt het op, wat je hebt aangevraagd

// globale, slaan we de waardes op
  genderFilter = gender;
  ageFilter = age;
  interestsFilter = interests;
  platformFilter = platform;

// globalquery is een query die is gedefinieerd voor de hele site en 
// beschikbaar wordt gesteld voor gebruik in projecten als dat nodig is. 

// het globale wat we van te voren hebben gemaakt, "$and"=
// if controleert controlleert of er een waarde is ingevuld.
  globalQuery["$and"] = []; //array
  if (genderFilter != undefined) {
    globalQuery["$and"].push({ gender: { $in: genderFilter } }); 
    //zoek in de gender ($in = include, kijkt of die data erin zit in dit geval het geslacht. kijkt hij of de waarde van het gender filter erin zit)
  }
  if (ageFilter != undefined) {
    globalQuery["$and"].push({ age: { $in: ageFilter } });
  }
  if (interestsFilter != undefined) {
    globalQuery["$and"].push({ interests: { $in: interestsFilter } });
  }

// gaat naar de pagina /swiping
  res.redirect("/swiping")

});

// resetten, haalt de global query helemaal leeg. "reset"
router.post("/filterreset", upload.none(), async (req, res) => {
  globalQuery = {};

  res.redirect("/swiping")
})

// de swiping pagina. 
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
    // om de gebruikers op te halen.
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

      console.log("adding liked user to database ccc");

      userModel.findOneAndUpdate(
        {_id: currentUser._id},
        {$push: {likes: likedUser}},
        function (err, success) {
          if (err){
            console.log(err)
          }else {
            return;
          }
        }
      )

      const likedUserLikes = likedUser.likes;

      // check if the liked user has own likes as well
      if (likedUserLikes.length > 0) {

        console.log("yes")

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

              console.log("adding liked user to database aaa");

              console.log(currentUser._id)
              console.log(likedUser._id);

              userModel.findOneAndUpdate(
                {_id: currentUser._id},
                {$push: {matches: likedUser}},
                function (err, success) {
                  if (err){
                    console.log(err)
                  }else {
                    return;
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

            console.log("kaas");
            console.log("adding liked user to database bbb");

            userModel.findOneAndUpdate(
              {_id: currentUser._id},
              {$push: {likes: likedUser}},
              function (err, success) {
                if (err){
                  console.log(err)
                }else {
                  return;
                }
              }
            )
          }
        });
      }else {
        res.render("main", {
          layout: "index",
          data: result
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
    const dislikedUser = await userModel.findById(req.params.id).lean();

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

      console.log("adding disliked user to database");

      userModel.findOneAndUpdate(
        {_id: currentUser._id},
        {$push: {dislikes: dislikedUser}},
        function (err, success) {
          if (err){
            console.log(err)
          }else {
            return;
          }
        }
      )

      res.render("main", {
        layout: "index",
        data: result
      });
      
    });
  } catch (err) {
    console.log(err);
  }
});

// reset user likes, dislikes and matches (dev)
router.get("/reset", authenticate, async (req, res) => {
  try {

    getUsers().then(([result, currentUser]) => {

      userModel.findOneAndUpdate(
        { _id: currentUser._id },
        { $set: { matches: [], likes: [], dislikes: [] }, },
        (err, affected) => {
          console.log("affected", affected);
        }
      );

    })

    res.redirect("/swiping")
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
