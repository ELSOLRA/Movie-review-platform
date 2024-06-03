const mongoose = require('mongoose');
const movieService = require('../services/movieService');

const addMovie = async (req, res) => {
    const { title, director, releaseYear, genres } = req.body;
    try {
        const movie = await movieService.saveNewMovie(title, director, releaseYear, genres);
        res.status(201).json({ success: true, message: `The movie "${movie.title}" was registered successfully` });
    } catch (error) {
        if (error.message.includes('already exists')) {
            return res.status(409).json({ success: false, error: error.message });
        }
        res.status(400).json({ success: false, error: error.message });
    }
};

const updateMovie = async (req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, error: 'Invalid movie ID format' });
    }
    try {
         await movieService.updateMovie(req.params.id, req.body)
        res.status(200).json({ success: true, changes: req.body})
    } catch (error) {
        if (error.message === "Movie not found!") {
            return res.status(404).json({ success: false, error: error.message });
        }
        res.status(400).json({ success: false, error: error.message });
    }
}

const getAllMovies = async (req,res) => {
    try {
        const movies = await movieService.findAllMovies(); 
        // -----!!!! ask what to return here title id or more???? -------!!!!!-----
        res.status(200).json( { 
            listOfMovies: movies.map(movie => ({ title: movie.title, _id: movie._id })) });
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

const getMovie = async (req,res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ success: false, error: 'Invalid movie ID format' });
    }
    try {
        const movie = await movieService.findMovie(req.params.id)
        if (!movie) {
            return res.status(404).json({ error: "Movie not found!" });
        }
        res.status(200).json(movie);
    } catch (error) {
        if (error.message === "Movie not found!") {
            return res.status(404).json({ success: false, error: error.message });
        }
        res.status(500).json({ error: error.message});
    }
}




module.exports = { addMovie, getAllMovies, updateMovie, getMovie }; 