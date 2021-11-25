import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";

async function checkRegistrationData({ name, email, password }) {
  if (!name || !email || !password) {
    return null;
  }

  const existingUserWithGivenEmail =
    await userRepository.checkIfEmailIsAlreadyUsed(email);
  return existingUserWithGivenEmail;
}

async function createUser({ name, email, password }) {
  const hashedPassword = bcrypt.hashSync(password, 12);

  userRepository.createUser({ name, email, hashedPassword });
}

async function authenticate({ email, password }) {
  const user = await userRepository.findUserByEmail({ email });

  if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
    return null;
  }

  return user;
}

export { checkRegistrationData, createUser, authenticate };
