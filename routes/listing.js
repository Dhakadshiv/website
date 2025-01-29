const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsnyc.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner ,validateListing }=require("../middleware.js");
const listingControler= require("../controllers/listings.js");

const multer=require('multer');
const {storage}=require("../cloudConfig.js")
const upload=multer({ storage});



router.route("/")
// index rout
.get(wrapAsync (listingControler.index))
// create route
.post( isLoggedIn,
      
     upload.single("listing[image]"),validateListing, 
      wrapAsync( listingControler.createListing 
      ));
 
 



//New rout
router.get("/new",isLoggedIn, listingControler.renderNeForm)

// show  rout
router.get("/:id",wrapAsync (listingControler.showListing ))

 
// edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(  listingControler.renderEditform));

//update route
router.put("/:id",isLoggedIn,isOwner, upload.single("listing[image]"),validateListing, wrapAsync( listingControler.updateListing));

// Delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingControler.destroyListing )
);


module.exports=router;
