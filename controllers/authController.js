// controllers/authController.js

const crypto = require('crypto');
const config = require('../essential/config');

exports.showLogin = (req, res) => {
    res.send(`
        <form action="/login" method="post">
        <input type="password" name="password" placeholder="Enter password" />
        <button type="submit">Submit</button>
        </form>
    `);
};

exports.login = (req, res) => {
    const password = req.body.password;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    if (hashedPassword === config.HASHED_PASSWORD) {
        res.cookie('auth', hashedPassword);
        res.redirect('/dashboard');
    } else {
        res.redirect('/');  
    }
};

exports.requireAuth = (req, res, next) => {
    const auth = req.cookies.auth;
    if (auth != config.HASHED_PASSWORD) {
        res.redirect('/'); 
    }
    next();
};

