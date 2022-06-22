const express = require("express");
const User = require("./../schemas/UserSchema.js");
const Rating = require("./../schemas/RatingSchema.js");

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
});

router.get("/:id/rate", function(req,res){
    Rating.findOne({reviewerId: req.user.id,userId: req.params.id}, function(err,foundRating){
        if (foundRating) {
            res.json({wasRated: "true"});
        } else {
            console.log(err);
        }
    })
})

router.get("/:id/ratings", function(req,res){
    User.findOne({_id: req.params.id}, function(err,foundUser){
        if (foundUser) {
            ratingIds = foundUser.ratingIds;
            console.log(foundUser.ratingIds);
            if (ratingIds.length === 0) {
                res.json({rat: "No ratings"});
            }
            else {
                Rating.find( function(err,foundRatings){
                console.log(foundUser.ratingIds);
                let values = [];
                for (i=0;i<foundRatings.length;i++) {
                    if (foundUser.ratingIds.includes(foundRatings[i]._id)){
                        values.push(foundRatings[i].value);
                    }
                }
                console.log(values);
                /* let values = [];
                newArray.map(rating => values.push(rating.value)); */
                let sum = 0;
                for (i = 0;i<values.length;i++) {
                    sum = sum + values[i];
                }
                let average = sum/values.length;
                let rounded = Math.round(average * 10) / 10
                res.json({rat: rounded});
            })}
            
        } else {
            console.log(err);
        }
    })
})
//{_id: { $in: ratingIds }},

router.post("/:id/rate", function(req,res){
    const newRating = new Rating({
        reviewerId: req.body.reviewerId,
        userId: req.body.userId,
        value: req.body.value  
    });
    newRating.save(function(err,rating){
        let newrating = rating._id;
        User.findByIdAndUpdate(req.body.userId, { ratingIds: [...req.user.ratingIds,newrating] },
            function (err, docs) {
                if (err){
                res.status(403).json("403");
                }
                else{
                res.json({status: "200"});
                }
            });
   /*  User.findOne({_id: req.params.id}, function(err,foundUser){
        if (foundUser) {
            ratingIds = foundUser.ratingIds;
            ratingIds.forEach(ratingId => 
                Rating.findOne({_id: ratingId}, function(err,foundRating){
                    if (foundRating) {
                        if (foundRating.reviewerId === req.body.reviewerId) {
                            Rating.findByIdAndUpdate(foundRating._id, { value: req.body.value },
                                function (err, docs) {
                                    if (err){
                                    res.status(403).json("403");
                                    }
                                    else{
                                    res.json({status: "200"});
                                    wasRated = true;
                                    }
                                });
                        } else {
                            const newRating = new Rating({
                                reviewerId: req.body.reviewerId,
                                userId: req.body.userId,
                                value: req.body.value  
                            });
                            newRating.save(function(err,rating){
                                let newrating = rating._id;
                                User.findByIdAndUpdate(req.body.userId, { ratingIds: [...req.user.ratingIds,newrating] },
                                    function (err, docs) {
                                        if (err){
                                        res.status(403).json("403");
                                        }
                                        else{
                                        res.json({status: "200"});
                                        }
                                    });
                            });
                        }
                    } 
                })
                )
        } else {
            console.log(err);
        }
    }) */
})
    
});

module.exports = router;