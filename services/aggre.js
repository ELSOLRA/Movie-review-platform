/* const Review = require('../models/Review');

const getAverageRatings = async () => {
    try {
        const ratings = await Review.aggregate([
            {
                $group: {
                    _id: "$movieId",
                    averageRating: { $avg: "$rating" }
                }
            },
            {
                $lookup: {
                    from: "movies",
                    localField: "_id",
                    foreignField: "_id",
                    as: "movie"
                }
            },
            {
                $unwind: "$movie"
            },
            {
                $project: {
                    _id: 0,
                    movieId: "$movie._id",
                    title: "$movie.title",
                    averageRating: 1
                }
            }
        ]);
        return ratings;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAverageRatings
};
 */

 /*     const movieIdString = movieId.toString();
        const movieObjectId = new mongoose.Types.ObjectId(movieIdString);
     
        try {
            const movieReviews = await Review.aggregate([
                {
                  $match: { movieId: movieObjectId }
                },
                {
                  $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                  }
                },
                {
                  $unwind: '$user'
                },
                {
                  $project: {
                    _id: 1,
                    review: 1,
                    rating: 1,
                    user: {
                      _id: '$user._id',
                      username: '$user.username'
                    }
                  }
                }
              ]); */