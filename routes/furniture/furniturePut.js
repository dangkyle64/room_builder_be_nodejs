const express = require('express');
const router = express();
//add database here

router.put("/:id", (req, res) => {
    console.log("Request Body:", req.body);
    res.status(200).json({ message: "PUT Endpoint for furniture status 204"})
});

module.exports = router;