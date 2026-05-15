"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/api/api";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  description: string;
  location: string;
  condition: string;
  category: {
    name: string;
  };
  rentPrice: number;
  images: string[];
  status: string;
}

const FeaturedItems = () => {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentImageIndexes, setCurrentImageIndexes] = useState<{
    [key: string]: number;
  }>({});
  const [imageIntervals, setImageIntervals] = useState<any>({});

  useEffect(() => {
    fetchProducts();
    return () => {
      // Cleanup intervals on unmount
      Object.values(imageIntervals).forEach((interval: any) =>
        clearInterval(interval)
      );
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const response: any = await getAllProducts();
      if (response?.success && response?.products?.length > 0) {
        const allProducts = response.products;
        const randomProducts = getRandomProducts(allProducts, 3);
        setFeaturedProducts(randomProducts);
        initializeImageIndexes(randomProducts);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getRandomProducts = (products: Product[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, products.length));
  };

  const initializeImageIndexes = (products: Product[]) => {
    setCurrentImageIndexes(
      products.reduce(
        (acc, product) => ({
          ...acc,
          [product._id]: 0,
        }),
        {}
      )
    );
  };

  const handleMouseEnter = (productId: string) => {
    const product: any = featuredProducts.find((p) => p._id === productId);
    if (product?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndexes((prev) => ({
          ...prev,
          [productId]: (prev[productId] + 1) % product.images.length,
        }));
      }, 3000);

      setImageIntervals((prev: any) => ({
        ...prev,
        [productId]: interval,
      }));
    }
  };

  const handleMouseLeave = (productId: any) => {
    if (imageIntervals[productId]) {
      clearInterval(imageIntervals[productId]);
      setImageIntervals((prev: any) => {
        const newIntervals = { ...prev };
        delete newIntervals[productId];
        return newIntervals;
      });
    }
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [productId]: 0,
    }));
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8 text-center">
        Featured Items
        <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <Link href={`/product/${product._id}`} key={product._id}>
            <div
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
              onMouseEnter={() => handleMouseEnter(product._id)}
              onMouseLeave={() => handleMouseLeave(product._id)}
            >
              <div className="relative h-64">
                {product.images?.length > 0 && (
                  <Image
                    src={product.images[currentImageIndexes[product._id] || 0]}
                    alt={`${product.name}`}
                    fill
                    className="object-cover transition-opacity duration-500"
                  />
                )}
                {product.images?.length > 1 && (
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {product.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === (currentImageIndexes[product._id] || 0)
                            ? "bg-primary"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
                <span className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {product.category.name}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 flex items-center mb-3">
                  <svg
                    className="w-4 h-4 mr-2"
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
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{product.description}</span>
                  <span>{product.condition}</span>
                  <span>{product.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-primary text-2xl font-bold">
                    ${product.rentPrice}/day
                  </p>
                  <button
                    onClick={() => router.push(`/product/${product._id}`)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedItems;
