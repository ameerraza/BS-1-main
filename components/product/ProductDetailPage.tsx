"use client";

import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Button } from "../common/Button";
import { useParams, useRouter } from "next/navigation";
import productData from "./../../src/data/SearchPageData.json";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";
import { getProductById } from "@/api/api";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const reviews = [
  {
    id: 1,
    user: "Alex Thompson",
    rating: 5,
    comment:
      "Great experience! The item was in perfect condition and exactly as described.",
    date: "2024-01-15",
  },
  {
    id: 2,
    user: "Maria Garcia",
    rating: 4,
    comment: "Very good transaction. Quick response from seller.",
    date: "2024-01-10",
  },
  {
    id: 3,
    user: "David Wilson",
    rating: 5,
    comment: "Excellent service and product quality. Highly recommended!",
    date: "2024-01-05",
  },
  {
    id: 4,
    user: "Emma Roberts",
    rating: 4,
    comment: "Good communication and fast delivery. Item as described.",
    date: "2024-01-01",
  },
];

const formatPrice = (product: any, type: "rent" | "buy") => {
  if (!product) return null;

  if (type === "rent") {
    return `$${product.rentPrice}`;
  }
  return `$${product.price}`;
};

const ProductDetailPage = () => {
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const [product, setProduct] = React.useState<any>(null);
  const params = useParams();
  const id: any = Array.isArray(params.id) ? params.id.join("/") : params.id;
  const router = useRouter();

  // Find the product from JSON data
  useEffect(() => {
    console.log("id :>> ", id);
    doGetProductById(id);
  }, [id]);
  const doGetProductById = async (productId: string) => {
    try {
      showLoader();
      const response = await getProductById(productId);
      if (response.success === true) {
        setProduct(response.product);
        showToast(response.message, "success");
      } else {
        showToast("Failed to fetch product details", "error");
      }
    } catch (error) {
      console.log(error);
      showToast("Not Found", "error");
    } finally {
      hideLoader();
    }
  };

  if (!product) {
    return <div></div>;
  }

  return (
    <div className="container-fluid mx-auto px-4 py-8 my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-12">
        {/* Left Column - Carousel */}
        <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
          <Carousel
            responsive={responsive}
            infinite={true}
            showDots={true}
            autoPlay={false}
            className="h-full"
            dotListClass="custom-dot-list-style"
            ssr={true}
          >
            {product.images.map((img: string, index: number) => (
              <div key={index} className="relative h-full w-full">
                <img
                  src={img}
                  alt={`Product image ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Right Column - Product Details */}
        <div className="space-y-4 mt-2">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="space-y-2">
              {product.rentPrice && (
                <p className="text-2xl font-semibold text-primary-600">
                  Rent: {formatPrice(product, "rent")}/month
                </p>
              )}
              {product.price && (
                <p className="text-2xl font-semibold text-primary-600">
                  Buy: {formatPrice(product, "buy")}
                </p>
              )}
            </div>

            <div className="mt-6 space-y-6">
              <div className="p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Product Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Category</h3>
                    <p>{product.category.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Condition</h3>
                    <p>{product.condition}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Location</h3>
                    <p>{product.location}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">Availability</h3>
                    <p>{product.status}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Specifications</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {product.rentPrice > 0 && (
              <Button
                variant="primary"
                onClick={() => router.push(`/product/${id}/rent`)}
              >
                Rent for {formatPrice(product, "rent")}/month
              </Button>
            )}
            {product.price > 0 && (
              <Button
                variant="primary"
                onClick={() => router.push(`/product/${id}/buy`)}
              >
                Buy for {formatPrice(product, "buy")}
              </Button>
            )}
            <Button variant="primary" onClick={() => router.push(`/chat`)}>
              Contact Seller
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mr-3 flex items-center justify-center text-white font-bold">
                  {review.user.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold">{review.user}</h3>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
