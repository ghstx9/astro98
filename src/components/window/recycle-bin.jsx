import React, { useState } from 'react';

const RecycleBinApp = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'large-icons'

  // Empty recycle bin - no deleted items
  const deletedItems = [];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleItemDoubleClick = (item) => {
    // In a real implementation, this would restore the item
    alert(`Cannot open "${item.name}". Items in the Recycle Bin cannot be opened directly. To use this item, you must first restore it.`);
  };

  const handleRestore = () => {
    if (selectedItem) {
      alert(`"${selectedItem.name}" has been restored to "${selectedItem.originalLocation}"`);
      // In a real implementation, you would remove the item from deletedItems
    }
  };

  const handleDelete = () => {
    if (selectedItem) {
      if (confirm(`Are you sure you want to permanently delete "${selectedItem.name}"?`)) {
        alert(`"${selectedItem.name}" has been permanently deleted.`);
        // In a real implementation, you would remove the item from deletedItems
      }
    }
  };

  const handleEmptyRecycleBin = () => {
    if (deletedItems.length > 0) {
      if (confirm(`Are you sure you want to permanently delete all ${deletedItems.length} items in the Recycle Bin?`)) {
        alert('All items have been permanently deleted from the Recycle Bin.');
        // In a real implementation, you would clear all items
      }
    }
  };

  const getTotalSize = () => {
    let totalKB = 0;
    deletedItems.forEach(item => {
      if (item.size) {
        const sizeStr = item.size.replace(/[^\d.]/g, '');
        const size = parseFloat(sizeStr);
        if (item.size.includes('MB')) {
          totalKB += size * 1024;
        } else if (item.size.includes('KB')) {
          totalKB += size;
        }
      }
    });
    
    if (totalKB > 1024) {
      return `${(totalKB / 1024).toFixed(1)} MB`;
    }
    return `${totalKB.toFixed(0)} KB`;
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="bg-gray-200 border-b border-gray-400 p-1">
        <div className="flex gap-1">
          <button
            className="px-3 py-1 text-xs bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400 disabled:opacity-50"
            onClick={handleRestore}
            disabled={!selectedItem}
          >
            Restore
          </button>
          <button
            className="px-3 py-1 text-xs bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400 disabled:opacity-50"
            onClick={handleDelete}
            disabled={!selectedItem}
          >
            Delete
          </button>
          <div className="w-px bg-gray-400 mx-1"></div>
          <button
            className="px-3 py-1 text-xs bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400"
            onClick={handleEmptyRecycleBin}
          >
            Empty Recycle Bin
          </button>
          <div className="flex-1"></div>
          <div className="flex gap-1">
            <button
              className={`px-2 py-1 text-xs border border-gray-100 border-r-gray-600 border-b-gray-600 ${
                viewMode === 'large-icons' ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setViewMode('large-icons')}
            >
              🔲
            </button>
            <button
              className={`px-2 py-1 text-xs border border-gray-100 border-r-gray-600 border-b-gray-600 ${
                viewMode === 'list' ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setViewMode('list')}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Status info */}
      <div className="bg-gray-100 border-b border-gray-400 p-2 text-xs">
        The Recycle Bin contains no files.
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <EmptyRecycleBin />
      </div>

      {/* Status bar */}
      <div className="bg-gray-200 border-t border-gray-400 px-2 py-1 text-xs flex justify-between">
        <span>
          0 object(s) selected
        </span>
        <span></span>
      </div>
    </div>
  );
};

const EmptyRecycleBin = () => (
  <div className="h-full flex flex-col items-center justify-center text-gray-500">
    <div className="text-6xl mb-4">
      🗑️
    </div>
    <div className="text-lg font-medium mb-2">Recycle Bin is empty</div>
    <div className="text-sm text-center max-w-xs">
      Why did I even make a recycle bin? I guess it was the weather.
    </div>
  </div>
);

export default RecycleBinApp;