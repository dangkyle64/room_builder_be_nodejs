const express = require('express');
const router = express();

const roomDatabase = require('../../database');

router.post("/", (req, res) => {
    const { length, width, height } = req.body;

    roomDatabase.Room.create({ length, width, height})
        .then(room => {
            res.status(201).json(room);
            console.log("Room has been created.");
        })
        .catch(error => {
            console.error("Error creating room", error);
            res.status(500).json({ error: `Failed to create room`});
        });
});

module.exports = router;

/*

Test POST Json

{
    "length": 1.0,
    "width": 5.2,
    "height": 7
}

*/