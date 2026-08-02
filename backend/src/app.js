const express = require("express");
const restaurantsRouter = require("./routes/restaurants");
const menuItemsRouter = require("./routes/menuItems");
const ordersRouter = require("./routes/orders");

function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/api/restaurants", restaurantsRouter);
  app.use("/api/menu-items", menuItemsRouter);
  app.use("/api/orders", ordersRouter);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  // Error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });

  return app;
}

module.exports = createApp;
