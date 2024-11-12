const express = require('express');
const router = express();

const furnitureDataBase = require('../../database');

router.put("/:id", async (req, res) => {

    furniture_id = req.params.id;

    const { position_x, position_y, position_z, length, width, height } = req.body;

    try {
        const furniture = await furnitureDataBase.Furniture.findOne({
            where: {id: furniture_id}
        });

        if (!furniture) {
            return res.status(404).json({ message: `Furniture with id ${furniture_id} not found`});
        };

        await furniture.update({
            position_x,
            position_y,
            position_z,
            length,
            width,
            height
        });

        res.status(200).json({
            "message": `Furniture with id ${furniture_id} updated successfully.`,
        });

    } catch (error) {
        console.error("Error updating furniture", error);
        res.status(500).json({ "message": "Error updating room", error});
    }

});

module.exports = router;