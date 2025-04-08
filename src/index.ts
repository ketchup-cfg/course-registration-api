import app from "./app";
import config from "./config";
import db from "./data/db";

db.init()
  .then(() => {
    app.listen(config.PORT, () =>
      console.log(`Listening on port ${config.PORT}`)
    );
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const gracefulShutdown = () => {
  db.teardown()
    .catch(() => {})
    .then(() => process.exit());
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
process.on("SIGUSR2", gracefulShutdown); // Sent by nodemon
