// requires
const express = require("express");
const handlebars = require("express-handlebars");
const db = require("./config/connect.js");

// ---

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

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


app.set("view engine", "hbs");

app.use(express.static("public"));

db.connectDb();

// Code hier

app.listen(port, () => console.log(`App listening to port ${port}`));