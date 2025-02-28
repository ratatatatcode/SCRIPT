const { randomUUID } = require('crypto');
const { auth, db } = require("../config/firebase");
const { doc, setDoc, getDocs, updateDoc, collection } = require("firebase/firestore");

exports.post = async (req, res) => {
    // don't forget to add session user check

    try {
        const { content } = req.body;
        
        const users = await getDocs(collection(db, "users"));
        let user = null;
        
        users.forEach((getUser) => {
            if (getUser.id == req.session.userId) {
                user = getUser.data();
            }
        });

        const postContent = {
            userId: req.session.userId,
            username: user.username,
            createAt: new Date().toISOString(),
            content,
            comment: {
                // commentId, 
                // add reply but i'll need some time to think the logic for it
            },
            like: 0 // apply this next time
        }

        await setDoc(doc(db, "posts", randomUUID()), postContent);

        const username = req.session.username;
        res.redirect(`/${username}`);
    } catch (e) {
        console.log(e);
    }
}

// i asked gpt for the some solution
exports.add_friend = async (req, res) => {
    const username = req.session.username; // friend's profile
    const userId = req.session.userId; // actual user's session id
    let friendId = null;

    try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        console.log(`session username: ${username}`);
        usersSnapshot.forEach((getUser) => {
            if (getUser.data().username === username) {
                friendId = getUser.id;
                user = getUser.data();
            }

            console.log(getUser.data().username);
        });

        const docRef = doc(db, "users", friendId);

        if (!friendId) {
            return res.status(404).send("Friend not found.");
        }

        await updateDoc(docRef, {
            [`friends.${userId}`]: "Requested"
        });

        res.send("Added successfully...");
    } catch (e) {
        console.error(e);
        res.status(500).send("An error occurred.");
    }
};

// reminder:
// add friend info at both account and fix the count of friends in timeline.ejs