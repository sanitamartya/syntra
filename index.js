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
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Syntra is running on port ${port}`);
  });
}

if (require.main === module) {
  startApplication();
}

module.exports = {
  createApplication,
  startApplication,
};
