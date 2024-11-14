const { Room, Furniture } = require ('../database');

const getAllRooms = async () => {
    try {
        return await Room.findAll({
            include: [{ model: Furniture }] // Include furniture data with the findAll
        });
    } catch (error) {
        throw new Error("Failed to fetch all rooms");
    }
};

const getRoomById = async (id) => {
    try {
        return await Room.findOne({
            where: { id },
            include: [{ model: Furniture }]
        });
    } catch (error) {
        throw new Error(`Failed to fetch room with id: ${id}`);
    }
};

module.exports = {
    getAllRooms,
    getRoomById,
};