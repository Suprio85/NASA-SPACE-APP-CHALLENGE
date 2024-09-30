import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const generateToken = (user) => {
 console.log(jwt , process.env.JWT_SECRET);

  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

export default generateToken;