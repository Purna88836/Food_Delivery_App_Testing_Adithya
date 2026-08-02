const express = require("express");
const store = require("../data/store");

const router = express.Router();

// GET /api/restaurants
router.get("/", (req, res) => {
  res.json(Array.from(store.restaurants.values()));
});

// GET /api/restaurants/:id
router.get("/:id", (req, res) => {
  const restaurant = store.restaurants.get(req.params.id);
  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }
  res.json(restaurant);
});

// GET /api/restaurants/:id/menu-items
router.get("/:id/menu-items", (req, res) => {
  const restaurant = store.restaurants.get(req.params.id);
  if (!restaurant) {
    return res.status(404).json({ error: "Restaurant not found" });
  }
  const items = Array.from(store.menuItems.values()).filter(
    (item) => item.restaurantId === req.params.id
  );
  res.json(items);
});

module.exports = router;
