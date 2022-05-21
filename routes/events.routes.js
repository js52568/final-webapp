const express = require("express");
const Event = require("./../schemas/EventSchema.js");
const User = require("./../schemas/UserSchema.js");

const router = express.Router();

router.get("/:id", function(req,res){
    console.log(req.params.id);
})

module.exports = router;