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

db.furnitureData = furnitureModel(sequelize, Sequelize);
db.roomData = roomModel(sequelize, Sequelize);

module.exports = db;

const models = require('./models/indexModel');
Object.assign(db, models)

db.sequelizeData.sync()
    .then(() => {
        console.log("Database and tables created successfully");
    })
    .catch((error) => {
        console.error("Error creating database tables: ", error);
    })