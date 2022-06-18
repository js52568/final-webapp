const express = require("express");
const Event = require("./../schemas/EventSchema.js");
const User = require("./../schemas/UserSchema.js");

const router = express.Router();

router.post("/", function(req,res) {
    const newEvent = new Event({
        name: req.body.name,
        sport: req.body.sport,
        maxParticipants: req.body.maxParticipants,
        description: req.body.description,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        host: req.user.id,
        participantsIds: [req.user._id],
        locationAddress: req.body.locationAddress
    });
    newEvent.save(function(err,event){
        let newId = event._id;
        User.findByIdAndUpdate(req.user.id, { eventsIds: [...req.user.eventsIds,newId] },
            function (err, docs) {
                if (err){
                res.status(403).json("403");
                }
                else{
                res.json({status: "200"});
                }
            });
    });
    
});

module.exports = router;