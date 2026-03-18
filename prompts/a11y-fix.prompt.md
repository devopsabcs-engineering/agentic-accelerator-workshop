---
description: "Fix accessibility issues in a target component or from a scan report"
agent: A11yResolver
argument-hint: "[component=...] [report=...]"
---

# Accessibility Fix

## Inputs

* ${input:component}: (Optional) Component file path to fix accessibility violations in.
* ${input:report}: (Optional) Path to an accessibility scan report or SARIF file to use as the source of violations.

## Requirements

1. Fix all accessibility violations found in the specified component or report.
2. Prioritize fixes by severity: critical → serious → moderate → minor.
3. Apply standard WCAG 2.2 remediation patterns from the remediation lookup table.
4. Use React/Next.js accessible patterns (`useId()`, `<Image alt>`, `layout.tsx` lang) when applicable.
5. Produce PR-ready unified diffs for all changes.
6. Offer re-scan verification via the A11y Detector after fixes are applied.
