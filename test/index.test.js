const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const { createApplication } = require("../index");

test("GET / returns Syntra running response", async () => {
  const app = createApplication();

  const response = await request(app).get("/").expect(200);

  assert.strictEqual(response.text, "Syntra is running");
});
