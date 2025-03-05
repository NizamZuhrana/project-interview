import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, Star } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        fetchRelatedProducts(data.category);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (category) => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setRelatedProducts(data.products.filter(p => p.category === category && p.id !== parseInt(id)));
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Skeleton className="w-full h-96" />;
  }

  return (
    <main className="p-6">
      <Navbar />
      <div className="container grid grid-cols-1 gap-8 mx-auto mt-20 md:grid-cols-2">
        {/* Product Image */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-contain w-full rounded-lg shadow-lg h-96"
        />

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mb-4 text-lg text-gray-500">{product.category}</p>
          <div className="flex items-center mb-3 space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={18} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"} />
            ))}
            <span className="text-sm text-gray-500">({product.rating.toFixed(1)})</span>
          </div>
          <p className="mb-4 text-2xl font-bold text-green-600">${product.price}</p>
          <p className="mb-6 text-gray-700">{product.description}</p>
          <div className="flex space-x-4">
            <Button className="bg-green-600 hover:bg-green-700">Add to Cart</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Buy Now</Button>
            <button className="p-2 border rounded-full hover:bg-gray-200">
              <Heart size={24} className="text-red-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="overflow-hidden transition border rounded-lg shadow-md hover:shadow-lg">
              <img src={product.thumbnail} alt={product.title} className="object-contain w-full h-48" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-500">{product.category}</p>
                <p className="text-lg font-bold text-green-600">${product.price}</p>
                <Button className="w-full mt-2 bg-green-600 hover:bg-green-700">Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
