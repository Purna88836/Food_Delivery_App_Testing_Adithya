# Food Delivery Backend

Minimal Express.js REST API scaffold for a food-delivery application (Uber Eats-like),
covering the core domain: **Users**, **Restaurants**, **MenuItems**, and **Orders**.

This first scaffold uses an in-memory data store so the API shape and models can be
reviewed quickly. A real database (e.g. Postgres) can replace `src/data/store.js`
without changing the route/controller layer.

## Getting started

```bash
cd backend
npm install
npm start
```

The server listens on `PORT` (default `3000`).

## Project structure

```
backend/
  src/
    index.js            # app entry point / server bootstrap
    app.js               # express app + route wiring
    models/              # domain models (User, Restaurant, MenuItem, Order)
    data/store.js         # in-memory data store + seed data
    routes/               # route handlers per resource
  test/
    api.test.js           # basic smoke tests using node:test + node:http
```

## API endpoints (v1)

| Method | Path                              | Description                        |
|--------|-----------------------------------|------------------------------------|
| GET    | `/health`                         | Health check                       |
| GET    | `/api/restaurants`                | List restaurants                   |
| GET    | `/api/restaurants/:id`            | Get a single restaurant            |
| GET    | `/api/restaurants/:id/menu-items` | List menu items for a restaurant   |
| GET    | `/api/menu-items/:id`             | Get a single menu item             |
| POST   | `/api/orders`                     | Create an order                    |
| GET    | `/api/orders/:id`                 | Get a single order                 |
| GET    | `/api/orders`                     | List orders (optional `?userId=`)  |

### Create order request body

```json
{
  "userId": "u1",
  "restaurantId": "r1",
  "items": [{ "menuItemId": "m1", "quantity": 2 }]
}
```

## Domain models

- **User** — id, name, email
- **Restaurant** — id, name, cuisine, address
- **MenuItem** — id, restaurantId, name, price, description
- **Order** — id, userId, restaurantId, items[], status, totalPrice, createdAt

## Next steps

- Swap the in-memory store for a real database.
- Add authentication (currently no auth layer).
- Add order status transitions (e.g. placed → preparing → delivered).
- Add pagination/filtering to list endpoints.
