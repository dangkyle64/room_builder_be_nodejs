const express = require('express'); // import express to the file
const app = express(); // intialize express object for use
const cors = require('cors'); // import cors to the file 

const getRoomEndpoint = require('./routes/room/roomGet');
const postRoomEndpoint = require('./routes/room/roomPost');
const putRoomEndpoint = require('./routes/room/roomPut');
const deleteRoomEndpoint = require('./routes/room/roomDelete');

const getFurnitureEndpoint = require('./routes/furniture/furnitureGet');
const postFurnitureEndpoint = require('./routes/furniture/furniturePost');
const putFurnitureEndpoint = require('./routes/furniture/furniturePut');
const deleteFurnitureEndpoint = require('./routes/furniture/furnitureDelete');

corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],  // Allow only the frontend at localhost:3000
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

app.use(cors(corsOptions)); // set up cors here
app.use(express.json()); // parsing json body data 


// Endpoints for Room
app.use("/api/v1/room", getRoomEndpoint);
app.use("/api/v1/room", postRoomEndpoint);
app.use("/api/v1/room", putRoomEndpoint);
app.use("/api/v1/room", deleteRoomEndpoint);

// Endpoints for Furniture
app.use("/api/v1/furniture", getFurnitureEndpoint);
app.use("/api/v1/furniture", postFurnitureEndpoint)
app.use("/api/v1/furniture", putFurnitureEndpoint);
app.use("/api/v1/furniture", deleteFurnitureEndpoint);

const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});

