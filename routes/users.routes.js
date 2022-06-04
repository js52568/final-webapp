const express = require("express");
const User = require("./../schemas/UserSchema.js");

const router = express.Router();

router.get("/", function(req,res) {
    User.find(function(err,foundUsers){
        res.json(foundUsers);
    });
});

router.get("/:id", function(req,res){
    User.findOne({_id: req.params.id}, function(err,foundUser){
        if (foundUser) {
            res.json(foundUser);
        } else {
            console.log(err);
        }
    })
})

module.exports = router;