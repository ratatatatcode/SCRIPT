const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session")
require("dotenv").config();

// express-session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SECRET_SESSION_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// this should always be in your server.js file
app.use(express.urlencoded({extended: true}));

// routes
const auth = require("./routes/user-auth");

// consider using reverse proxy: https://expressjs.com/en/advanced/best-practice-performance.html#use-a-reverse-proxy
// https://expressjs.com/en/starter/static-files.html
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(express.json())
// direct to login
app.use('/', auth);

app.get('/test-direct', (req, res) => {
    res.render("test-direct.ejs");
});

// npx nodemon server.js
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}...`);
})