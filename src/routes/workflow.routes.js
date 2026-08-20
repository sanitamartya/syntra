const express = require("express");
const { randomUUID } = require("node:crypto");

const router = express.Router();

router.get("/", (request, response) => {
  response.status(200).json({
    workflows: [],
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

  response.status(201).json(workflow);
});

module.exports = router;
