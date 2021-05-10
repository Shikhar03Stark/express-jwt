const express = require('express')
const sql = require('./config/db')
require('dotenv').config();

const app = express()

sql.sync

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.status(200).json({
        ok : true,
    })
})

app.listen(port, () => {
    console.log(`Server running on ${port}`);
})