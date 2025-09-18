import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/images/freshcart-logo.svg";

// Hero Section Component
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-gray-200/30 to-transparent rounded-full translate-y-40 -translate-x-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-100/20 to-gray-100/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: '20s' }}></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          {/* Logo */}
          <div className="mb-8">
            <img src={logo} alt="FreshCart" className="w-64 mx-auto mb-6" />
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-gray-700 to-blue-600 bg-clip-text text-transparent">
              Fresh Shopping
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-700 via-blue-600 to-gray-700 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover a new way to shop online with our modern, intuitive platform. 
            Fresh products, seamless experience, and unbeatable convenience.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {[
              { icon: "fas fa-shipping-fast", text: "Fast Delivery" },
              { icon: "fas fa-shield-alt", text: "Secure Shopping" },
              { icon: "fas fa-heart", text: "Wishlist Feature" },
              { icon: "fas fa-mobile-alt", text: "Mobile Friendly" }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-gray-100 transform transition-all duration-700 delay-${index * 100} ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
              >
                <i className={`${feature.icon} text-blue-600 text-lg`}></i>
                <span className="font-semibold text-gray-700">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/login"
              className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center gap-3">
                <i className="fas fa-sign-in-alt text-xl"></i>
                <span>Enter FreshCart</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
            </Link>

            <Link
              to="/register"
              className="px-10 py-4 text-blue-600 border-2 border-blue-600 bg-blue-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              <i className="fas fa-user-plus mr-3"></i>
              Create Account
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger the animation of feature items
          [0, 1, 2, 3, 4, 5].forEach((index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: "fas fa-shopping-cart",
      title: "Smart Shopping Cart",
      description: "Advanced cart management with quantity controls, price calculations, and seamless checkout process.",
      color: "blue"
    },
    {
      icon: "fas fa-heart",
      title: "Wishlist Management",
      description: "Save your favorite products for later with our intuitive wishlist feature and easy cart transfer.",
      color: "red"
    },
    {
      icon: "fas fa-search",
      title: "Advanced Search",
      description: "Find exactly what you're looking for with our powerful search and filtering capabilities.",
      color: "green"
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Mobile Responsive",
      description: "Perfect shopping experience across all devices with our mobile-first responsive design.",
      color: "purple"
    },
    {
      icon: "fas fa-shield-alt",
      title: "Secure Payments",
      description: "Shop with confidence using our encrypted payment system and secure checkout process.",
      color: "orange"
    },
    {
      icon: "fas fa-shipping-fast",
      title: "Fast Delivery",
      description: "Quick and reliable delivery service to get your products to you as fast as possible.",
      color: "indigo"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-gray-700 bg-clip-text text-transparent">
              Why Choose FreshCart?
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-gray-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of online shopping with our cutting-edge features designed for your convenience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-white via-${feature.color}-50/30 to-gray-50/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100/50 backdrop-blur-sm overflow-hidden transition-all duration-700 ${
                visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {/* Background Decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-${feature.color}-100/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${feature.icon} text-2xl text-${feature.color}-600`}></i>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// How It Works Section
const HowItWorksSection = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1, 2, 3].forEach((index) => {
            setTimeout(() => {
              setVisibleSteps(prev => [...prev, index]);
            }, index * 300);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: "01",
      title: "Create Account",
      description: "Sign up for your free FreshCart account in seconds",
      icon: "fas fa-user-plus",
      color: "blue"
    },
    {
      number: "02",
      title: "Browse Products",
      description: "Explore our wide range of fresh products and categories",
      icon: "fas fa-search",
      color: "green"
    },
    {
      number: "03",
      title: "Add to Cart",
      description: "Select your favorite items and add them to your cart",
      icon: "fas fa-shopping-cart",
      color: "purple"
    },
    {
      number: "04",
      title: "Secure Checkout",
      description: "Complete your purchase with our secure payment system",
      icon: "fas fa-credit-card",
      color: "orange"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-700 to-blue-600 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-600 to-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with FreshCart in just a few simple steps and enjoy a seamless shopping experience.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative text-center transform transition-all duration-700 delay-${index * 100} ${
                visibleSteps.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-300 to-blue-300 -translate-x-1/2 z-0"></div>
              )}

              {/* Step Card */}
              <div className="relative z-10 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group hover:scale-105">
                {/* Step Number */}
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 rounded-full flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-r from-${step.color}-100 to-${step.color}-200 rounded-2xl flex items-center justify-center mx-auto mb-6 mt-4 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${step.icon} text-2xl text-${step.color}-600`}></i>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-gray-700 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full translate-y-40 -translate-x-40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className={`transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied customers and experience the future of online shopping today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/register"
              className="group relative px-10 py-4 bg-white text-blue-600 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center gap-3">
                <i className="fas fa-rocket text-xl"></i>
                <span>Get Started Free</span>
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform duration-300"></i>
              </div>
            </Link>

            <Link
              to="/login"
              className="px-10 py-4 text-white border-2 border-white/30 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              <i className="fas fa-sign-in-alt mr-3"></i>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img src={logo} alt="FreshCart" className="w-48 mb-4 brightness-0 invert" />
            <p className="text-gray-400 mb-4 max-w-md">
              FreshCart is your premier destination for fresh, quality products delivered right to your doorstep. 
              Experience the future of online shopping with us.
            </p>
            <div className="flex gap-4">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-3">
                <i className="fas fa-envelope text-blue-500"></i>
                <span>hamza.samier@freshcart.com</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-phone text-blue-500"></i>
                <span>+20 (100) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-map-marker-alt text-blue-500"></i>
                <span>Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fab fa-github text-blue-500"></i>
                <span>github.com/hamzasamier</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 FreshCart. All rights reserved. Built with ❤️ by Hamza Samier for amazing shopping experiences.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
    </div>
  );
}
