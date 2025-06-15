import React, { useState, useEffect } from 'react';

// Taskbar Component
const Taskbar = () => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 bg-gray-300 border-t-2 border-gray-400 flex items-center px-1 relative">
      {/* Start Button */}
      <button 
        className={`px-2 py-1 text-xs font-bold cursor-pointer flex items-center gap-1 ${
          startMenuOpen 
            ? 'border-2 border-gray-600 bg-gray-400' 
            : 'border-2 border-gray-100 border-r-gray-600 border-b-gray-600 bg-gray-200'
        }`}
        style={{
          background: startMenuOpen 
            ? 'linear-gradient(135deg, #c0c0c0 0%, #dfdfdf 100%)' 
            : 'linear-gradient(135deg, #dfdfdf 0%, #c0c0c0 100%)'
        }}
        onClick={() => setStartMenuOpen(!startMenuOpen)}
      >
        <img 
          src="/icons/winicon.png" 
          alt="Windows"
          className="w-4 h-4"
          style={{ imageRendering: 'pixelated' }}
          draggable={false}
        />
        <span>Start</span>
      </button>

      {/* Start Menu */}
      {startMenuOpen && (
        <div className="absolute bottom-8 left-0 w-48 bg-gray-300 border-2 border-gray-100 border-r-gray-600 border-b-gray-600 shadow-lg z-50">
          <div className="bg-gray-600 text-white px-2 py-1 text-xs font-bold">
            Windows 98
          </div>
          <div className="p-1">
            <MenuItem icon="📁" text="Programs" />
            <MenuItem icon="📄" text="Documents" />
            <MenuItem icon="⚙️" text="Settings" />
            <MenuItem icon="🔍" text="Find" />
            <MenuItem icon="❓" text="Help" />
            <MenuItem icon="🏃" text="Run..." />
            <div className="border-t border-gray-400 my-1"></div>
            <MenuItem icon="🔌" text="Shut Down..." />
          </div>
        </div>
      )}

      {/* Task Buttons Area */}
      <div className="flex-1 mx-2">
        {/* Task buttons would go here */}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2 px-2 border-l-2 border-gray-600 border-t-gray-100 bg-gray-200 h-6">
        <div className="text-xs">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

// Start Menu Item Component
const MenuItem = ({ icon, text }) => (
  <div className="flex items-center gap-2 px-2 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-xs">
    <span>{icon}</span>
    <span>{text}</span>
  </div>
);

export default Taskbar;