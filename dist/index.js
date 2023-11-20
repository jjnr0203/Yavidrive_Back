"use strict";
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send("get working");
});
app.put('/', (req, res) => {
    res.send("put working");
});
app.post('/', (req, res) => {
    res.send("post working");
});
app.delete('/', (req, res) => {
    res.send("delete working");
});
app.listen(3000, () => console.log('server on port 3000'));
