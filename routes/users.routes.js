const express = require("express");
const User = require("./../schemas/UserSchema.js");

const router = express.Router();

router.get("/", function(req,res) {
    User.find(function(err,foundUsers){
        res.json(foundUsers);
    });
});



module.exports = router;