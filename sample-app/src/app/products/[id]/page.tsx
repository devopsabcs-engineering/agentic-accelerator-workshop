import { getProductById } from "@/lib/db";

interface ProductDetailProps {
  params: { id: string };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailProps) {
  // INTENTIONAL-VULNERABILITY: SQL injection via user-controlled parameter
  // The getProductById function uses string concatenation with params.id
  // An attacker could pass: 1' OR '1'='1' -- to extract all products
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

      {/* INTENTIONAL-A11Y-VIOLATION: Image without alt text */}
      <img src={product.image} width={600} height={400} />

      {/* INTENTIONAL-VULNERABILITY: XSS via dangerouslySetInnerHTML */}
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: product.description }}
      />

      <p className="text-2xl font-bold mt-4">${product.price}</p>

      <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4">
        Add to Cart
      </button>
    </div>
  );
}
