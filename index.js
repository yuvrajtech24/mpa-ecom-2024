// Imports
const express = require("express");
require("dotenv").config();

// Declarations
const app = express();
console.log("host = ", process.env.HOST);
console.log("port = ", process.env.PORT);

// Endpoints


// server start
app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log("server started listening");
});