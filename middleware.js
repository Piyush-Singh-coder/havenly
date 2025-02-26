const Listing = require("./models/listings.js")
const Review = require("./models/review.js")
const {listingSchema, reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.validateListing = (req, res, next)=>{
    let {error} = listingSchema.validate(req.body);
        if (error){
            throw new ExpressError(400, error)
        }else{
            next();
        }
}

module.exports.validateReview = (req, res, next)=>{
    let {error} = reviewSchema.validate(req.body);
        if (error){
            throw new ExpressError(400, error)
        }else{
            next();
        }
}

module.exports.isLoggedIn = (req, res, next) =>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl
        req.flash("error", "You must be logged in to add listings")
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}

module.exports.isOwner = async (req, res, next) =>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You should be owner to edit or delete.")
    return res.redirect(`/listings/${id}`);
}
next();
}

module.exports.isreviewAuthor = async (req, res, next) =>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author._id.equals(res.locals.currUser._id)){
    req.flash("error","You have no right to remove this review.")
    return res.redirect(`/listings/${id}`);
}
next();
}