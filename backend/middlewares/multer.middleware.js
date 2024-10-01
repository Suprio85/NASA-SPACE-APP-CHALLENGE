import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

// Get the current file's directory equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up relative path for the destination directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = path.join(__dirname, "../public/temp");
    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({ 
  storage, 
});
