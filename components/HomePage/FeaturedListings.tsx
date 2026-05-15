"use client";
import React, { useState } from "react";
import Image from "next/image";

const FeaturedListings = () => {
  const listings = [
    {
      id: 1,
      title: "Premium Camera Kit",
      price: "$50/day",
      location: "Downtown Area",
      images: [
        // ...existing code...
      ],
      type: "For Rent",
      category: "Photography",
      condition: "Excellent",
      rating: 4.8,
    },
    // ... more listings ...
  ];

  // ...existing code...

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Listings
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular items available for rent or purchase
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ... existing listing cards ... */}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
