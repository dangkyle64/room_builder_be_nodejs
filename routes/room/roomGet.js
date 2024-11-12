const express = require('express');
const router = express();

const roomDatabase = require('../../database')

router.get("/", (req, res) => {
    roomDatabase.Room.findAll({
        include: [{ model: roomDatabase.Furniture }]
        })
        .then(dbData => {
            res.json(dbData);
        })
        .catch(error => res.status(400).json("Error: ", error))

});

router.get("/:id", (req, res) => {

    room_id = req.params.id;

    roomDatabase.Room.findOne({
        where: { id: room_id },
        include: [{ model: roomDatabase.Furniture }]
    })
    .then(dbData => {
        res.json(dbData);
    })
    .catch(error => res.status(404).json("Error: ", error));
    
});

module.exports = router;

