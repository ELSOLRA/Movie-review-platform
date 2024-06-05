const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, movieController.addMovie);
router.put('/:id', authMiddleware, adminMiddleware, movieController.updateMovie);
router.delete('/:id', authMiddleware, adminMiddleware, movieController.deleteMovie);
router.get('/ratings', reviewController.getMoviesAndAverageRatings);
router.get('/', movieController.getAllMovies);
router.get('/:id/reviews', reviewController.getMovieReviews);  
router.get('/:id', movieController.getMovie);

module.exports = router; 