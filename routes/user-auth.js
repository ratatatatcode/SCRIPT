const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render("auth/login.ejs");
});

module.exports = router;