const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listings.js");
const { isLoggedIn, isreviewAuthor,validateReview } = require('../middleware.js');
const reviewController = require("../controllers/review.js")

//Review Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview))
 
// Delete Review Route
router.delete("/:reviewId", isLoggedIn, isreviewAuthor, wrapAsync(reviewController.deleteReview))

module.exports = router;