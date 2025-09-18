import React, { useState, useEffect, useRef, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "../../../../assets/images/slider-image-1.jpeg";
import slide2 from "../../../../assets/images/slider-image-2.jpeg";
import slide3 from "../../../../assets/images/slider-image-3.jpeg";
import static1 from "../../../../assets/images/grocery-banner.png";
import static2 from "../../../../assets/images/grocery-banner-2.jpeg";

// Skeleton Loading Component for Main Slider
const MainSliderSkeleton = () => (
  <div className="relative overflow-hidden rounded-3xl bg-gray-200 animate-pulse">
    <div className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-48 h-8 bg-gray-300 rounded-full mb-4 animate-pulse"></div>
        <div className="w-32 h-6 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Skeleton Loading Component for Side Images
const SideImageSkeleton = () => (
  <div className="relative overflow-hidden rounded-3xl bg-gray-200 animate-pulse">
    <div className="w-full h-40 sm:h-48 lg:h-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
    <div className="absolute bottom-4 left-4 right-4">
      <div className="bg-gray-300/80 backdrop-blur-sm rounded-lg p-3">
        <div className="w-24 h-4 bg-gray-400 rounded mb-2 animate-pulse"></div>
        <div className="w-16 h-3 bg-gray-400 rounded animate-pulse"></div>
      </div>
    </div>
  </div>
);

// Custom Arrow Components for Main Slider
const CustomPrevArrow = ({ onClick, currentSlide }) => (
  <button
    onClick={onClick}
    disabled={currentSlide === 0}
    className={`absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 sm:w-16 sm:h-16 rounded-full backdrop-blur-md transition-all duration-300 group ${
      currentSlide === 0 
        ? 'bg-gray-300/50 cursor-not-allowed' 
        : 'bg-white/20 hover:bg-white/30 hover:scale-110 active:scale-95 shadow-2xl'
    }`}
    aria-label="Previous slide"
  >
    <i className={`fas fa-chevron-left text-xl ${
      currentSlide === 0 ? 'text-gray-400' : 'text-white group-hover:text-blue-100'
    }`}></i>
  </button>
);

const CustomNextArrow = ({ onClick, currentSlide, slideCount }) => {
  const isLastSlide = currentSlide >= slideCount - 1;
  
  return (
    <button
      onClick={onClick}
      disabled={isLastSlide}
      className={`absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 sm:w-16 sm:h-16 rounded-full backdrop-blur-md transition-all duration-300 group ${
        isLastSlide 
          ? 'bg-gray-300/50 cursor-not-allowed' 
          : 'bg-white/20 hover:bg-white/30 hover:scale-110 active:scale-95 shadow-2xl'
      }`}
      aria-label="Next slide"
    >
      <i className={`fas fa-chevron-right text-xl ${
        isLastSlide ? 'text-gray-400' : 'text-white group-hover:text-blue-100'
      }`}></i>
    </button>
  );
};

// Enhanced Main Slide Component
const MainSlide = ({ slide, index, isActive, isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const slideContent = [
    {
      title: "Premium Collection",
      subtitle: "Discover Amazing Products",
      description: "Explore our curated selection of high-quality items",
      cta: "Shop Now"
    },
    {
      title: "Special Offers",
      subtitle: "Unbeatable Deals",
      description: "Don't miss out on our limited-time promotions",
      cta: "View Deals"
    },
    {
      title: "New Arrivals",
      subtitle: "Fresh & Trending",
      description: "Be the first to discover our latest products",
      cta: "Explore"
    }
  ];

  const content = slideContent[index] || slideContent[0];

  return (
    <div className="relative group">
      {/* Background Image with Lazy Loading */}
      <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] overflow-hidden rounded-3xl">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
        )}
        
        <img
          src={slide}
          alt={`Hero slide ${index + 1}`}
          className={`w-full h-full object-cover transition-all duration-1000 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${isActive ? 'scale-105' : 'scale-100'} group-hover:scale-110`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
        />
        
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-gray-600 flex items-center justify-center">
            <i className="fas fa-image text-white text-6xl opacity-50"></i>
          </div>
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-3xl opacity-60 group-hover:opacity-80 transition-all duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-gray-600/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-1000"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 transition-transform duration-1000 delay-200"></div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 lg:p-12 rounded-3xl">
        <div className={`text-center max-w-2xl transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`} style={{ transitionDelay: `${index * 200}ms` }}>
          
          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white drop-shadow-2xl mb-4 group-hover:text-blue-100 transition-colors duration-300">
            {content.title}
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white/90 drop-shadow-lg mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
            {content.subtitle}
          </h2>
          
          {/* Animated Underline */}
          <div className="w-0 group-hover:w-32 h-1 bg-gradient-to-r from-blue-400 to-white mx-auto rounded-full transition-all duration-700 delay-300 mb-6"></div>
          
          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-white/80 mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-400 transform translate-y-4 group-hover:translate-y-0">
            {content.description}
          </p>
          
          {/* CTA Button */}
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 delay-500 hover:scale-110 active:scale-95 transform translate-y-4 group-hover:translate-y-0">
            <i className="fas fa-shopping-bag mr-2"></i>
            {content.cta}
          </button>
        </div>
      </div>

      {/* Corner Indicators */}
      <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
        <div className="w-10 h-10 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">{index + 1}</span>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-400">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-blue-400' : 'w-2 bg-white/50'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Side Image Component
const SideImage = ({ image, index, isVisible }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageContent = [
    {
      title: "Featured Collection",
      subtitle: "Discover amazing deals",
      badge: "NEW",
      discount: "Up to 50% OFF"
    },
    {
      title: "Premium Products",
      subtitle: "Quality guaranteed",
      badge: "HOT",
      discount: "Limited Time"
    }
  ];

  const content = imageContent[index] || imageContent[0];

  return (
    <div 
      className={`relative group overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl cursor-pointer transition-all duration-700 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${(index + 3) * 150}ms` }}
    >
      {/* Background Image */}
      <div className="relative w-full h-40 sm:h-48 lg:h-56 overflow-hidden">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
        )}
        
        <img
          src={image}
          alt={`Featured banner ${index + 1}`}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-125 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          loading="lazy"
        />
        
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-gray-500 flex items-center justify-center">
            <i className="fas fa-image text-white text-3xl opacity-50"></i>
          </div>
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-all duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-gray-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

      {/* Badge */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
          {content.badge}
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">{content.title}</h3>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <i className="fas fa-arrow-right text-blue-600 text-xs"></i>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">{content.subtitle}</p>
          <div className="text-xs font-semibold text-blue-600">{content.discount}</div>
        </div>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-150 transition-transform duration-700 delay-100"></div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default function StaticSliders() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);

  const slides = [slide1, slide2, slide3];
  const sideImages = [static1, static2];

  // Enhanced slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
    pauseOnHover: true,
    pauseOnFocus: true,
    swipeToSlide: true,
    touchThreshold: 10,
    fade: true,
    beforeChange: (current, next) => setCurrentSlide(next),
    prevArrow: <CustomPrevArrow currentSlide={currentSlide} />,
    nextArrow: <CustomNextArrow currentSlide={currentSlide} slideCount={slides.length} />,
    appendDots: dots => (
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-3">
          {dots.map((dot, index) => (
            <li key={index}>
              {React.cloneElement(dot, {
                className: `w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
                  dot.props.className.includes('slick-active')
                    ? 'bg-white scale-125 shadow-lg'
                    : 'bg-white/50 hover:bg-white/70'
                }`
              })}
            </li>
          ))}
        </ul>
      </div>
    )
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

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Loading Component
  const LoadingComponent = () => (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-8/12">
        <MainSliderSkeleton />
      </div>
      <div className="w-full lg:w-4/12 space-y-6">
        <SideImageSkeleton />
        <SideImageSkeleton />
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      className="relative p-4 sm:p-6 lg:p-8 mb-12 bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full -translate-x-48 -translate-y-48 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-gray-400/10 to-transparent rounded-full translate-x-40 translate-y-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-blue-300/5 to-gray-300/5 rounded-full -translate-x-32 -translate-y-32 animate-pulse delay-500"></div>

      {loading ? (
        <LoadingComponent />
      ) : (
        <div className={`transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Main Slider Section */}
            <div className="w-full lg:w-8/12">
              <div className="relative overflow-hidden">
                <Slider ref={sliderRef} {...settings}>
                  {slides.map((slide, index) => (
                    <MainSlide
                      key={index}
                      slide={slide}
                      index={index}
                      isActive={index === currentSlide}
                      isVisible={isVisible}
                    />
                  ))}
                </Slider>
              </div>
            </div>

            {/* Side Images Section */}
            <div className="w-full lg:w-4/12 space-y-6">
              {sideImages.map((image, index) => (
                <SideImage
                  key={index}
                  image={image}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>
          </div>
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
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}
