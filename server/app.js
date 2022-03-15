const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost:27017/web-blogging';
const Content = require('./models/content');
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

app.use(express.json());
app.use(cors());

app.use('/api/content', contentRouter);
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send("Hello From Backend");
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})