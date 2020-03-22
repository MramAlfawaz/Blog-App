const express = require("express");
const mongoose = require("mongoose");
const PORT = 4000;
const moment = require("moment");
const expressLayouts = require("express-ejs-layouts");





//---initial express
const app = express();

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

//look for static files here(CSS, JS, Image, video, audio)
app.use(express.static("public"));
//gets form data
app.use(express.urlencoded({ extended: true }));
/*
look in views folder for a file named
layout.ejs
*/

app.use(expressLayouts);
/* will tell nodejs to look in a folder
 called views for all ejs files */
app.set("view engine", "ejs");
//--mongodb connection
mongoose.connect(
  "mongodb://localhost/articles",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("mongodb connected!");
  }
);



app.listen(PORT, () => console.log(`running on ${PORT}`));
