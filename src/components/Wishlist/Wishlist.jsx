import React, { useContext } from "react";
import { useWishlist } from "../../Context/wishListContext";
import ClipLoader from "react-spinners/ClipLoader";
import { cartContext } from "../../Context/cartContext";
import AnimatedWrapper from "../Shared/AnimatedWrapper";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlistItems, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useContext(cartContext);

  const handleAddToCart = async (productId) => {
    try {
      const result = await addToCart(productId);
      if (result.status === "success") {
        toast.success("🎉 Product added to cart!", {
          position: "top-right",
          autoClose: 3000,
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
      toast.success("💔 Product removed from wishlist", {
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

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <ClipLoader size={50} color="#3b82f6" />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <AnimatedWrapper animation="fadeInDown" className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">My Wishlist</h1>
            <p className="text-gray-600 text-center">Your favorite products saved for later</p>
          </AnimatedWrapper>
          
          {wishlistItems.length === 0 ? (
            <AnimatedWrapper animation="bounceIn" className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-6">💔</div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 text-center mb-8">
                Start adding products you love to see them here!
              </p>
              <button 
                onClick={() => window.location.href = '/products'}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 btn-modern shadow-blue"
              >
                Start Shopping
              </button>
            </AnimatedWrapper>
          ) : (
            <div className="grid gap-6">
              {wishlistItems.map((item, index) => (
                <AnimatedWrapper 
                  key={item._id}
                  animation="fadeInUp"
                  delay={index * 0.1}
                >
                  <div className="bg-white rounded-2xl shadow-modern hover:shadow-modern-lg transition-all duration-300 p-6 card-modern">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={item.imageCover}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-xl shadow-md"
                        />
                      </div>
                      
                      <div className="flex-grow text-center md:text-left">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-2xl font-bold text-blue-600 mb-2">
                          {item.price} EGP
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-1">
                          <i className="fas fa-star text-yellow-500"></i>
                          <span className="text-gray-600">{item.ratingsAverage || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          className="px-4 py-2 text-red-600 border-2 border-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 btn-modern"
                          onClick={() => handleRemoveFromWishlist(item._id)}
                        >
                          <i className="fas fa-trash mr-2"></i>
                          Remove
                        </button>
                        <button
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 btn-modern shadow-blue"
                          onClick={() => handleAddToCart(item._id)}
                        >
                          <i className="fas fa-shopping-cart mr-2"></i>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </AnimatedWrapper>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
