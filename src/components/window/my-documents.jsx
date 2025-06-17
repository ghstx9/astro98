import React, { useState } from 'react';

const MyDocumentsApp = ({ onOpenDocument }) => {
  const [currentPath, setCurrentPath] = useState('My Documents');
  const [selectedItem, setSelectedItem] = useState(null);

  const documentStructure = {
    'My Documents': [
      { name: 'Personal', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Win" className="w-4 h-4 inline" />, size: '', modified: '12/15/1998' },
      { name: 'Work', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Win" className="w-4 h-4 inline" />, size: '', modified: '12/10/1998' },
      { name: 'Music', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Win" className="w-4 h-4 inline" />, size: '', modified: '12/05/1998' },
      { name: 'Letters', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Win" className="w-4 h-4 inline" />, size: '', modified: '11/28/1998' },
      { name: 'Resume.doc', type: 'file', icon: <img src="/icons/docum.png" alt="Win" className="w-4 h-4 inline" />, size: '24 KB', modified: '12/14/1998' },
      { name: 'Netscape.exe', type: 'file', icon: <img src="/icons/installer.png" alt="exe" className="w-4 h-4 inline" />, size: '8.2 MB', modified: '12/12/1998' },
      { name: 'Shopping List.txt', type: 'file', icon: <img src="/icons/notepadfile1.png" alt="config" className="w-4 h-4 inline" />, size: '2 KB', modified: '12/16/1998' }
    ],
    'My Documents/Personal': [
      { name: 'Family Photos', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Win" className="w-4 h-4 inline" />, size: '', modified: '12/01/1998' },
      { name: 'Birthday List.doc', type: 'file', icon: <img src="/icons/docum.png" alt="Win" className="w-4 h-4 inline" />, size: '8 KB', modified: '11/30/1998' },
      { name: 'Phone Numbers.txt', type: 'file', icon: <img src="/icons/notepadfile1.png" alt="config" className="w-4 h-4 inline" />, size: '3 KB', modified: '12/10/1998' },
      { name: 'Vacation Plans.doc', type: 'file', icon: <img src="/icons/docum.png" alt="Win" className="w-4 h-4 inline" />, size: '12 KB', modified: '12/05/1998' }
    ],
    'My Documents/Work': [
      { name: 'Projects', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Win" className="w-4 h-4 inline" />, size: '', modified: '12/08/1998' },
      { name: 'Reports', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Win" className="w-4 h-4 inline" />, size: '', modified: '12/06/1998' },
      { name: 'Meeting Notes.doc', type: 'file', icon: <img src="/icons/docum.png" alt="Win" className="w-4 h-4 inline" />, size: '15 KB', modified: '12/10/1998' },
      { name: 'Web Ideas.txt', type: 'file', icon: <img src="/icons/notepadfile1.png" alt="config" className="w-4 h-4 inline" />, size: '145 KB', modified: '12/09/1998' }
    ],
    'My Documents/Music': [
      { name: 'Classical', type: 'folder', icon: '📁', size: '', modified: '10/15/1998' },
      { name: 'Rock', type: 'folder', icon: '📁', size: '', modified: '11/20/1998' },
      { name: 'My Song.wav', type: 'file', icon: '🎵', size: '2.4 MB', modified: '12/01/1998' },
      { name: 'Piano Recording.wav', type: 'file', icon: '🎵', size: '1.8 MB', modified: '11/25/1998' },
      { name: 'Nature Sounds.wav', type: 'file', icon: '🎵', size: '3.2 MB', modified: '10/30/1998' }
    ],
    'My Documents/Letters': [
      { name: 'Complaint Letter.doc', type: 'file', icon: <img src="/icons/docum.png" alt="Win" className="w-4 h-4 inline" />, size: '6 KB', modified: '11/28/1998' },
      { name: 'Job Application.doc', type: 'file', icon: <img src="/icons/docum.png" alt="Win" className="w-4 h-4 inline" />, size: '14 KB', modified: '11/20/1998' },
      { name: 'Insurance Claim.doc', type: 'file', icon: <img src="/icons/docum.png" alt="Win" className="w-4 h-4 inline" />, size: '9 KB', modified: '11/10/1998' }
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

      if (fileType === 'doc') {
        if (onOpenDocument) {
          onOpenDocument(item.name); 
        } else {
          alert(`Opening ${item.name} in Microsoft Word...`);
        }
        return; 
      }

      let message = `Opening ${item.name}...`;

      switch (fileType) {
        case 'txt':
          message = `Opening ${item.name} in Notepad...`;
          break;
        case 'bmp':
        case 'jpg':
          message = `Opening ${item.name} in Paint...`;
          break;
        case 'wav':
          message = `Playing ${item.name} in Media Player...`;
          break;
        case 'exe':
          message = `Running ${item.name}...`;
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
      return 'File Folder';
    }

    const extension = item.name.split('.').pop().toLowerCase();
    switch (extension) {
      case 'doc':
        return 'Word Document';
      case 'txt':
        return 'Text Document';
      case 'wav':
        return 'Wave Sound';
      case 'exe':
        return 'Executable File';
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
            {selectedItem && selectedItem.type === 'folder' && selectedItem.items && (
              <div><strong>Contains:</strong> {selectedItem.items} items</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDocumentsApp;