import asyncHandler from "express-async-handler";
import  verifyToken  from "../utils/verifyToken.js";
import generateToken from "../utils/generateToken.js";

const googleLogin = asyncHandler(async (req, res) => {
  const token = req.body.token;
  console.log("Google token:", token);
  if (!token) {
    res.status(400);
    throw new Error("Invalid token. Google token not found.");
  }

  const user = await verifyToken(token);

  const response = {
    message: "Google login successful",
    user: user,
    token: generateToken(user),
  };

  res.json(response);
});



export { googleLogin }



;