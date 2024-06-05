const reviewService = require('../services/reviewService');
const mongoose = require('mongoose');


const createReview = async (req, res) => {
    const { movieId, rating, comment } = req.body;
    const userId = req.user.userId;

    try {
        const review = await reviewService.addReview(movieId, userId, rating, comment);
        res.status(201).json({ success: true, review });
    } catch (error) {
        if (error.message === 'Movie not found!' || error.message === 'User not found!') {
            return res.status(404).json({ success: false, error: error.message });
        } else {
            return res.status(400).json({ success: false, error: error.message });
        }
    }
};

const updateReview = async (req, res) => {
    const reviewId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, error: 'Invalid review ID format' });
    }
    const userId = req.user.userId;
    const reviewData = req.body;

    try {
        const updatedReview = await reviewService.updateReview(reviewId, userId, reviewData);
        res.status(200).json({ success: true, review: updatedReview });
    } catch (error) {
        if (error.message.includes('Review not found or no permission')) {
            res.status(404).json({ success: false, error: error.message })
        } else {
            return res.status(400).json({ success: false, error: error.message });
        }
    }
};

const deleteReview = async (req,res) => {
    const reviewId = req.params.id;
    const userId = req.user.userId;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, error: 'Invalid review ID format' });
    }
    try {
        const deletedReview = await reviewService.deleteReview(reviewId,userId)
        res.status(200).json({ success: true, message: `Review with ID: ${deletedReview._id} was deleted successfully` });
    } catch (error) {
        if (error.message.includes('Review not found or no permission')) {
            res.status(404).json({ success: false, error: error.message })
        } else {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};

const getAllReviews = async (req,res) => {
    try {
        const reviews = await reviewService.findReviews();
        res.status(200).json( {  success: true, allReviews: reviews } );
    } catch (error) {
        if (error.message === "No reviews were found") {
            return res.status(404).json({ success: false, error: error.message });
        } else {
           return res.status(500).json({ success: false , error: error.message });
        }
    }
};

const getReview = async (req,res) => {
    const reviewId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, error: 'Invalid review ID format' });
    }
    try {
        const review = await reviewService.findReview(reviewId);
        res.status(200).json({success: true, review })
    } catch (error) {
        if (error.message === "Review not found!") {
            return res.status(404).json({ success: false, error: error.message });
        } else {
           return res.status(500).json({ success: false, error: error.message });
        }
    }
};

const getMovieReviews = async (req,res) => {
    const movieId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, error: 'Invalid movie ID format' });
    }
    try {
        const reviews = await reviewService.findMovieReviews(movieId);
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        if (error.message === "No reviews found for this movie") {
            return res.status(404).json({ success: false, error: error.message });
        } else {
           return res.status(500).json({ success: false, error: error.message });
        }
    }
};

const getMoviesAndAverageRatings = async (req,res) => {
    try {
        const result = await reviewService.getAverageRatings();
        console.log('Aggregation result:', result);
        if(result.length === 0) {
            return res.status(404).json({ message: 'No movies found' });
         }
         res.status(200).json({ result });
    } catch (error) {
        console.error('Error in getMoviesAndAverageRatings:', error.message);
        res.status(500).json({ message: error.message });
    }
}


module.exports = { createReview, updateReview, deleteReview, getAllReviews, getReview, getMovieReviews, getMoviesAndAverageRatings } 