const Listing=require("./models/listing");
const Review=require("./models/review")


const ExpressError=require("./utils/ExpressError.js");
const {listingSchema  ,reviewSchema}=require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Fix: use redirectUrl to store the URL
        req.flash("error", "Please login first to create a Listing");
        return res.redirect("/login");
    }
    next();
};

 module.exports.saveRedirectUrl=(req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;

    }
    next();  
 }
 module.exports.isOwner= async(req, res, next)=>{
    let {id}=req.params;
let listing= await Listing.findById(id);
if(! listing.owner._id .equals(res.locals.currUser._id)){
    req.flash("error","You don't have permiossion to edit");
    return res.redirect(`/listings/${id}`)
}
next();
 };


 module.exports.validateListing = (req, res, next) => {
    console.log("Validating listing:", req.body); // Log the body to ensure data is reaching here

    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map((el) => el.message).join(", ");
        console.error("Validation Error:", errMsg);
        return next(new ExpressError(errMsg, 400));
    }

    console.log("Validation Passed");
    next();
};


module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        console.error('Validation Error:', error.details); // Debug log
        const errMsg = error.details.map((el) => el.message).join(", ");
        next(new ExpressError(400, errMsg)); // Pass the error to next() instead of throwing it
    } else {
        next();
    }
};


module.exports.isReviewAuther= async(req, res, next)=>{
    let {id,reviewId}=req.params;
let review= await Review.findById(reviewId);
if(! review.author.equals(res.locals.currUser._id)){
    req.flash("error","You don't have permiossion to edit");
    return res.redirect(`/listings/${id}`)
}
next();
 };