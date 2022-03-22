const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Content = require('../models/content');
const { isLoggedIn } = require('../middleware/middleware');
const Admin = require('../models/admin');
const multer = require("multer");
const { storage, cloudinary } = require('../cloudinary/index');
const upload = multer({ storage });

router.post('/', upload.array('image'), [
    body('title', 'Enter a Title of Min Length 5').isLength({ min: 5 }).exists(),
    body('quote', "Please Enter a Quote of Min Length 10").isLength(10).exists(),
    body('about', 'Please Write something in About Section of Min Length 20').isLength({ min: 20 }).exists()
], isLoggedIn, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const content = await Content.create({
            title: req.body.title,
            quote: req.body.quote,
            about: req.body.about,
            images: req.files.map(f => ({ url: f.path, filename: f.filename }))
        })
        const response = await content.save();
        console.log(response);
        res.json("It Worked");

    } catch (e) {
        console.log(e);
        res.json({ error: 'An Error has Occured', message: e.message });
    }
});

// router.post('/', upload.array('image'), (req, res) => {
//     console.log("Hey you Reached it");
//     res.send(req.body);
// })


router.get('/', async (req, res) => {
    try {
        let allContent = await Content.find({});
        allContent = allContent.reverse();
        let numberOfPages = 1;
        if (req.query.page) {
            const postPerPage = 4;
            const pageNumber = req.query.page;
            numberOfPages = Math.ceil(allContent.length / postPerPage);
            allContent = allContent.slice((pageNumber - 1) * postPerPage, pageNumber * postPerPage);
        }
        res.json({ allContent, numberOfPages });
    } catch (e) {
        console.log(e);
        res.json({ error: 'An Error has Occured', message: e.message });
    }
})


router.delete('/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const content = await Content.findById(id);
        if (content.images) {
            for (let file of content.images) {
                await cloudinary.uploader.destroy(file.filename);
            }
        }
        const response = await Content.findByIdAndDelete(id);
        res.json(response);
    } catch (e) {
        console.log(e);
        res.json({ error: 'An Error has Occured', message: e.message });
    }
})


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const specificContent = await Content.findOne({ _id: id });
        res.json(specificContent);
    } catch (e) {
        console.log(e);
        res.json({ error: 'An Error has Occured', message: e.message });
    }
})



module.exports = router;