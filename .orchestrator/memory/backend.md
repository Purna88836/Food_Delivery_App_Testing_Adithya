# Backend Agent Memory

## Architectural
- [2026-08-02] Backend scaffold lives in backend/ (Node.js/Express, no build step). src/models/index.js holds domain factories (User, Restaurant, MenuItem, Order); src/data/store.js is an in-memory Map-based store with seed data (swap this out first when adding a real DB); src/routes/*.js are per-resource Express routers wired in src/app.js; src/index.js boots the server. Tests use node:test + global fetch in backend/test/.

## Mistakes
- [2026-08-02] write_file_on_branch occasionally returns 409 Conflict when multiple files are written in the same parallel tool-call batch (git ref race). Retry the failed ones individually/sequentially and they succeed.
