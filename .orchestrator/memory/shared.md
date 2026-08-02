# Shared Memory

All agents can read this file. Store repo-wide learnings here.

## Shared Learnings
- [2026-08-02] This sandbox blocks bash filesystem writes entirely (mkdir/touch outside MCP tools return "Permission denied") — only reads work. Cannot clone repo or run npm/tests locally; rely on careful manual review and let CI/human verify test execution.
