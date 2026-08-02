# Reviewer Agent Memory

## Architectural
- [2026-08-02] PR #3 backend scaffold: orders.js computeTotal() only checks global menuItems map, no cross-check against order's restaurantId — a recurring pattern to check for in future order-related PRs on this repo.
- [2026-08-02] Repo Purna88836/Food_Delivery_App_Testing_Adithya: backend scaffold under backend/ — Express app factory (src/app.js), in-memory Map store (src/data/store.js), routes/ per resource, models/index.js factory functions, node:test smoke tests in test/api.test.js.

## Mistakes
- [2026-08-02] PR #3: app.js generic error handler converts all errors (including express.json() body-parse SyntaxErrors) to 500; should special-case parse errors as 400. Watch for this pattern in future Express scaffolds in this repo.
