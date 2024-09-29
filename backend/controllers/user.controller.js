import { apiResponse } from "../utils/apiResponse.js";
import asyncHandler from "express-async-handler";

const googleLogin = asyncHandler(async (req, res) => {
  const token = req.body.token;
  console.log("Google token:", token);
  if (!token) {
    res.status(400);
    throw new Error("Invalid token. Google token not found.");
  }


  const response = await apiResponse(token);
  res.json(response);
});



export { checkroute };