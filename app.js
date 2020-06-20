//jshint esversion:6
const express = require("express");
const request = require("request");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String
});
const profile = mongoose.model("Profile", profileSchema);
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String

});
const post = mongoose.model("Post", postSchema);

app.use(bodyParser.urlencoded({
  extended:true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/register.html");
});



app.post("/", function(req, res) {
  /*const fname = req.body.First;
  const lname = req.body.Last;

  const mail = req.body.emailID;
  const pwd = req.body.psw;*/
  const pass = req.body.psw;
  const rpass = req.body.pswr;
  if (pass.length < 6)
    res.send("Password should have a minimum length of 8 characters.");

  else {
    if (pass != rpass)
    res.send("Passwords do not match!");
    else {
      const code = res.statusCode;
      if (code == 200) {
        res.sendFile(__dirname + "/success.html");
        console.log(req.body);

        const newProfile = new profile({
          firstName: req.body.First,
          lastName: req.body.Last,
          email: req.body.emailID,
          password: req.body.psw
        });
        newProfile.save();
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  }



  /*console.log(req.body);

  const newProfile = new profile({
    firstName:req.body.First,
    lastName:req.body.Last,
    email:req.body.emailID,
    password: req.body.psw
  }
  );
  newProfile.save();*/



});


app.get("/compose", function(request, response) {
  response.sendFile(__dirname + "/upload.html");
});

app.post("/compose", function(request, response) {
  const code1 = response.statusCode;
  if (code1 == 200) {
    response.sendFile(__dirname + "/us.html");

    const newPost = new post({
      title: request.body.heading,
      content: request.body.para,
      author: request.body.writer
    });
    newPost.save();
  } else {
    response.sendFile(__dirname + "/uf.html");
  }
});






app.listen("3000", function() {
  console.log("Server running at 3000");
});
