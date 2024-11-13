function RoomModel (sequelize, DataTypes) {
    const Room = sequelize.define(
        'Room', {

            //id is auto-generated

            length: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    min: 0
                }
            },

            width: {
                type: DataTypes.FLOAT,
                allowNull: false,
                validate: {
                    min: 0
                }
            },

            height: {
                type: DataTypes.FLOAT,
                allowNull: false, 
                validate: {
                    min: 0
                }
            },
        }, {
            tableName: 'Rooms'
        });

    Room.associate = (models) => {
        Room.hasMany(models.Furniture, { foreignKey: 'roomId' });
    };

    return Room;
};

module.exports = RoomModel;