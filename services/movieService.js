
const Movie = require('../models/Movie');
const Review = require('../models/Review')

const movieService = {

    saveNewMovie: async (title, director, releaseYear, genres) => {
        try {
// Checking if a movie with the same title and release year already exists.
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

    updateMovie: async (id, movieData) => {
        try {
// Extracts title, director, and releaseYear from the provided movieData.
            const { title, director, releaseYear } = movieData;
// Checks if updating the movie would create a duplicate entry.
            const duplicateMovie = await Movie.findOne({
                _id: { $ne: id },
                title,
                director,
                releaseYear
            });

            if (duplicateMovie) {
                throw new Error(`Movie cannot be updated because there would be a duplicate. 
                    Try to change one of values (title, director or releaseYear)` );
            }
            const movie = await Movie.findByIdAndUpdate(
                id,
                movieData,
                { new: true, runValidators: true }
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
// excluding the password __v field
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
// deletes a movie and all associated reviews
    deleteMovie: async (movieId) => {
        try {
            const movie = await Movie.findById(movieId);
            if (!movie) {
                throw new Error('Movie not found!');
            }
            await Review.deleteMany({ movieId });
            await movie.deleteOne();

            return movie.title;
        } catch (error) {
            throw new Error(error.message);
        }
    },
}

module.exports = movieService; 