import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  location: string;
  condition: string;
  category?: {
    name: string;
  } | null; // Make category optional
  price: number;
  rentPrice: number;
  images: string[];
  status: string;
}

interface SearchPageCardsProps {
  products: Product[];
}

export const SearchPageCards = ({ products }: SearchPageCardsProps) => {
  const router = useRouter();
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: string]: number;
  }>({});

  const handleMouseEnter = (productId: string) => {
    if (products.find((p) => p._id === productId)?.images.length! > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndexes((prev) => ({
          ...prev,
          [productId]:
            ((prev[productId] || 0) + 1) %
            products.find((p) => p._id === productId)!.images.length,
        }));
      }, 3000);

      const element = document.getElementById(`product-${productId}`);
      if (element) {
        element.dataset.intervalId = interval.toString();
      }
    }
  };

  const handleMouseLeave = (productId: string) => {
    const element = document.getElementById(`product-${productId}`);
    if (element?.dataset.intervalId) {
      clearInterval(parseInt(element.dataset.intervalId));
      setCurrentImageIndexes((prev) => ({ ...prev, [productId]: 0 }));
    }
  };

  // ...existing code...

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          id={`product-${product._id}`}
          key={product._id}
          className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 group"
          onMouseEnter={() => handleMouseEnter(product._id)}
          onMouseLeave={() => handleMouseLeave(product._id)}
        >
          <div className="relative h-72 overflow-hidden">
            <Image
              src={
                product.images[currentImageIndexes[product._id] || 0] ||
                "/placeholder-image.jpg"
              }
              alt={`${product.name} - Image ${
                (currentImageIndexes[product._id] || 0) + 1
              }`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === (currentImageIndexes[product._id] || 0)
                        ? "bg-primary w-4"
                        : "bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
            <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
              {product.category?.name || "Uncategorized"}
            </div>
            <div className="absolute top-4 left-4 bg-white/90 text-gray-800 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
              {product.condition}
            </div>
          </div>

          <div className="p-5">
            <h3 className="text-xl font-semibold mb-2 line-clamp-1">
              {product.name}
            </h3>

            <p className="text-gray-600 flex items-center text-sm mb-3">
              <svg
                className="w-4 h-4 mr-1.5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {product.location}
            </p>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
              <div className="space-y-1">
                {product.price > 0 && (
                  <p className="text-primary font-bold flex items-center">
                    <span className="text-xs text-gray-500 mr-1">Buy:</span>
                    PKR {product.price.toLocaleString()}
                  </p>
                )}
                {product.rentPrice > 0 && (
                  <p className="text-primary font-bold flex items-center">
                    <span className="text-xs text-gray-500 mr-1">Rent:</span>
                    PKR {product.rentPrice.toLocaleString()}/day
                  </p>
                )}
              </div>
              <button
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                onClick={() => router.push(`/product/${product._id}`)}
              >
                View Details
              </button>
            </div>

            <div className="mt-3 flex items-center justify-end">
              <span
                className={`text-xs px-2 py-0.5 rounded ${
                  product.status === "Available"
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {product.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
