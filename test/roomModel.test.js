const assert = require('assert');
const { test, beforeEach, afterEach } = require('node:test');
const { Sequelize, DataTypes } = require('sequelize');
const roomModel = require('../models/roomModel');

let sequelize;
let Room;

beforeEach(async () => {

    // initalize seqelize instance with in-memory sqlite database
    sequelize = new Sequelize('sqlite::memory:');

    Room = roomModel(sequelize, DataTypes);

    await sequelize.sync({ force: true });
});

afterEach(async () => {

    // close sequelize connection after test
    await sequelize.close();
});

test('should have the correct attributes', async () => {
    const attributes = Room.rawAttributes;

    assert.strictEqual(attributes.length.type.constructor.name, 'FLOAT');
    assert.strictEqual(attributes.width.type.constructor.name, 'FLOAT');
    assert.strictEqual(attributes.height.type.constructor.name, 'FLOAT');
});

test('should not be able to be null values on attributes', async () => {
    const attributes = Room.rawAttributes;

    assert.strictEqual(attributes.length.allowNull, false);
    assert.strictEqual(attributes.width.allowNull, false);
    assert.strictEqual(attributes.height.allowNull, false);
})

test('should have a primary key', async () => {
    const attributes = Room.rawAttributes;

    assert.strictEqual(attributes.id.primaryKey, true);
});

test('should not be able to have negative measurements for room attributes', async () => {
    try {
        await Room.create({
            length: -1,
            width: -3,
            height: -12142424
        });

        assert.fail('Expect an error but did not get an error');
    } catch (error) {
        assert.strictEqual(error.name, 'SequelizeValidationError');
    }
});
