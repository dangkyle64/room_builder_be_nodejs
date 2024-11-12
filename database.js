const { Sequelize, DataTypes } = require ("sequelize");
const config = require('./config');

const roomModel = require('./models/roomModel');
const furnitureModel = require('./models/furnitureModel')

const sequelize = new Sequelize (
    config.DATABASE_SETTINGS.database,
    config.DATABASE_SETTINGS.username,
    config.DATABASE_SETTINGS.password, {
        host: config.DATABASE_SETTINGS.host,
        dialect: config.DATABASE_SETTINGS.dialect,
        storage: config.DATABASE_SETTINGS.storage,
});

const db = {};

db.Sequelize = Sequelize; // Assign as property to be used in other files
db.sequelizeData = sequelize;

db.Furniture = furnitureModel(sequelize, Sequelize);
db.Room = roomModel(sequelize, Sequelize);

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelizeData.sync()
    .then(() => {
        console.log("Database and tables created successfully");
    })
    .catch((error) => {
        console.error("Error creating database tables: ", error);
    })

module.exports = db;