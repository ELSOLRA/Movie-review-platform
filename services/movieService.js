
const Movie = require('../models/Movie');

const movieService = {

    saveNewMovie: async (title, director, releaseYear, genres) => {
        try {
            const existingMovie = await Movie.findOne({ $and: [{ title }, { releaseYear }] });
            if (existingMovie) {
                throw new Error(`The movie "${title}" released in ${releaseYear} already exists`);
            };
            const newMovie = await Movie.create({ title, director, releaseYear, genres });
            return newMovie;

        } catch (error) {
            throw new Error(error.message);
        }
    },

    updateMovie: async (id, movieData ) => {
        try {
            const movie = await Movie.findByIdAndUpdate(
                id,
                movieData,
                { new: true, runValidators: true}
            );
            if (!movie) {
                throw new Error('Movie not found!');
            };
            return movie;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    findAllMovies: async () => {
        try {
            const movies = await Movie.find().select('-__v');
            return movies; 
        } catch (error) {
            throw new Error(error.message);
        }
    },

    findMovie: async (movieId) => {
        try {
            const movie = await Movie.findById(movieId);
            if (!movie) {
                throw new Error('Movie not found!');
            };
            return movie;
        } catch (error) {
            throw new Error(error.message);
        }
    },



}

module.exports = movieService; 