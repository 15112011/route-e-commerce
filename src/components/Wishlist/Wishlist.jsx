import React, { useContext, useState, useEffect, useRef } from "react";
import { useWishlist } from "../../Context/wishListContext";
import ClipLoader from "react-spinners/ClipLoader";
import { cartContext } from "../../Context/cartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

// Enhanced Wishlist Item Component
const WishlistItem = ({ item, onRemove, onAddToCart, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 100);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const handleRemove = async () => {
    setIsRemoving(true);
    await onRemove(item._id);
    setIsRemoving(false);
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await onAddToCart(item._id);
    setIsAddingToCart(false);
  };

  return (
    <div
      ref={itemRef}
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="group relative bg-gradient-to-br from-white via-blue-50/30 to-gray-50/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100/50 backdrop-blur-sm overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100/20 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
          {/* Product Image */}
          <div className="relative flex-shrink-0 group/image">
            <div className="relative w-32 h-32 lg:w-28 lg:h-28 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
            </div>
            {/* Wishlist Badge */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-heart text-white text-sm"></i>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-grow text-center lg:text-left space-y-3">
            <Link 
              to={`/productDetails/${item._id}/${item.category?._id}`}
              className="block group/link"
            >
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover/link:text-blue-600 transition-colors duration-300 line-clamp-2">
                {item.title}
              </h3>
            </Link>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-gray-50 px-3 py-1 rounded-full border border-blue-100">
                <i className="fas fa-tag text-blue-500 text-sm"></i>
                <span className="text-sm font-medium text-gray-700">{item.category?.name || 'Category'}</span>
              </div>
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1 rounded-full border border-yellow-100">
                <i className="fas fa-star text-yellow-500 text-sm"></i>
                <span className="text-sm font-semibold text-gray-700">{item.ratingsAverage || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent">
                {item.price} EGP
              </div>
              {item.brand?.name && (
                <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {item.brand.name}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto lg:w-48">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-2">
                {isAddingToCart ? (
                  <ClipLoader size={16} color="white" />
                ) : (
                  <i className="fas fa-shopping-cart"></i>
                )}
                <span className="font-semibold">Add to Cart</span>
              </div>
            </button>

            <button
              onClick={handleRemove}
              disabled={isRemoving}
              className="relative px-6 py-3 text-red-600 border-2 border-red-200 bg-red-50 rounded-xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center gap-2">
                {isRemoving ? (
                  <ClipLoader size={16} color="currentColor" />
                ) : (
                  <i className="fas fa-trash"></i>
                )}
                <span className="font-semibold">Remove</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Loading Skeleton
const WishlistSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="mb-8 text-center">
      <div className="h-8 bg-gray-200 rounded-lg w-48 mx-auto mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
    </div>
    <div className="grid gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="flex-grow space-y-3">
              <div className="h-6 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-1/4 animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-3 w-48">
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Wishlist() {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useContext(cartContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const result = await addToCart(productId);
      if (result.status === "success") {
        toast.success("🎉 Product added to cart!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored"
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId);
      toast.success("✓ Product removed from wishlist", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove product from wishlist", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
    }
  };

  if (loading) {
    return <WishlistSkeleton />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full -translate-y-48 translate-x-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-100/30 to-transparent rounded-full translate-y-40 -translate-x-40 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className={`mb-12 text-center transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="relative inline-block">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
              My Wishlist
            </h1>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-gray-600 rounded-full"></div>
          </div>
          <p className="text-gray-600 mt-6 text-lg">Your favorite products saved for later</p>
          
          {/* Wishlist Stats */}
          {wishlistItems.length > 0 && (
            <div className="mt-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-100">
              <i className="fas fa-heart text-red-500"></i>
              <span className="font-semibold text-gray-700">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        {wishlistItems.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-20 transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center shadow-xl">
                <i className="fas fa-heart text-5xl text-gray-400"></i>
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <i className="fas fa-plus text-white text-lg"></i>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-md text-lg">
              Start adding products you love to see them here! Browse our collection and save your favorites.
            </p>
            
            <Link
              to="/app/products"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center gap-3">
                <i className="fas fa-shopping-bag text-xl"></i>
                <span className="font-bold text-lg">Start Shopping</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 max-w-4xl mx-auto">
            {wishlistItems.map((item, index) => (
              <WishlistItem
                key={item._id}
                item={item}
                index={index}
                onRemove={handleRemoveFromWishlist}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
