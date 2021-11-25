import express from "express";
import cors from "cors";
import userAuthentication from "./middlewares/auth.js";
import * as userController from "./controllers/userController.js";
import * as finacialEventsController from "./controllers/financialEventsController.js";

const app = express();
app.use(cors());
app.use(express.json());

// CONTROL OF ACESS
app.post("/sign-up", userController.registerUser);
app.post("/sign-in", userController.loginUser);

app.post(
  "/financial-events",
  userAuthentication,
  finacialEventsController.registerFinancialEvent
);

app.get(
  "/financial-events",
  userAuthentication,
  finacialEventsController.fetchFinancialEvents
);

app.get(
  "/financial-events/sum",
  userAuthentication,
  finacialEventsController.fetchFinancialEventsSum
);

export default app;
