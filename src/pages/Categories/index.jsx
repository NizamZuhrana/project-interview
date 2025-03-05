import { useEffect, useState } from "react";
import Navbar from "./../../components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Star } from "lucide-react";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [search, category, sort, products]);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );

  return (
    <main>
      <Navbar />
      <div className="p-6">
        <div className="flex flex-col gap-4 mt-20 mb-6 md:flex-row">
          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3"
          />
          <select
            className="p-2 border rounded-md"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="smartphones">Fragrances</option>
            <option value="laptops">Furniture</option>
            <option value="fragrances">Fragrances</option>
            <option value="skincare">Skincare</option>
          </select>
          <select
            className="p-2 border rounded-md"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
        <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFubmVyJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D"
            alt="Banner"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black bg-opacity-50">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Big Sale is Here!
            </h1>
            <p className="mt-2 text-sm text-gray-200 md:text-lg">
              Get the best deals on your favorite products
            </p>
            <Button className="mt-4 bg-green-600 hover:bg-green-700">
              Shop Now
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10 md:grid-cols-4">
          {loading
            ? [...Array(12)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-48 bg-gray-200 rounded-md animate-pulse"
                />
              ))
            : paginatedProducts.map((product) => (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <div
                    key={product.id}
                    className="relative overflow-hidden transition border rounded-lg shadow-md group hover:shadow-lg"
                  >
                    <div className="relative">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="object-contain w-full h-48 transition-transform group-hover:scale-105"
                      />
                      <button className="absolute p-2 bg-white rounded-full shadow top-2 right-2 hover:bg-gray-100">
                        <Heart size={18} className="text-gray-600" />
                      </button>
                    </div>

                    <div className="p-4 transition group-hover:bg-gray-100">
                      <h2 className="font-semibold group-hover:text-green-600">
                        {product.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {product.category}
                      </p>

                      <div className="flex items-center mt-1 space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.round(product.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="text-xs text-gray-500">
                          ({product.rating.toFixed(1)})
                        </span>
                      </div>

                      {/* Harga */}
                      <p className="mt-1 text-lg font-bold">${product.price}</p>
                    </div>

                    {/* Tombol Add to Cart (Muncul saat hover) */}
                    <Button className="absolute text-white transition-all duration-300 transform -translate-x-1/2 bg-green-600 opacity-0 bottom-4 left-3/4 group-hover:opacity-100 hover:bg-green-700">
                      Add to Cart
                    </Button>
                  </div>
                </Link>
              ))}
        </div>

        <div className="flex items-center justify-between mt-6">
          {/* Tombol Previous di Kiri */}
          <Button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            variant="outline"
          >
            Previous
          </Button>

          {/* Nomor Halaman di Tengah */}
          <div className="flex items-center gap-2">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / perPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 border rounded-md ${
                    page === i + 1
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>

          {/* Tombol Next di Kanan */}
          <Button
            disabled={
              page * perPage >= filteredProducts.length ||
              paginatedProducts.length === 0
            }
            onClick={() => setPage(page + 1)}
            variant="outline"
          >
            Next Page
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
