import React, { useState, useRef, useEffect } from 'react';
import MyComputerApp from './window/my-computer.jsx';


// Desktop Component
const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [activeWindow, setActiveWindow] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const openWindow = (type, title) => {
    const newWindow = {
      id: nextId,
      type,
      title,
      x: 100 + (nextId * 20),
      y: 100 + (nextId * 20),
      width: 400,
      height: 300,
      minimized: false,
      maximized: false
    };
    setWindows([...windows, newWindow]);
    setActiveWindow(nextId);
    setNextId(nextId + 1);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindow === id) {
      const remaining = windows.filter(w => w.id !== id);
      setActiveWindow(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  };

  const minimizeWindow = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
    if (activeWindow === id) {
      const nonMinimized = windows.filter(w => w.id !== id && !w.minimized);
      setActiveWindow(nonMinimized.length > 0 ? nonMinimized[nonMinimized.length - 1].id : null);
    }
  };

  const restoreWindow = (id) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, minimized: false, maximized: false } : w
    ));
    setActiveWindow(id);
  };

  const bringToFront = (id) => {
    setActiveWindow(id);
  };

  const handleDesktopClick = (e) => {
    // Clear icon selection when clicking on empty desktop area
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
    }
  };

  return (
    <div 
      className="w-full h-full relative"
      style={{
        backgroundImage: 'url("wallpaper/wallpaper.png")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#008080' // Fallback teal color
      }}
      onClick={handleDesktopClick}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 space-y-4">
        <DesktopIcon 
          iconSrc="/icons/my-computer.png" 
          label="My Computer" 
          id="my-computer"
          selected={selectedIcon === "my-computer"}
          onSelect={() => setSelectedIcon("my-computer")}
          onDoubleClick={() => openWindow('explorer', 'My Computer')}
        />
        <DesktopIcon 
          iconSrc="/icons/my-documents.png" 
          label="My Documents" 
          id="my-documents"
          selected={selectedIcon === "my-documents"}
          onSelect={() => setSelectedIcon("my-documents")}
          onDoubleClick={() => openWindow('explorer', 'My Documents')}
        />
        <DesktopIcon 
          iconSrc="/icons/recycle-bin.png" 
          label="Recycle Bin" 
          id="recycle-bin"
          selected={selectedIcon === "recycle-bin"}
          onSelect={() => setSelectedIcon("recycle-bin")}
          onDoubleClick={() => openWindow('recycle', 'Recycle Bin')}
        />
        <DesktopIcon 
          iconSrc="/icons/solitaire.png" 
          label="Solitaire" 
          id="solitaire"
          selected={selectedIcon === "solitaire"}
          onSelect={() => setSelectedIcon("solitaire")}
          onDoubleClick={() => openWindow('solitaire', 'Solitaire')}
        />
      </div>

      {/* Windows */}
      {windows.map(window => (
        !window.minimized && (
          <Window
            key={window.id}
            window={window}
            isActive={activeWindow === window.id}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onBringToFront={() => bringToFront(window.id)}
            onUpdate={(updates) => {
              setWindows(windows.map(w => 
                w.id === window.id ? { ...w, ...updates } : w
              ));
            }}
          />
        )
      ))}
    </div>
  );
};

// Desktop Icon Component
const DesktopIcon = ({ iconSrc, label, id, selected, onSelect, onDoubleClick }) => {
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent desktop click handler from firing
    onSelect();
  };

  return (
    <div 
      className={`flex flex-col items-center cursor-pointer p-1 rounded ${
        selected ? 'bg-blue-600 text-white' : 'text-white'
      }`}
      style={{
        textShadow: '1px 1px 2px rgba(0,0,0,0.8)' // Add text shadow for better readability
      }}
      onClick={handleClick}
      onDoubleClick={onDoubleClick}
    >
      <img 
        src={iconSrc} 
        alt={label}
        className="w-8 h-8 mb-1 pixelated"
        style={{ 
          imageRendering: 'pixelated',
          filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))' // Add shadow for better visibility
        }}
        draggable={false}
      />
      <div className="text-xs text-center max-w-16 break-words">{label}</div>
    </div>
  );
};

// Window Component
const Window = ({ window, isActive, onClose, onMinimize, onBringToFront, onUpdate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    onBringToFront();
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      onUpdate({
        x: Math.max(0, e.clientX - dragOffset.x),
        y: Math.max(0, e.clientY - dragOffset.y)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragOffset]);

  const getWindowContent = () => {
    switch (window.type) {
      case 'explorer':
        return <ExplorerContent />;
      case 'recycle':
        return <RecycleBinContent />;
      case 'solitaire':
        return <SolitaireContent />;
      default:
        return <DefaultContent />;
    }
  };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-gray-300 shadow-lg ${
        isActive ? 'z-50' : 'z-40'
      }`}
      style={{
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        border: '2px outset #c0c0c0',
        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
      }}
      onClick={onBringToFront}
    >
      {/* Title Bar */}
      <div 
        className={`text-white p-1 font-bold flex justify-between items-center text-xs cursor-move ${
          isActive ? '' : 'opacity-75'
        }`}
        style={{
          background: isActive 
            ? 'linear-gradient(90deg, #0000ff 0%, #000080 100%)'
            : 'linear-gradient(90deg, #808080 0%, #606060 100%)'
        }}
        onMouseDown={handleMouseDown}
      >
        <span className="flex items-center gap-1">
          <span>📄</span>
          {window.title}
        </span>
        <div className="window-controls flex gap-1">
          <button 
            className="px-2 py-0 text-xs cursor-pointer bg-gray-300 text-black border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400"
            onClick={onMinimize}
          >
            _
          </button>
          <button 
            className="px-2 py-0 text-xs cursor-pointer bg-gray-300 text-black border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="bg-gray-200 border-b border-gray-400 px-2 py-1">
        <div className="flex gap-4 text-xs">
          <span className="cursor-pointer hover:bg-blue-600 hover:text-white px-1">File</span>
          <span className="cursor-pointer hover:bg-blue-600 hover:text-white px-1">Edit</span>
          <span className="cursor-pointer hover:bg-blue-600 hover:text-white px-1">View</span>
          <span className="cursor-pointer hover:bg-blue-600 hover:text-white px-1">Help</span>
        </div>
      </div>

      {/* Window Content */}
      <div className="p-2 bg-white overflow-auto" style={{ height: window.height - 60 }}>
        {getWindowContent()}
      </div>
    </div>
  );
};

const ExplorerContent = () => (
  <MyComputerApp />
);


const RecycleBinContent = () => (
  <div className="text-center py-8">
    <div className="text-4xl mb-4">🗑️</div>
    <p className="text-sm text-gray-600">The Recycle Bin is empty.</p>
  </div>
);

const SolitaireContent = () => (
  <div className="h-full bg-green-700 p-4 flex items-center justify-center">
    <div className="text-white text-center">
      <div className="text-4xl mb-4">♠️♥️♦️♣️</div>
      <p>Solitaire Game</p>
      <p className="text-sm mt-2">Click to start a new game</p>
    </div>
  </div>
);

const DefaultContent = () => (
  <div className="p-4">
    <p>This is a Windows 98 application window.</p>
  </div>
);

export default Desktop;