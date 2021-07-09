//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require("mongoose");
const md5 = require('md5');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/usersDB", {
  useNewUrlParser: true,
  useUnifiedTopology : true
 });

const userSchema = new mongoose.Schema({
username : String,
password : String,
number : Number
});

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.render("home")
});

app.get("/about", function(req,res){
  res.render("about")
});

app.get("/courses", function(req,res){
  res.render("courses")
});

app.get("/blog", function(req,res){
  res.render("blog")
});

app.get("/reviews", function(req,res){
  res.render("reviews")
});

app.get("/instructor", function(req,res){
  res.render("instructor")
});

app.get("/Signin", function(req,res){
  res.render("Signin");
});



app.get("/Register", function(req, res){
  res.render("Register");
});

app.post("/Register", function(req, res){
  const user = new User({
    username : req.body.email,
    password : md5(req.body.password),
    number : md5(req.body.phoneNumber)
  });
  user.save(function(err){
    if(err){
      console.log(err);
    }
    else {
      res.render("home");
    }
  });
});

app.post("/Signin", function(req, res){
const username = req.body.username ;
const password = md5(req.body.password);

User.findOne({ username : username }, function (err, foundUser) {
  if(err) {
    console.log(err);
  } else {
    if(foundUser) {
      if(foundUser.password === password) {
        res.render("home");
      }
    }
  }
});
});













app.listen(3000, function(){
  console.log("Server running successfully!");
})
