import connection from "../database.js";

async function insertFinancialEvent({ value, type, user }) {
  await connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [user, value, type]
  );
}

async function fetchAllFinancialEvents({ user }) {
  const events = await connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [user]
  );
  return events;
}

export { insertFinancialEvent, fetchAllFinancialEvents };
