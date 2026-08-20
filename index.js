const express = require("express");
const routes = require("./src/routes");

function createApplication() {
  const app = express();
  app.use(express.json());
  app.use(routes);

  return app;
}

function startApplication() {
  const app = createApplication();
  const port = process.env.PORT || 3000;

  const server = app.listen(port, () => {
    console.log(`Syntra is running on port ${port}`);
  });

  return server;
}

function stopApplication(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

function setupShutdownHandlers(server) {
  process.once("SIGTERM", async () => {
    await stopApplication(server);
    console.log("Syntra stopped");
  });
}

if (require.main === module) {
  const server = startApplication();
  setupShutdownHandlers(server);
}

module.exports = {
  createApplication,
  startApplication,
  stopApplication,
  setupShutdownHandlers,
};
