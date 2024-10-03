import express from 'express';
import { createBlogpost } from '../controllers/blog.controller.js'; // Import the controller
import protect from '../middlewares/auth.js'; // Import the auth middleware

const router = express.Router();

// Route to create a new blog post (protected)
router.post('/create', protect, createBlogpost);

export default router;
