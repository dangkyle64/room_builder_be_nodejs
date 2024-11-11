const express = require('express');
const router = express();

const roomDatabase = require('../../database');

//used to validate if the incoming json is valid before saving
const { body, validationResult } = require('express-validator');

router.put("/:id", async (req, res) => {

    room_id = req.params.id; 

    const { length, width, height } = req.body;

    try {
        const room = await roomDatabase.roomData.findOne({
            where: {id: room_id}
        })

        if (!room) {
            return res.status(404).json({ message: `Room with id ${room_id} not found`});
        };
        
        await room.update({
            length,
            width,
            height
        });

        res.status(200).json({
            "message":  `Room with id ${room_id} updated successfully`,
        });

    } catch (error) {
        console.error("Error updating room", error);
        res.status(500).json({ "message": "Error updating room", error});
    };

});

module.exports = router;