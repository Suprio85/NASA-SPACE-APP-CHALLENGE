import bcrypt from "bcryptjs/dist/bcrypt.js";

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export default generatePassword;