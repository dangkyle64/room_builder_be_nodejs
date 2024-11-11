const express = require('express');
const router = express();

const roomDatabase = require('../../database')

router.get("/", (req, res) => {
    roomDatabase.roomData.findAll()
        .then(dbData => {
            res.json(dbData);
        })
        .catch(error => res.status(400).json("Error: ", error))

});

router.get("/:id", (req, res) => {

    room_id = req.params.id;

    roomDatabase.roomData.findOne({
        where: { id: room_id }
    })
    .then(dbData => {
        res.json(dbData);
    })
    .catch(error => res.status(404).json("Error: ", error));
    
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