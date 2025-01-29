import { Router } from "express";
import wrapAsync from "../utils/wrapAsnyc.js";
import ExpressError from "../utils/ExpressError.js";
import Review from "../models/review.js";
import Listing from "../models/listing.js";
import { validateReview, isLoggedIn, isReviewAuther } from "../middleware.js";
import { createReview, destroyReview } from "../controllers/reviews.js";


const router=Router({mergeParams:true});

  

// Reviews
//post rout

router.post("/", isLoggedIn,validateReview, wrapAsync(createReview ));


// Delete review rout
router.delete("/:reviewId",isLoggedIn ,isReviewAuther,wrapAsync(  destroyReview))

export default router;