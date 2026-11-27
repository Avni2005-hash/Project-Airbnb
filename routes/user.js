const express = require("express");
const router= express.Router();
const wrapAsync=require("../utils/wrapAsync");
const User= require("../models/user.js");
const passport=require("passport");
const { route } = require("./listing.js");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));


router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(savedRedirectUrl,
    passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.login);

router.get("/logout",userController.logout);

module.exports=router;
