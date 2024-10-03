import Blogpost from '../models/blogpostSchema.js';

// Controller to handle saving a blog post
 const createBlogpost = async (req, res) => {
  try {
    // Destructure the title and blocks from the request body
    const { title, blocks } = req.body;

    // The author ID is already available in req.user from the protect middleware
    const author = req.user._id;

    // Validate that blocks are provided and not empty
    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
      return res.status(400).json({ message: "Blocks data is required and should not be empty." });
    }

    // Create a new blog post instance
    const newBlogpost = new Blogpost({
      title,
      author,
      blocks, // Directly map to the structure sent by Editor.js
    });

    // Save the blog post to the database
    await newBlogpost.save();

    // Return success response
    return res.status(201).json({
      message: "Blogpost created successfully",
      blogpost: newBlogpost,
    });
  } catch (error) {
    // Handle any errors
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { createBlogpost };