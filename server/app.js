require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const dbUrl = `${process.env.MONGO_DB_URL}`;
const contentRouter = require('./routes/content');
const authRouter = require('./routes/auth');
const cors = require('cors');

mongoose.connect(dbUrl)
    .then(() => {
        console.log("Mongo Connection Open")
    })
    .catch((e) => {
        console.log("Mongo Connection ERROR")
        console.log(e)
    })

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

app.use('/api/content', contentRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send("Hello From Backend");
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})