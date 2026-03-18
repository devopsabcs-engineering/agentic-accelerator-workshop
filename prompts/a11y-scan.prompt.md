---
description: "Quick accessibility scan of a target URL or component for WCAG 2.2 Level AA compliance"
agent: A11yDetector
argument-hint: "[url=...] [component=...]"
---

# Accessibility Scan

## Inputs

* ${input:url}: (Optional) Target URL to scan for accessibility violations.
* ${input:component}: (Optional) Component file path to analyze via static code review.

## Requirements

1. Scan the provided URL or component for WCAG 2.2 Level AA violations.
2. Use the three-engine architecture (axe-core, IBM Equal Access, custom Playwright checks) for runtime scans.
3. Produce a report organized by POUR principles (Perceivable, Operable, Understandable, Robust).
4. Include weighted scoring and compliance threshold evaluation.
5. Generate SARIF output when the target is a deployed URL.
