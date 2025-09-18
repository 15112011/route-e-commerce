import axios from "axios";
import React, { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import Slider from "react-slick";
import { cartContext } from "../../Context/cartContext";
import { useWishlist } from "../../Context/wishListContext";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";

// Enhanced Image Gallery Component
const ImageGallery = ({ images, productTitle }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState({});
  const imageRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!isZoomed || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  }, [isZoomed]);

  const handleImageChange = (index) => {
    setCurrentImage(index);
    setIsZoomed(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-3xl flex items-center justify-center">
        <div className="text-center text-gray-500">
          <i className="fas fa-image text-4xl mb-2"></i>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200">
        <div 
          ref={imageRef}
          className="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden cursor-zoom-in group"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => {
            setIsZoomed(false);
            setZoomPosition({ x: 50, y: 50 });
          }}
          onMouseMove={handleMouseMove}
        >
          {!imageLoaded[currentImage] && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
          )}
          
          <img
            src={images[currentImage]}
            alt={`${productTitle} - Image ${currentImage + 1}`}
            className={`w-full h-full object-cover transition-all duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            } ${imageLoaded[currentImage] ? 'opacity-100' : 'opacity-0'}`}
            style={isZoomed ? {
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            } : {}}
            onLoad={() => setImageLoaded(prev => ({ ...prev, [currentImage]: true }))}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => handleImageChange(currentImage === 0 ? images.length - 1 : currentImage - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
              >
                <i className="fas fa-chevron-left text-gray-700"></i>
              </button>
              <button
                onClick={() => handleImageChange(currentImage === images.length - 1 ? 0 : currentImage + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
              >
                <i className="fas fa-chevron-right text-gray-700"></i>
              </button>
            </>
          )}
          
          {/* Zoom Indicator */}
          {isZoomed && (
            <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-2 rounded-full text-sm backdrop-blur-sm">
              <i className="fas fa-search-plus mr-2"></i>
              Zoom Active
            </div>
          )}
          
          {/* Image Counter */}
          <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 rounded-full text-sm backdrop-blur-sm">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                currentImage === index 
                  ? 'ring-3 ring-blue-500 ring-offset-2 scale-105' 
                  : 'hover:ring-2 hover:ring-gray-300 hover:scale-105'
              }`}
            >
              <img
                src={image}
                alt={`${productTitle} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


// Product Details Skeleton
const ProductDetailsSkeleton = () => (
  <div className="flex flex-col lg:flex-row gap-8 p-6 lg:p-10">
    {/* Image Skeleton */}
    <div className="w-full lg:w-1/2">
      <div className="w-full h-64 md:h-96 lg:h-[500px] bg-gray-200 rounded-3xl animate-pulse"></div>
    </div>
    
    {/* Content Skeleton */}
    <div className="w-full lg:w-1/2 space-y-6">
      <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
      <div className="flex gap-4">
        <div className="h-8 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>
      <div className="h-16 bg-gray-200 rounded-xl animate-pulse"></div>
      <div className="flex gap-4">
        <div className="h-12 bg-gray-200 rounded-xl flex-1 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded-xl w-16 animate-pulse"></div>
      </div>
    </div>
  </div>
);

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isVisible, setIsVisible] = useState(true); // Set to true by default
  
  let { addToCart } = useContext(cartContext);
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  let { id, categoryId } = useParams();
  
  const detailsRef = useRef(null);

  const isWishlistActive = wishlistItems.some((item) => item._id === id);

  // Intersection Observer for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  async function addProductsToCart(id) {
    setLoading(true);
    let data = await addToCart(id);
    setLoading(false);
    if (data.status === "success") {
      toast.success('🎉 Success! Your item is in the cart.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  async function handleWishlistClick() {
    setWishlistLoading(true);
    try {
      if (isWishlistActive) {
        await removeFromWishlist(id);
        toast.info('💔 Removed from wishlist', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        await addToWishlist(id);
        toast.success('❤️ Added to wishlist!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error('❌ Failed to update wishlist', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setWishlistLoading(false);
    }
  }

  async function getProductDetails() {
    setPageLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (err) {
      console.error('Error loading product details:', err);
      toast.error('Failed to load product details', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getProductDetails();
    }
  }, [id]);


  if (pageLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductDetailsSkeleton />
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <i className="fas fa-exclamation-triangle text-6xl text-gray-400 mb-4"></i>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Product Not Found</h2>
            <p className="text-gray-500">The product you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div 
        ref={detailsRef}
        className={`relative bg-gradient-to-br from-blue-50 via-white to-gray-50 rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -translate-y-48 translate-x-48 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-100/20 to-transparent rounded-full translate-y-40 -translate-x-40 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 p-6 lg:p-12">
          {/* Image Gallery Section */}
          <div className="w-full lg:w-1/2">
            <ImageGallery images={productDetails?.images} productTitle={productDetails?.title} />
          </div>

          {/* Product Information Section */}
          <div className="w-full lg:w-1/2 space-y-6 relative z-20">
            {/* Product Title */}
            <div className="space-y-3 bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {productDetails?.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full border border-blue-200">
                  <i className="fas fa-tag mr-2"></i>
                  {productDetails?.category?.name}
                </span>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
                  <i className="fas fa-star text-yellow-400"></i>
                  <span className="font-semibold text-gray-700">{productDetails?.ratingsAverage}</span>
                  <span className="text-sm text-gray-500">({productDetails?.ratingsQuantity || 0} reviews)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {productDetails?.description}
              </p>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-blue-50/90 to-gray-50/90 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-600 uppercase tracking-wide font-medium">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">{productDetails?.price}</span>
                    <span className="text-lg text-gray-600 font-medium">EGP</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-600 font-medium">Brand</span>
                  <div className="text-lg font-semibold text-gray-900">{productDetails?.brand?.name || 'Generic'}</div>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="fas fa-sort-numeric-up text-blue-500 mr-2"></i>
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <i className="fas fa-minus text-gray-600"></i>
                  </button>
                  <span className="px-6 py-3 font-bold text-gray-900 bg-white min-w-[80px] text-center text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <i className="fas fa-plus text-gray-600"></i>
                  </button>
                </div>
                <div className="text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-full border border-green-200">
                  <i className="fas fa-check-circle text-green-500 mr-1"></i>
                  In Stock
                </div>
              </div>
            </div>

            {/* Wishlist Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isWishlistActive ? 'bg-red-100 scale-110' : 'bg-gray-100'
                  }`}>
                    <i className={`text-xl transition-all duration-300 ${
                      isWishlistActive ? 'fas fa-heart text-red-500 animate-pulse' : 'far fa-heart text-gray-400'
                    }`}></i>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base">
                      {isWishlistActive ? "In your wishlist" : "Save for later"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {isWishlistActive ? "You can find this in your wishlist" : "Add to wishlist to save for later"}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  isWishlistActive ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {isWishlistActive ? "Saved" : "Not saved"}
                </span>
              </div>
              
              <button
                onClick={handleWishlistClick}
                className={`w-full py-3 px-4 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isWishlistActive
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 border border-gray-200 hover:border-red-200'
                }`}
                disabled={wishlistLoading}
              >
                {wishlistLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <ClipLoader size={16} color={isWishlistActive ? "#fff" : "#dc2626"} />
                    <span>Updating...</span>
                  </div>
                ) : (
                  <>
                    <i className={`mr-2 fa fa-heart ${isWishlistActive ? "fas" : "far"}`}></i>
                    {isWishlistActive ? "Remove from Wishlist" : "Add to Wishlist"}
                  </>
                )}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleWishlistClick}
                className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ${
                  isWishlistActive
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                    : 'bg-white hover:bg-red-50 text-gray-700 hover:text-red-600 border-2 border-gray-200 hover:border-red-200'
                }`}
                disabled={wishlistLoading}
                title={isWishlistActive ? "Remove from wishlist" : "Add to wishlist"}
              >
                {wishlistLoading ? (
                  <ClipLoader size={18} color={isWishlistActive ? "#fff" : "#dc2626"} />
                ) : (
                  <i className={`text-xl ${isWishlistActive ? 'fas fa-heart' : 'far fa-heart'}`}></i>
                )}
              </button>
              
              <button 
                onClick={() => addProductsToCart(productDetails.id)} 
                className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <ClipLoader size={18} color="#fff" />
                    <span>Adding to Cart...</span>
                  </div>
                ) : (
                  <>
                    <i className="fas fa-shopping-cart mr-3"></i>
                    Add {quantity} to Cart
                  </>
                )}
              </button>
            </div>

            {/* Additional Product Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-green-50/90 backdrop-blur-sm rounded-xl p-4 border border-green-200 shadow-sm">
                <div className="flex items-center gap-2 text-green-700">
                  <i className="fas fa-shipping-fast text-lg"></i>
                  <span className="font-semibold">Free Shipping</span>
                </div>
                <p className="text-sm text-green-600 mt-1">On orders over 500 EGP</p>
              </div>
              <div className="bg-blue-50/90 backdrop-blur-sm rounded-xl p-4 border border-blue-200 shadow-sm">
                <div className="flex items-center gap-2 text-blue-700">
                  <i className="fas fa-undo text-lg"></i>
                  <span className="font-semibold">Easy Returns</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Related Products</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-gray-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4">Discover similar products you might like</p>
        </div>
        <RelatedProducts categoryId={categoryId} />
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
      `}</style>
    </div>
  );
}