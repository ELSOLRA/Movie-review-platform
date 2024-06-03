const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, adminMiddleware, movieController.addMovie);
router.put('/:id', authMiddleware, adminMiddleware, movieController.updateMovie);
router.get('/',  movieController.getAllMovies);
router.get('/:id',  movieController.getMovie);

module.exports = router; 