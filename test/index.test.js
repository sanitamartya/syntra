const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const {
  createApplication,
  startApplication,
  stopApplication,
} = require("../index");

test("GET / returns Syntra running response", async () => {
  const app = createApplication();

  const response = await request(app).get("/").expect(200);

  assert.strictEqual(response.text, "Syntra is running");
});

test("stopApplication closes the server", async () => {
  const server = startApplication();

  await stopApplication(server);

  assert.strictEqual(server.listening, false);
});
