const express = require("express");
const store = require("../data/store");

const router = express.Router();

// GET /api/menu-items/:id
router.get("/:id", (req, res) => {
  const menuItem = store.menuItems.get(req.params.id);
  if (!menuItem) {
    return res.status(404).json({ error: "Menu item not found" });
  }
  res.json(menuItem);
});

module.exports = router;
