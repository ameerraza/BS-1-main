import { Button } from "./Button";
import { useState } from "react";

interface FilterProps {
  categories: string[];
  onApplyFilters: (filters: any) => void;
  onResetFilters: () => void;
  isApplyingFilters: boolean;
}

const Filter = ({
  categories,
  onApplyFilters,
  onResetFilters,
  isApplyingFilters,
}: FilterProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);

  const handleApplyClick = () => {
    onApplyFilters({
      categories: selectedCategories,
      condition: selectedCondition,
      priceRange: priceRange,
    });
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedCondition("");
    setPriceRange([0, 1000]);
    onResetFilters();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sticky top-28">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Filters</h2>
        <button
          onClick={handleReset}
          className="text-blue-600 text-sm hover:text-blue-800"
        >
          Reset all
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-2 mb-4">
        <h3 className="font-semibold text-gray-800">Categories</h3>
        <div className="space-y-2">
          {categories.map((category: any, index: any) => (
            <label
              key={index}
              className="flex items-center space-x-1 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() =>
                  setSelectedCategories((prev) =>
                    prev.includes(category)
                      ? prev.filter((c) => c !== category)
                      : [...prev, category]
                  )
                }
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 group-hover:text-blue-600">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-1 mb-4">
        <h3 className="font-semibold text-gray-800">Price Range</h3>
        <div className="relative">
          <input
            type="range"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
            min="0"
            max="1000"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              Min Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                PKR
              </span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([
                    Math.min(+e.target.value, priceRange[1]),
                    priceRange[1],
                  ])
                }
                className="w-full pl-14 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">
              Max Price
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                PKR
              </span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Math.max(+e.target.value, priceRange[0]),
                  ])
                }
                className="w-full pl-14 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Condition */}
      <div className="space-y-1 mb-8">
        <h3 className="font-semibold text-gray-800">Condition</h3>
        <select
          value={selectedCondition}
          onChange={(e) => setSelectedCondition(e.target.value)}
          className="w-full rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Any</option>
          <option value="excellent">Excellent</option>
          <option value="like new">Like New</option>
          <option value="good">Good</option>
          <option value="fair">Fair</option>
        </select>
      </div>

      <Button
        variant="primary"
        className="w-full"
        onClick={handleApplyClick}
        disabled={isApplyingFilters}
      >
        {isApplyingFilters ? "Applying..." : "Apply Filters"}
      </Button>
    </div>
  );
};

export default Filter;
