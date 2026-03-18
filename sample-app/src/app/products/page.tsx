import ProductCard from "@/components/ProductCard";

const sampleProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 79.99,
    image: "/images/headphones.jpg",
    description: "<b>Premium wireless headphones</b> with noise cancellation",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 299.99,
    image: "/images/smartwatch.jpg",
    description: "<em>Latest model</em> with health tracking features",
  },
  {
    id: "3",
    name: "Laptop Stand",
    price: 49.99,
    image: "/images/laptop-stand.jpg",
    description: "Ergonomic <script>alert('xss')</script> aluminum stand",
  },
];

export default function ProductsPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleProducts.map((product) => (
          <div key={product.id}>
            {/* INTENTIONAL-A11Y-VIOLATION: Images without alt text */}
            {/* WCAG 1.1.1 (Level A): Non-text content must have text alternatives */}
            <img src={product.image} width={400} height={300} />

            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
