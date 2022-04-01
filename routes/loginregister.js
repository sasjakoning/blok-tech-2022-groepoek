// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const multer = require("multer")
const bcrypt = require("bcrypt")
const saltRounds = 10;


// Registreer functie

const router = express();
const upload = multer({dest: "public/uploads/"})

router.get("/register", async (req, res) => {
  console.log("mmm kaas");
  res.render("register", {
    layout: "index"
    }) 
})

router.post('/register/done', upload.none(),  async (req, res) => {
  console.log("kaas is lekker")
    console.log(req.body.email)
  
  // const { username, email, password} = req.body
  
    // User.create functie

    try {
      // const response = await User.create({
      //   username,
      //   email,
      //   password,
      // })

      const password = req.body.password

      bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log(`hash is: ${hash}, password is: ${password}`)
      })

      // const user = new userModel({
      //   email: req.body.email,
      //   password: req.body.password,
      //   firstname: "klaas",
      //   lastname: "klomp",
      //   gender: "vrouw"
      // })

      // user.save((err, results) => {
      //   console.log(results._id)
      // })

      console.log('Er is een nieuw account aangemaakt:')
    } catch(error) {
      if (error.code === 11000) {
  
    // Account bestaat al (11000 error = is al in database)
  
        return res.json({status: 'error', error: 'Deze naam is al in gebruik'})
      } throw error
      
      }
  
    // Status message wanneer account aanmaken succesvol is 
  
    res.json({status:'ok'});

    res.render("register", {
      layout: "index"
      }) 
  }); 

// Login functie

router.get("/", async (req, res) => {
  res.render("login", {
    layout: "index"
    }) 
})

router.post("/", async (req, res) => {

  try {
    const username  = req.body.username;
    const password = req.body.password;

    // Function die user zoekt aan de hand van ingegeven gegevens in login form

    User.findOne({username: username, password: password}, function(err, user){
      if(!user) {
        return res.status(404).send();
      }

      if(err) {
        console.log(err);
        return res.status(500).send();
      }
      
        //actie wanneer het account gevonden is

        console.log("ingelogd")
        
    });
  } catch (error) {
    (error);
  }
});

module.exports = router;
