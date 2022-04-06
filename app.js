// requires
const express = require("express");
const handlebars = require("express-handlebars");
const multer  = require("multer");
const path = require('path');
const db = require("./config/connect.js"); //verbinding mongoDB
const userModel = require("./models/user")
const adminUserModel = require("./models/adminUser")
const compression = require('compression')
const minify = require('express-minify');
let session = require("express-session");
const mongoStore = require("connect-mongo");
const { authenticate } = require('./config/auth');

// ---

const app = express();
const upload = multer({ dest: "public/uploads/" })

// express session expires in 24 hrs
const oneDay = 1000 * 60 * 60 * 24;

// sessions
app.use(session({
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

// set view engine to handlebars
app.set("view engine", "hbs");
app.use(compression());
app.use(minify());
app.use(express.static(__dirname + '/public'));

// setup van port. post is http://localhost:3000/
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
//
// hi this is a comment

// handlebars setup
app.engine(
  "hbs",
  handlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: __dirname + "/views/partials/",
  })
);


// laat files uit "public" zien
app.use(express.static(__dirname));

// verbinding maken met het database
db.connectDb();

// Code hier

app.get("/", authenticate, async (req, res) => {
  res.redirect("/swiping")
})

app.use("/login", require("./routes/loginregister"))

app.use("/swiping", require("./routes/likedislike"))

app.use("/matches", require("./routes/matches"))

app.use("/profile", require("./routes/profile"))
app.post("/avatarupdate", require("./routes/profile"))
app.post("/updateprofile", require("./routes/profile"))

app.use("/filter", require("./routes/filter"))


// ---


app.listen(port, () => console.log(`App listening to port ${port}`));