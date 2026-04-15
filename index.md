---
layout: default
title: Home
nav_order: 0
permalink: /
---

> 🇫🇷 **[Version française](fr/)**

<p align="center">
  <img src="assets/branding/logo-128.png" alt="Agentic Accelerator Framework" width="100">
</p>

# Agentic Accelerator Workshop

Welcome to the **Agentic Accelerator Workshop** — a hands-on, progressive workshop that teaches you how to integrate GitHub Copilot custom agents into your Accelerator workflows.

You will configure security scanners, accessibility checkers, code quality analyzers, and FinOps cost gates, all powered by AI agents that produce SARIF-compliant findings visible in the GitHub Security tab.

> [!NOTE]
> This workshop is part of the [Agentic Accelerator Framework](https://github.com/devopsabcs-engineering/agentic-accelerator-framework).

## Who Is This For?

| Audience | What You Will Learn |
|---|---|
| **Developers** | Run AI-powered scans from VS Code using Copilot agents |
| **DevOps Engineers** | Wire agent-driven workflows into GitHub Actions pipelines |
| **Security Engineers** | Understand SARIF output and integrate findings into governance |
| **Platform Engineers** | Extend the framework with custom agents for your organization |

## Prerequisites

Before starting Lab 00, ensure you have the following:

- [Visual Studio Code](https://code.visualstudio.com/) (latest stable)
- [Node.js](https://nodejs.org/) v20 or later
- [Git](https://git-scm.com/) 2.40 or later
- A [GitHub account](https://github.com/) with
  [GitHub Copilot](https://github.com/features/copilot) access
- GitHub Copilot Chat extension installed in VS Code

## Labs

| # | Lab | Duration | Level |
|---|-----|----------|-------|
| 00 | [Prerequisites](labs/lab-00-setup.md) | 30 min | Beginner |
| 01 | [Explore the Sample App](labs/lab-01.md) | 25 min | Beginner |
| 02 | [Agents, Skills, and Instructions](labs/lab-02.md) | 20 min | Beginner |
| 03 | [Security Scanning](labs/lab-03.md) | 40 min | Intermediate |
| 04 | [Accessibility Scanning](labs/lab-04.md) | 35 min | Intermediate |
| 05 | [Code Quality Analysis](labs/lab-05.md) | 35 min | Intermediate |
| 06 | [Understanding SARIF Output](labs/lab-06.md) | 30 min | Intermediate |
| 07 | [GitHub Actions Pipelines](labs/lab-07.md) | 40 min | Intermediate |
| 08 | [GitHub Security Tab](labs/lab-08.md) | 25 min | Intermediate |
| 09 | [FinOps Agents](labs/lab-09.md) | 45 min | Advanced |
| 10 | [Agent Remediation](labs/lab-10.md) | 45 min | Advanced |
| 11 | [Custom Agent Creation](labs/lab-11.md) | 45 min | Advanced |

## Workshop Schedule

### Half-Day (3 hours)

| Time | Activity |
|------|----------|
| 0:00 – 0:30 | Lab 00: Prerequisites |
| 0:30 – 0:55 | Lab 01: Explore the Sample App |
| 0:55 – 1:15 | Lab 02: Agents, Skills, and Instructions |
| 1:15 – 1:55 | Lab 03: Security Scanning |
| 1:55 – 2:10 | Break |
| 2:10 – 2:45 | Lab 04: Accessibility Scanning |
| 2:45 – 3:00 | Lab 05: Code Quality Analysis (start) |

### Full-Day (5.5 hours)

| Time | Activity |
|------|----------|
| 0:00 – 0:30 | Lab 00: Prerequisites |
| 0:30 – 0:55 | Lab 01: Explore the Sample App |
| 0:55 – 1:15 | Lab 02: Agents, Skills, and Instructions |
| 1:15 – 1:55 | Lab 03: Security Scanning |
| 1:55 – 2:30 | Lab 04: Accessibility Scanning |
| 2:30 – 2:45 | Break |
| 2:45 – 3:20 | Lab 05: Code Quality Analysis |
| 3:20 – 3:50 | Lab 06: Understanding SARIF Output |
| 3:50 – 4:30 | Lab 07: GitHub Actions Pipelines |
| 4:30 – 4:45 | Break |
| 4:45 – 5:10 | Lab 08: GitHub Security Tab |

### Extended (7.5 hours)

| Time | Activity |
|------|----------|
| 0:00 – 5:10 | Half-Day + Full-Day labs (as above) |
| 5:10 – 5:25 | Break |
| 5:25 – 6:10 | Lab 09: FinOps Agents |
| 6:10 – 6:55 | Lab 10: Agent Remediation |
| 6:55 – 7:10 | Break |
| 7:10 – 7:55 | Lab 11: Custom Agent Creation |

## Delivery Tiers

Choose the tier that fits your schedule:

| Tier | Labs | Duration | Audience |
|---|---|---|---|
| **Half-Day** | Labs 00 – 05 | ~3 hours | First exposure to agent-driven scanning |
| **Full-Day** | Labs 00 – 08 | ~5.5 hours | End-to-end pipeline integration |
| **Extended** | Labs 00 – 11 | ~7.5 hours | Deep dive including FinOps, remediation, and custom agents |

## Lab Dependency Diagram

![Lab dependency diagram showing progression from Lab 00 through Lab 11](images/lab-dependency-diagram.png)

Labs 03, 04, and 05 can be completed in any order. Lab 09 is optional and does
not block later labs.

## Getting Started

1. **Fork or use this template** to create your own workshop instance.
2. Complete [Lab 00: Prerequisites](labs/lab-00-setup.md) to set up your environment.
3. Work through the labs in order — each lab builds on the previous one.

> **Tip**: This workshop is designed for GitHub Codespaces. Click **Code → Codespaces → New codespace** to get a pre-configured environment with all tools installed.

## Related Repositories

| Repository | Description |
|------------|-------------|
| [Agentic Accelerator Framework](https://github.com/devopsabcs-engineering/agentic-accelerator-framework) | Agent definitions, instructions, skills, and CI/CD workflows |
| [Accessibility Scan Workshop](https://devopsabcs-engineering.github.io/accessibility-scan-workshop/) | WCAG 2.2 accessibility scanning workshop |
| [FinOps Scan Workshop](https://devopsabcs-engineering.github.io/finops-scan-workshop/) | Azure cost governance scanning workshop |
| [Code Quality Scan Workshop](https://devopsabcs-engineering.github.io/code-quality-scan-workshop/) | Code quality scanning workshop |

## License

This project is licensed under the [MIT License](LICENSE).
