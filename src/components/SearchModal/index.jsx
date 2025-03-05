import { useState, useEffect } from "react";
import { X, Search, Star, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [trendingSearches, setTrendingSearches] = useState([]);
  const [trendingCollections, setTrendingCollections] = useState([]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();

        // Ambil trending searches berdasarkan rating tertinggi
        const trending = data.products
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5)
          .map((product) => ({
            title: product.title,
            thumbnail: product.thumbnail,
            rating: product.rating
          }));

        // Ambil trending collections berdasarkan kategori populer
        const categoryCount = data.products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});

        const trendingCategories = Object.keys(categoryCount)
          .sort((a, b) => categoryCount[b] - categoryCount[a])
          .slice(0, 5);

        setTrendingSearches(trending);
        setTrendingCollections(trendingCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTrendingData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() !== "" && !recentSearches.includes(term)) {
      setRecentSearches([term, ...recentSearches.slice(0, 4)]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Search</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={20} />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="relative mb-4">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </form>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-600">Recent Searches</h3>
              <button
                onClick={clearRecentSearches}
                className="flex items-center text-xs text-red-600 hover:text-red-800"
              >
                <Trash2 size={14} className="mr-1" />
                Clear
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleSearch(search)}
                  className="px-3 py-1 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Trending Searches (With Image & Rating) */}
        <div className="mb-4">
          <h3 className="mb-2 text-sm font-semibold text-gray-600">Trending Searches</h3>
          <div className="space-y-3">
            {trendingSearches.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSearch(item.title)}
                className="flex items-center w-full p-2 transition border rounded-md hover:bg-gray-100"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="object-cover w-12 h-12 mr-3 rounded-md"
                />
                <div className="text-left">
                  <p className="text-sm font-medium">{item.title}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Star size={12} className="text-yellow-400" />
                    <span>{item.rating.toFixed(1)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trending Collections */}
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-600">Trending Collections</h3>
          <div className="flex flex-wrap gap-2">
            {trendingCollections.map((collection, index) => (
              <button
                key={index}
                className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200"
              >
                {collection}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
