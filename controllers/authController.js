const { auth, db } = require("../config/firebase");
const { doc, setDoc, getDoc, collection, query, where, getDocs } = require("firebase/firestore");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");

exports.signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!auth) {
            throw new Error("Firebase Auth is not initialized.");
        }
        
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // don't forget to add .user after the userCredential
        const user = userCredential.user;

        const userData = {
            name,
            username,
            email,
            password,
            createAt: new Date().toISOString()
        };

        // use .uid instead of .id
        await setDoc(doc(db, "users", user.uid), userData);

        // const status = status(201).json({ message: "User registered successfully:", uid: user.uid });
        res.redirect("/");
    } catch (e) {
        console.log("Signup Error:", e);
        res.status(500).json({ error: e.message });
    }
};

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!auth) {
            throw new Error("Firebase Auth is not initialized.");
        }

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user.uid);
        // console.log(userCredential.user);

        res.redirect("/test-direct");
    } catch (e) {
        console.log("Login Error:", e);
        res.status(500).json({ error: e.message });
    }
}