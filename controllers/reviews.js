const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview = async (req, res, next) => {
    try {
        if (!req.user) {
            req.flash("error", "You must be logged in to submit a review.");
            return res.redirect("/login");
        }

        const { rating, text } = req.body.review; // Adjusted based on expected structure
        const review = new Review({ rating, text, author: req.user._id });

        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            req.flash("error", "Listing not found.");
            return res.redirect("/listings");
        }

        listing.reviews.push(review);
        await review.save(); // Save the review in the `reviews` collection
        await listing.save(); // Save the updated listing

        req.flash("success", "Review added successfully");
        res.redirect(`/listings/${listing._id}`);
    } catch (err) {
        next(err); // Forward error to middleware
    }
};

module.exports.destroyReview=async(req, res)=>{
    let {id, reviewId}=req.params;
   await  Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","  Review Deleted")
    res.redirect(`/listings/${id}`)

};