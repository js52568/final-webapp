const express = require("express");
const Event = require("./../schemas/EventSchema.js");
const User = require("./../schemas/UserSchema.js");

const router = express.Router();

router.get("/", function(req,res){
    Event.find(function(err,foundEvents){
        res.json(foundEvents);
    });
});

router.get("/:id", function(req,res){
    Event.findOne({_id: req.params.id}, function(err,foundEvent){
        if (foundEvent) {
            res.json(foundEvent);
        } else {
            console.log(err);
        }
    })
})

router.get("/:id/participants", function(req,res){
    Event.findOne({_id: req.params.id}, function(err,foundEvent){
        if (foundEvent) {
            let participantsIds = foundEvent.participantsIds;
            User.find({_id: { $in: participantsIds }}, function(err,foundUsers){
                if (foundUsers) {
                    res.json(foundUsers);
                } else {
                    console.log(err);
                }
            })
        } else {
            console.log(err);
        }
    })
})

module.exports = router;