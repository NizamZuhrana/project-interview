import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <main>
      <Navbar />
      <div className="p-6">
        <div className="container grid grid-cols-1 gap-8 mx-auto mt-20 md:grid-cols-2">
          <div>
            <img
              src={product.images[currentImage]}
              alt={product.title}
              className="object-contain w-full rounded-lg shadow-lg h-96"
            />
            <div className="flex mt-2 space-x-2">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 rounded-md cursor-pointer border-2 ${
                    index === currentImage
                      ? "border-green-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="mb-4 text-lg text-gray-500">{product.category}</p>
            <div className="flex items-center mb-3 space-x-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={
                    i < Math.round(product.rating)
                      ? "text-yellow-600"
                      : "text-gray-300"
                  }
                />
              ))}
              <span className="text-sm text-gray-500">
                ({product.rating.toFixed(1)})
              </span>
            </div>
            <p className="mb-2 text-2xl font-bold text-green-600">
              ${" "}
              {(
                product.price -
                (product.price * product.discountPercentage) / 100
              ).toFixed(2)}
              <span className="ml-2 text-gray-500 line-through">
                ${product.price}
              </span>
            </p>
            <p className="mb-2 text-sm text-gray-600">
              Stock: {product.stock} left
            </p>
            <p className="mb-2 text-sm text-gray-600">Brand: {product.brand}</p>
            <p className="mb-2 text-sm text-gray-600">
              Warranty: {product.warrantyInformation}
            </p>
            <p className="mb-6 text-gray-700">{product.description}</p>
            <div className="flex space-x-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Add to Cart
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Buy Now</Button>
              <button className="p-2 border rounded-full hover:bg-gray-200">
                <Heart size={24} className="text-red-500" />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          <div className="max-w-xl mt-4 ">
            {product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-4 mb-4 border rounded-md shadow-sm"
                >
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                    <span className="text-sm text-gray-600">
                      ({review.rating})
                    </span>
                  </div>
                  <p className="mt-1 font-semibold">{review.reviewerName}</p>
                  <p className="text-gray-600">{review.comment}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(review.date).toDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
