require('dotenv').config();
const mongoose = require('mongoose');
console.log(process.env.DATABASE_URI);

const connectDb = async () => {
    try {
        mongoose.connection.once('open', () => {
            console.log('MongoDB connection established successfully.');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
        const dbConnection = await mongoose.connect(process.env.DATABASE_URI);
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