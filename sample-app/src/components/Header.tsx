export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      {/* INTENTIONAL-A11Y-VIOLATION: Broken heading hierarchy - skips h2 */}
      {/* WCAG 1.3.1 (Level A): Heading levels should increase by one */}
      <h1 className="text-2xl font-bold">DevSecOps Store</h1>
      <h3 className="text-sm mt-1">Your trusted online marketplace</h3>

      <nav className="mt-2">
        {/* INTENTIONAL-A11Y-VIOLATION: Navigation links without aria-label */}
        <a href="/" className="text-gray-300 mr-4">
          Home
        </a>
        <a href="/products" className="text-gray-300 mr-4">
          Products
        </a>
        <a href="/about" className="text-gray-300">
          About
        </a>
      </nav>
    </header>
  );
}
