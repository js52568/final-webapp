const express = require("express");
const User = require("./../schemas/UserSchema.js");  
const passport = require("passport");
//const mongoose = require("mongoose");

const router = express.Router();

router.get("/", function(req,res){
    res.render("register");
});

router.post("/", function(req,res) {
  User.findOne({nickname: req.body.nickname}, function(err,foundUser) {
    if (foundUser) {
      res.status(403).json("403");
    } else {
      User.register({username: req.body.username}, req.body.password, function(err, user){
        if(err){
          res.json({status: "401"});
          console.log(err);
          //res.redirect("/register");
        } else {
          res.json({status: "200"});
          passport.authenticate("local")(req,res, function(){
            User.findByIdAndUpdate(req.user.id, { nickname: req.body.nickname, fullName: req.body.fullName, description:req.body.description,
               yearOfBirth: req.body.yearOfBirth },
              function (err, docs) {
                if (err){
                //res.json({status: "401"});
                console.log(err)
                }
                else{
                //res.json({status: "200"});
                console.log("Added nickname")
                }
                });
            //res.redirect("/main");
          });
        }
      });
    
      //res.json({status: "200"});
    }
  });
});

router.post("/nickname", function(req,res) {
  User.findOne({nickname: req.body.nickname}, function(err,foundUser) {
    if (foundUser) {
      res.status(403).json("403");
    } else {
      User.findByIdAndUpdate(req.user.id, { nickname: req.body.nickname },
        function (err, docs) {
          if (err){
          //res.json({status: "401"});
          console.log(err)
          }
          else{
            res.status(200).json("200");
          //res.json({status: "200"});
          //console.log("Added nickname")
          }
          });
    }});
  
  /* User.findOne({nickname: req.body.nickname}, function(err,foundUser) {
    if (foundUser) {
      res.json({status: "401"});
    } else {
      res.json({status: "200"});
    }
  }) */
});

module.exports = router;