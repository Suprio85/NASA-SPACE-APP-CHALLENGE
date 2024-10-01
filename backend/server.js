import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import app from './app.js';

dotenv.config();

connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });

    app.on('error', (error) => {
        console.log(`Error in starting server: ${error.message}`);
    });

}).catch((error) => {
    console.log(`Error in connecting to database: ${error.message}`);
});


