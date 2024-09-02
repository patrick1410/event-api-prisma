import * as Sentry from "@sentry/node";
import express from "express";
import cors from "cors";
import eventsRouter from "./routes/eventsRoute.js";
import usersRouter from "./routes/usersRoute.js";
import categoryRouter from "./routes/categoriesRoute.js";
import loginRouter from "./routes/loginRoute.js";
import { log } from "./middleware/logMiddleware.js";
import "dotenv/config";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// SENTRY INIT
Sentry.init({
  dsn: process.env.SENTRY_DSN,

  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],

  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.use(log); // Always declare before the routes!

app.use("/events", eventsRouter);
app.use("/users", usersRouter);
app.use("/categories", categoryRouter);
app.use("/login", loginRouter);

// SENTRY ERROR HANDLER
app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
