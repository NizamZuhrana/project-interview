import { useState } from "react";
import { Search, ShoppingCart, User, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchModal from "./../SearchModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <a href="/" className="text-2xl font-bold text-green-600">
          Shopx
        </a>
        <div className="hidden space-x-6 md:flex">
          <a href="#" className="text-gray-700 hover:text-green-600">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Men
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Women
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Kids
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Sale
          </a>
        </div>
        <div className="flex items-center space-x-7">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="text-gray-600 hover:text-green-600"
          >
            <Search size={20} />
          </button>
          <button className="text-gray-600 hover:text-green-600">
            <Heart size={20} />
          </button>
          <button className="text-gray-600 hover:text-green-600">
            <ShoppingCart size={20} />
          </button>
          <button className="text-gray-600 hover:text-green-600">
            <User size={20} />
          </button>
        </div>
        <button
          className="text-gray-600 md:hidden hover:text-green-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      {isOpen && (
        <div className="flex flex-col px-6 py-4 space-y-4 bg-white shadow-md md:hidden">
          <a href="#" className="text-gray-700 hover:text-green-600">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Men
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Women
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Kids
          </a>
          <a href="#" className="text-gray-700 hover:text-green-600">
            Sale
          </a>
        </div>
      )}
    </nav>
  );
}
