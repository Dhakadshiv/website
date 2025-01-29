const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsnyc.js");
const ExpressError=require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuther}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");
 
// Reviews
//post rout

router.post("/", isLoggedIn,validateReview, wrapAsync(reviewController.createReview ));


// Delete review rout
router.delete("/:reviewId",isLoggedIn ,isReviewAuther,wrapAsync(  reviewController.destroyReview))

module.exports=router;