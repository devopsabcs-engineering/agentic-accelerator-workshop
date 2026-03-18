---
description: "WCAG 2.2 Level AA compliance rules for accessible web development"
applyTo: "**/*.tsx,**/*.jsx,**/*.ts,**/*.html,**/*.css"
---

# WCAG 2.2 Level AA Rules

These rules apply automatically when editing web content files. Follow WCAG 2.2 Level AA requirements organized by the four POUR principles.

## Perceivable

Content must be presentable to all users in ways they can perceive.

### 1.1.1 Non-text Content (Level A)

- Every `<img>` and `<Image>` element MUST have an `alt` attribute.
- Informative images: `alt` describes the image content or function.
- Decorative images: `alt=""` (empty string, not omitted).
- Complex images (charts, diagrams): provide a text alternative via `aria-describedby` or adjacent description.
- Icon buttons: the icon's parent `<button>` MUST have an accessible name via text content or `aria-label`.

### 1.3.1 Info and Relationships (Level A)

- Use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`, `<section>`).
- Form inputs MUST have associated `<label>` elements using `htmlFor` / `id` pairs.
- Use `<fieldset>` and `<legend>` to group related form controls.
- Lists MUST use `<ul>`, `<ol>`, or `<dl>` — never simulated with `<div>` and CSS.
- Data tables MUST use `<th>` with `scope` attribute for row/column headers.

### 1.3.5 Identify Input Purpose (Level AA)

- Form fields collecting personal data (name, email, phone, address) MUST have a valid `autocomplete` attribute.

### 1.4.3 Contrast (Minimum) (Level AA)

- Normal text (< 18pt / < 14pt bold): contrast ratio ≥ 4.5:1.
- Large text (≥ 18pt / ≥ 14pt bold): contrast ratio ≥ 3:1.
- UI components and graphical objects: contrast ratio ≥ 3:1 against adjacent colors.
- Do not rely on color alone to convey information (1.4.1).

### 1.4.4 Resize Text (Level AA)

- Never use `maximum-scale=1` or `user-scalable=no` in viewport meta tags.
- Text MUST be resizable up to 200% without loss of content or functionality.

### 1.4.10 Reflow (Level AA)

- Content MUST reflow at 320 CSS pixels width without requiring horizontal scrolling.
- Do not use fixed-width containers that prevent reflow.

### 1.4.11 Non-text Contrast (Level AA)

- User interface components (inputs, buttons, controls) MUST have ≥ 3:1 contrast ratio against adjacent colors.
- Custom focus indicators MUST meet this same threshold.

### 1.4.13 Content on Hover or Focus (Level AA)

- Tooltip or popover content MUST be dismissible (Escape key), hoverable (user can move pointer over it), and persistent (remains visible until dismissed).

## Operable

User interface components and navigation must be operable.

### 2.1.1 Keyboard (Level A)

- All interactive elements MUST be keyboard accessible.
- Never use `<div>` or `<span>` with `onClick` without also providing `role`, `tabIndex`, and keyboard event handlers.
- Prefer native interactive elements (`<button>`, `<a>`, `<input>`) over custom implementations.
- No keyboard traps — users MUST be able to navigate away from any component using only the keyboard.

### 2.4.2 Page Titled (Level A)

- Every page MUST have a descriptive `<title>` element.
- In Next.js, use the `metadata` export in `layout.tsx` or `page.tsx`.

### 2.4.3 Focus Order (Level A)

- Never use `tabindex` values greater than 0.
- Focus order MUST follow the visual reading order.
- Dynamically added content MUST manage focus appropriately.

### 2.4.4 Link Purpose (Level A)

- Link text MUST describe the link destination or purpose.
- Avoid generic text: "click here", "read more", "learn more", "here".
- When context is needed, use `aria-label` or `aria-describedby`.

### 2.4.6 Headings and Labels (Level AA)

- Use headings to describe the topic or purpose of content sections.
- Maintain heading hierarchy (h1 → h2 → h3) — never skip levels.
- Every heading element MUST contain text content.
- Each page SHOULD have exactly one `<h1>`.

### 2.4.7 Focus Visible (Level AA)

- All interactive elements MUST have a visible focus indicator.
- Never use `outline: none` or `outline: 0` without providing an alternative visible indicator.
- Use `:focus-visible` to display focus indicators for keyboard users.

### 2.4.11 Focus Not Obscured (Level AA) — WCAG 2.2

- When a component receives focus, it MUST NOT be fully obscured by author-created content.
- Use `scroll-padding-top` to offset sticky/fixed headers.
- Ensure modal dialogs do not trap focus behind overlays.

### 2.5.8 Target Size (Minimum) (Level AA) — WCAG 2.2

- Interactive targets MUST be at least 24×24 CSS pixels.
- Exceptions: inline links within text, targets sized by the user agent, essential presentations.

## Understandable

Information and the operation of the user interface must be understandable.

### 3.1.1 Language of Page (Level A)

- The `<html>` element MUST have a `lang` attribute with a valid language tag.
- In Next.js, set `lang` on `<html>` in the root `layout.tsx`.

### 3.1.2 Language of Parts (Level AA)

- Content in a different language than the page default MUST have a `lang` attribute on the containing element.

### 3.2.2 On Input (Level A)

- Changing a form control value MUST NOT automatically cause a change of context.
- Use submit buttons for form actions rather than auto-submitting on selection change.

### 3.3.1 Error Identification (Level A)

- Form validation errors MUST be identified in text and associated with the relevant input.
- Use `aria-describedby` to link error messages to their form fields.
- Use `aria-invalid="true"` on fields with validation errors.

### 3.3.2 Labels or Instructions (Level A)

- Form fields MUST have visible labels.
- Placeholder text alone is NOT a sufficient label.
- Provide instructions for expected format when not obvious.

## Robust

Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

### 4.1.1 Parsing (Level A)

- IDs MUST be unique within the page — use React's `useId()` hook for generated IDs.
- All ARIA attributes MUST use valid values.
- Elements MUST have complete start and end tags.

### 4.1.2 Name, Role, Value (Level A)

- All interactive elements MUST have an accessible name.
- Custom widgets MUST use appropriate ARIA roles, states, and properties.
- State changes MUST be communicated to assistive technology (e.g., `aria-expanded`, `aria-selected`, `aria-checked`).
- Custom controls MUST expose their role: `role="tab"`, `role="dialog"`, `role="alert"`, etc.

### 4.1.3 Status Messages (Level AA)

- Status messages (success, error, progress) MUST be announced without moving focus.
- Use `role="status"` for polite announcements or `role="alert"` for urgent messages.
- Do not use `alert()` dialogs for non-critical status messages.

## References

- [WCAG 2.2 Specification](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2 Understanding Documents](https://www.w3.org/WAI/WCAG22/Understanding/)
- [WCAG 2.2 Techniques](https://www.w3.org/WAI/WCAG22/Techniques/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
