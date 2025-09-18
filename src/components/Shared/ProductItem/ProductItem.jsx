import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { tokenContext } from "../../../Context/tokenContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useWishlist } from "../../../Context/wishListContext";

// Skeleton Loading Component for Product Card
const ProductCardSkeleton = () => (
  <div className="w-full">
    <div className="relative p-6 bg-white rounded-3xl shadow-lg animate-pulse overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer"></div>
      
      {/* Image skeleton */}
      <div className="w-full h-48 sm:h-56 lg:h-64 bg-gray-200 rounded-2xl mb-4"></div>
      
      {/* Content skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="flex justify-between items-center">
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/5"></div>
        </div>
        <div className="h-12 bg-gray-200 rounded-xl mt-4"></div>
      </div>
    </div>
  </div>
);

export default function ProductItem(props) {
  const { imageCover, title, category, price, ratingsAverage, id } = props.product;
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { token } = useContext(tokenContext);

  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistActionLoading, setWishlistActionLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const isWishlistActive = wishlistItems.some((item) => item._id === id);

  // Intersection Observer for entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = useCallback(async () => {
    setCartLoading(true);
    try {
      await props.addProductsToCart(id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setCartLoading(false);
    }
  }, [id, props]);

  const handleWishlistClick = useCallback(async () => {
    setWishlistActionLoading(true);
    try {
      if (isWishlistActive) {
        await removeFromWishlist(id);
      } else {
        await addToWishlist(id);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setWishlistActionLoading(false);
    }
  }, [id, isWishlistActive, addToWishlist, removeFromWishlist]);

  return (
    <div 
      ref={cardRef}
      className={`w-full transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div 
        className="relative group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100/30 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700 delay-200"></div>

        {/* Wishlist Button - Top Right */}
        <div className="absolute right-4 top-4 z-20">
          <button
            type="button"
            className={`w-12 h-12 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 flex items-center justify-center group/heart ${
              isWishlistActive 
                ? 'bg-blue-500/90 text-white scale-110' 
                : 'bg-white/90 text-gray-600 hover:bg-blue-500/90 hover:text-white hover:scale-110'
            }`}
            onClick={handleWishlistClick}
            disabled={wishlistActionLoading}
            aria-label="Toggle wishlist"
          >
            {wishlistActionLoading ? (
              <ClipLoader size={16} color={isWishlistActive ? "#fff" : "#2563EB"} />
            ) : (
              <i className={`text-lg transition-all duration-300 ${
                isWishlistActive ? 'fas fa-heart animate-pulse' : 'far fa-heart group-hover/heart:fas'
              }`}></i>
            )}
          </button>
        </div>

        {/* Product Image Section */}
        <div className="relative p-6 pb-4">
          <Link to={`/productDetails/${id}/${category._id}`} className="block">
            <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden rounded-2xl bg-gray-100">
              {/* Image Loading State */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
              )}
              
              <img
                src={imageCover}
                alt={title}
                className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
              
              {/* Error Fallback */}
              {imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-gray-100 flex items-center justify-center">
                  <i className="fas fa-image text-gray-400 text-4xl"></i>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Quick Action Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart();
                  }}
                  className="px-6 py-3 bg-white/95 backdrop-blur-sm text-blue-600 font-semibold rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                  disabled={cartLoading}
                >
                  {cartLoading ? (
                    <ClipLoader size={16} color="#2563EB" />
                  ) : (
                    <>
                      <i className="fas fa-shopping-cart mr-2"></i>
                      Quick Add
                    </>
                  )}
                </button>
              </div>
            </div>
          </Link>
        </div>

        {/* Product Content */}
        <div className="px-6 pb-6">
          <Link to={`/productDetails/${id}/${category._id}`} className="block">
            {/* Category Badge */}
            <div className="mb-3">
              <span className="inline-block px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full border border-blue-100">
                {category.name}
              </span>
            </div>

            {/* Product Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
              {title.split(" ").slice(0, 3).join(" ")}
            </h3>

            {/* Price and Rating */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">{price}</span>
                <span className="text-sm text-gray-500">EGP</span>
              </div>
              <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <span className="text-sm font-semibold text-gray-700">{ratingsAverage}</span>
              </div>
            </div>
          </Link>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              disabled={cartLoading}
            >
              {cartLoading ? (
                <div className="flex items-center justify-center">
                  <ClipLoader size={16} color="#fff" />
                  <span className="ml-2">Adding...</span>
                </div>
              ) : (
                <>
                  <i className="fas fa-shopping-cart mr-2"></i>
                  Add to Cart
                </>
              )}
            </button>

            <button
              onClick={handleWishlistClick}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${
                isWishlistActive
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                  : 'bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200'
              }`}
              disabled={wishlistActionLoading}
              title={isWishlistActive ? "Remove from wishlist" : "Add to wishlist"}
            >
              {wishlistActionLoading ? (
                <ClipLoader size={16} color={isWishlistActive ? "#fff" : "#dc2626"} />
              ) : (
                <i className={`text-lg ${isWishlistActive ? 'fas fa-heart' : 'far fa-heart'}`}></i>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px);
          background-size: 200px;
          animation: shimmer 1.5s infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    imageCover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
    ratingsAverage: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  addProductsToCart: PropTypes.func.isRequired,
};
