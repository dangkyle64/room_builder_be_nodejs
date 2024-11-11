const express = require('express');
const router = express();
//add database here

//used to validate if the incoming json is valid before saving
const { body, validationResult } = require('express-validator');

router.put("/:id", (req, res) => {
    console.log("Request Body:", req.body);
    res.status(200).json({ message: "PUT Endpoint for room Status 204"});
});

module.exports = router;