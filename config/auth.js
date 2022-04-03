let sessions = require("express-session");

let currentsession;

// module maken
module.exports = {
  // de functie is authenticate
  authenticate: function(req, res, next){
    // haal de cookie op van client side
    currentsession=req.session;
    console.log(`session cookie is`)
    console.log(currentsession)

    // als de cookie een userid heeft, ga verder
    if(currentsession.userid){
      return next()
    }

    // als de cookie geen userid heeft, redirect naar login
    res.redirect("/login")
  }
};