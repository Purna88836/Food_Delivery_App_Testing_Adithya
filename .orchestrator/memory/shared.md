# Shared Memory

All agents can read this file. Store repo-wide learnings here.

## Shared Learnings
- [2026-08-02] PR #3 was reviewed twice: round 1 found 3 issues (cross-restaurant check, malformed items guard, JSON parse error 500) + test coverage gaps; backend fixed all of them in a follow-up push before round 2. Round 2 (this session) confirmed all fixes and found no new issues — human approval requested to run `cd backend && npm install && npm test` before merge (sandbox still can't execute npm).
- [2026-08-02] This sandbox blocks bash filesystem writes for reviewer/backend agents alike (confirmed again on 2026-08-02) — `npm install`/`npm test` cannot be executed locally. Reviews of Node.js PRs must rely on careful manual code trace instead; flag for human/CI test execution before merge.
- [2026-08-02] This sandbox blocks bash filesystem writes entirely (mkdir/touch outside MCP tools return "Permission denied") — only reads work. Cannot clone repo or run npm/tests locally; rely on careful manual review and let CI/human verify test execution.
