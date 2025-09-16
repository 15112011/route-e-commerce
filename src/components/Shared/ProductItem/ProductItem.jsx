import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { tokenContext } from "../../../Context/tokenContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useWishlist } from "../../../Context/wishListContext";

export default function ProductItem(props) {
  const { imageCover, title, category, price, ratingsAverage, id } = props.product;
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { token } = useContext(tokenContext);

  const [cartLoading, setCartLoading] = useState(false);
  const [wishlistActionLoading, setWishlistActionLoading] = useState(false);

  const isWishlistActive = wishlistItems.some((item) => item._id === id);

  const handleAddToCart = async () => {
    setCartLoading(true);
    try {
      await props.addProductsToCart(id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  const handleWishlistClick = async () => {
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
  };

  return (
    <div className="w-1/2 px-3 mb-3 sm:w-1/4 md:w-1/6">
      <div className="relative p-4 transition-all duration-300 bg-white rounded-xl shadow-modern product hover:shadow-modern-lg card-modern">
        <div className="absolute right-3 top-3">
          <button
            type="button"
            className="border shadow-md focus:ring-4 focus:outline-none font-medium rounded-md text-sm p-2.5 text-center flex items-center justify-center transition-all duration-300 border-gray-300"
            style={{
              color: isWishlistActive ? 'var(--main-color)' : '',
              borderColor: isWishlistActive ? 'var(--main-color)' : '',
              backgroundColor: isWishlistActive ? 'var(--main-color-light)' : ''
            }}
            onMouseEnter={(e) => {
              if (!isWishlistActive) e.target.style.color = 'var(--main-color)';
            }}
            onMouseLeave={(e) => {
              if (!isWishlistActive) e.target.style.color = '';
            }}
            onClick={handleWishlistClick}
            disabled={wishlistActionLoading}
            aria-label="Toggle wishlist"
          >
            {wishlistActionLoading ? (
              <ClipLoader size={15} color="var(--main-color)" />
            ) : (
              <i className="text-lg fa fa-heart"></i>
            )}
          </button>
        </div>

        <Link to={`/productDetails/${id}/${category._id}`} className="block text-center">
          <img
            src={imageCover}
            alt={title}
            className="object-cover w-full h-40 mb-3 rounded-md"
          />
          <span className="text-sm text-gray-500">{category.name}</span>
          <h2 className="mb-2 text-lg font-semibold text-gray-800 truncate">
            {title.split(" ").splice(0, 2).join(" ")}
          </h2>
          <div className="flex justify-between text-sm text-gray-600">
            <p className="font-semibold">{price} EGP</p>
            <p className="flex items-center">
              <i className="mr-1 text-yellow-500 fa fa-star"></i>
              {ratingsAverage}
            </p>
          </div>
        </Link>

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleWishlistClick}
            className="flex-shrink-0 p-3 font-semibold rounded-lg transition-all duration-300 btn-modern"
            style={{
              backgroundColor: isWishlistActive ? '#ef4444' : 'transparent',
              color: isWishlistActive ? 'white' : 'var(--main-color)',
              border: isWishlistActive ? 'none' : '2px solid var(--main-color)'
            }}
            onMouseEnter={(e) => {
              if (isWishlistActive) {
                e.target.style.backgroundColor = '#dc2626';
              } else {
                e.target.style.backgroundColor = 'var(--main-color)';
                e.target.style.color = 'white';
              }
            }}
            onMouseLeave={(e) => {
              if (isWishlistActive) {
                e.target.style.backgroundColor = '#ef4444';
              } else {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'var(--main-color)';
              }
            }}
            disabled={wishlistActionLoading}
            title={isWishlistActive ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlistActionLoading ? (
              <ClipLoader size={15} color={isWishlistActive ? "#fff" : "var(--main-color)"} />
            ) : (
              <i className={`fa fa-heart ${isWishlistActive ? "fas" : "far"}`}></i>
            )}
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-grow p-3 text-white font-semibold rounded-lg transition-all duration-300 btn-modern"
            style={{ background: 'var(--gradient-primary)' }}
            onMouseEnter={(e) => e.target.style.background = 'var(--main-color-dark)'}
            onMouseLeave={(e) => e.target.style.background = 'var(--gradient-primary)'}
            disabled={cartLoading}
          >
            {cartLoading ? <ClipLoader size={15} color="#fff" /> : "Add to cart"}
          </button>
        </div>
      </div>
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
