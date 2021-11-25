import * as financialEventService from "../services/financialEventService.js";

async function registerFinancialEvent(req, res) {
  let user = req.user;
  const { value, type } = req.body;

  if (!value || !type) {
    return res.sendStatus(400);
  }

  const dataCheck = financialEventService.checkData({ value, type });
  if (!dataCheck) {
    return res.sendStatus(400);
  }

  try {
    await financialEventService.registerFinancialEvent({
      value,
      type,
      user: user.id,
    });

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function fetchFinancialEvents(req, res) {
  let user = req.user;

  try {
    const events = await financialEventService.getAllFinancialEvents({
      user: user.id,
    });
    res.send(events.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function fetchFinancialEventsSum(req, res) {
  let user = req.user;
  try {
    const sum = await financialEventService.sumAllFinantialEvents({
      user: user.id,
    });

    res.send({ sum });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export {
  registerFinancialEvent,
  fetchFinancialEvents,
  fetchFinancialEventsSum,
};
