---
title: "Sample Application: Intentional Issues for Agent Testing"
description: "Next.js demo application with intentional security, accessibility, code quality, and FinOps issues for testing Agentic Accelerator Framework agents"
ms.date: 2026-03-17
---

> [!CAUTION]
> This application contains **intentional vulnerabilities, accessibility violations, code quality issues, and cost governance gaps** for testing Accelerator agents. **Never deploy this application to production.**

## Purpose

This sample Next.js application provides a realistic testing target for all agent domains in the Agentic Accelerator Framework. Each intentional issue is clearly marked with comment tags so agents can be validated against known findings.

## Comment Markers

| Marker | Domain | Example |
|--------|--------|---------|
| `INTENTIONAL-VULNERABILITY` | Security | SQL injection, XSS, hardcoded secrets |
| `INTENTIONAL-A11Y-VIOLATION` | Accessibility | Missing alt text, low contrast |
| `INTENTIONAL-QUALITY-ISSUE` | Code Quality | Low coverage, high complexity |
| `INTENTIONAL-FINOPS-ISSUE` | FinOps | Oversized SKUs, missing tags |

## Intentional Issues by Domain

### Security Issues

| File | Issue | Description | Expected Agent |
|------|-------|-------------|----------------|
| `src/lib/db.ts` | Hardcoded connection string | Database URL with credentials in source code | SupplyChainSecurityAgent |
| `src/lib/db.ts` | SQL injection | String concatenation in SQL queries | SecurityReviewerAgent |
| `src/lib/auth.ts` | MD5 password hashing | Cryptographically broken hash algorithm | SecurityReviewerAgent |
| `src/lib/auth.ts` | Hardcoded JWT secret | Secret key in source code | SupplyChainSecurityAgent |
| `src/lib/auth.ts` | Hardcoded API key | API key string in source | SupplyChainSecurityAgent |
| `src/lib/auth.ts` | No rate limiting | Authentication without brute force protection | SecurityReviewerAgent |
| `src/lib/auth.ts` | Weak token generation | Math.random() for session tokens | SecurityReviewerAgent |
| `src/app/products/[id]/page.tsx` | SQL injection | User-controlled parameter in raw SQL | SecurityReviewerAgent |
| `src/app/products/[id]/page.tsx` | XSS | dangerouslySetInnerHTML with unsanitized data | SecurityReviewerAgent |
| `src/components/ProductCard.tsx` | XSS | dangerouslySetInnerHTML with user content | SecurityReviewerAgent |
| `infra/main.bicep` | Public blob storage | allowBlobPublicAccess enabled | IaCSecurityAgent |
| `infra/main.bicep` | TLS 1.0 allowed | Minimum TLS version too low | IaCSecurityAgent |
| `infra/main.bicep` | HTTP allowed | httpsOnly disabled | IaCSecurityAgent |
| `infra/main.bicep` | Overly permissive firewall | 0.0.0.0-255.255.255.255 rule | IaCSecurityAgent |
| `infra/main.bicep` | Plaintext SQL password | Password parameter without Key Vault | IaCSecurityAgent |

### Accessibility Issues (WCAG 2.2)

| File | Issue | WCAG SC | Expected Agent |
|------|-------|---------|----------------|
| `src/app/layout.tsx` | Missing lang attribute | 3.1.1 (Level A) | A11yDetector |
| `src/app/page.tsx` | Low contrast text (#999 on white) | 1.4.3 (Level AA) | A11yDetector |
| `src/app/page.tsx` | Missing form label | 1.3.1 (Level A) | A11yDetector |
| `src/app/page.tsx` | Small touch targets (10px) | 2.5.8 (Level AA) | A11yDetector |
| `src/app/products/page.tsx` | Images without alt text | 1.1.1 (Level A) | A11yDetector |
| `src/app/products/[id]/page.tsx` | Image without alt text | 1.1.1 (Level A) | A11yDetector |
| `src/components/Header.tsx` | Broken heading hierarchy (h1 to h3) | 1.3.1 (Level A) | A11yDetector |

### Code Quality Issues

| File | Issue | Description | Expected Agent |
|------|-------|-------------|----------------|
| `src/lib/utils.ts` | High cyclomatic complexity | Deeply nested conditionals in formatPrice, categorizeProduct | CodeQualityDetector |
| `src/lib/utils.ts` | Uses `any` type | Multiple `any` type parameters instead of proper types | CodeQualityDetector |
| `src/lib/utils.ts` | Missing error handling | Async functions without try/catch | CodeQualityDetector |
| `src/lib/utils.ts` | Duplicate code | fetchExternalData and fetchProductData are nearly identical | CodeQualityDetector |
| `__tests__/placeholder.test.ts` | Low test coverage | Only tests `add()` function, approximately 5% coverage | CodeQualityDetector |

### FinOps Issues

| File | Issue | Description | Expected Agent |
|------|-------|-------------|----------------|
| `infra/main.bicep` | Missing tags on App Service Plan | No ProjectName, Environment, CostCenter | FinOpsGovernanceAgent |
| `infra/main.bicep` | Missing tags on App Service | No required tags | FinOpsGovernanceAgent |
| `infra/main.bicep` | Missing tags on Storage Account | No required tags | FinOpsGovernanceAgent |
| `infra/main.bicep` | Missing tags on SQL Server | No required tags | FinOpsGovernanceAgent |
| `infra/main.bicep` | Missing tags on SQL Database | No required tags | FinOpsGovernanceAgent |
| `infra/main.bicep` | Oversized App Service Plan | P1v3 x3 (~$420/mo) instead of B1 (~$13/mo) | DeploymentCostGateAgent |
| `infra/main.bicep` | Oversized SQL Database | GP_Gen5_8 (~$800/mo) instead of Basic (~$5/mo) | DeploymentCostGateAgent |
| `infra/main.bicep` | GRS storage replication | Standard_GRS instead of Standard_LRS | CostOptimizerAgent |
| `infra/main.bicep` | No budget resource | Missing consumption budget definition | FinOpsGovernanceAgent |
| `infra/variables.bicep` | Premium tier defaults | All parameters default to most expensive options | CostAnalysisAgent |

## Running Agents Against This Application

### Security Scan

Invoke the Security Reviewer Agent (`@security-reviewer-agent`) in VS Code Copilot Chat and point it at the `sample-app/src/` directory. Expected SARIF category: `security/`.

### Accessibility Scan

Invoke the A11y Detector (`@a11y-detector`) and scan the `sample-app/src/` directory. Expected SARIF category: `accessibility-scan/`.

### Code Quality Analysis

Invoke the Code Quality Detector (`@code-quality-detector`) against `sample-app/`. Run `npm test -- --coverage` to generate the coverage report. Expected SARIF category: `code-quality/coverage/`.

### FinOps Review

Invoke the Cost Analysis Agent (`@cost-analysis-agent`) against `sample-app/infra/`. Expected SARIF category: `finops-finding/v1`.

## Expected SARIF Categories

| Scan Type | `automationDetails.id` | Tool Name |
|-----------|----------------------|-----------|
| Security | `security/` | security-reviewer-agent |
| IaC Security | `security/iac/` | iac-security-agent |
| Accessibility | `accessibility-scan/` | a11y-detector |
| Code Quality | `code-quality/coverage/` | code-quality-detector |
| FinOps | `finops-finding/v1` | cost-analysis-agent |

## Verification Checklist

* [ ] Security agents detect at least 10 of 15 injected vulnerabilities
* [ ] A11y agents detect at least 5 of 7 WCAG violations
* [ ] Code quality agents report coverage below 80% threshold
* [ ] FinOps agents flag at least 5 untagged resources
* [ ] FinOps agents identify oversized SKU selections
* [ ] SARIF output uses correct `automationDetails.id` categories
* [ ] All findings map to correct CWE, WCAG SC, or OWASP references
