const express = require("express");
const User = require("./../schemas/UserSchema.js");  
const passport = require("passport");
//const mongoose = require("mongoose");

const router = express.Router();

router.get("/", function(req,res){
    res.render("register");
});

router.post("/", function(req,res) {

  User.register({username: req.body.username}, req.body.password, function(err, user){
    if(err){
      res.json({status: "401"});
      console.log(err);
      //res.redirect("/register");
    } else {
      res.json({status: "200"});
      passport.authenticate("local")(req,res, function(){
        User.findByIdAndUpdate(req.user.id, { nickname: req.body.nickname },
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

});

module.exports = router;