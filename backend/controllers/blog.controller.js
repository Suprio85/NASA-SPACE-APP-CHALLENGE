import Blogpost from '../models/blogpostSchema.js';

const createBlogpost = async (req, res) => {
  try {
    const { title, blocks, thumbnail } = req.body;
    const author = req.user._id;

    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
      return res.status(400).json({ message: "Blocks data is required and should not be empty." });
    }

    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ message: "Title is required and should be a valid string." });
    }
    
    if (thumbnail && !isValidUrl(thumbnail)) {
      return res.status(400).json({ message: "Thumbnail should be a valid URL." });
    }

    const newBlogpost = new Blogpost({
      title,
      author,
      blocks,
      thumbnail
    });

    const savedBlogpost = await newBlogpost.save(); // Save the blog post to the database

    // Populate author directly without execPopulate
    await savedBlogpost.populate('author'); // Populate author

    return res.status(201).json({
      message: "Blogpost created successfully",
      blogpost: savedBlogpost,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
}

export { createBlogpost };
