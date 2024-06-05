require('dotenv').config();
const express = require('express');
const connectDb = require('./config/connectDb');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'localhost';

app.use(express.json());

app.use('/', authRoutes); 
app.use('/movies', movieRoutes); 
app.use('/reviews', reviewRoutes); 

const startServer = async () => {
    try {
        await connectDb();

            app.listen(PORT, () => {
                console.log(`Server running on http://${URL}:${PORT}`);
                console.log('Application initialized successfully.');
            });

    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1);
    }
};

startServer();


