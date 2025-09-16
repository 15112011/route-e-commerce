import React, { useState, useEffect } from 'react';
import { applyTheme, getCurrentTheme, getAvailableThemes, themes } from '../../../utils/themeUtils';

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Initialize theme on component mount
    applyTheme(currentTheme);
  }, []);

  const handleThemeChange = (themeName) => {
    applyTheme(themeName);
    setCurrentTheme(themeName);
    setIsOpen(false);
  };

  const availableThemes = getAvailableThemes();

  return (
    <div className="relative">
      {/* Theme Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
        style={{
          focusRingColor: 'var(--main-color)',
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = 'var(--main-color)';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = '#d1d5db';
        }}
      >
        <div 
          className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
          style={{ backgroundColor: 'var(--main-color)' }}
        />
        <span className="capitalize">{themes[currentTheme]?.name || currentTheme}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'} text-xs`}></i>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-48">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
              Choose Theme
            </div>
            {availableThemes.map((themeName) => (
              <button
                key={themeName}
                onClick={() => handleThemeChange(themeName)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left rounded-md transition-all duration-200 ${
                  currentTheme === themeName
                    ? 'bg-gray-100 font-medium'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                  style={{ backgroundColor: themes[themeName].colors['--main-color'] }}
                />
                <span className="capitalize">{themes[themeName].name}</span>
                {currentTheme === themeName && (
                  <i className="fas fa-check text-xs ml-auto" style={{ color: 'var(--main-color)' }}></i>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
