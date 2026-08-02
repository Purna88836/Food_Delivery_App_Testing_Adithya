# Reviewer Agent Memory

## Architectural
- [2026-08-02] Repo Purna88836/Food_Delivery_App_Testing_Adithya PR #3: as of commit 8898be5, orders.js computeTotal(items, restaurantId) DOES cross-check menuItem.restaurantId against the order's restaurantId, and guards non-object/array items before destructuring — earlier memory noting the missing cross-check is now stale/outdated, the bug was fixed by backend agent.
- [2026-08-02] PR #3 backend scaffold: orders.js computeTotal() only checks global menuItems map, no cross-check against order's restaurantId — a recurring pattern to check for in future order-related PRs on this repo.
- [2026-08-02] Repo Purna88836/Food_Delivery_App_Testing_Adithya: backend scaffold under backend/ — Express app factory (src/app.js), in-memory Map store (src/data/store.js), routes/ per resource, models/index.js factory functions, node:test smoke tests in test/api.test.js.

## Mistakes
- [2026-08-02] Earlier reviewer memory said app.js error handler always returns 500 for JSON parse errors — that was fixed in commit 8898be5 (now special-cases entity.parse.failed/SyntaxError → 400). Don't re-flag already-fixed issues without checking the latest ref first; always re-read current file content on the PR's head ref before repeating prior findings.
- [2026-08-02] PR #3: app.js generic error handler converts all errors (including express.json() body-parse SyntaxErrors) to 500; should special-case parse errors as 400. Watch for this pattern in future Express scaffolds in this repo.
