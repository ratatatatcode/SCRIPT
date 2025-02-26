const express = require("express");
const router = express.Router();
const { post } = require("../controllers/newsfeedController")

// firestore
const { auth, db } = require("../config/firebase");
const { collection, query, where, getDocs } = require("firebase/firestore");

router.get('/newsfeed', async (req, res) => {
    // check for if user is authenticated
    if(req.session.userId) {
        const posts = await getDocs(collection(db, "posts"));
        const users = await getDocs(collection(db, "users"));
        const sessionId = req.session.userId;

        // i'm confused whether i'll filter the post here or no
        // i'll change this soon so i won't need to send the sessionId

        let user = "";

        users.forEach((getUser) => {
            if(getUser.id == req.session.userId) {
                user = getUser.data();
                console.log(user);
            }
        });

        console.log(`the user is: ${user}`);
        console.log(`the posts are:`)

        res.render("newsfeed/newsfeed.ejs", { posts, user, sessionId });
    } else {
        res.send("No account found...");
    }
});

router.post('/api/newsfeed/post', post);

module.exports = router;