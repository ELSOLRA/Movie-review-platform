require('dotenv').config();
const mongoose = require('mongoose');

const connectDb = async () => {
    try {
// event listener for successful connection
        mongoose.connection.once('open', () => {
            console.log('MongoDB connection established successfully.');
        });
// event listener for connection error
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
// connecting to the MongoDB database 
        const dbConnection = await mongoose.connect(process.env.DATABASE_URI);
// name of the connected database
        const dbName = dbConnection.connection.db.databaseName;
        console.log(`Connected to: ${dbName}`);

    } catch (error) {
        if (error.name === 'MongooseServerSelectionError') {
            console.error('Failed to connect: Could not connect to any servers in MongoDB : ', error.message);
        } else {
            console.error('Failed to connect: ', error.message);
        }
        process.exit(1);
    }
};

module.exports = connectDb;