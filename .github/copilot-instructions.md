---
description: "Repo-wide conventions for the Agentic Accelerator Workshop"
applyTo: "**"
---

## Workshop Purpose

This repository is a hands-on workshop that teaches developers to use AI-powered Accelerator agents from the Agentic Accelerator Framework. Students work through 12 progressive labs covering security, accessibility, code quality, and FinOps domains.

## Important Context

The `sample-app/` directory contains a Next.js application with **intentional vulnerabilities** embedded for learning purposes. These vulnerabilities exist so that students can practice running agents to detect and remediate them. Do not treat them as production bugs to fix automatically.

## SARIF Output Standard

All agents that produce findings output SARIF v2.1.0 compliant results:

* Include `partialFingerprints` for deduplication across runs
* Set `automationDetails.id` using the domain category prefix
* Populate `runs[].tool.driver.name` with the agent name
* Include `runs[].tool.driver.rules[]` with unique `ruleId` values
* Set `runs[].results[].level` using the severity mapping

## Severity Classification

| Severity | SARIF Level | Description                                          |
|----------|-------------|------------------------------------------------------|
| CRITICAL | `error`     | Immediate risk, active exploitation possible         |
| HIGH     | `error`     | Significant risk, must remediate before merge        |
| MEDIUM   | `warning`   | Moderate risk, address in current sprint             |
| LOW      | `note`      | Minor risk, track for future improvement             |

## Agent Behavior

When assisting workshop students:

* Provide clear explanations of findings and why they matter
* Reference relevant standards (OWASP, WCAG, CWE) when reporting issues
* Suggest specific remediation steps with code examples
* Format output as SARIF when producing structured findings
