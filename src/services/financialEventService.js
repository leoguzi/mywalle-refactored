import * as financialEventRepository from "../repositories/financialEventRepository.js";

function checkData({ type, value }) {
  if (!["INCOME", "OUTCOME"].includes(type) || value < 0) {
    return false;
  }
  return true;
}

async function registerFinancialEvent({ value, type, user }) {
  financialEventRepository.insertFinancialEvent({
    value,
    type,
    user,
  });
}

async function getAllFinancialEvents({ user }) {
  const events = await financialEventRepository.fetchAllFinancialEvents({
    user,
  });
  return events;
}

async function sumAllFinantialEvents({ user }) {
  const events = await getAllFinancialEvents({ user });
  const sum = events.rows.reduce(
    (total, event) =>
      event.type === "INCOME" ? total + event.value : total - event.value,
    0
  );
  return sum;
}

export {
  checkData,
  sumAllFinantialEvents,
  registerFinancialEvent,
  getAllFinancialEvents,
};
