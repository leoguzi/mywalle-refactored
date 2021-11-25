import connection from "../database.js";

async function checkIfEmailIsAlreadyUsed(email) {
  const exitentEmail = await connection.query(
    `SELECT * FROM "users" WHERE "email"=$1`,
    [email]
  );
  return exitentEmail;
}

async function createUser({ name, email, hashedPassword }) {
  await connection.query(
    `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
    [name, email, hashedPassword]
  );
}

async function findUserByEmail({ email }) {
  const user = await connection.query(
    `SELECT * FROM "users" WHERE "email"=$1`,
    [email]
  );
  return user;
}
export { checkIfEmailIsAlreadyUsed, createUser, findUserByEmail };
