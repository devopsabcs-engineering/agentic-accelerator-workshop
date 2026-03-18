import Header from "@/components/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>

        {/* INTENTIONAL-A11Y-VIOLATION: Low contrast text - #999999 on white background */}
        {/* WCAG 1.4.3 (Level AA): Contrast ratio must be at least 4.5:1 */}
        <p style={{ color: "#999999" }}>
          Browse our collection of products. We offer the best deals on
          electronics, clothing, and more. Shop now and save big on all
          categories.
        </p>

        {/* INTENTIONAL-A11Y-VIOLATION: Missing form label for search input */}
        {/* WCAG 1.3.1 (Level A): Form inputs must have associated labels */}
        <div className="my-6">
          <input
            type="text"
            placeholder="Search products..."
            className="border p-2 rounded w-full"
          />
        </div>

        {/* INTENTIONAL-A11Y-VIOLATION: Small touch targets on navigation links */}
        {/* WCAG 2.5.8 (Level AA): Touch targets should be at least 24x24 CSS pixels */}
        <nav>
          <a href="/products" style={{ fontSize: "10px", padding: "2px" }}>
            Products
          </a>
          {" | "}
          <a href="/about" style={{ fontSize: "10px", padding: "2px" }}>
            About
          </a>
          {" | "}
          <a href="/contact" style={{ fontSize: "10px", padding: "2px" }}>
            Contact
          </a>
        </nav>

        <section className="mt-8">
          {/* INTENTIONAL-A11Y-VIOLATION: Low contrast on secondary text */}
          <p style={{ color: "#aaaaaa" }}>
            Free shipping on orders over $50. Terms and conditions apply.
          </p>
        </section>
      </main>
    </div>
  );
}
