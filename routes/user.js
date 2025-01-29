const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsnyc.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// Signup routes
router.get("/signup", userController.renderSignupForm);
router.post("/signup", wrapAsync(userController.signup));

// Login routes
router.get("/login", userController.renderLoginform);
router.post(
    "/login",
    saveRedirectUrl,
    (req, res, next) => {
        console.log("Before passport.authenticate");
        next();
    },
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    (req, res) => {
        console.log("After passport.authenticate");
        userController.login(req, res);
    }
);

// Logout route
router.get("/logout", userController.logout);

module.exports = router;
