const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 1 && value <= 5;
            },
            message: 'Rating must be between 1 and 5'
        }
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; 


