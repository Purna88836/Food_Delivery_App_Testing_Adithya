/**
 * Domain models for the food delivery app.
 * Plain factory functions are used (no ORM yet) so the shapes stay easy to
 * swap out for real database records later.
 */

/** @typedef {{ id: string, name: string, email: string }} User */
function createUser({ id, name, email }) {
  return { id, name, email };
}

/** @typedef {{ id: string, name: string, cuisine: string, address: string }} Restaurant */
function createRestaurant({ id, name, cuisine, address }) {
  return { id, name, cuisine, address };
}

/**
 * @typedef {{ id: string, restaurantId: string, name: string, price: number, description: string }} MenuItem
 */
function createMenuItem({ id, restaurantId, name, price, description }) {
  return { id, restaurantId, name, price, description };
}

const ORDER_STATUS = Object.freeze({
  PLACED: "placed",
  PREPARING: "preparing",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
});

/**
 * @typedef {{ menuItemId: string, quantity: number }} OrderItem
 * @typedef {{
 *   id: string,
 *   userId: string,
 *   restaurantId: string,
 *   items: OrderItem[],
 *   status: string,
 *   totalPrice: number,
 *   createdAt: string
 * }} Order
 */
function createOrder({ id, userId, restaurantId, items, totalPrice }) {
  return {
    id,
    userId,
    restaurantId,
    items,
    status: ORDER_STATUS.PLACED,
    totalPrice,
    createdAt: new Date().toISOString(),
  };
}

module.exports = {
  createUser,
  createRestaurant,
  createMenuItem,
  createOrder,
  ORDER_STATUS,
};
