const express = require("express");
const router= express.Router();
const wrapAsync=require("../utils/wrapAsync");
const User= require("../models/user.js");
const passport=require("passport");
const { route } = require("./listing.js");
const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.get("/signup",userController.renderSignupForm);

router.post("/signup",wrapAsync(userController.signup));

router.get("/login",userController.renderLoginForm);

router.post("/login",
    savedRedirectUrl,
    passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),userController.login);

route.get("/logout",userController.logout);

module.exports=router;
