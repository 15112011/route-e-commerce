import React, { useContext, useEffect, useState, useRef } from 'react';
import { cartContext } from '../../Context/cartContext';
import cart1 from "../../assets/images/output-onlinegiftools.gif";
import { Link } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from 'react-toastify';

// Enhanced Cart Item Component
const CartItem = ({ product, index, onUpdate, onDelete, loadingItems }) => {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <div
      ref={itemRef}
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="group relative bg-gradient-to-br from-white via-blue-50/20 to-gray-50/30 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-gray-100/50 backdrop-blur-sm overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gray-100/20 to-transparent rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6">
          {/* Product Image */}
          <div className="relative flex-shrink-0 group/image">
            <div className="relative w-32 h-32 lg:w-28 lg:h-28 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={product.product.imageCover}
                alt={product.product.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover/image:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
            </div>
            {/* Cart Badge */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
              <i className="fas fa-shopping-cart text-white text-sm"></i>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-grow text-center lg:text-left space-y-3">
            <Link 
              to={`/productDetails/${product.product._id}/${product.product.category?._id}`}
              className="block group/link"
            >
              <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover/link:text-blue-600 transition-colors duration-300 line-clamp-2">
                {product.product.title}
              </h3>
            </Link>
            
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-3">
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-gray-50 px-3 py-1 rounded-full border border-blue-100">
                <i className="fas fa-tag text-blue-500 text-sm"></i>
                <span className="text-sm font-medium text-gray-700">{product.product.category?.name || 'Category'}</span>
              </div>
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1 rounded-full border border-yellow-100">
                <i className="fas fa-star text-yellow-500 text-sm"></i>
                <span className="text-sm font-semibold text-gray-700">{product.product.ratingsAverage || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent">
                {product.price} EGP
              </div>
              <span className="text-sm text-gray-500">per item</span>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-col gap-4 w-full sm:w-auto lg:w-48">
            {/* Quantity Controls */}
            <div className="flex items-center justify-center bg-white rounded-2xl p-2 shadow-md border border-gray-100">
              <button
                onClick={() => onUpdate(product.product._id, product.count - 1)}
                disabled={product.count <= 1 || loadingItems[product.product._id]}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-minus text-sm"></i>
              </button>
              <div className="w-16 text-center">
                {loadingItems[product.product._id] === 'update' ? (
                  <ClipLoader size={16} color="#2563EB" />
                ) : (
                  <span className="font-bold text-gray-800 text-lg">{product.count}</span>
                )}
              </div>
              <button
                onClick={() => onUpdate(product.product._id, product.count + 1)}
                disabled={loadingItems[product.product._id]}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="fas fa-plus text-sm"></i>
              </button>
            </div>

            {/* Total Price and Remove */}
            <div className="flex items-center justify-between bg-white rounded-2xl p-3 shadow-md border border-gray-100">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {(product.price * product.count).toLocaleString()} EGP
                </div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
              <button
                onClick={() => onDelete(product.product._id)}
                disabled={loadingItems[product.product._id]}
                className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                title="Remove item"
              >
                {loadingItems[product.product._id] === 'delete' ? (
                  <ClipLoader size={16} color="#EF4444" />
                ) : (
                  <i className="fas fa-trash text-sm group-hover/btn:scale-110 transition-transform duration-200"></i>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Loading Skeleton
const CartSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl p-8 mb-8 shadow-lg">
      <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-6 animate-pulse"></div>
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-3xl shadow-lg p-6">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="w-32 h-32 bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="flex-grow space-y-3">
              <div className="h-6 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-1/2 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded-lg w-1/4 animate-pulse"></div>
            </div>
            <div className="w-48 space-y-3">
              <div className="h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function Cart() {
  const { cartDetails, removeProduct, updateCount } = useContext(cartContext);
  const [loadingItems, setLoadingItems] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  async function deleteProduct(id) {
    setLoadingItems(prev => ({ ...prev, [id]: 'delete' }));
    try {
      let data = await removeProduct(id);
      if (data.status === "success") {
        toast.success("✓ Product removed from cart", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored"
        });
      }
    } catch (error) {
      toast.error("Failed to remove product from cart", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
    } finally {
      setLoadingItems(prev => ({ ...prev, [id]: null }));
    }
  }

  async function updateItems(id, count) {
    if (count < 1) return;
    setLoadingItems(prev => ({ ...prev, [id]: 'update' }));
    try {
      let data = await updateCount(id, count);
      if (data.status === "success") {
        toast.success("🛒 Cart updated successfully", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored"
        });
      }
    } catch (error) {
      toast.error("Failed to update cart", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
    } finally {
      setLoadingItems(prev => ({ ...prev, [id]: null }));
    }
  }

  const EmptyCartComponent = () => (
    <div className={`flex flex-col items-center justify-center py-20 transform transition-all duration-1000 delay-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
    }`}>
      <div className="relative mb-8">
        <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center shadow-2xl">
          <img src={cart1} className="w-32 h-32 object-contain" alt="Empty Cart" />
        </div>
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <i className="fas fa-plus text-white text-2xl"></i>
        </div>
      </div>
      
      <h1 className='text-4xl font-bold text-gray-800 mb-4 text-center'>
        Your Cart is Empty
      </h1>
      <p className="text-lg text-gray-600 text-center mb-8 max-w-md">
        Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
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
  );

  if (!cartDetails) {
    return <CartSkeleton />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-transparent rounded-full -translate-y-48 translate-x-48 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-100/30 to-transparent rounded-full translate-y-40 -translate-x-40 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {cartDetails?.data?.products?.length === 0 ? (
          <EmptyCartComponent />
        ) : (
          <>
            {/* Header Section */}
            <div className={`mb-12 transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-gray-700 to-blue-600 bg-clip-text text-transparent mb-4">
                    Shopping Cart
                  </h1>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-gray-600 rounded-full"></div>
                </div>
                <p className="text-gray-600 mt-6 text-lg">Review and manage your selected items</p>
              </div>

              {/* Cart Summary Cards */}
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mr-4">
                      <i className="fas fa-box text-blue-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Total Items</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent">
                        {cartDetails.numOfCartItems}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mr-4">
                      <i className="fas fa-money-bill-wave text-gray-600 text-xl"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Total Price</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-gray-600 bg-clip-text text-transparent">
                        {cartDetails.data.totalCartPrice} EGP
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="grid gap-8 max-w-4xl mx-auto mb-12">
              {cartDetails.data.products.map((product, index) => (
                <CartItem
                  key={product.product._id}
                  product={product}
                  index={index}
                  onUpdate={updateItems}
                  onDelete={deleteProduct}
                  loadingItems={loadingItems}
                />
              ))}
            </div>

            {/* Checkout Section */}
            <div className={`max-w-4xl mx-auto transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="bg-gradient-to-r from-blue-50/80 to-gray-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                  <div className="text-center lg:text-left">
                    <h3 className="text-3xl font-bold text-gray-900 mb-3">
                      Ready to Checkout?
                    </h3>
                    <p className="text-gray-600 text-lg">
                      Review your items and proceed to secure payment
                    </p>
                    <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-500">
                      <i className="fas fa-shield-alt text-green-500"></i>
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/app/products"
                      className="px-8 py-4 text-blue-600 border-2 border-blue-600 bg-blue-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold text-center shadow-lg hover:shadow-xl"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      Continue Shopping
                    </Link>
                    <Link
                      to={'/app/checkout'}
                      className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold shadow-lg hover:shadow-xl hover:scale-105 text-center overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative flex items-center justify-center gap-3">
                        <i className="fas fa-credit-card text-xl"></i>
                        <span className="text-lg">Proceed to Checkout</span>
                        <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
