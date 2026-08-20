const express = require("express");
const workflowRoutes = require("./workflow.routes");

const router = express.Router();

router.get("/", (request, response) => {
  response.status(200).send("Syntra is running");
});

router.use("/workflows", workflowRoutes);

module.exports = router;
