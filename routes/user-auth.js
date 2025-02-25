const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/authController")

// consider adding this: https://expressjs.com/en/resources/middleware/cookie-parser.html
// https://dev.to/deepakshisood/authentication-using-firebase-for-expressjs-2l48

router.get('/', (req, res) => {
    res.render("auth/login.ejs");
});

router.get('/signup', (req, res) => {
    res.render("auth/signup.ejs");
});

router.post('/api/signup', signup);
router.post('/api/login', login)

module.exports = router;