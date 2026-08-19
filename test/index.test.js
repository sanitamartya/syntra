const test = require("node:test");
const assert = require("node:assert");

const { startApplication } = require("../index");

test("startApplication is available", () => {
  assert.strictEqual(typeof startApplication, "function");
});
