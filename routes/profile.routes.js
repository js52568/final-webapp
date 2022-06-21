const express = require("express");
const User = require("./../schemas/UserSchema.js");

const router = express.Router();

router.get("/", function(req,res) {
    User.findOne({_id: req.user.id}, function(err, foundUser) {
        if (foundUser) {
            res.json(foundUser) 
        } else {
            res.status(403).json("403");
        }
    });
});

router.post("/edit", function(req,res) {
    User.findByIdAndUpdate(req.user.id, { nickname: req.body.nickname },
                            function (err, docs) {
    if (err){
        res.status(403).json("403");
    }
    else{
        User.findByIdAndUpdate(req.user.id, { fullName: req.body.fullName },
            function (err, docs) {
        if (err){
        res.status(403).json("403");
        }
        else{
            User.findByIdAndUpdate(req.user.id, { description: req.body.description },
                function (err, docs) {
            if (err){
            res.status(403).json("403");
            }
            else{
            res.json({status: "200"});
            }
            });
        }
        });
    }
});
});

module.exports = router;