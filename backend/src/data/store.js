/**
 * In-memory data store with seed data. This is intentionally simple so it
 * can be swapped for a real database later without touching the routes'
 * public behavior (see README "Next steps").
 */
const { createUser, createRestaurant, createMenuItem, createOrder } = require("../models");

const users = new Map();
const restaurants = new Map();
const menuItems = new Map();
const orders = new Map();

function seed() {
  const u1 = createUser({ id: "u1", name: "Ada Lovelace", email: "ada@example.com" });
  users.set(u1.id, u1);

  const r1 = createRestaurant({
    id: "r1",
    name: "Pasta Palace",
    cuisine: "Italian",
    address: "123 Main St",
  });
  const r2 = createRestaurant({
    id: "r2",
    name: "Sushi Central",
    cuisine: "Japanese",
    address: "456 Market St",
  });
  restaurants.set(r1.id, r1);
  restaurants.set(r2.id, r2);

  const m1 = createMenuItem({
    id: "m1",
    restaurantId: r1.id,
    name: "Spaghetti Carbonara",
    price: 12.5,
    description: "Classic Roman pasta with egg, pecorino, and guanciale.",
  });
  const m2 = createMenuItem({
    id: "m2",
    restaurantId: r1.id,
    name: "Margherita Pizza",
    price: 10.0,
    description: "Tomato, mozzarella, and basil.",
  });
  const m3 = createMenuItem({
    id: "m3",
    restaurantId: r2.id,
    name: "California Roll",
    price: 8.0,
    description: "Crab, avocado, and cucumber.",
  });
  menuItems.set(m1.id, m1);
  menuItems.set(m2.id, m2);
  menuItems.set(m3.id, m3);
}

seed();

let nextOrderId = 1;
function nextId() {
  return `o${nextOrderId++}`;
}

module.exports = {
  users,
  restaurants,
  menuItems,
  orders,
  createOrderRecord: createOrder,
  nextId,
};
