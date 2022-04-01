let session = require("express-session");

// module maken
module.exports = {
  // de functie is authenticate
  authenticate: function(req, res, next){
    // haal de cookie op van client side
    session=req.session;
    console.log(session)

    // als de cookie een userid heeft, ga verder
    if(session.userid){
      return next()
    }

    // als de cookie geen userid heeft, redirect naar login
    res.redirect("/login")
  }
};