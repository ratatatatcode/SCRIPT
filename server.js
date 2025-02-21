const express = require("express");
const app = express();
const path = require("path");

// routes
const auth = require("./routes/user-auth");

// consider using reverse proxy: https://expressjs.com/en/advanced/best-practice-performance.html#use-a-reverse-proxy
// https://expressjs.com/en/starter/static-files.html
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


// direct to login
app.use('/', auth);

// npx nodemon server.js
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}...`);
})