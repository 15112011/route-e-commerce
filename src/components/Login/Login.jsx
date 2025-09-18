import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import {NavLink, useNavigate, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { tokenContext } from "../../Context/tokenContext";
import { toast } from 'react-toastify';
import logo from "../../assets/images/freshcart-logo.svg";

export default function Login() {
  let [isCallingAPI, setIsCallingAPI] = useState(false);
  let [isAPISuccess, setIsAPISuccess] = useState(true);

  let {setToken}= useContext(tokenContext)
  
  let navigate = useNavigate();


  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: callLogin,

    validate: (values) => {
      let errors = {};


      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email format";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (!/^[A-Za-z][A-Za-z0-9]{5,8}$/.test(values.password)) {
        errors.password =
          "Password must start with a letter and be 6-9 characters long (letters and numbers only)";
      }

      return errors;
    },
  });

  async function callLogin(values) {
    try {
      setIsCallingAPI(true);
      setIsAPISuccess(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values);
      setIsCallingAPI(false);
      localStorage.setItem("userToken",data.token)
      setToken(data.token)
      toast.success("Welcome back! Login successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/app/home")
    } catch (error) {
      console.log(error.response.data.message);
      setIsAPISuccess(false);
      setIsCallingAPI(false);
      toast.error(error.response.data.message || "Login failed. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center py-12 px-4">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full -translate-y-48 translate-x-48"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-200/20 to-transparent rounded-full translate-y-40 -translate-x-40"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Landing */}
        <div className="mb-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <i className="fas fa-arrow-left"></i>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-center">
            <img src={logo} alt="FreshCart" className="w-32 mx-auto mb-4 brightness-0 invert" />
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-blue-100 mt-2">Sign in to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="p-8">
            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  onBlur={formik.handleBlur}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                  <i className="fas fa-exclamation-circle"></i>
                  {formik.errors.email}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  onBlur={formik.handleBlur}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                  <i className="fas fa-exclamation-circle"></i>
                  {formik.errors.password}
                </div>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="mb-6 text-right">
              <NavLink
                to="/forgotPassword"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-300"
              >
                Forgot your password?
              </NavLink>
            </div>

            {/* Submit Button */}
            {isCallingAPI ? (
              <div className="flex justify-center py-3">
                <ClipLoader size={24} color="#2563EB" />
              </div>
            ) : (
              <button
                type="submit"
                className={`w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  formik.isValid && formik.dirty
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!(formik.isValid && formik.dirty)}
              >
                <i className="fas fa-sign-in-alt mr-2"></i>
                Sign In
              </button>
            )}

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-300"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
