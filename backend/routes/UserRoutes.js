const express = require("express");
const router = express.Router();
const passport = require("passport");
var User = require("../models/User.js");
var Admin = require("../models/Admin.js");

router.get("/register", function(req, res) {
    res.send("Register Page");
})

// handle sign up logic for fellows
router.post("/register", function(req, res) {
    var newUser = new User({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    });
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            // res.redirect("/dashboard");
            res.send("Fellow registered successfully!");
        });
    });
});

// handle sign up logic for admin
router.post("/register-admin", function(req, res) {
    var newAdmin = new Admin({ username: req.body.username });
    Admin.register(newAdmin, req.body.password, function(err, user) {
        if (err) {
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            // res.redirect("/dashboard");
            res.send("Admin registered successfully!");
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
    if(req.body.type == "fellow") {
        res.send("Fellow Logged in!");
    } else if (req.body.type == "admin") {
        res.send("Admin Logged in!");
    }
});

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;
