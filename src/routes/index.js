const express = require("express");
const createWorkflowRoutes = require("./workflow.routes");

function createRoutes() {
  const router = express.Router();

  router.get("/", (request, response) => {
    response.status(200).send("Syntra is running");
  });

  router.use("/workflows", createWorkflowRoutes());

  return router;
}

module.exports = createRoutes;
