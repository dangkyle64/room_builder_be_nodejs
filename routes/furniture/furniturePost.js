const express = require('express');
const router = express();

const furnitureDataBase = require('../../database');

router.post("/", (req, res) => {
    const {roomId, position_x, position_y, position_z, length, width, height} = req.body;

    furnitureDataBase.Furniture.create({ roomId, position_x, position_y, position_z, length, width, height})
        .then(furniture => {
            res.status(201).json(furniture);
            console.log("Furniture has been created");
        })
        .catch(error => {
            console.error("Error creating furniture", error);
            res.status(500).json({ error: `Failed to create furniture`})
        });
});

module.exports = router;