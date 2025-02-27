const { randomUUID } = require('crypto');
const { auth, db } = require("../config/firebase");
const { doc, setDoc } = require("firebase/firestore");

exports.post = async (req, res) => {
    // don't forget to add session user check

    try {
        console.log(`newsfeed session id: ${req.session.id}`);

        const { content } = req.body;

        const postContent = {
            userId: req.session.userId,
            createAt: new Date().toISOString(),
            content,
            comment: {
                // commentId, 
                // add reply but i'll need some time to think the logic for it
            },
            like: 0 // apply this next time
        }

        await setDoc(doc(db, "posts", randomUUID()), postContent);
        res.redirect("/newsfeed");
    } catch (e) {
        console.log(e);
    }
}