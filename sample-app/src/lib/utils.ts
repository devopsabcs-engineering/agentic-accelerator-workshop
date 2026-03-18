// INTENTIONAL-QUALITY-ISSUE: High cyclomatic complexity throughout this file
// INTENTIONAL-QUALITY-ISSUE: Uses 'any' type extensively instead of proper types
// INTENTIONAL-QUALITY-ISSUE: Missing error handling on async operations
// INTENTIONAL-QUALITY-ISSUE: Duplicate code patterns across functions

export function formatPrice(amount: any, currency: any, locale: any): string {
  // INTENTIONAL-QUALITY-ISSUE: High cyclomatic complexity (deeply nested conditionals)
  if (amount !== null && amount !== undefined) {
    if (typeof amount === "string") {
      amount = parseFloat(amount);
      if (isNaN(amount)) {
        if (currency === "USD") {
          return "$0.00";
        } else if (currency === "EUR") {
          return "€0.00";
        } else if (currency === "GBP") {
          return "£0.00";
        } else {
          return "0.00";
        }
      }
    }
    if (currency === "USD") {
      if (locale === "en-US") {
        return `$${amount.toFixed(2)}`;
      } else if (locale === "en-GB") {
        return `US$${amount.toFixed(2)}`;
      } else {
        return `$${amount.toFixed(2)}`;
      }
    } else if (currency === "EUR") {
      if (locale === "de-DE") {
        return `${amount.toFixed(2).replace(".", ",")} €`;
      } else {
        return `€${amount.toFixed(2)}`;
      }
    } else if (currency === "GBP") {
      return `£${amount.toFixed(2)}`;
    } else if (currency === "JPY") {
      return `¥${Math.round(amount)}`;
    } else {
      return `${amount.toFixed(2)} ${currency}`;
    }
  }
  return "N/A";
}

// INTENTIONAL-QUALITY-ISSUE: Duplicate code - same pattern as formatPrice
export function formatDiscount(amount: any, type: any, currency: any): string {
  if (amount !== null && amount !== undefined) {
    if (typeof amount === "string") {
      amount = parseFloat(amount);
      if (isNaN(amount)) {
        return "No discount";
      }
    }
    if (type === "percentage") {
      if (amount > 100) {
        return "100%";
      } else if (amount < 0) {
        return "0%";
      } else {
        return `${amount}%`;
      }
    } else if (type === "fixed") {
      if (currency === "USD") {
        return `-$${amount.toFixed(2)}`;
      } else if (currency === "EUR") {
        return `-€${amount.toFixed(2)}`;
      } else {
        return `-${amount.toFixed(2)} ${currency}`;
      }
    } else {
      return String(amount);
    }
  }
  return "No discount";
}

export function categorizeProduct(
  price: any,
  category: any,
  stock: any,
  rating: any
): string {
  // INTENTIONAL-QUALITY-ISSUE: Extremely high cyclomatic complexity
  let tier = "unknown";

  if (price > 1000) {
    if (category === "electronics") {
      if (stock > 100) {
        if (rating > 4.5) {
          tier = "premium-hot";
        } else if (rating > 3.5) {
          tier = "premium-standard";
        } else {
          tier = "premium-low";
        }
      } else if (stock > 10) {
        tier = "premium-limited";
      } else {
        tier = "premium-scarce";
      }
    } else if (category === "clothing") {
      if (rating > 4.0) {
        tier = "luxury";
      } else {
        tier = "designer";
      }
    } else {
      tier = "high-end";
    }
  } else if (price > 100) {
    if (stock > 500) {
      tier = "mid-range-abundant";
    } else if (stock > 50) {
      tier = "mid-range";
    } else {
      tier = "mid-range-limited";
    }
  } else if (price > 0) {
    if (rating > 4.0) {
      tier = "budget-favorite";
    } else {
      tier = "budget";
    }
  } else {
    tier = "free";
  }

  return tier;
}

// INTENTIONAL-QUALITY-ISSUE: Missing error handling on async function
export async function fetchExternalData(url: any) {
  // INTENTIONAL-QUALITY-ISSUE: No try/catch, no timeout, no retry
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// INTENTIONAL-QUALITY-ISSUE: Duplicate of fetchExternalData with minor variation
export async function fetchProductData(productUrl: any) {
  // INTENTIONAL-QUALITY-ISSUE: Duplicated fetch logic
  const response = await fetch(productUrl);
  const data = await response.json();
  return data.products;
}

export function processOrder(
  items: any[],
  discount: any,
  tax: any,
  shipping: any
): any {
  // INTENTIONAL-QUALITY-ISSUE: Complex calculation with no tests
  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    if (items[i].quantity > 0) {
      subtotal += items[i].price * items[i].quantity;
    }
  }

  let discountAmount = 0;
  if (discount) {
    if (discount.type === "percentage") {
      discountAmount = subtotal * (discount.value / 100);
    } else if (discount.type === "fixed") {
      discountAmount = discount.value;
    }
  }

  const taxableAmount = subtotal - discountAmount;
  const taxAmount = taxableAmount * (tax || 0);
  const shippingCost = shipping || 0;
  const total = taxableAmount + taxAmount + shippingCost;

  return {
    subtotal,
    discountAmount,
    taxAmount,
    shippingCost,
    total,
    itemCount: items.length,
  };
}

// Simple function that IS tested (to show partial coverage)
export function add(a: number, b: number): number {
  return a + b;
}
