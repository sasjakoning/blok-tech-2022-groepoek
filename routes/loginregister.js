// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("../config/connect.js"); //verbinding mongoDB
const userModel = require("../models/user");
const multer = require("multer")
const bcrypt = require("bcrypt")
const saltRounds = 10;
const jwt = require("jsonwebtoken")
const {check, validationResult} = require("express-validator/check")
const auth = require("../config/auth")


// Registreer functie

const router = express();
const upload = multer({dest: "public/uploads/"})

router.get("/register", async (req, res) => {
  console.log("mmm kaas");
  res.render("register", {
    layout: "index"
    }) 
})

router.post("/register/done", upload.none(), async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    })
  }

  const {email, password} = req.body;

  try {

    let user = await userModel.findOne({
      email
    });

    if(user){
      return res.status(400).json({
        msg: "User already exists"
      });
    }

    user = new userModel({
      email,
      password,
      firstname: "klaas",
      lastname: "klomp",
      gender: "female"
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, "randomString", {expiresIn: 10000},(err, token) => {
        if (err) throw err;
        res.status(200).json({
          token
        })
      }
    );

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in saving")
  }
})

// router.post('/register/done', upload.none(),  async (req, res) => {
//   console.log("kaas is lekker")
//     console.log(req.body.email)
  
//   // const { username, email, password} = req.body
  
//     // User.create functie

//     try {
//       // const response = await User.create({
//       //   username,
//       //   email,
//       //   password,
//       // })

//       const password = req.body.password

//       bcrypt.hash(password, saltRounds, (err, hash) => {
//         console.log(`hash is: ${hash}, password is: ${password}`)
//       })

//       console.log('Er is een nieuw account aangemaakt:')
//     } catch(error) {
//       if (error.code === 11000) {
  
//     // Account bestaat al (11000 error = is al in database)
  
//         return res.json({status: 'error', error: 'Deze naam is al in gebruik'})
//       } throw error
      
//       }
  
//     // Status message wanneer account aanmaken succesvol is 
  
//     res.json({status:'ok'});

//     res.render("register", {
//       layout: "index"
//       }) 
//   }); 

// Login functie

router.get("/", async (req, res) => {
  res.render("login", {
    layout: "index"
    }) 
})

router.post("/done", upload.none(), async (req, res) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const {email, password} = req.body;

  try {
    let user = await userModel.findOne({
      email
    });

    if(!user)
    return res.status(400).json({
      message: "User does not exist"
    });

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch)
      return res.status(400).json({
        message: "Incorrect password!"
      });
    
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token
        });
      }
    );
  
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server error"
    });
  }
});

// router.post("/", async (req, res) => {

//   try {
//     const username  = req.body.username;
//     const password = req.body.password;

//     // Function die user zoekt aan de hand van ingegeven gegevens in login form

//     User.findOne({username: username, password: password}, function(err, user){
//       if(!user) {
//         return res.status(404).send();
//       }

//       if(err) {
//         console.log(err);
//         return res.status(500).send();
//       }
      
//         //actie wanneer het account gevonden is

//         console.log("ingelogd")
        
//     });
//   } catch (error) {
//     (error);
//   }
// });

router.get("/me", upload.none(), auth, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    res.json(user)
  } catch (e) {
    res.send({ message: "Error is fetching user" })
  }
})

module.exports = router;
