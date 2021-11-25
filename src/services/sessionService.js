import jwt from "jsonwebtoken";

function createSession(user) {
  const token = jwt.sign(
    {
      id: user.rows[0].id,
    },
    process.env.JWT_SECRET
  );
  return token;
}
export { createSession };
