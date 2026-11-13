const express = require("express");
const router=express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const Listing=require("C:/Users/HP/Desktop/HTML_Class/Project_Airbnb/models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const { showListing, createListing } = require("../controller/listings.js");
router.get("/",wrapAsync(listingController.index));

router.get("/new",isLoggedIn,listingController.renderNewForm);

router.get("/:id",wrapAsync(listingController.showListing));


router.post("/",validateListing,wrapAsync(listingController.createListing));
//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

//Update Route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));
//Delete Route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;