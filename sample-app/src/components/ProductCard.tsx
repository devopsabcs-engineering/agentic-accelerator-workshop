interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function ProductCard({
  id,
  name,
  price,
  description,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{name}</h2>

      {/* INTENTIONAL-VULNERABILITY: XSS via dangerouslySetInnerHTML */}
      {/* User-supplied product descriptions rendered without sanitization */}
      {/* Should use a sanitization library like DOMPurify */}
      <div
        className="text-gray-600 mt-2"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <p className="text-xl font-bold mt-2">${price.toFixed(2)}</p>

      <a
        href={`/products/${id}`}
        className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        View Details
      </a>
    </div>
  );
}
