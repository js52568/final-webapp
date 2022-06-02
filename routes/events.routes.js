const express = require("express");
const Event = require("./../schemas/EventSchema.js");
const User = require("./../schemas/UserSchema.js");

const router = express.Router();

router.get("/", function(req,res){
    Event.find(function(err,foundEvents){
        res.json(foundEvents);
    });
});

router.get("/explore", function(req,res){
    Event.find(function(err,foundEvents){
        const exploreEvents = foundEvents.filter(event => (event.host !== req.user.id));
        res.json(exploreEvents);
    });
});

router.get("/myevents", function(req,res){
    Event.find(function(err,foundEvents){
        const exploreEvents = foundEvents.filter(event => (event.host === req.user.id || event.participantsIds.includes(req.user.id)));
        res.json(exploreEvents);
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

router.post("/:id/participants", function(req,res){
    //rijesiti ovo s participantsIds
    Event.findByIdAndUpdate(req.params.id, { $push: { participantsIds: req.body }}, function(err,foundEvent) {
        if (err) {
            res.status(403).json("403");
        } else {
            User.findByIdAndUpdate(req.body._id, { $push: {eventsIds: req.params.id} }, function(err,foundUser) {
                if (err){
                    res.status(403).json("403");  
                } else {
                    res.status(200).json("200");
                }
            });
        }
    });
});

router.post("/:id/removeParticipant", function(req,res) {
    Event.findByIdAndUpdate(req.params.id, {participantsIds: req.body.newParticipantsIds}, function(err,foundEvent){
        if(err){
            res.status(403).json("403");
        } else {
            User.findByIdAndUpdate(req.body.userId, { $pull: { eventsIds: req.params.id }}, function(err,foundUser){
                if (err){
                res.status(403).json("403");
                } else {
                    res.status(200).json("200");
                }
            })
        }
    })
});

router.get("/:id/getRole", function(req,res){
    Event.findOne({_id: req.params.id}, function(err,foundEvent){
        if (foundEvent) {
            if (foundEvent.host === req.user.id){
                res.json({role: "host"}); 
            }
            else if (foundEvent.participantsIds.includes(req.user._id) && foundEvent.host !== req.user._id) {
                res.json({role: "participant"});
            }
            else {
                res.json({role: "not-participating"});   
            }
        } else {
            res.status(403).json("not found"); 
        }
    });
});

router.get("/:id/getActivity", function(req,res){
    Event.findOne({_id: req.params.id}, function(err,foundEvent){
        if (foundEvent){
            const currentDate = new Date();
            const startTime = new Date(foundEvent.startTime);
            const endTime = new Date(foundEvent.endTime);
            let activity = "";
            if (currentDate < startTime) {
                activity = "Upcoming";
            }  
            else if  (currentDate > endTime) {
                activity = "Ended";
            } else {
                activity = "Live";
                }
            res.json({activity: activity});
            }
    });
});

router.post("/:id/cancelEvent", function(req,res) {
    const participants = req.body.participants;
    Event.deleteOne({_id: req.params.id}, function(err,foundEvent){
        if (err) {
            res.status(404).json("failed"); 
        } else {
            participants.forEach(id => {
                User.findByIdAndUpdate(id, { $pull: { eventsIds: req.params.id }}, function(err,foundUser){
                    if (err) {
                        res.status(404).json("failed");
                    } else {
                        console.log("ok");
                    }
                });
            });
            res.status(200).json("200");
        }
    });
});

module.exports = router;