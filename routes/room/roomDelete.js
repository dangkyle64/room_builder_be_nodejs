const express = require('express');
const router = express();

const roomDatabase = require('../../database');

router.delete("/:id", async (req, res) => {

    room_id = req.params.id;

    try {
        const room = await roomDatabase.roomData.findOne({
            where: {id: room_id}
        })

        if (!room) {
            return res.status(404).json({ message: `Room with id ${room_id} not found`})
        };

        await room.destroy();

        res.status(200).json({ 
            "message": `Room with id ${room_id} deleted successfully.`
        });

    } catch (error) {
        console.error("Error deleting room", error);
        res.status(500).json({ "message": "Error deleting room", error})
    };

});

module.exports = router;