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
        body('name', 'Enter a Valid Name that has Size more than 4 charac').isLength({ min: 4 }),
        body('email', "Please Enter a Valid Email").isEmail(),
        body('password', 'Please Enter a Valid Password that has size more than 8 charac').isLength({ min: 8 }),
        body('username', 'Please Enter a Valid Username greater than 6 chars and Username should be Unique').isLength({ min: 6 })
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

module.exports = router;