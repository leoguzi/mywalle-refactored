import * as userService from "../services/userService.js";
import * as sessionService from "../services/sessionService.js";

async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const dataCheck = await userService.checkRegistrationData({
      name,
      email,
      password,
    });

    if (!dataCheck) {
      return res.sendStatus(400);
    }

    if (dataCheck.rowCount > 0) {
      return res.sendStatus(409);
    }

    userService.createUser({ name, email, password });
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await userService.authenticate({ email, password });

    if (!user) {
      return res.sendStatus(401);
    }

    const token = sessionService.createSession(user);

    res.send({ token });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export { registerUser, loginUser };
