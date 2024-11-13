function furnitureModel (sequelize, DataTypes)  {
    const Furniture = sequelize.define(
        'Furniture', {

            // auto-generates id 
            
            roomId: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Rooms',
                    key: 'id',
                },

                allowNull: false, //Foreign key can't be null
            },

            furniture_type: {
                type: DataTypes.ENUM(
                    "box",
                    "chair",
                    "table",
                ),
                allowNull: false,
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
                validate: {
                    min: 0
                }
            },

            width: {
                type: DataTypes.FLOAT,
                allowNull: true,
                validate: {
                    min: 0
                }
            },

            height: {
                type: DataTypes.FLOAT,
                allowNull: true,
                validate: {
                    min: 0
                }
            },
        });

    Furniture.associate = (models) => {
        Furniture.belongsTo(models.Room, { foreignKey: 'roomId'})
    };

    return Furniture;
}

module.exports = furnitureModel;