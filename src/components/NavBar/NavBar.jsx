import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { tokenContext } from "../../Context/tokenContext";
import { cartContext } from "../../Context/cartContext";
import { useWishlist } from "../../Context/wishListContext";

export default function Navbar() {
  const { token, setToken } = useContext(tokenContext);
  const { numOfCartItems } = useContext(cartContext);
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [padding, setPadding] = useState(false);
  const sidebarRef = useRef(null);

  // Scroll event handler
  const handleNavPad = () => {
    setPadding(window.scrollY > 0);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Add event listener on mount and clean up on unmount
  useEffect(() => {
    window.addEventListener("scroll", handleNavPad);
    return () => {
      window.removeEventListener("scroll", handleNavPad);
    };
  }, []);

  // Close sidebar when route changes
  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        padding 
          ? "py-3 bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-100" 
          : "py-4 bg-white/90 backdrop-blur-lg shadow-lg"
      }`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
          {/* Logo */}
          <NavLink to="" className="flex items-center">
            <img 
              src={logo} 
              width="160px" 
              alt="FreshCart Logo" 
              className="transition-all duration-300 hover:scale-105" 
            />
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            {token && (
              <>
                {[
                  { name: "Home", path: "home", icon: "fas fa-home" },
                  { name: "Products", path: "products", icon: "fas fa-box" },
                  { name: "Categories", path: "categories", icon: "fas fa-th-large" },
                  { name: "Brands", path: "brands", icon: "fas fa-tags" },
                ].map(({ name, path, icon }) => (
                  <NavLink
                    key={name}
                    to={path}
                    className={({ isActive }) =>
                      `relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                        isActive
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      }`
                    }
                  >
                    <div className="flex items-center gap-2">
                      <i className={`${icon} text-sm`}></i>
                      <span>{name}</span>
                    </div>
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                  </NavLink>
                ))}
              </>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <>
                {/* Cart Icon */}
                <NavLink to="cart" className="relative group">
                  <div className="relative p-3 rounded-xl bg-gradient-to-r from-blue-50 to-gray-50 hover:from-blue-100 hover:to-gray-100 transition-all duration-300 hover:scale-110">
                    <i className="fas fa-shopping-cart text-xl text-blue-600"></i>
                    {numOfCartItems > 0 && (
                      <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        {numOfCartItems}
                      </span>
                    )}
                  </div>
                </NavLink>

                {/* Wishlist Icon */}
                <NavLink to="wishlist" className="relative group">
                  <div className="relative p-3 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 transition-all duration-300 hover:scale-110">
                    <i className="fas fa-heart text-xl text-red-500"></i>
                    {getWishlistCount() > 0 && (
                      <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        {getWishlistCount()}
                      </span>
                    )}
                  </div>
                </NavLink>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    localStorage.removeItem("userToken");
                    setToken(null);
                    navigate("/login");
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink
                  to="register"
                  className="px-6 py-2.5 text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-medium"
                >
                  Register
                </NavLink>
                <NavLink
                  to="login"
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  Login
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            {token && (
              <>
                {/* Mobile Cart Icon */}
                <NavLink to="cart" className="relative">
                  <div className="relative p-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                    <i className="fas fa-shopping-cart text-lg text-blue-600"></i>
                    {numOfCartItems > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {numOfCartItems}
                      </span>
                    )}
                  </div>
                </NavLink>

                {/* Mobile Wishlist Icon */}
                <NavLink to="wishlist" className="relative">
                  <div className="relative p-2.5 rounded-lg bg-red-50 hover:bg-red-100 transition-all duration-300">
                    <i className="fas fa-heart text-lg text-red-500"></i>
                    {getWishlistCount() > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {getWishlistCount()}
                      </span>
                    )}
                  </div>
                </NavLink>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 focus:outline-none"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-gray-600 transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <i className="fas fa-user text-white"></i>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Menu</h3>
                <p className="text-sm text-gray-600">Navigate FreshCart</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <i className="fas fa-times text-gray-600"></i>
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {token ? (
              <div className="p-6 space-y-4">
                {[
                  { name: "Home", path: "home", icon: "fas fa-home", color: "blue" },
                  { name: "Products", path: "products", icon: "fas fa-box", color: "green" },
                  { name: "Categories", path: "categories", icon: "fas fa-th-large", color: "purple" },
                  { name: "Brands", path: "brands", icon: "fas fa-tags", color: "orange" },
                  { name: "Cart", path: "cart", icon: "fas fa-shopping-cart", color: "blue", badge: numOfCartItems },
                  { name: "Wishlist", path: "wishlist", icon: "fas fa-heart", color: "red", badge: getWishlistCount() },
                ].map(({ name, path, icon, color, badge }) => (
                  <NavLink
                    key={name}
                    to={path}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group ${
                        isActive
                          ? `bg-${color}-50 text-${color}-600 shadow-lg`
                          : "hover:bg-gray-50 text-gray-700"
                      }`
                    }
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-${color}-100 to-${color}-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${icon} text-${color}-600`}></i>
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold">{name}</span>
                    </div>
                    {badge > 0 && (
                      <span className={`w-6 h-6 bg-gradient-to-r from-${color}-500 to-${color}-600 text-white text-xs font-bold rounded-full flex items-center justify-center`}>
                        {badge}
                      </span>
                    )}
                  </NavLink>
                ))}
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-user-plus text-2xl text-gray-600"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome to FreshCart</h3>
                  <p className="text-gray-600 mb-6">Please login or register to continue</p>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            {token ? (
              <button
                onClick={() => {
                  localStorage.removeItem("userToken");
                  setToken(null);
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg"
              >
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            ) : (
              <div className="space-y-3">
                <NavLink
                  to="login"
                  onClick={handleNavClick}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-lg"
                >
                  <i className="fas fa-sign-in-alt"></i>
                  <span>Login</span>
                </NavLink>
                <NavLink
                  to="register"
                  onClick={handleNavClick}
                  className="w-full flex items-center justify-center gap-3 p-4 text-blue-600 border-2 border-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold"
                >
                  <i className="fas fa-user-plus"></i>
                  <span>Register</span>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
