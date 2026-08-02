---
name: testing-strategy
description: Use when adding or changing behavior that needs verification.
audience:
  - coordinator
  - backend
  - frontend
  - reviewer
  - qa
triggers:
  - implementation
  - review
  - testing
---

# testing-strategy

Cover the behavior closest to the change first. Add regression tests for bugs, broaden checks for shared contracts, and document any checks that cannot run.
