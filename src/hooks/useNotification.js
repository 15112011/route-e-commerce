import { useState, useCallback } from 'react';

export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback(({
    type = 'success',
    title,
    message,
    duration = 3000,
    position = 'top-right'
  }) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      type,
      title,
      message,
      duration,
      position,
      isOpen: true
    };

    setNotifications(prev => [...prev, notification]);

    // Auto remove after duration + animation time
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration + 500);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const showSuccess = useCallback((title, message, options = {}) => {
    return showNotification({ type: 'success', title, message, ...options });
  }, [showNotification]);

  const showError = useCallback((title, message, options = {}) => {
    return showNotification({ type: 'error', title, message, ...options });
  }, [showNotification]);

  const showWarning = useCallback((title, message, options = {}) => {
    return showNotification({ type: 'warning', title, message, ...options });
  }, [showNotification]);

  const showInfo = useCallback((title, message, options = {}) => {
    return showNotification({ type: 'info', title, message, ...options });
  }, [showNotification]);

  return {
    notifications,
    showNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};
