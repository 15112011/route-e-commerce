import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ProductItem from "../Shared/ProductItem/ProductItem";
import Loader from "../Shared/Loader/Loader";
import { cartContext } from "../../Context/cartContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import idontknow from "../../assets/images/Shrug-Kaomoji.png"
import AnimatedWrapper from "../Shared/AnimatedWrapper";
import "react-toastify/dist/ReactToastify.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const { addToCart } = useContext(cartContext);

  async function getProducts() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products`
      );
      console.log(data);
      setProducts(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function addProductsToCart(id) {
    let data = await addToCart(id);
    console.log(data);
    if (data.status === "success") {
      toast.success("🎉 Success! Your item is in the cart.", {
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

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="container p-4 mx-auto">
        <AnimatedWrapper animation="fadeInDown" delay={0.1}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-red-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 block w-full p-4 shadow-modern transition-all duration-300 hover:shadow-red"
          />
        </AnimatedWrapper> 
      </div>

      {products.length === 0 ? (
        <Loader />
      ) : filteredProducts.length > 0 ? (
        <div className="main-layout gap-y-3">
          {filteredProducts.map((product, index) => (
            <AnimatedWrapper 
              key={product.id}
              animation="fadeInUp"
              delay={index * 0.1}
              className="w-full"
            >
              <ProductItem
                addProductsToCart={addProductsToCart}
                product={product}
              />
            </AnimatedWrapper>
          ))}
        </div>
      ) : (
        <AnimatedWrapper animation="bounceIn" className="flex flex-col items-center justify-center py-16">
          <img src={idontknow} className="w-[300px] mb-6" alt="No products found" />
          <p className="text-xl text-gray-600 font-medium">No products found.</p>
          <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
        </AnimatedWrapper>
      )}

      <ToastContainer />
    </>
  );
}
