const express = require("express");
const router=express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const Listing=require("C:/Users/HP/Desktop/HTML_Class/Project_Airbnb/models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controller/listings.js");
const { showListing, createListing } = require("../controller/listings.js");
const {storage}= require("../cloudConfig.js")
const multer = require("multer");
const upload = multer({ dest:"storage"});

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,validateListing,upload.single('listing[image]'),wrapAsync(listingController.createListing));

router.get("/new",isLoggedIn,listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports=router;