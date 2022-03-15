const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const JWT_SEC = 'thisisajwtsecret';
const jwt = require('jsonwebtoken');

// Router is api/auth/createadmin
router.post('/createadmin',
    [
        body('name', 'Enter a Valid Name that has Size more than 4 charac').isLength({ min: 4 }).exists(),
        body('email', "Please Enter a Valid Email").isEmail().exists(),
        body('password', 'Please Enter a Valid Password that has size more than 8 charac').isLength({ min: 8 }).exists(),
        body('username', 'Please Enter a Valid Username greater than 6 chars and Username should be Unique').isLength({ min: 6 }).exists()
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const admin = await Admin.create({
                name: req.body.name,
                password: hashedPass,
                email: req.body.email,
                username: req.body.username
            });
            const response = await admin.save();
            const data = {
                admin: {
                    id: admin._id
                }
            }
            const authToken = jwt.sign(data, JWT_SEC);
            res.json({ authToken, admin });
        } catch (e) {
            console.log(e);
            res.json({ error: 'An Error has Occured', message: e.message });
        }
    })



// Router is api/auth/login
router.post('/login',
    [
        body('password', 'Password cannot be Empty').exists(),
        body('username', 'Username cannot be Empty').exists()
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { username, password } = req.body;
            const admin = await Admin.findOne({ username });
            if (!admin) {
                return res.status(400).json({ error: "Either of Username or Password is Invalid" });
            }
            const passwordCompare = await bcrypt.compare(password, admin.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Either of Username or Password is Invalid" });
            }
            const data = {
                admin: {
                    id: admin._id
                }
            }
            const authToken = jwt.sign(data, JWT_SEC);

            const newToken = jwt.verify(authToken, JWT_SEC);
            console.log(newToken.admin.id);
            const newAdmin = await Admin.findOne({ _id: newToken.admin.id });
            console.log(newAdmin);

            res.json({ authToken });

        } catch (e) {
            console.log(e);
            res.json({ error: 'An Error has Occured', message: e.message });
        }
    })

module.exports = router;