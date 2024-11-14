const assert = require('assert');
const {test, beforeEach, afterEach } = require('node:test');
const express = require('express');
const supertest = require('supertest');
const { Sequelize, DataTypes, INTEGER } = require('sequelize');
const sinon = require('sinon');

let getRoomEndpoint;
let getAllRooms;
let getRoomById;
let sequelize;
let app;
let roomModelDummy;

beforeEach(async () => {
    //load in-memory database
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
    });

    // define room model dummy for testing
    roomModelDummy = sequelize.define('Room', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },

        length: { type: INTEGER },
        width: { type: INTEGER },
        height: { type: INTEGER },
    });

    // create table in in-memory database
    await sequelize.sync({ force: true });

    // Import and stub the getAllRooms function
    getAllRooms = require('../services/getRoomService').getAllRooms;
    getRoomById = require('../services/getRoomService').getRoomById;

    const mockRooms = [
        { id: 1, length: 10, width: 12, height: 5 },
        { id: 2, length: 1, width: 5, height: 125 }
    ]

    const mockSpecificRoom = { id: 3, length: 12, width: 55, height: 5 };
    
    sinon.stub(require('../services/getRoomService'), 'getAllRooms').resolves(mockRooms);
    sinon.stub(require('../services/getRoomService'), 'getRoomById').resolves(mockSpecificRoom);

    // Import the route handler after stubbing the function
    getRoomEndpoint = require('../routes/room/roomGet');

    app = express();
    app.use('/api/v1/room/', getRoomEndpoint);

});

afterEach(async () => {
    sequelize.close();
    sinon.restore();
});

test('get all room instances created from database', async () => {

    // get request
    const response = await supertest(app).get('/api/v1/room/');

    // is response ok
    assert.strictEqual(response.status, 200);

    // response body array of rooms
    assert.strictEqual(Array.isArray(response.body), true);

    // expect 2 rooms that were created originally
    console.log("Response body count", response.body);
    assert.strictEqual(response.body.length, 2);

});

test('get one room instance from database by id', async () => {

    // get request
    const response = await supertest(app).get('/api/v1/room/3') // assuming ID is 3

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.id, 3);
})