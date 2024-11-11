const express = require('express');
const router = express();
//import database here

router.post("/", (req, res) => {
    const {} = req.body;

    res.status(201).json({ message: "POST Endpoint for furniture"});
});

module.exports = router;