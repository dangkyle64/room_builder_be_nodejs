const express = require('express');
const router = express();
//import database here

router.get("/", (req, res) => {
    res.status(200).json({ message: "GET Endpoint for room"});
});

router.get("/:id", (req, res) => {
    res.status(200).json({ message: "GET Endpoint for room id"});
});

module.exports = router;