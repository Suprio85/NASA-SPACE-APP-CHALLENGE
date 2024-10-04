import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/database.js';

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






