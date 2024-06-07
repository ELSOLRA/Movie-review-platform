const mongoose = require('mongoose');
const movieService = require('../services/movieService');

const addMovie = async (req, res) => {
    const { title, director, releaseYear, genres } = req.body;
    try {
        const movie = await movieService.saveNewMovie(title, director, releaseYear, genres);
// prepare movie details object to send in response
        const movieDetails = {
            _id: movie.id,
            title: movie.title,
            director: movie.director,
            releaseYear: movie.releaseYear,
            genres: movie.genres,
        };

        res.status(201).json({ success: true, message: `The movie '${movie.title}' was registered successfully`, movieDetails });
    } catch (error) {
        if (error.message.includes('already exists')) {
            return res.status(409).json({ success: false, error: error.message });
        } else {
            return res.status(400).json({ success: false, error: error.message });
        }
    }
};

const updateMovie = async (req, res) => {
// checks if the provided movie ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, error: 'Invalid movie ID format' });
    }
    try {
        const updatedMovie = await movieService.updateMovie(req.params.id, req.body)
        res.status(200).json({ success: true, changes: req.body, updatedMovie: updatedMovie })
    } catch (error) {
        if (error.message === "Movie not found!") {
            return res.status(404).json({ success: false, error: error.message });
        } else if (error.message.includes('Movie cannot be updated because')) {
            return res.status(409).json({ success: false, error: error.message });
        } else {
            return res.status(400).json({ success: false, error: error.message });
        }
    }
};

const deleteMovie = async (req, res) => {
// checks if the provided movie ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, error: 'Invalid movie ID format' });
    }

    try {
        const movieTitle = await movieService.deleteMovie(req.params.id);
        res.status(200).json({ success: true, message: `Movie '${movieTitle}' was deleted successfully` });
    } catch (error) {
        if (error.message === 'Movie not found!') {
            return res.status(404).json({ success: false, error: error.message });
        } else {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};

const getAllMovies = async (req, res) => {
    try {
        const movies = await movieService.findAllMovies();
        res.status(200).json({
            success: true,
// maps the list of movies to include only title and _id fields
            listOfMovies: movies.map(movie => ({ title: movie.title, _id: movie._id }))
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const getMovie = async (req, res) => {
// checks if the provided movie ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, error: 'Invalid movie ID format' });
    }
    try {
        const movie = await movieService.findMovie(req.params.id)
        res.status(200).json(movie);
    } catch (error) {
        if (error.message === "Movie not found!") {
            return res.status(404).json({ success: false, error: error.message });
        } else {
            return res.status(500).json({ success: false, error: error.message });
        }
    }
};

module.exports = { addMovie, getAllMovies, updateMovie, getMovie, deleteMovie }; 