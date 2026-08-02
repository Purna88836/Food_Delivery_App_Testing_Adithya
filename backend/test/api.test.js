const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const createApp = require("../src/app");

function withServer(fn) {
  const server = http.createServer(createApp());
  return new Promise((resolve, reject) => {
    server.listen(0, async () => {
      const { port } = server.address();
      try {
        await fn(`http://127.0.0.1:${port}`);
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        server.close();
      }
    });
  });
}

async function getJson(url) {
  const res = await fetch(url);
  return { status: res.status, body: await res.json() };
}

test("GET /health returns ok", async () => {
  await withServer(async (base) => {
    const { status, body } = await getJson(`${base}/health`);
    assert.equal(status, 200);
    assert.equal(body.status, "ok");
  });
});

test("GET /api/restaurants returns seeded restaurants", async () => {
  await withServer(async (base) => {
    const { status, body } = await getJson(`${base}/api/restaurants`);
    assert.equal(status, 200);
    assert.ok(Array.isArray(body));
    assert.ok(body.length >= 2);
  });
});

test("GET /api/restaurants/:id/menu-items returns items for that restaurant", async () => {
  await withServer(async (base) => {
    const { status, body } = await getJson(`${base}/api/restaurants/r1/menu-items`);
    assert.equal(status, 200);
    assert.ok(body.every((item) => item.restaurantId === "r1"));
  });
});

test("GET /api/restaurants/:id returns 404 for unknown restaurant", async () => {
  await withServer(async (base) => {
    const { status } = await getJson(`${base}/api/restaurants/does-not-exist`);
    assert.equal(status, 404);
  });
});

test("POST /api/orders creates an order and computes total", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "u1",
        restaurantId: "r1",
        items: [{ menuItemId: "m1", quantity: 2 }],
      }),
    });
    const body = await res.json();
    assert.equal(res.status, 201);
    assert.equal(body.status, "placed");
    assert.equal(body.totalPrice, 25);

    const getRes = await getJson(`${base}/api/orders/${body.id}`);
    assert.equal(getRes.status, 200);
    assert.equal(getRes.body.id, body.id);
  });
});

test("POST /api/orders rejects unknown menu item", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "u1",
        restaurantId: "r1",
        items: [{ menuItemId: "does-not-exist", quantity: 1 }],
      }),
    });
    assert.equal(res.status, 400);
  });
});
