// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const multer = require("multer")
const bcrypt = require("bcrypt")
const saltRounds = 10;
const auth = require("../config/auth")
const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");
let session = require("express-session");
require("dotenv").config();

let currentsession;

const { authenticate } = require('../config/auth');

// express session expires in 24 hrs
const oneDay = 1000 * 60 * 60 * 24;

const router = express();
const upload = multer({dest: "public/uploads/"})

// sessions
router.use(session({
  name: "credentials",
  secret: "secret",
  saveUninitialized: true,
  cookie: {maxAge: oneDay},
  resave: false,
  store: new mongoStore({
    mongooseConnection: db,
    collections: "sessions",
    mongoUrl: process.env.ATLAS_URI
  })
}))

// cookie parser middleware
router.use(cookieParser());

router.use(express.json());
router.use(express.urlencoded({extended: true}));

// register page
router.get("/register", async (req, res) => {
  res.render("register", {
    layout: "index"
    }) 
})

// wanneer je hebt geregistreerd
router.post("/register/done", upload.none(), async (req, res) => {
  // const errors = validationResult(req);

  // if(!errors.isEmpty()) {
  //   return res.status(400).json({
  //     errors: errors.array()
  //   })
  // }

  // ophalen ingevulde email en password uit de body
  const {firstname, lastname, gender ,email, password} = req.body;

  try {

    // zoeken of er een user is die al dezelfde email heeft
    let user = await userModel.findOne({
      email
    });

    // als dat waar is, zeg dat ie al bestaat
    if(user){
      return res.status(400).json({
        msg: "User already exists"
      });
    }

    
    // als de user nog niet bestaat, maak een nieuwe user aan
    user = new userModel({
      firstname,
      lastname,
      gender,
      email,
      password,
    })

    // bcrypt dingen, security
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // opslaan nieuwe user naar database
    await user.save();

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in saving")
  }
})


// Login functie

router.get("/", async (req, res) => {
  // haal cookie op van client-side
  currentsession=req.session;

  // als de userid in de cookie bestaat (die na 24 uur verloopt), log in.
  if(currentsession.userid){
    res.send("welcome")
  }else {
      // anders try again
      res.render("login", {
      layout: "index"
      }) 
  }
});

// wanneer je inlogt
router.post("/done", upload.none(), async (req, res) => {

  // ophalen email en password van body
  const {email, password} = req.body;

  // zoeken of er een user is met die email
  const userEmail = await userModel.findOne({email}).lean()

  // als de email matched, update cookie en log in.
  if(email == userEmail.email){
    console.log("is equal")
    currentsession=req.session;
    currentsession.userid=email;
    console.log(req.session)
    res.redirect("/swiping")
  }
});

// uitloggen van de user door de cookie te destroyen
router.get("/logout", async (req, res) => {
  console.log(req.session)
  req.session.destroy();
  console.log("logout")
  res.redirect("/login")
})


//https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i#10-conclusion
//https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/

module.exports = router;
