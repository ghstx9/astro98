import React, { useState } from 'react';

const RecycleBinApp = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'large-icons'

  // Sample deleted items - you can modify this or make it dynamic
  const deletedItems = [
    {
      id: 1,
      name: 'Old Document.txt',
      icon: <img src="/icons/notepadfile1.png" alt="txt" className="w-4 h-4 inline" />,
      size: '2 KB',
      type: 'Text Document',
      dateDeleted: '12/15/1998 2:30 PM',
      originalLocation: 'C:\\My Documents'
    },
    {
      id: 2,
      name: 'testbin.png',
      icon: <img src="/icons/winicon.png" alt="bmp" className="w-4 h-4 inline" />,
      size: '245 KB',
      type: 'Bitmap Image',
      dateDeleted: '12/14/1998 4:15 PM',
      originalLocation: 'C:\\My Documents\\Pictures'
    }
  ];

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
        {deletedItems.length === 0 
          ? 'The Recycle Bin contains no files.' 
          : `The Recycle Bin contains ${deletedItems.length} file(s) using ${getTotalSize()} of disk space.`
        }
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        {deletedItems.length === 0 ? (
          <EmptyRecycleBin />
        ) : viewMode === 'list' ? (
          <ListView
            items={deletedItems}
            selectedItem={selectedItem}
            onItemClick={handleItemClick}
            onItemDoubleClick={handleItemDoubleClick}
          />
        ) : (
          <LargeIconView
            items={deletedItems}
            selectedItem={selectedItem}
            onItemClick={handleItemClick}
            onItemDoubleClick={handleItemDoubleClick}
          />
        )}
      </div>

      {/* Selected item details */}
      {selectedItem && (
        <div className="bg-gray-50 border-t border-gray-400 p-3">
          <div className="text-sm font-bold mb-2">{selectedItem.name}</div>
          <div className="text-xs space-y-1">
            <div>Type: {selectedItem.type}</div>
            <div>Size: {selectedItem.size || 'Unknown'}</div>
            <div>Date deleted: {selectedItem.dateDeleted}</div>
            <div>Original location: {selectedItem.originalLocation}</div>
          </div>
        </div>
      )}

      {/* Status bar */}
      <div className="bg-gray-200 border-t border-gray-400 px-2 py-1 text-xs flex justify-between">
        <span>
          {deletedItems.length} object(s) selected
        </span>
        <span>
          {selectedItem && selectedItem.size && `${selectedItem.size}`}
        </span>
      </div>
    </div>
  );
};

const EmptyRecycleBin = () => (
  <div className="h-full flex flex-col items-center justify-center text-gray-500">
    <div className="text-6xl mb-4">
      <img src="/icons/recycle-bin.png" alt="Empty Recycle Bin" className="w-16 h-16 opacity-50" />
    </div>
    <div className="text-lg font-medium mb-2">Recycle Bin is empty</div>
    <div className="text-sm text-center max-w-xs">
      To delete a file or folder, drag it to the Recycle Bin, or select it and press Delete.
    </div>
  </div>
);

const ListView = ({ items, selectedItem, onItemClick, onItemDoubleClick }) => {
  return (
    <div className="p-2">
      {/* List view header */}
      <div className="bg-gray-200 border border-gray-400 text-xs font-bold">
        <div className="flex border-b border-gray-400">
          <div className="flex-1 p-1 border-r border-gray-400">Name</div>
          <div className="w-24 p-1 border-r border-gray-400">Original Location</div>
          <div className="w-20 p-1 border-r border-gray-400">Date Deleted</div>
          <div className="w-16 p-1 border-r border-gray-400">Size</div>
          <div className="w-20 p-1">Type</div>
        </div>
      </div>

      {/* File list */}
      <div className="border-l border-r border-b border-gray-400">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex text-xs cursor-pointer border-b border-gray-200 hover:bg-blue-100 ${
              selectedItem?.id === item.id ? 'bg-blue-200' : ''
            }`}
            onClick={() => onItemClick(item)}
            onDoubleClick={() => onItemDoubleClick(item)}
          >
            <div className="flex-1 p-1 flex items-center gap-1 border-r border-gray-200">
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
            <div className="w-24 p-1 border-r border-gray-200 truncate">
              {item.originalLocation}
            </div>
            <div className="w-20 p-1 border-r border-gray-200 text-xs">
              {item.dateDeleted.split(' ')[0]}
            </div>
            <div className="w-16 p-1 border-r border-gray-200 text-right">
              {item.size}
            </div>
            <div className="w-20 p-1 truncate">
              {item.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LargeIconView = ({ items, selectedItem, onItemClick, onItemDoubleClick }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex flex-col items-center p-3 cursor-pointer rounded border-2 ${
              selectedItem?.id === item.id
                ? 'border-blue-500 bg-blue-100'
                : 'border-transparent hover:bg-gray-100'
            }`}
            onClick={() => onItemClick(item)}
            onDoubleClick={() => onItemDoubleClick(item)}
          >
            <div className="text-2xl mb-2">
              {React.cloneElement(item.icon, { className: "w-8 h-8" })}
            </div>
            <div className="text-xs text-center max-w-20 break-words">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecycleBinApp;