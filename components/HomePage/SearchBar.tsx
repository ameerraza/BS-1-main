"use client";
import { searchProduct } from "@/api/api";
import useToastStore from "@/stores/toastStore";
import { useLoaderStore } from "@/stores/useLoaderStore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const SearchBar = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { showToast } = useToastStore();
  const [isLoading, setIsLoading] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowDropdown(false);
    if (searchTerm.trim()) {
      try {
        setIsLoading(true);
        const response = await searchProduct(searchTerm.trim());
        if (response.success == true) {
          setResults(response.products);
          setShowDropdown(true);
        } else {
          showToast("No results found", "error");
          setResults([]);
          setShowDropdown(false);
        }
      } catch (error) {
        showToast("Error performing search", "error");
        setResults([]);
        setShowDropdown(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleItemClick = (result: any) => {
    setShowDropdown(false);
    router.push(`/product/${result.id}`);
  };

  return (
    <div className="flex w-full max-w-2xl items-center px-4">
      <div className="relative w-full" ref={dropdownRef}>
        <form className="relative flex w-full group ring-2 ring-blue-950 rounded-lg">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {isLoading ? <ImSpinner8 className="animate-spin" /> : <FaSearch />}
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search items..."
            className="w-full rounded-l-lg border-0 py-3 md:py-4 pl-10 pr-3 focus:outline-none"
          />
          <button
            onClick={(e) => handleSearch(e)}
            className="rounded-r-md bg-blue-900 px-4 md:px-6 py-3 text-white font-semibold hover:bg-blue-950"
          >
            Search
          </button>
        </form>

        {/* Search Results Dropdown */}
        {showDropdown && results?.length > 0 && (
          <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-[200px] overflow-y-auto">
            {results.map((result: any) => (
              <div
                key={result.id}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleItemClick(result)}
              >
                {result.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
