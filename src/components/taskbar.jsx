import React, { useState, useEffect } from 'react';

// Taskbar Component
const Taskbar = ({ windows = [], activeWindow = null, onWindowRestore = null, onStartMenuToggle = null }) => {
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleStartClick = () => {
    const newState = !startMenuOpen;
    setStartMenuOpen(newState);
    if (onStartMenuToggle) {
      onStartMenuToggle(newState);
    }
  };

  const handleTaskButtonClick = (windowId) => {
    if (onWindowRestore) {
      onWindowRestore(windowId);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      weekday: 'short',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getWindowIcon = (window) => {
    if (window.title?.includes("My Computer")) return "/icons/my-computer.png";
    if (window.title?.includes("My Documents")) return "/icons/my-documents.png";
    if (window.title?.includes("Recycle Bin")) return "/icons/recycle-bin.png";
    if (window.title?.includes("Solitaire")) return "/icons/solitaire.png";
    if (window.type === "word") return "/icons/docum.png";
    return "/icons/my-computer.png";
  };

  // Filter windows to show in taskbar (non-minimized or currently active)
  const visibleWindows = windows.filter(w => !w.minimized || w.id === activeWindow);

  return (
    <div className="h-8 bg-gray-300 border-t-2 border-gray-100 border-l-gray-100 border-r-gray-600 border-b-gray-600 flex items-center px-1 relative shadow-inner">
      {/* Start Button */}
      <button 
        className={`px-2 py-1 text-xs font-bold cursor-pointer flex items-center gap-1 min-w-14 ${
          startMenuOpen 
            ? 'border-2 border-gray-600 border-t-gray-400 border-l-gray-400 bg-gray-400 shadow-inner' 
            : 'border-2 border-gray-100 border-r-gray-600 border-b-gray-600 bg-gray-200 shadow-sm hover:bg-gray-300 active:border-gray-600 active:border-t-gray-400 active:border-l-gray-400 active:shadow-inner'
        }`}
        onClick={handleStartClick}
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
        <>
          {/* Overlay to close menu when clicking outside */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setStartMenuOpen(false)}
          />
          <div className="absolute bottom-8 left-0 w-52 bg-gray-300 border-2 border-gray-100 border-r-gray-600 border-b-gray-600 shadow-lg z-50">
            {/* Title bar */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-2 text-xs font-bold flex items-center gap-2">
              <img 
                src="/icons/winicon.png" 
                alt="Windows"
                className="w-4 h-4"
                style={{ imageRendering: 'pixelated' }}
                draggable={false}
              />
              Windows 98
            </div>
            
            {/* Menu items */}
            <div className="p-1">
              <MenuItem icon="/icons/favo.png" text="Favorites" hasArrow />
              <MenuItem icon="/icons/docume.png" text="Documents" hasArrow />
              <MenuItem icon="/icons/monitorgear.png" text="Settings" hasArrow />
              <MenuItem icon="/icons/find.png" text="Find" hasArrow />
              <MenuItem icon="/icons/help.png" text="Help" />
              <MenuItem icon="/icons/regedit.png" text="Regedit" />
              <div className="border-t border-gray-400 my-1"></div>
              <MenuItem icon="/icons/keywin.png" text="Log Off..." />
              <MenuItem icon="/icons/shutdown.png" text="Shut Down..." />
            </div>
          </div>
        </>
      )}

      {/* Task Buttons Area */}
      <div className="flex-1 mx-2 flex items-center gap-1 overflow-hidden">
        {visibleWindows.map(window => (
          <TaskButton
            key={window.id}
            window={window}
            isActive={activeWindow === window.id}
            onClick={() => handleTaskButtonClick(window.id)}
            icon={getWindowIcon(window)}
          />
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center border-l-2 border-gray-600 border-t-gray-100 bg-gray-200 h-6 pl-2">
        {/* System Tray Icons */}
        <div className="flex items-center gap-1 px-1">
          <div 
            className="w-4 h-4 cursor-pointer hover:bg-gray-300 p-0.5 rounded flex items-center justify-center text-xs"
            title="Volume"
          >
            <img
              src="/icons/speaker.png"
              alt="Volume"
              className="w-4 h-4"
              style={{ imageRendering: 'pixelated' }}
              draggable={false}
            />
          </div>
        </div>
        
        {/* Clock */}
        <div 
          className="text-xs px-2 py-1 border-l-2 border-gray-600 border-t-gray-100 cursor-pointer hover:bg-gray-300 min-w-12 text-center relative"
          onMouseEnter={() => setShowDate(true)}
          onMouseLeave={() => setShowDate(false)}
        >
          {formatTime(currentTime)}
          
          {/* Date tooltip */}
          {showDate && (
            <div className="absolute bottom-8 right-0 bg-yellow-100 border border-gray-600 px-2 py-1 text-xs whitespace-nowrap shadow-md z-50">
              {formatDate(currentTime)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Task Button Component
const TaskButton = ({ window, isActive, onClick, icon }) => {
  const getDisplayTitle = (title) => {
    // Truncate long titles
    if (title.length > 20) {
      return title.substring(0, 17) + '...';
    }
    return title;
  };

  return (
    <button
      className={`px-2 py-1 text-xs cursor-pointer flex items-center gap-1 min-w-32 max-w-40 truncate ${
        isActive
          ? 'border-2 border-gray-600 border-t-gray-400 border-l-gray-400 bg-gray-400 shadow-inner'
          : 'border-2 border-gray-100 border-r-gray-600 border-b-gray-600 bg-gray-200 shadow-sm hover:bg-gray-300 active:border-gray-600 active:border-t-gray-400 active:border-l-gray-400 active:shadow-inner'
      }`}
      onClick={onClick}
      title={window.title} // Full title on hover
    >
      <img 
        src={icon}
        alt=""
        className="w-4 h-4 flex-shrink-0"
        style={{ imageRendering: 'pixelated' }}
        draggable={false}
      />
      <span className="truncate">{getDisplayTitle(window.title)}</span>
    </button>
  );
};

// Start Menu Item Component
const MenuItem = ({ icon, text, hasArrow = false }) => (
  <div className="flex items-center justify-between px-2 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-xs group">
    <div className="flex items-center gap-2">
      {typeof icon === 'string' ? (
        <img 
          src={icon}
          alt=""
          className="w-4 h-4"
          style={{ imageRendering: 'pixelated' }}
          draggable={false}
        />
      ) : (
        <span>{icon}</span>
      )}
      <span>{text}</span>
    </div>
    {hasArrow && (
      <span className="text-xs group-hover:text-white">▶</span>
    )}
  </div>
);

export default Taskbar;