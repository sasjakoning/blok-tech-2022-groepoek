// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const multer = require("multer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const auth = require("../config/auth");
const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo");
let session = require("express-session");
require("dotenv").config();

let currentsession;

const { authenticate } = require("../config/auth");

// express session expires in 24 hrs
const oneDay = 1000 * 60 * 60 * 24;

const router = express();
const upload = multer({ dest: "public/uploads/" });

// sessions
router.use(
  session({
    name: "credentials",
    secret: "secret",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
    store: new mongoStore({
      mongooseConnection: db,
      collections: "sessions",
      mongoUrl: process.env.ATLAS_URI,
    }),
  })
);

// cookie parser middleware
router.use(cookieParser());

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let userExists = false;

// register page
router.get("/register", async (req, res) => {
  res.render("register", {
    layout: "index",
    userExists: userExists
  });
});

// wanneer je hebt geregistreerd
router.post("/register/done", upload.none(), async (req, res) => {
  // ophalen ingevulde email en password uit de body
  const { firstname, lastname, email, password } = req.body;

  try {
    // zoeken of er een user is die al dezelfde email heeft
    let user = await userModel.findOne({
      email,
    });

    // als dat waar is, zeg dat ie al bestaat
    if (user) {
      // return res.status(400).json({
      //   msg: "User already exists",
      // });

      userExists = true;

      res.redirect("/login/register")

      console.log(userExists)
    }else {

      console.log("doesnt stay in if")
      userExists = false;
  
      // als de user nog niet bestaat, maak een nieuwe user aan
      user = new userModel({
        firstname,
        lastname,
        email,
        password,
      });
  
      // bcrypt dingen, security
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // opslaan nieuwe user naar database
      await user.save();
  
      res.redirect("/login")
    }

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in saving");
  }
});

// Login functie

router.get("/", async (req, res) => {
  res.render("login", {
    layout: "index",
  });
});

// wanneer je inlogt
router.post("/done", upload.none(), async (req, res) => {
  // ophalen email en password van body
  const { email, password } = req.body;

  // zoeken of er een user is met die email
  const userEmail = await userModel.findOne({ email }).lean();

  // als de email matched, update cookie en log in.

  if (userEmail != null){
    if (email == userEmail.email) {
      console.log("is equal");
      currentsession = req.session;
      currentsession.userid = email;
  
      // redirect naar swiping
      res.redirect("/swiping");
    }
  }else {
    res.redirect("/login")
  }
});

// uitloggen van de user door de cookie te destroyen
router.get("/logout", authenticate, async (req, res) => {
  console.log(req.session);
  req.session.destroy();
  console.log("logout");
  res.redirect("/login");
});

//https://dev.to/dipakkr/implementing-authentication-in-nodejs-with-express-and-jwt-codelab-1-j5i#10-conclusion
//https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/

module.exports = router;
