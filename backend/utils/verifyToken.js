import { OAuth2Client } from "google-auth-library";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();


const verifyToken = asyncHandler(async (token) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error("Google login failed. Invalid payload.");
  }
  const user ={
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    image_url: payload.picture,
  }

  console.log(user);

  return user;
});

export default verifyToken;