const express = require('express');
const router = express();

const furnitureDataBase = require('../../database');

router.delete("/:id", async (req, res) => {

    furniture_id = req.params.id;

    try {
        const furniture = await furnitureDataBase.furnitureData.findOne({
            where: {id: furniture_id}
        })

        if (!furniture) {
            return res.status(404).json({ message: `Furniture with id ${furniture_id} not found`})
        }

        await furniture.destroy();

        res.status(200).json({
            "message": `Furniture with id ${furniture_id} deleted successfully.`
        });
        
    } catch (error) {
        console.error("Error deleting furniture", error);
        res.status(500).json({ "message": "Error deleting furniture", error});
    }

});

module.exports = router;