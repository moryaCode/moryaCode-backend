const express = require('express');
let Route = express.Router();

// define all routes here

Route.get("/", (req, res) => {
    res.send('Hello World!');
});




module.exports = Route;