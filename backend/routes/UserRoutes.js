const express = require("express");
const router = express.Router();
const passport = require("passport");
var User = require("../models/User.js");

router.get("/register", function(req, res) {
    res.send("Register Page");
})

// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            // res.redirect("/dashboard");
            res.send("Registered successfully!");
        });
    });
});

router.get("/login", function(req, res) {
    res.send("Login Page")
})

// handling login logic
router.post("/login", passport.authenticate("local", {
    // successRedirect: "/dashboard",
    failureRedirect: "/login"
}), function(req, res) {
    res.send("Logged in!");
});

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
