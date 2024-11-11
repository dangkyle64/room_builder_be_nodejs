const express = require('express'); // import express to the file
const app = express(); // intialize express object for use
const cors = require('cors'); // import cors to the file 

app.use(cors(corsOptions)); // set up cors here
app.use(express.json()); // parsing json body data 

// Endpoints

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});

