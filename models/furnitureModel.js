function furnitureModel (sequelize, DataTypes)  {
    return sequelize.define(
        'furniture', {

            // auto-generates id 

            furniture_type: {
                type: DataTypes.ENUM(
                    "box",
                    "chair",
                    "table",
                ),
                allowNull: true,
            },

            position_x: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },

            position_y: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },

            position_z: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },

            length: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },

            width: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },

            height: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
        },
    );
};

module.exports = furnitureModel;