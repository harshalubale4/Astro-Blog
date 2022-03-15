const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Content = require('../models/content');
const { isLoggedIn } = require('../middleware/middleware');


router.post('/', [
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
            about: req.body.about
        })
        const response = await content.save();
        console.log(response);
        res.json({ response });

    } catch (e) {
        console.log(e);
        res.json({ error: 'An Error has Occured', message: e.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const allContent = await Content.find({});
        console.log(allContent);
        res.json(allContent);
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

router.delete('/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Content.findOneAndDelete({ _id: id });
        res.json(response);
    } catch (e) {
        console.log(e);
        res.json({ error: 'An Error has Occured', message: e.message });
    }
})

module.exports = router;