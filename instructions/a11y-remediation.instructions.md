---
description: "Accessibility remediation patterns for common WCAG violations"
applyTo: "**/*.tsx,**/*.jsx,**/*.ts,**/*.html,**/*.css"
---

# Accessibility Remediation Patterns

Standard fix patterns for common WCAG 2.2 Level AA violations. Apply these patterns when resolving accessibility issues in web content files.

## Missing Image Alt Text

**Violation:** `image-alt` — WCAG 1.1.1

**Informative image — describe the content:**

```tsx
// Before
<img src="/team.jpg" />

// After
<img src="/team.jpg" alt="Development team reviewing code on shared screen" />
```

**Decorative image — empty alt:**

```tsx
// Before
<img src="/divider.svg" />

// After
<img src="/divider.svg" alt="" />
```

**Next.js Image component:**

```tsx
// Before
<Image src="/hero.jpg" width={800} height={400} />

// After
<Image src="/hero.jpg" alt="Dashboard showing accessibility compliance metrics" width={800} height={400} />
```

## Missing Form Label

**Violation:** `label` — WCAG 1.3.1

**Associate label with input:**

```tsx
// Before
<input type="email" placeholder="Enter email" />

// After — using useId() for unique IDs
import { useId } from 'react';

function EmailField() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Email address</label>
      <input id={id} type="email" placeholder="user@example.com" />
    </>
  );
}
```

**Group related controls:**

```tsx
// Before
<div>
  <input type="radio" name="size" value="s" /> Small
  <input type="radio" name="size" value="m" /> Medium
  <input type="radio" name="size" value="l" /> Large
</div>

// After
<fieldset>
  <legend>Select size</legend>
  <label><input type="radio" name="size" value="s" /> Small</label>
  <label><input type="radio" name="size" value="m" /> Medium</label>
  <label><input type="radio" name="size" value="l" /> Large</label>
</fieldset>
```

## Low Color Contrast

**Violation:** `color-contrast` — WCAG 1.4.3

**Adjust colors to meet minimum ratios:**

```css
/* Before — 2.5:1 ratio (fails) */
.muted-text {
  color: #999999;
  background-color: #ffffff;
}

/* After — 4.6:1 ratio (passes) */
.muted-text {
  color: #767676;
  background-color: #ffffff;
}
```

**Tailwind utility classes:**

```tsx
// Before — insufficient contrast
<p className="text-gray-400">Important information</p>

// After — sufficient contrast
<p className="text-gray-600">Important information</p>
```

**Minimum ratios:**

- Normal text (< 18pt / < 14pt bold): ≥ 4.5:1
- Large text (≥ 18pt / ≥ 14pt bold): ≥ 3:1
- UI components and graphical objects: ≥ 3:1

## Missing Skip Navigation Link

**Violation:** no skip-link — WCAG 2.4.1

```tsx
// Add at the top of the page layout
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:outline-2 focus:outline-offset-2"
>
  Skip to main content
</a>

{/* Navigation and header content */}

<main id="main-content">
  {/* Page content */}
</main>
```

## Heading Hierarchy Gaps

**Violation:** `heading-order` — WCAG 1.3.1

```tsx
// Before — skipped heading level
<h1>Page Title</h1>
<h3>Section Title</h3>  {/* WRONG: skipped h2 */}

// After — correct hierarchy
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
```

## Small Touch Targets

**Violation:** `target-size` — WCAG 2.5.8

```css
/* Before — 16×16px icon button */
.icon-btn {
  width: 16px;
  height: 16px;
}

/* After — meets 24×24px minimum */
.icon-btn {
  min-width: 24px;
  min-height: 24px;
  padding: 4px;
}
```

**Tailwind:**

```tsx
// Before
<button className="p-1"><Icon /></button>

// After — ensures 24×24px minimum
<button className="p-1.5 min-w-6 min-h-6"><Icon /></button>
```

## Missing Page Language

**Violation:** `html-has-lang` — WCAG 3.1.1

**Next.js layout.tsx:**

```tsx
// Before
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// After
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

**Plain HTML:**

```html
<!-- Before -->
<html>

<!-- After -->
<html lang="en">
```

## Non-interactive Element with Click Handler

**Violation:** interactive role missing — WCAG 4.1.2

```tsx
// Before — div with onClick
<div onClick={handleClick}>Click me</div>

// After — use a button
<button onClick={handleClick}>Click me</button>

// Alternative — if a div is truly needed
<div role="button" tabIndex={0} onClick={handleClick} onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
}}>
  Click me
</div>
```

## Missing Focus Indicator

**Violation:** `focus-visible` — WCAG 2.4.7

```css
/* Before — focus removed without replacement */
button:focus {
  outline: none;
}

/* After — visible focus indicator for keyboard users */
button:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}
```

## Focus Obscured by Sticky Header

**Violation:** `focus-not-obscured` — WCAG 2.4.11

```css
/* Add scroll padding to account for sticky header height */
html {
  scroll-padding-top: 80px; /* Match the height of the sticky header */
}

/* Ensure fixed elements do not obscure focused content */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 40;
  height: 64px;
}
```

## Zoom Restriction

**Violation:** `meta-viewport` — WCAG 1.4.4

```html
<!-- Before — prevents zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

<!-- After — allows zoom -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Missing Page Title

**Violation:** `document-title` — WCAG 2.4.2

**Next.js (app router):**

```tsx
// In page.tsx or layout.tsx
export const metadata = {
  title: 'Dashboard - Accessibility Scanner',
  description: 'View accessibility scan results and compliance metrics',
};
```

**Plain HTML:**

```html
<head>
  <title>Dashboard - Accessibility Scanner</title>
</head>
```

## Ambiguous Link Text

**Violation:** `link-name` — WCAG 2.4.4

```tsx
// Before — generic text
<a href="/report">Click here</a>
<a href="/docs">Read more</a>

// After — descriptive text
<a href="/report">View accessibility report</a>
<a href="/docs">Read the documentation</a>

// Alternative — when surrounding context provides meaning
<a href="/report" aria-label="View accessibility report for March 2026">View report</a>
```

## ARIA Hidden on Focusable Element

**Violation:** `aria-hidden-focus` — WCAG 4.1.2

```tsx
// Before — hidden but focusable
<div aria-hidden="true">
  <button>Submit</button>
</div>

// After — option 1: remove aria-hidden
<div>
  <button>Submit</button>
</div>

// After — option 2: make children not focusable
<div aria-hidden="true">
  <button tabIndex={-1}>Submit</button>
</div>
```

## Form Error Identification

**Violation:** error identification — WCAG 3.3.1

```tsx
import { useId } from 'react';

function EmailField({ error }: { error?: string }) {
  const inputId = useId();
  const errorId = useId();

  return (
    <div>
      <label htmlFor={inputId}>Email address</label>
      <input
        id={inputId}
        type="email"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" className="text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
```

## Status Messages

**Violation:** status messages — WCAG 4.1.3

```tsx
// Polite announcement (non-urgent status update)
<div role="status" aria-live="polite">
  {saveSuccess && 'Changes saved successfully.'}
</div>

// Assertive announcement (urgent error)
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

## References

- [WCAG 2.2 Techniques](https://www.w3.org/WAI/WCAG22/Techniques/)
- [WCAG 2.2 Understanding Documents](https://www.w3.org/WAI/WCAG22/Understanding/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [React Accessibility](https://react.dev/reference/react-dom/components#form-components)
