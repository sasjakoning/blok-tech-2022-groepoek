// requires
const express = require("express");
const handlebars = require("express-handlebars");
const multer  = require("multer");
const db = require("./config/connect.js"); //verbinding mongoDB
const userModel = require("./models/user")
const adminUserModel = require("./models/adminUser")
// const compression = require('compression')
// const minify = require('express-minify');

// ---

const app = express();
const upload = multer({ dest: "public/uploads/" })

app.set('view engine', 'ejs');
// app.use(compression())

// setup van port. post is http://localhost:3000/
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

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

// set view engine to handlebars
app.set("view engine", "hbs");

// laat files uit "public" zien
app.use(express.static(__dirname));
app.use(express.static("public"));

// verbinding maken met het database
db.connectDb();

// Code hier

app.use("/", require("./routes/likedislike"))

app.use("/filter", require("./routes/filter"))

app.get("/profile", (req, res) => {
    res.render("profile");
})

// ---

app.listen(port, () => console.log(`App listening to port ${port}`));