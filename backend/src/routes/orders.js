const express = require("express");
const store = require("../data/store");

const router = express.Router();

function computeTotal(items) {
  let total = 0;
  for (const { menuItemId, quantity } of items) {
    const menuItem = store.menuItems.get(menuItemId);
    if (!menuItem) {
      return { error: `Menu item ${menuItemId} not found` };
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return { error: `Invalid quantity for menu item ${menuItemId}` };
    }
    total += menuItem.price * quantity;
  }
  return { total: Math.round(total * 100) / 100 };
}

// POST /api/orders
router.post("/", (req, res) => {
  const { userId, restaurantId, items } = req.body || {};

  if (!userId || !store.users.has(userId)) {
    return res.status(400).json({ error: "Valid userId is required" });
  }
  if (!restaurantId || !store.restaurants.has(restaurantId)) {
    return res.status(400).json({ error: "Valid restaurantId is required" });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "items must be a non-empty array" });
  }

  const { total, error } = computeTotal(items);
  if (error) {
    return res.status(400).json({ error });
  }

  const order = store.createOrderRecord({
    id: store.nextId(),
    userId,
    restaurantId,
    items,
    totalPrice: total,
  });
  store.orders.set(order.id, order);

  res.status(201).json(order);
});

// GET /api/orders/:id
router.get("/:id", (req, res) => {
  const order = store.orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
});

// GET /api/orders?userId=
router.get("/", (req, res) => {
  let results = Array.from(store.orders.values());
  if (req.query.userId) {
    results = results.filter((order) => order.userId === req.query.userId);
  }
  res.json(results);
});

module.exports = router;
