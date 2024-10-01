import asyncHandler from "express-async-handler";
import  verifyToken  from "../utils/verifyToken.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import generatePassword from "../utils/generatePassword.js";


const googleLogin = asyncHandler(async (req, res) => {
  const token = req.body.token;
  console.log("Google token:", token);
  if (!token) {
    res.status(400);
    throw new Error("Invalid token. Google token not found.");
  }

  const user = await verifyToken(token);

  const existingUser = await User.findOne({ email: user.email });
    if (!existingUser){
        const newUser = new User({
            name: user.name,
            email: user.email,
            image_url: user.image_url,
        });
        await newUser.save();
    } 

  const response = {
    message: "Google login successful",
    user: user,
    token: generateToken(user),
  };

  res.json(response);
});


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error("password is incorrect");
    }

    const response = {
        message: "Login successful",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            image_url: user.image_url,
        },
        token: generateToken(user),
    };

    res.json(response);
});

const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(400);
        throw new Error("User already exists.");
    }

    const hashedPassword = await generatePassword(password);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    const response = {
        message: "Registration successful",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            image_url: newUser.image_url,
        },
        token: generateToken(newUser),
    };

    res.json(response);
});


const getUserProfile = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }

    res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        image_url: user.image_url,
    });
});

const authtest = asyncHandler(async (req, res) => {
    res.json({
        message: "You are authorized",
    });
});





export { googleLogin,login,register,getUserProfile,authtest }



;