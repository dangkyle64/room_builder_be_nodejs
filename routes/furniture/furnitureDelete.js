const express = require('express');
const router = express();
//add database here 

router.delete("/:id", (req, res) => {
    res.status(200).json({ message: "DELETE Endpoint for furniture Status: 204"})
});

module.exports = router;