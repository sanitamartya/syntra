const express = require("express");

function createApplication() {
  const app = express();

  app.get("/", (request, response) => {
    response.status(200).send("Syntra is running");
  });

  return app;
}

function startApplication() {
  const app = createApplication();

  app.listen(3000, () => {
    console.log("Syntra is running on port 3000");
  });
}

if (require.main === module) {
  startApplication();
}

module.exports = {
  createApplication,
  startApplication,
};
