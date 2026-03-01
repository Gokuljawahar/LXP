# Contribution Guidelines

## Front-end component size guardrails

To keep files maintainable, please keep React component files small and composable:

- **Soft threshold:** target roughly **250-300 lines per component file**.
- If a component grows beyond this range, split it into:
  - a page/container component for orchestration,
  - presentational subcomponents,
  - custom hooks for state/validation,
  - shared utilities for repeated concerns (for example notifications).
- Prefer colocated `partials/` and `hooks/` folders near the feature to keep ownership clear.
