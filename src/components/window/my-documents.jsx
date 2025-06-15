import React, { useState } from 'react';

const MyDocumentsApp = () => {
  const [currentPath, setCurrentPath] = useState('My Documents');
  const [selectedItem, setSelectedItem] = useState(null);

  const documentStructure = {
    'My Documents': [
      { name: 'Personal', type: 'folder', icon: '📁', size: '', modified: '12/15/1998', items: 15 },
      { name: 'Work', type: 'folder', icon: '📁', size: '', modified: '12/10/1998', items: 8 },
      { name: 'Pictures', type: 'folder', icon: '📁', size: '', modified: '12/08/1998', items: 12 },
      { name: 'Music', type: 'folder', icon: '📁', size: '', modified: '12/05/1998', items: 6 },
      { name: 'Letters', type: 'folder', icon: '📁', size: '', modified: '11/28/1998', items: 4 },
      { name: 'Resume.doc', type: 'file', icon: '📄', size: '24 KB', modified: '12/14/1998' },
      { name: 'Budget.xls', type: 'file', icon: '📊', size: '18 KB', modified: '12/12/1998' },
      { name: 'Shopping List.txt', type: 'file', icon: '📝', size: '2 KB', modified: '12/16/1998' }
    ],
    'My Documents/Personal': [
      { name: 'Family Photos', type: 'folder', icon: '📁', size: '', modified: '12/01/1998', items: 25 },
      { name: 'Diary', type: 'folder', icon: '📁', size: '', modified: '11/15/1998', items: 12 },
      { name: 'Recipes', type: 'folder', icon: '📁', size: '', modified: '10/20/1998', items: 18 },
      { name: 'Birthday List.doc', type: 'file', icon: '📄', size: '8 KB', modified: '11/30/1998' },
      { name: 'Phone Numbers.txt', type: 'file', icon: '📝', size: '3 KB', modified: '12/10/1998' },
      { name: 'Vacation Plans.doc', type: 'file', icon: '📄', size: '12 KB', modified: '12/05/1998' }
    ],
    'My Documents/Work': [
      { name: 'Projects', type: 'folder', icon: '📁', size: '', modified: '12/08/1998', items: 6 },
      { name: 'Reports', type: 'folder', icon: '📁', size: '', modified: '12/06/1998', items: 9 },
      { name: 'Meeting Notes.doc', type: 'file', icon: '📄', size: '15 KB', modified: '12/10/1998' },
      { name: 'Presentation.ppt', type: 'file', icon: '📊', size: '145 KB', modified: '12/09/1998' },
      { name: 'Client List.xls', type: 'file', icon: '📊', size: '22 KB', modified: '12/07/1998' },
      { name: 'Timesheet.xls', type: 'file', icon: '📊', size: '16 KB', modified: '12/11/1998' }
    ],
    'My Documents/Pictures': [
      { name: 'Vacation 1998', type: 'folder', icon: '📁', size: '', modified: '08/15/1998', items: 24 },
      { name: 'Christmas 1997', type: 'folder', icon: '📁', size: '', modified: '12/25/1997', items: 18 },
      { name: 'Birthday Party', type: 'folder', icon: '📁', size: '', modified: '06/10/1998', items: 12 },
      { name: 'Sunset.bmp', type: 'file', icon: '🖼️', size: '248 KB', modified: '09/22/1998' },
      { name: 'Family Portrait.jpg', type: 'file', icon: '🖼️', size: '156 KB', modified: '11/20/1998' },
      { name: 'Garden.bmp', type: 'file', icon: '🖼️', size: '312 KB', modified: '07/14/1998' }
    ],
    'My Documents/Music': [
      { name: 'Classical', type: 'folder', icon: '📁', size: '', modified: '10/15/1998', items: 8 },
      { name: 'Rock', type: 'folder', icon: '📁', size: '', modified: '11/20/1998', items: 12 },
      { name: 'My Song.wav', type: 'file', icon: '🎵', size: '2.4 MB', modified: '12/01/1998' },
      { name: 'Piano Recording.wav', type: 'file', icon: '🎵', size: '1.8 MB', modified: '11/25/1998' },
      { name: 'Nature Sounds.wav', type: 'file', icon: '🎵', size: '3.2 MB', modified: '10/30/1998' }
    ],
    'My Documents/Letters': [
      { name: 'Thank You Notes', type: 'folder', icon: '📁', size: '', modified: '11/15/1998', items: 3 },
      { name: 'Complaint Letter.doc', type: 'file', icon: '📄', size: '6 KB', modified: '11/28/1998' },
      { name: 'Job Application.doc', type: 'file', icon: '📄', size: '14 KB', modified: '11/20/1998' },
      { name: 'Insurance Claim.doc', type: 'file', icon: '📄', size: '9 KB', modified: '11/10/1998' }
    ]
  };

  const handleItemDoubleClick = (item) => {
    if (item.type === 'folder') {
      const newPath = `${currentPath}/${item.name}`;
      if (documentStructure[newPath]) {
        setCurrentPath(newPath);
      }
    } else if (item.type === 'file') {
      const fileType = item.name.split('.').pop().toLowerCase();
      let message = `Opening ${item.name}...`;
      
      switch (fileType) {
        case 'doc':
          message = `Opening ${item.name} in Microsoft Word...`;
          break;
        case 'xls':
          message = `Opening ${item.name} in Microsoft Excel...`;
          break;
        case 'txt':
          message = `Opening ${item.name} in Notepad...`;
          break;
        case 'ppt':
          message = `Opening ${item.name} in PowerPoint...`;
          break;
        case 'bmp':
        case 'jpg':
          message = `Opening ${item.name} in Paint...`;
          break;
        case 'wav':
          message = `Playing ${item.name} in Media Player...`;
          break;
        default:
          message = `Opening ${item.name}...`;
      }
      
      alert(message);
    }
  };

  const handleBack = () => {
    if (currentPath.includes('/')) {
      const pathParts = currentPath.split('/');
      pathParts.pop();
      setCurrentPath(pathParts.join('/'));
    }
  };

  const handleUp = () => {
    if (currentPath !== 'My Documents') {
      handleBack();
    }
  };

  const getCurrentItems = () => {
    return documentStructure[currentPath] || [];
  };

  const getFileTypeDescription = (item) => {
    if (item.type === 'folder') {
      return `File Folder (${item.items} items)`;
    }
    
    const extension = item.name.split('.').pop().toLowerCase();
    switch (extension) {
      case 'doc':
        return 'Microsoft Word Document';
      case 'xls':
        return 'Microsoft Excel Worksheet';
      case 'txt':
        return 'Text Document';
      case 'ppt':
        return 'PowerPoint Presentation';
      case 'bmp':
        return 'Bitmap Image';
      case 'jpg':
        return 'JPEG Image';
      case 'wav':
        return 'Wave Sound';
      default:
        return 'File';
    }
  };

  const getTotalItems = () => {
    const items = getCurrentItems();
    const fileCount = items.filter(item => item.type === 'file').length;
    const folderCount = items.filter(item => item.type === 'folder').length;
    
    if (fileCount > 0 && folderCount > 0) {
      return `${folderCount} folder(s), ${fileCount} file(s)`;
    } else if (folderCount > 0) {
      return `${folderCount} folder(s)`;
    } else if (fileCount > 0) {
      return `${fileCount} file(s)`;
    }
    return '0 objects';
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="bg-gray-200 border-b border-gray-400 p-1">
        <div className="flex gap-1">
          <button 
            className="px-3 py-1 text-xs bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400 disabled:opacity-50"
            onClick={handleBack}
            disabled={currentPath === 'My Documents'}
          >
            ← Back
          </button>
          <button 
            className="px-3 py-1 text-xs bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400 disabled:opacity-50"
            onClick={handleUp}
            disabled={currentPath === 'My Documents'}
          >
            ↑ Up
          </button>
          <div className="flex-1 mx-2">
            <div className="bg-white border border-gray-600 px-2 py-1 text-xs">
              Address: {currentPath.replace(/\//g, '\\')}
            </div>
          </div>
        </div>
      </div>

      {/* Status info */}
      <div className="bg-gray-100 border-b border-gray-400 p-2 text-xs">
        {selectedItem ? (
          <span>
            Selected: {selectedItem.name} 
            {selectedItem.size && ` (${selectedItem.size})`}
            {selectedItem.modified && ` - Modified: ${selectedItem.modified}`}
          </span>
        ) : (
          <span>Select an item to view its properties.</span>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        <DocumentView 
          items={getCurrentItems()}
          selectedItem={selectedItem}
          onItemClick={setSelectedItem}
          onItemDoubleClick={handleItemDoubleClick}
          getFileTypeDescription={getFileTypeDescription}
        />
      </div>

      {/* Status bar */}
      <div className="bg-gray-200 border-t border-gray-400 px-2 py-1 text-xs flex justify-between">
        <span>{getTotalItems()}</span>
        {selectedItem && selectedItem.size && (
          <span>{selectedItem.size}</span>
        )}
      </div>
    </div>
  );
};

const DocumentView = ({ items, selectedItem, onItemClick, onItemDoubleClick, getFileTypeDescription }) => {
  return (
    <div className="p-2">
      {/* List view header */}
      <div className="bg-gray-200 border border-gray-400 text-xs font-bold">
        <div className="flex border-b border-gray-400">
          <div className="flex-1 p-1 border-r border-gray-400">Name</div>
          <div className="w-16 p-1 border-r border-gray-400">Size</div>
          <div className="w-32 p-1 border-r border-gray-400">Type</div>
          <div className="w-24 p-1">Modified</div>
        </div>
      </div>

      {/* File/folder list */}
      <div className="border-l border-r border-b border-gray-400">
        {items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className={`flex text-xs cursor-pointer border-b border-gray-200 hover:bg-blue-100 ${
              selectedItem?.name === item.name ? 'bg-blue-200' : ''
            }`}
            onClick={() => onItemClick(item)}
            onDoubleClick={() => onItemDoubleClick(item)}
          >
            <div className="flex-1 p-1 flex items-center gap-1 border-r border-gray-200">
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
            <div className="w-16 p-1 border-r border-gray-200 text-right">
              {item.size || ''}
            </div>
            <div className="w-32 p-1 border-r border-gray-200">
              {getFileTypeDescription(item)}
            </div>
            <div className="w-24 p-1 text-right">
              {item.modified || ''}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="p-8 text-center text-gray-500 text-sm">
          This folder is empty.
        </div>
      )}

      {/* Selected item details */}
      {selectedItem && (
        <div className="mt-4 p-3 bg-gray-50 border border-gray-300 rounded">
          <h3 className="font-bold text-sm mb-2 flex items-center gap-2">
            <span>{selectedItem.icon}</span>
            {selectedItem.name}
          </h3>
          <div className="text-xs space-y-1 text-gray-700">
            <div><strong>Type:</strong> {getFileTypeDescription(selectedItem)}</div>
            {selectedItem.size && (
              <div><strong>Size:</strong> {selectedItem.size}</div>
            )}
            {selectedItem.modified && (
              <div><strong>Modified:</strong> {selectedItem.modified}</div>
            )}
            {selectedItem.type === 'folder' && selectedItem.items && (
              <div><strong>Contains:</strong> {selectedItem.items} items</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDocumentsApp;