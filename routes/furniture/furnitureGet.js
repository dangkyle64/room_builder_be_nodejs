const express = require('express');
const router = express();

const furnitureDataBase = require('../../database');

router.get("/", (req, res) => {
    furnitureDataBase.furnitureData.findAll()
        .then(dbData => {
            res.json(dbData);
        })
        .catch(error => res.status(400).json("Error:", error))

});

router.get("/:id", (req, res) => {

    furniture_id = req.params.id;

    furnitureDataBase.furnitureData.findOne({
        where: { id: furniture_id }
    })
    .then(dbData => {
        res.json(dbData);
    })
    .catch(error => res.status(404).json("Error: ", error));
    
});

module.exports = router;