const express = require("express");
const router = express.Router();
const { post, add_friend } = require("../controllers/timelineController")

// firestore
const { auth, db } = require("../config/firebase");
const { collection, query, where, getDocs } = require("firebase/firestore");

// actual timeline
// change this to their username next time
router.get('/:username', async (req, res) => {
    let isAuthenticated = false;
    const username = req.params.username;
    const sessionId = req.session.userId;
    
    req.session.username = username;
    
    if(!sessionId) {
        res.send("No account found...")
    }
    
    const postsSnapshot = await getDocs(collection(db, "posts"));
    const usersSnapshot = await getDocs(collection(db, "users"));

    let user = null;
    
    usersSnapshot.forEach((getUser) => {
        if (getUser.id == req.session.userId) {
            user = getUser.data();
        }
    });

    if (user && username == user.username) {
        isAuthenticated = true;

        // i'm confused whether i'll filter the post here or no
        // i'll change this soon so i won't need to send the sessionId

        res.render("timeline/timeline.ejs", { postsSnapshot, user, username, isAuthenticated });
    } else {
        usersSnapshot.forEach((getUser) => {
            if (getUser.data().username == username) {
                user = getUser.data();
            }
        });
    
        res.render("timeline/timeline.ejs", { postsSnapshot, user, username, isAuthenticated });
    }

    // check for if user is authenticated
});

router.post('/api/timeline/post', post);

// friends
router.get('/:username/friends', (req, res) => {
    res.render("timeline/friends.ejs");
});

router.post('/api/timeline/add-friend', add_friend);

module.exports = router;