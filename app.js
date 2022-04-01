// requires
const express = require("express");
const handlebars = require("express-handlebars");
const multer  = require("multer");
const db = require("./config/connect.js"); //verbinding mongoDB
const userModel = require("./models/user")
const adminUserModel = require("./models/adminUser")

// ---

const app = express();
const upload = multer({ dest: "public/uploads/" })

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

// get all users from database etc
const getUsers = async () => {
  // find the admin user (which is being used as "logged in user" for demo purposes)
  const admin = await adminUserModel.findOne({ });

  // find which users admin has matched
  const adminMatches = admin.matches;

  // return all users except the already matched ones
  const usersList = await userModel.find({
    _id: { $nin: adminMatches },
  }).lean();

  const adminLeaned = await adminUserModel.findOne({
    username: "adminuser",
  }).lean();

  return [usersList, admin, adminLeaned];
};

app.get("/profile", profile);

async function profile(req, res) {
  getUsers().then(([result, admin, adminLeaned]) => {
    res.render("profile", {
      layout: "index",
      data: adminLeaned
    });
  })
}

app.post("/updateprofile", upload.none(), updateProfile);

async function update(updatedata){
const result = await adminUserModel.updateOne({email: "admin@hotmail.com"}, {$set: updatedata}, {upsert: true}
)}

async function updateProfile(req, res) {

  update({
    "firstname": req.body.voornaam,
    "aboutme": {
      "description": req.body.omschrijving,
      "age": req.body.leeftijd,
      "place": req.body.plaats,
      "height": req.body.lengte,
    },
    "interests": req.body.interesses,
    "platform": {
      "discord": req.body.discord,
      "xbox": req.body.xbox,
      "playstation": req.body.playstation,
      "whatsapp": req.body.whatsapp,
      "messenger": req.body.messenger,
      "skype": req.body.skype,
    }
})

getUsers().then(([result, admin, adminLeaned]) => {
  res.render("profile", {
    layout: "index",
    data: adminLeaned
  });
})
}

app.post('/avatarupdate', upload.single('avatar'), avatarUpdate);

async function avatarUpdate(req, res) {
  const avatar = await "uploads/" + req.file.filename;

  update( {
      "profielfoto": avatar,
  })

  getUsers().then(([result, admin, adminLeaned]) => {
    res.render("profile", {
      layout: "index",
      data: adminLeaned
    });
  })
}



// ---

app.listen(port, () => console.log(`App listening to port ${port}`));