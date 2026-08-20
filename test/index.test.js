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

test("GET /workflows returns an empty workflow collection", async () => {
  const app = createApplication();

  const response = await request(app).get("/workflows").expect(200);

  assert.deepStrictEqual(response.body, {
    workflows: [],
  });
});

test("POST /workflows creates a workflow", async () => {
  const app = createApplication();

  const response = await request(app)
    .post("/workflows")
    .send({
      name: "Email Processing",
    })
    .expect(201);

  assert.strictEqual(response.body.name, "Email Processing");
  assert.match(response.body.id, /^[0-9a-f-]{36}$/);
});

test("POST /workflows rejects a missing workflow name", async () => {
  const app = createApplication();

  const response = await request(app).post("/workflows").send({}).expect(400);

  assert.deepStrictEqual(response.body, {
    error: "Workflow name is required",
  });
});
