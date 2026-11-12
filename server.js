const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/user');
const app = express();
const PORT = 3000;

// 1. Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 2. Serve Static Files 
// This allows the browser to find your style2.css and script.js
app.use(express.static(path.join(__dirname, '/'))); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index2.html'));
});

// 3. MongoDB Connection
// Replace with your MongoDB Atlas string if you have one
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/users");
    .then(() => console.log('Connected to MongoDB Archive'))
    .catch(err => console.error('Connection Error:', err));

// 4. SIGNUP ROUTE
app.post('/auth/signup', async (req, res) => {
    try {
        const newUser = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password 
        });
        await newUser.save();
      res.redirect(`/success.html?type=new&name=${encodeURIComponent(newUser.fullName)}`);
    } catch (error) {
        res.status(400).send("Error: " + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// sign in
app.post('/auth/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // find a user who matches both the email and password
        const user = await User.findOne({ email: email, password: password });

        if (user) {
            // success: Send them to the home page or a welcome message
        res.redirect(`/success.html?type=old&name=${encodeURIComponent(user.fullName)}`);
        } else {
            res.status(401).send("Invalid credentials.");
        }
    } catch (error) {
        res.status(500).send("Server Error");
    }

});
