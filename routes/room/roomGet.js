const express = require('express');
const router = express();

const { getAllRooms, getRoomById } = require('../../services/getRoomService');

router.get("/", async (req, res) => {

    try {
        const rooms = await getAllRooms();
        res.json(rooms);
    } catch(error) {
        res.status(400).json({ error: error.message});
    }
});

router.get("/:id", async (req, res) => {

    try {
        const room = await getRoomById(req.params.id);
        console.log('Room from getRoomById:', room);
        res.json(room);
    } catch(error) {
        res.status(400).json({ error: error.message});
    }
    
});

module.exports = router;

