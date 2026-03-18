// INTENTIONAL-QUALITY-ISSUE: Insufficient test coverage (<30%)
// Only tests the trivial 'add' function, leaving all other modules uncovered
// Coverage target is 80% but this achieves approximately 5%

import { add } from "../src/lib/utils";

describe("utils", () => {
  test("add returns sum of two numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("add handles negative numbers", () => {
    expect(add(-1, 1)).toBe(0);
  });

  test("add handles zero", () => {
    expect(add(0, 0)).toBe(0);
  });
});

// No tests for:
// - formatPrice (complex formatting logic)
// - formatDiscount (discount calculation)
// - categorizeProduct (product categorization)
// - fetchExternalData (async data fetching)
// - fetchProductData (async product fetching)
// - processOrder (order processing)
// - db.ts (database operations)
// - auth.ts (authentication)
// - Any React components
