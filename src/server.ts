import app from "./app";
import config from "./config/env";
import { initDB } from "./db";

const main = () => {
  initDB();
  app.listen(config.port, () => {
    console.log(`This server is running port: ${config.port}`);
  });
};

main();
