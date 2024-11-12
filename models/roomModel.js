function RoomModel (sequelize, DataTypes) {
    const Room = sequelize.define(
        'Room', {

            //id is auto-generated

            length: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },

            width: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },

            height: {
                type: DataTypes.FLOAT,
                allowNull: false, 
            },
        });

    Room.associate = (models) => {
        Room.hasMany(models.Furniture, { foreignKey: 'roomId' });
    };

    return Room;
};

module.exports = RoomModel;