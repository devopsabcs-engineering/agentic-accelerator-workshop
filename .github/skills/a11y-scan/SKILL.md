---
name: a11y-scan
description: "WCAG 2.2 Level AA accessibility scanning methodology — three-engine architecture, SARIF output, severity mapping, and compliance thresholds"
---

# Accessibility Scan Skill

Domain knowledge for WCAG 2.2 Level AA accessibility scanning. Agents load this skill to understand the scanner architecture, output format, severity classification, and compliance thresholds.

## Scanner Architecture

The accessibility scanner uses a **three-engine architecture** for maximum coverage:

| Engine | Role | Technology |
|---|---|---|
| **axe-core** (primary) | Runs axe-core directly on the page via `@axe-core/playwright` | `axe-core` v4.10+, Playwright |
| **IBM Equal Access** (secondary) | Runs IBM `accessibility-checker` ACE engine in an isolated Playwright page | `accessibility-checker` |
| **Custom Playwright checks** (5 checks) | DOM inspection for patterns not covered by engines | Playwright `page.evaluate()` |

### Scan Flow

1. Launch Playwright Chromium (headless).
2. Navigate to URL with `waitUntil: 'networkidle'`.
3. Run axe-core with WCAG tags: `['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']`.
4. Run IBM Equal Access in isolated page context (prevents JS corruption).
5. Run 5 custom Playwright checks.
6. Normalize and deduplicate results across engines (by selector + WCAG tag, keeping higher severity).
7. Compute weighted score with POUR principle breakdown.
8. Output in requested format (JSON, SARIF, JUnit XML, HTML, PDF).

### Custom Playwright Checks

| Check ID | What It Detects |
|---|---|
| `ambiguous-link-text` | Links using generic text like "click here" or "read more" |
| `aria-current-page` | Navigation items missing `aria-current="page"` on active link |
| `emphasis-strong-semantics` | `<b>` / `<i>` used instead of semantic `<strong>` / `<em>` |
| `discount-price-accessibility` | Strikethrough prices lacking `aria-label` or visually hidden text |
| `sticky-element-overlap` | Sticky/fixed elements that may obscure focused content (WCAG 2.4.11) |

## SARIF Output Format

The scanner produces SARIF v2.1.0 compliant output.

### Required SARIF Fields

| Field | Value |
|---|---|
| `$schema` | `https://raw.githubusercontent.com/oasis-tcs/sarif-spec/main/sarif-2.1/schema/sarif-schema-2.1.0.json` |
| `version` | `2.1.0` |
| `tool.driver.name` | `accessibility-scanner` |
| `automationDetails.id` | `accessibility-scan/<url>` |
| `partialFingerprints` | Hash of `ruleId:target` for deduplication |
| `results[].ruleId` | Mapped from axe-core `violation.id` |
| `results[].level` | Mapped from impact (see severity mapping) |
| `help.markdown` | Rule description, WCAG mapping, remediation, and learn-more links |
| `properties.tags` | Includes `accessibility` plus WCAG SC tags |

### Severity Mapping

| axe-core Impact | SARIF Level | `security-severity` | Weighted Score |
|---|---|---|---|
| critical | `error` | 9.0 | 10 |
| serious | `error` | 7.0 | 7 |
| moderate | `warning` | 4.0 | 3 |
| minor | `note` | 1.0 | 1 |

### SARIF Enrichment

- `help.markdown` — Embeds rule description, WCAG mapping, remediation, and learn-more links (GitHub does not render `helpUri`; URLs must be embedded in markdown).
- `properties.precision` — `very-high` for axe-core, `high` for IBM Equal Access.
- `properties.tags` — Includes `accessibility` tag plus WCAG SC tags for GitHub filtering.
- `partialFingerprints` — Hash of `ruleId:target` for deduplication across runs.
- `automationDetails.id` — Category prefix for multi-tool scenarios.

## WCAG 2.2 AA Coverage

### axe-core Tag Configuration

```text
wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice
```

### WCAG 2.2 New Success Criteria (Level AA)

| SC | Title | Automatable |
|---|---|---|
| 2.4.11 | Focus Not Obscured (Minimum) | Partially — custom check for `position: sticky/fixed` |
| 2.5.7 | Dragging Movements | Manual review required |
| 2.5.8 | Target Size (Minimum) | Partially — check min 24×24 CSS pixels |
| 3.2.6 | Consistent Help | Manual review required |
| 3.3.7 | Redundant Entry | Manual review required |
| 3.3.8 | Accessible Authentication (Minimum) | Manual review required |

### Detection Coverage

- axe-core automatically finds approximately 57% of WCAG issues.
- An additional 25% are partially automatable.
- The remaining 35–40% require manual testing.

## Compliance Thresholds

| Metric | Default Threshold |
|---|---|
| Minimum score | 70 (0–100 scale) |
| Critical violations | 0 |
| Serious violations | 0 |
| Moderate violations | 10 |
| Minor violations | 999 (no limit) |

### Scoring

Weighted score formula: `100 - Σ(impact_weight × violation_count)` clamped to 0–100.

Grade scale: A (90–100), B (80–89), C (70–79), D (60–69), F (0–59).

POUR principle breakdown assigns each finding to one of: Perceivable, Operable, Understandable, or Robust.

## Top 10 Violations

These violations appear most frequently across scans:

| # | Rule ID | WCAG SC | Category |
|---|---|---|---|
| 1 | `color-contrast` | 1.4.3 | Perceivable |
| 2 | `image-alt` | 1.1.1 | Perceivable |
| 3 | `link-name` | 2.4.4 | Operable |
| 4 | `button-name` | 4.1.2 | Robust |
| 5 | `label` | 1.3.1 | Perceivable |
| 6 | `html-has-lang` | 3.1.1 | Understandable |
| 7 | `heading-order` | 1.3.1 | Perceivable |
| 8 | `empty-heading` | 2.4.6 | Operable |
| 9 | `document-title` | 2.4.2 | Operable |
| 10 | `aria-hidden-focus` | 4.1.2 | Robust |

## CI/CD Integration

### GitHub Actions

```yaml
- uses: devopsabcs-engineering/accessibility-scan-demo-app@main
  with:
    url: https://example.com
    mode: single
    threshold: 70
    output-format: sarif
    output-directory: ./a11y-results
- uses: github/codeql-action/upload-sarif@v4
  with:
    sarif_file: ./a11y-results
    category: accessibility-scan
```

### Azure DevOps

```yaml
- script: npx a11y-scan scan --url "$(SCAN_URL)" --threshold 80 --format junit --output results.xml
- task: PublishTestResults@2
  inputs:
    testResultsFormat: 'JUnit'
    failTaskOnFailedTests: true
```

## AODA Context

Ontario's AODA legally requires WCAG 2.0 Level AA. Conforming to WCAG 2.2 Level AA automatically satisfies AODA requirements and anticipates future policy updates.

## References

- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [IBM Equal Access](https://www.ibm.com/able/toolkit/tools/)
- [SARIF v2.1.0 Specification](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html)
- [AODA Web Accessibility Requirements](https://www.ontario.ca/page/how-make-websites-accessible)
