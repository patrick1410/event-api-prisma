import express from "express";
import eventsRouter from "./routes/eventsRoute.js";
import usersRouter from "./routes/usersRoute.js";
import categoryRouter from "./routes/categoriesRoute.js";
import loginRouter from "./routes/loginRoute.js";
import { log } from "./middleware/logMiddleware.js";
import "dotenv/config";
import { errorHandler } from "./middleware/errorHandler.js";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

app.use(express.json());

app.use(log); // Always declare before the routes!

app.use("/events", eventsRouter);
app.use("/users", usersRouter);
app.use("/categories", categoryRouter);
app.use("/login", loginRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
