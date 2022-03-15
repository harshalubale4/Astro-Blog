const jwt = require('jsonwebtoken');
const JWT_SEC = 'thisisajwtsecret';
const Admin = require('../models/admin');

module.exports.isLoggedIn = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please Authenticate First" });
    }
    const tokenData = jwt.verify(token, JWT_SEC);
    const admin = await Admin.findOne({ _id: newToken.admin.id });
    if (!admin) {
        res.status(401).send({ error: "Please Authenticate First" });
    }
    next();
}