const express = require("express");
const Event = require("./../schemas/EventSchema.js");

const router = express.Router();

router.post("/", function(req,res) {
    const newEvent = new Event({
        name: req.body.name,
        sport: req.body.sport,
        maxParticipants: req.body.maxParticipants,
        description: req.body.description,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        host: req.user.id
    });
    newEvent.save();
    res.json({status: "200"});
});

module.exports = router;