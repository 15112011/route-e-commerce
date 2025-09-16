// Theme utility functions for easy color switching
export const themes = {
  green: {
    name: 'blue',
    colors: {
      '--main-color': '#10b981',
      '--main-color-dark': '#059669',
      '--main-color-light': '#d1fae5',
      '--main-color-50': '#f0fdf4',
      '--main-color-100': '#dcfce7',
      '--main-color-500': '#10b981',
      '--main-color-600': '#059669',
      '--main-color-700': '#047857',
      '--shadow': 'rgba(16, 185, 129, 0.1) 0px 10px 25px -3px, rgba(16, 185, 129, 0.05) 0px 4px 6px -2px',
      '--shadow-lg': 'rgba(16, 185, 129, 0.15) 0px 25px 50px -12px',
      '--gradient-primary': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      '--gradient-light': 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)'
    }
  },
  blue: {
    name: 'Blue',
    colors: {
      '--main-color': '#3b82f6',
      '--main-color-dark': '#2563eb',
      '--main-color-light': '#dbeafe',
      '--main-color-50': '#eff6ff',
      '--main-color-100': '#dbeafe',
      '--main-color-500': '#3b82f6',
      '--main-color-600': '#2563eb',
      '--main-color-700': '#1d4ed8',
      '--shadow': 'rgba(59, 130, 246, 0.1) 0px 10px 25px -3px, rgba(59, 130, 246, 0.05) 0px 4px 6px -2px',
      '--shadow-lg': 'rgba(59, 130, 246, 0.15) 0px 25px 50px -12px',
      '--gradient-primary': 'linear-gradient(135deg,rgb(246, 249, 255) 0%,rgb(255, 255, 255) 100%)',
      '--gradient-light': 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
    }
  },
  purple: {
    name: 'Purple',
    colors: {
      '--main-color': '#8b5cf6',
      '--main-color-dark': '#7c3aed',
      '--main-color-light': '#f3e8ff',
      '--main-color-50': '#faf5ff',
      '--main-color-100': '#f3e8ff',
      '--main-color-500': '#8b5cf6',
      '--main-color-600': '#7c3aed',
      '--main-color-700': '#6d28d9',
      '--shadow': 'rgba(139, 92, 246, 0.1) 0px 10px 25px -3px, rgba(139, 92, 246, 0.05) 0px 4px 6px -2px',
      '--shadow-lg': 'rgba(139, 92, 246, 0.15) 0px 25px 50px -12px',
      '--gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      '--gradient-light': 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)'
    }
  },
  red: {
    name: 'Red',
    colors: {
      '--main-color': '#ef4444',
      '--main-color-dark': '#dc2626',
      '--main-color-light': '#fecaca',
      '--main-color-50': '#fef2f2',
      '--main-color-100': '#fecaca',
      '--main-color-500': '#ef4444',
      '--main-color-600': '#dc2626',
      '--main-color-700': '#b91c1c',
      '--shadow': 'rgba(239, 68, 68, 0.1) 0px 10px 25px -3px, rgba(239, 68, 68, 0.05) 0px 4px 6px -2px',
      '--shadow-lg': 'rgba(239, 68, 68, 0.15) 0px 25px 50px -12px',
      '--gradient-primary': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      '--gradient-light': 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)'
    }
  },
  orange: {
    name: 'Orange',
    colors: {
      '--main-color': '#f97316',
      '--main-color-dark': '#ea580c',
      '--main-color-light': '#fed7aa',
      '--main-color-50': '#fff7ed',
      '--main-color-100': '#fed7aa',
      '--main-color-500': '#f97316',
      '--main-color-600': '#ea580c',
      '--main-color-700': '#c2410c',
      '--shadow': 'rgba(249, 115, 22, 0.1) 0px 10px 25px -3px, rgba(249, 115, 22, 0.05) 0px 4px 6px -2px',
      '--shadow-lg': 'rgba(249, 115, 22, 0.15) 0px 25px 50px -12px',
      '--gradient-primary': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      '--gradient-light': 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)'
    }
  }
};

/**
 * Apply a theme to the document root
 * @param {string} themeName - Name of the theme (green, blue, purple, red, orange)
 */
export const applyTheme = (themeName) => {
  const theme = themes[themeName];
  if (!theme) {
    console.error(`Theme "${themeName}" not found. Available themes:`, Object.keys(themes));
    return;
  }

  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  // Store the current theme in localStorage
  localStorage.setItem('selectedTheme', themeName);
  console.log(`Applied ${theme.name} theme successfully!`);
};

/**
 * Get the currently applied theme
 * @returns {string} Current theme name
 */
export const getCurrentTheme = () => {
  return localStorage.getItem('selectedTheme') || 'green';
};

/**
 * Initialize theme from localStorage or default to green
 */
export const initializeTheme = () => {
  const savedTheme = getCurrentTheme();
  applyTheme(savedTheme);
};

/**
 * Get all available theme names
 * @returns {string[]} Array of theme names
 */
export const getAvailableThemes = () => {
  return Object.keys(themes);
};

/**
 * Get theme colors for a specific theme
 * @param {string} themeName - Name of the theme
 * @returns {object} Theme colors object
 */
export const getThemeColors = (themeName) => {
  return themes[themeName]?.colors || null;
};
