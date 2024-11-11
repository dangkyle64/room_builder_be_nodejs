function RoomModel (sequelize, DataTypes) {
    return sequelize.define(
        'room', {

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
        },
    );
};

module.exports = RoomModel;