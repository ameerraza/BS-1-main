"use client";
import { getAllProducts, searchProduct } from "@/api/api";
import { useLoaderStore } from "@/stores/useLoaderStore";
import useToastStore from "@/stores/toastStore";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import SearchBar from "../../../../components/HomePage/SearchBar";
import { Button } from "../../../../components/common/Button";
import Pagination from "../../../../components/common/Pagination";
import { SearchPageCards } from "../../../../components/common/SearchPageCards";
import searchPageData from "../../../data/SearchPageData.json";
import WhyChooseUs from "../../../../components/HomePage/WhyChooseUs";
import Filter from "../../../../components/common/Filter";

// Main search component that uses useSearchParams
const SearchContent = () => {
  const searchParams = useSearchParams();
  const { showLoader, hideLoader } = useLoaderStore();
  const { showToast } = useToastStore();
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [isApplyingFilters, setIsApplyingFilters] = useState(false);
  // Get search query and category from URL
  const query = searchParams.get("q") || "";
  const categoryFromUrl = searchParams.get("category") || "";

  // Update initial state of activeFilters to include category from URL
  const [activeFilters, setActiveFilters] = useState({
    categories: categoryFromUrl ? [categoryFromUrl] : [],
    condition: "",
    priceRange: [0, 1500] as number[],
  });

  // Update selectedCategories initial state
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromUrl ? [categoryFromUrl] : []
  );

  // Effect to handle URL parameter changes
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveFilters((prev) => ({
        ...prev,
        categories: [category],
      }));
      setSelectedCategories([category]);
    }
  }, [searchParams]);

  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (query) {
        performSearch(query);
      }
    }, 0);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    try {
      showLoader();
      const response = await searchProduct(searchQuery);
      if (response.success) {
        setSearchResults(response.data);
        // showToast("Search completed", "success");
      } else {
        showToast("No results found", "error");
      }
    } catch (error) {
      showToast("Error performing search", "error");
    } finally {
      hideLoader();
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    showLoader();
    try {
      const response: any = await getAllProducts();
      if (response.success) {
        setProducts(response.products.reverse());
      }
    } catch (error) {
      showToast("Error loading products", "error");
    } finally {
      hideLoader();
    }
  };

  const { properties: allProperties }: any = searchPageData;

  // State for active filters
  // const [activeFilters, setActiveFilters] = useState({
  //   categories: [] as string[],
  //   condition: "",
  //   priceRange: [0, 1500] as number[], // Updated max range based on data
  // });

  // State for temporary filter values
  // const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  // Other state
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const itemsPerPage = 12;

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Apply filters only when button is clicked
  const handleApplyFilters = async (filters: any) => {
    setIsApplyingFilters(true);
    showLoader();

    try {
      // Simulate some loading time for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      setActiveFilters(filters);
      setCurrentPage(1);
      scrollToTop();
    } finally {
      setIsApplyingFilters(false);
      hideLoader();
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSortBy("newest");
    setCurrentPage(1);
    setActiveFilters({
      categories: [],
      condition: "",
      priceRange: [0, 1000],
    });
  };

  // Filter and sort properties
  useEffect(() => {
    let result: any = products; // Use products instead of allProperties

    // Apply category filter with null check
    if (activeFilters.categories.length > 0) {
      result = result.filter((item: any) =>
        activeFilters.categories.includes(
          item.category?.name || "Uncategorized"
        )
      );
    }

    // Apply condition filter with null check
    if (activeFilters.condition) {
      result = result.filter(
        (item: any) =>
          (item.condition || "").toLowerCase() ===
          activeFilters.condition.toLowerCase()
      );
    }

    // Apply price filter with null checks
    result = result.filter((item: any) => {
      const buyPrice = item.price || 0;
      const rentPrice = item.rentPrice || 0;
      const maxPrice = Math.max(buyPrice, rentPrice);
      return (
        maxPrice >= activeFilters.priceRange[0] &&
        maxPrice <= activeFilters.priceRange[1]
      );
    });

    // Apply sorting with null checks
    switch (sortBy) {
      case "price-low":
        result.sort((a: any, b: any) => {
          const aPrice = Math.min(a.price || Infinity, a.rentPrice || Infinity);
          const bPrice = Math.min(b.price || Infinity, b.rentPrice || Infinity);
          return aPrice - bPrice;
        });
        break;
      case "price-high":
        result.sort((a: any, b: any) => {
          const aPrice = Math.max(a.price || 0, a.rentPrice || 0);
          const bPrice = Math.max(b.price || 0, b.rentPrice || 0);
          return bPrice - aPrice;
        });
        break;
      case "newest":
        result.sort((a: any, b: any) => {
          const aDate = new Date(a.createdAt || 0).getTime();
          const bDate = new Date(b.createdAt || 0).getTime();
          return bDate - aDate;
        });
        break;
    }

    setFilteredProperties(result);
  }, [activeFilters, sortBy, products]);

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages: any = Math.ceil(filteredProperties.length / itemsPerPage);

  // Get unique categories from the data with null check
  const categories: any = Array.from(
    new Set(
      products.map((product: any) => product.category?.name || "Uncategorized")
    )
  );

  // Modify pagination handler
  const handlePageChange = (page: number) => {
    showLoader();
    setTimeout(() => {
      setCurrentPage(page);
      scrollToTop();
      hideLoader();
    }, 300);
  };

  return (
    <div className="min-h-screen">
      {/* Pass the current query to SearchBar */}
      <div className="py-8 px-4 flex items-center justify-center">
        <SearchBar />
      </div>

      {/* Use searchResults instead of the static data */}
      <div className=" mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Replace the filter sidebar with the Filter component */}
          <div className="md:w-80 shrink-0">
            <Filter
              categories={categories}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
              isApplyingFilters={isApplyingFilters}
            />
          </div>

          {/* Results Section */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {currentItems.length} of {filteredProperties.length}{" "}
                results
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* SearchPageCards with filtered items */}
            <SearchPageCards products={currentItems} />

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredProperties.length}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <WhyChooseUs />
    </div>
  );
};

// Add loading fallback component
const SearchPageLoader = () => {
  return <div>Loading...</div>;
};

// Main page component with Suspense boundary
const SearchPage = () => {
  return (
    <Suspense fallback={<SearchPageLoader />}>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
