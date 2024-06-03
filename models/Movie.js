const mongoose = require('mongoose');
const { currentYear } = require('../utils/dateUtils');


const movieSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true,
        validate: {
            validator: function(releaseYear) {
                return releaseYear <= currentYear();
            },
        message: props => `${props.value} is not valid! It must be year not in the future!`
        }
    },
    genres: {
        type: [String], 
        required: true
    },

});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie; 
