const assert = require('assert');
const { test, beforeEach, afterEach } = require('node:test');
const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const furnitureModel = require('../models/furnitureModel');

let sequelize;
let Furniture;
let Room; 

beforeEach(async () => {
        
    // initalize seqelize instance with in-memory sqlite database
    sequelize = new Sequelize('sqlite::memory:');

    // define dummy room model for primary/foreign key relationship with furniture
    Room = sequelize.define('Room', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        length: { type: INTEGER },
        width: { type: INTEGER },
        height: { type: INTEGER } 
    });

    Furniture = furnitureModel(sequelize, DataTypes);

    // Set up the foreign key relationship explicitly
    Furniture.belongsTo(Room, { foreignKey: 'roomId'});
    Room.hasMany(Furniture, {foreignKey: 'roomId'});

    await sequelize.sync({ force: true });
});

afterEach(async () => {

    // close sequelize connection after test
    await sequelize.close();
});

test('should have the correct attributes', async () => {
    const attributes = Furniture.rawAttributes;

    assert.strictEqual(attributes.roomId.type.constructor.name, 'INTEGER');
    assert.strictEqual(attributes.furniture_type.type.constructor.name, 'ENUM');
    assert.strictEqual(attributes.position_x.type.constructor.name, 'FLOAT');
    assert.strictEqual(attributes.position_y.type.constructor.name, 'FLOAT');
    assert.strictEqual(attributes.position_z.type.constructor.name, 'FLOAT');
    assert.strictEqual(attributes.length.type.constructor.name, 'FLOAT');
    assert.strictEqual(attributes.width.type.constructor.name, 'FLOAT');
    assert.strictEqual(attributes.height.type.constructor.name, 'FLOAT');

    
});

test('should see the null constraints for attributes', async () => {
    const attributes = Furniture.rawAttributes;

    //test null constraints
    assert.strictEqual(attributes.roomId.allowNull, false);
    assert.strictEqual(attributes.furniture_type.allowNull, false);
    assert.strictEqual(attributes.length.allowNull, true);
    assert.strictEqual(attributes.width.allowNull, true);
    assert.strictEqual(attributes.height.allowNull, true);
    
})

test('should see default values for x, y, z values', async () => {

    const room = await Room.create({
        id: 1,
        length: 1,
        width: 1,
        height: 1
    });

    const furnitureTest = await Furniture.create({
        roomId: room.id,
        furniture_type: 'chair'
    });

    assert.strictEqual(furnitureTest.position_x, 0);
    assert.strictEqual(furnitureTest.position_y, 0);
    assert.strictEqual(furnitureTest.position_z, 0);
});

test('should not allow Furniture creation without foreign key', async () => {
    try {
        await Furniture.create({
            furniture_type: "box",
        });

        assert.fail('Expected an error but did not get an error');
    } catch  (error) {
        assert.strictEqual(error.name, 'SequelizeValidationError');
    }
});

test('should not allow Furniture creation with the incorrect  foreign key', async () => {
    try {
        await Furniture.create({
            roomId: -123,
            furniture_type: "box",
        });

        assert.fail('Expected an error but did not get an error');
    } catch (error) {
        assert.strictEqual(error.name, 'SequelizeForeignKeyConstraintError');
    }
});

test('should not be able to have negative measurements for furniture attributes', async () => {
    try {
        await Furniture.create({
            roomId: 1,
            furniture_type: "box",
            length: -1,
            width: -3,
            height: -12142424
        });

        assert.fail('Expect an error but did not get an error');
    } catch (error) {
        assert.strictEqual(error.name, 'SequelizeValidationError');
    }
});