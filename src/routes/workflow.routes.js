const express = require("express");
const { randomUUID } = require("node:crypto");

function createWorkflowRoutes() {
  const router = express.Router();
  const workflows = new Map();

  router.get("/", (request, response) => {
    response.status(200).json({
      workflows: Array.from(workflows.values()),
    });
  });

  router.post("/", (request, response) => {
    const { name } = request.body;

    if (typeof name !== "string" || name.trim() === "") {
      response.status(400).json({
        error: "Workflow name is required",
      });
      return;
    }

    const workflow = {
      id: randomUUID(),
      name: name.trim(),
    };

    workflows.set(workflow.id, workflow);

    response.status(201).json(workflow);
  });

  router.get("/:workflowId", (request, response) => {
    const workflow = workflows.get(request.params.workflowId);

    if (!workflow) {
      response.status(404).json({
        error: "Workflow not found",
      });
      return;
    }

    response.status(200).json(workflow);
  });

  return router;
}

module.exports = createWorkflowRoutes;
