import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const CustomNotification = ({ 
  isOpen, 
  onClose, 
  type = 'success', 
  title, 
  message, 
  duration = 3000,
  position = 'top-right' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 10);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
          icon: 'fas fa-check-circle',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        };
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-red-600',
          icon: 'fas fa-exclamation-circle',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600'
        };
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
          icon: 'fas fa-exclamation-triangle',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600'
        };
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-gray-500 to-gray-600',
          icon: 'fas fa-info-circle',
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
          icon: 'fas fa-check-circle',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600'
        };
    }
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  if (!isVisible) return null;

  const typeStyles = getTypeStyles();
  const positionStyles = getPositionStyles();

  const notificationContent = (
    <div className={`fixed ${positionStyles} z-50 transition-all duration-300 ease-in-out ${
      isAnimating ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'
    }`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-w-sm w-full">
        {/* Header with gradient */}
        <div className={`${typeStyles.bg} px-6 py-4 relative`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`${typeStyles.iconBg} p-2 rounded-full`}>
                <i className={`${typeStyles.icon} ${typeStyles.iconColor} text-sm`}></i>
              </div>
              <h3 className="text-white font-semibold text-lg">{title}</h3>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white transition-colors duration-200 p-1"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
        </div>
        
        {/* Content */}
        {message && (
          <div className="px-6 py-4">
            <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
          </div>
        )}
        
        {/* Progress bar */}
        {duration > 0 && (
          <div className="h-1 bg-gray-100">
            <div 
              className={`h-full ${typeStyles.bg} transition-all ease-linear`}
              style={{
                animation: `shrink ${duration}ms linear forwards`
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(notificationContent, document.body);
};

// CSS for progress bar animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
`;
document.head.appendChild(style);

export default CustomNotification;
