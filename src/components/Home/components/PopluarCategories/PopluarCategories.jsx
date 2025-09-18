import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Skeleton Loading Component
const CategorySkeleton = () => (
  <div className="p-2 sm:p-3">
    <div className="relative overflow-hidden rounded-3xl bg-gray-200 animate-pulse">
      <div className="w-full h-64 sm:h-72 lg:h-80 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-6 bg-gray-300 rounded-full mb-2 animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

// Custom Arrow Components
const CustomPrevArrow = ({ onClick, currentSlide }) => (
  <button
    onClick={onClick}
    disabled={currentSlide === 0}
    className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md transition-all duration-300 group ${
      currentSlide === 0 
        ? 'bg-gray-300/50 cursor-not-allowed' 
        : 'bg-white/20 hover:bg-white/30 hover:scale-110 active:scale-95'
    }`}
    aria-label="Previous categories"
  >
    <i className={`fas fa-chevron-left text-lg ${
      currentSlide === 0 ? 'text-gray-400' : 'text-white group-hover:text-blue-100'
    }`}></i>
  </button>
);

const CustomNextArrow = ({ onClick, currentSlide, slideCount, slidesToShow }) => {
  const isLastSlide = currentSlide >= slideCount - slidesToShow;
  
  return (
    <button
      onClick={onClick}
      disabled={isLastSlide}
      className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full backdrop-blur-md transition-all duration-300 group ${
        isLastSlide 
          ? 'bg-gray-300/50 cursor-not-allowed' 
          : 'bg-white/20 hover:bg-white/30 hover:scale-110 active:scale-95'
      }`}
      aria-label="Next categories"
    >
      <i className={`fas fa-chevron-right text-lg ${
        isLastSlide ? 'text-gray-400' : 'text-white group-hover:text-blue-100'
      }`}></i>
    </button>
  );
};

// Enhanced Category Card Component
const CategoryCard = ({ category, index, isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="p-2 sm:p-3">
      <div 
        className={`relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer group transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Background Image with Lazy Loading */}
        <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
          )}
          
          <img
            src={category.image}
            alt={category.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-125 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
          
          {imageError && (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-gray-500 flex items-center justify-center">
              <i className="fas fa-image text-white text-4xl opacity-50"></i>
            </div>
          )}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-all duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-gray-600/30 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700 delay-100"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-4 sm:p-6">
          <div className="text-center transform translate-y-6 group-hover:translate-y-0 transition-all duration-500">
            {/* Category Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 group-hover:scale-110">
              <i className="fas fa-tag text-white text-xl sm:text-2xl"></i>
            </div>
            
            {/* Category Name */}
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow-2xl mb-2 group-hover:text-blue-100 transition-colors duration-300">
              {category.name}
            </h3>
            
            {/* Animated Underline */}
            <div className="w-0 group-hover:w-20 h-1 bg-gradient-to-r from-blue-400 to-white mx-auto rounded-full transition-all duration-500 delay-300"></div>
            
            {/* Description */}
            <p className="text-sm sm:text-base text-white/90 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-400 transform translate-y-2 group-hover:translate-y-0">
              Discover amazing products
            </p>
            
            {/* CTA Button */}
            <button className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500 hover:bg-white/30 hover:scale-105 active:scale-95 transform translate-y-2 group-hover:translate-y-0">
              Explore Now
            </button>
          </div>
        </div>

        {/* Corner Indicators */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
          <div className="w-8 h-8 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{index + 1}</span>
          </div>
        </div>

        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-300">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
            <i className="fas fa-arrow-right text-white text-sm"></i>
          </div>
        </div>

        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};

export default function PopularCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);

  // Enhanced responsive settings
  const settings = {
    dots: true,
    infinite: categories.length > 5,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    pauseOnHover: true,
    pauseOnFocus: true,
    swipeToSlide: true,
    touchThreshold: 10,
    beforeChange: (current, next) => setCurrentSlide(next),
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} />,
    nextArrow: <CustomNextArrow currentSlide={currentSlide} slideCount={categories.length} slidesToShow={5} />,
    appendDots: dots => (
      <div className="mt-8">
        <ul className="flex justify-center space-x-2">
          {dots.map((dot, index) => (
            <li key={index} className="mx-1">
              {React.cloneElement(dot, {
                className: `w-3 h-3 rounded-full transition-all duration-300 ${
                  dot.props.className.includes('slick-active')
                    ? 'bg-blue-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`
              })}
            </li>
          ))}
        </ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1536, // 2xl
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          nextArrow: <CustomNextArrow currentSlide={currentSlide} slideCount={categories.length} slidesToShow={4} />
        }
      },
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          nextArrow: <CustomNextArrow currentSlide={currentSlide} slideCount={categories.length} slidesToShow={3} />
        }
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          nextArrow: <CustomNextArrow currentSlide={currentSlide} slideCount={categories.length} slidesToShow={2} />
        }
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '60px',
          nextArrow: <CustomNextArrow currentSlide={currentSlide} slideCount={categories.length} slidesToShow={1} />
        }
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '40px',
          arrows: false,
          nextArrow: <CustomNextArrow currentSlide={currentSlide} slideCount={categories.length} slidesToShow={1} />
        }
      }
    ]
  };

  // Intersection Observer for animations
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

  // Enhanced data fetching with retry logic
  const getCategories = useCallback(async (retryCount = 0) => {
    try {
      setError(null);
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`,
        { timeout: 10000 }
      );
      setCategories(data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      if (retryCount < 3) {
        setTimeout(() => getCategories(retryCount + 1), 1000 * (retryCount + 1));
      } else {
        setError("Failed to load categories. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Enhanced loading component
  const LoadingComponent = () => (
    <div className="space-y-6">
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-ping border-t-blue-400"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <CategorySkeleton key={index} />
        ))}
      </div>
    </div>
  );

  // Error component
  const ErrorComponent = () => (
    <div className="text-center py-16">
      <div className="relative mb-6">
        <i className="fas fa-exclamation-triangle text-6xl text-red-400 animate-bounce"></i>
        <div className="absolute inset-0 bg-red-400/20 rounded-full blur-xl"></div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-600 mb-6">{error}</p>
      <button
        onClick={() => {
          setLoading(true);
          setError(null);
          getCategories();
        }}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <i className="fas fa-redo mr-2"></i>
        Try Again
      </button>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="relative p-4 sm:p-6 lg:p-8 pb-6 mb-12 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
      aria-label="Popular Categories"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -translate-x-36 -translate-y-36 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-400/10 to-transparent rounded-full translate-x-48 translate-y-48 animate-pulse delay-1000"></div>

      {/* Header Section */}
      <div className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className="relative inline-block">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent mb-4">
            Popular Categories
          </h2>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-gray-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
        
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent to-blue-600 rounded-full"></div>
          <div className="w-8 h-1 bg-gradient-to-r from-blue-600 to-gray-600 mx-2 rounded-full"></div>
          <div className="w-16 h-1 bg-gradient-to-r from-gray-600 to-transparent rounded-full"></div>
        </div>
        
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Explore our most loved product categories and discover amazing deals
        </p>
      </div>

      {/* Content */}
      {loading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent />
      ) : categories.length > 0 ? (
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <Slider ref={sliderRef} {...settings}>
            {categories.map((category, index) => (
              <CategoryCard
                key={category._id}
                category={category}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </Slider>
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="relative mb-6">
            <i className="fas fa-box-open text-6xl text-gray-400"></i>
            <div className="absolute inset-0 bg-gray-400/20 rounded-full blur-xl"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No Categories Available</h3>
          <p className="text-gray-600">Check back later for new categories</p>
        </div>
      )}

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
    </section>
  );
}
