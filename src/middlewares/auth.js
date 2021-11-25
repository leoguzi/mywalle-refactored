import jwt from "jsonwebtoken";
async function userAuthentication(req, res, next) {
  const authorization = req.headers.authorization || "";
  const token = authorization.split("Bearer ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  let user;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch {
    return res.sendStatus(401);
  }
}

export default userAuthentication;
