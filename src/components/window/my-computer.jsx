import React, { useState } from 'react';
import MyDocumentsApp from './my-documents.jsx'; 

const MyComputerApp = () => {
  const [currentView, setCurrentView] = useState('drives');
  const [currentPath, setCurrentPath] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const drives = [
    {
      id: 'floppy',
      name: '3½ Floppy (A:)',
      icon: <img src="/icons/floppydrive.png" alt="A:" className="w-8 h-8 inline" />,
      type: 'floppy',
      size: '0 MB',
      free: '0 MB',
      accessible: false
    },
    {
      id: 'hard-disk',
      name: 'Hard Disk (C:)',
      icon: <img src="/icons/C.png" alt="C:" className="w-8 h-8 inline" />, 
      type: 'hard-disk',
      size: '2.1 GB',
      free: '1.2 GB',
      accessible: true
    },
    {
      id: 'cdrom',
      name: 'CD-ROM (D:)',
      icon: <img src="icons/cdrom.png" alt="D:" className="w-8 h-8 inline" />,
      type: 'cdrom',
      size: '0 MB',
      free: '0 MB',
      accessible: false
    }
  ];

  const folders = {
    'C:': [
      { name: 'Windows', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Win" className="w-4 h-4 inline" />, size: '', modified: '25/10/1998' },
      { name: 'Program Files', type: 'folder', icon: <img src="/icons/typefolder.png" alt="PF" className="w-4 h-4 inline" />, size: '', modified: '15/11/1998' },
      { name: 'My Documents', type: 'folder', icon: <img src="/icons/typefolderopen.png" alt="MyDc" className="w-4 h-4 inline" />, size: '', modified: '01/12/1998' },
      { name: 'Temp', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Temp" className="w-4 h-4 inline" />, size: '', modified: '10/12/1998' },
      { name: 'autoexec.bat', type: 'file', icon: <img src="/icons/notepadfile1.png" alt="autoexec" className="w-4 h-4 inline" />, size: '1 KB', modified: '25/10/1998' },
      { name: 'config.sys', type: 'file', icon: <img src="/icons/notepadfile1.png" alt="config" className="w-4 h-4 inline" />, size: '2 KB', modified: '25/10/1998' }
    ],
    'C:/Windows': [
      { name: 'System', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Sys" className="w-4 h-4 inline" />, size: '', modified: '25/10/1998' },
      { name: 'System32', type: 'folder', icon: <img src="/icons/typefolder.png" alt="Sys32" className="w-4 h-4 inline" />, size: '', modified: '25/10/1998' },
      { name: 'notepad.exe', type: 'file', icon: <img src="/icons/notepad16.png" alt="notepad" className="w-4 h-4 inline" />, size: '14 KB', modified: '25/10/1998' },
      { name: 'calc.exe', type: 'file', icon: <img src="/icons/calc16.png" alt="calc" className="w-4 h-4 inline" />, size: '102 KB', modified: '25/10/1998' }
    ],
    'C:/Windows/System': [
      { name: 'Speech', type: 'folder', icon: <img src="/icons/typefolder.png" alt="spch" className="w-4 h-4 inline" />, size: '', modified: '25/10/1998' }
    ],
    'C:/Windows/System/Speech': [
      { name: 'speech-synthesis.xsd', type: 'file', icon: <img src="/icons/systemgear.png" alt="syssyn" className="w-4 h-4 inline" />, size: '4 KB', modified: '25/10/1998' },
      { name: 'synthesis-core.xsd', type: 'file', icon: <img src="/icons/systemgear.png" alt="syscore" className="w-4 h-4 inline" />, size: '17 KB', modified: '25/10/1998' },
      { name: 'xml.xsd', type: 'file', icon: <img src="/icons/notepadfile1.png" alt="xmlxsd" className="w-4 h-4 inline" />, size: '2 KB', modified: '25/10/1998' }
    ],
    'C:/Windows/System32': [
      { name: 'what', type: 'file', icon: '🥴', size: '69 KB', modified: '18/08/1945' },
      { name: 'do', type: 'file', icon: '🤏', size: '420 KB', modified: '18/08/1945' },
      { name: 'we', type: 'file', icon: '👩🏿‍🦲', size: '69 KB', modified: '18/08/1945' },
      { name: 'have', type: 'file', icon: '☠️', size: '420 KB', modified: '18/08/1945' },
      { name: 'here', type: 'file', icon: '👀', size: '69 KB', modified: '18/08/1945' }
    ],
    'C:/Program Files': [
      { name: 'Accessories', type: 'folder', icon: <img src="icons/typefolder.png" alt="access" className="w-4 h-4 inline" />, size: '', modified: '25/10/1998' },
      { name: 'Games', type: 'folder', icon: '📁', size: '', modified: '01/11/1998' },
      { name: 'Internet Explorer', type: 'folder', icon: '📁', size: '', modified: '25/10/1998' }
    ],
    'C:/Program Files/Accessories': [
      { name: 'test', type: 'file', icon: <img src="/icons/cdrom.png" alt="cdcd" className="w-4 h-4 inline" />, size: '1 KB', modified: '25/10/1998' },
    ],
    'C:/Program Files/Games': [
      { name: 'Solitaire', type: 'file', icon: <img src="/icons/solitaire.png" alt="solitaire" className="w-4 h-4 inline" />, size: '500 KB', modified: '25/10/1998'},
    ]

  };

  const [inMyDocuments, setInMyDocuments] = useState(false);

  const handleItemDoubleClick = (item) => {
    if (item.type === 'drive' && item.accessible) {
      setCurrentView('folder');
      setCurrentPath(item.id === 'hard-disk' ? 'C:' : item.name);
      setInMyDocuments(false);
    } else if (item.type === 'folder') {
      if (
        (currentPath === 'C:' && item.name === 'My Documents') ||
        (currentPath === '' && item.name === 'My Documents')
      ) {
        setInMyDocuments(true);
      } else {
        const newPath = currentPath ? `${currentPath}/${item.name}` : item.name;
        setCurrentPath(newPath);
        setInMyDocuments(false);
      }
    } else if (item.type === 'drive' && !item.accessible) {
      alert(`${item.name} is not accessible buddy, sorry :(`);
    }
  };

  const handleBack = () => {
    if (inMyDocuments) {
      setInMyDocuments(false);
      setCurrentPath('C:');
      setCurrentView('folder');
      return;
    }
    if (currentPath.includes('/')) {
      const pathParts = currentPath.split('/');
      pathParts.pop();
      setCurrentPath(pathParts.join('/'));
    } else {
      setCurrentView('drives');
      setCurrentPath('');
    }
  };

  const handleUp = () => {
    if (inMyDocuments) {
      setInMyDocuments(false);
      setCurrentPath('C:');
      setCurrentView('folder');
      return;
    }
    if (currentPath) {
      handleBack();
    }
  };

  const getCurrentItems = () => {
    if (currentView === 'drives') {
      return drives.map(drive => ({ ...drive, type: 'drive' }));
    } else {
      return folders[currentPath] || [];
    }
  };

  const getAddressBarText = () => {
    if (inMyDocuments) return 'C:\\My Documents';
    if (currentView === 'drives') return 'My Computer';
    return currentPath.replace(/\//g, '\\');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar - only show when not in My Documents */}
      {!inMyDocuments && (
        <div className="bg-gray-200 border-b border-gray-400 p-1">
          <div className="flex gap-1">
            <button
              className="px-3 py-1 text-xs bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400 disabled:opacity-50"
              onClick={handleBack}
              disabled={currentView === 'drives' && !currentPath}
            >
              ← Back
            </button>
            <button
              className="px-3 py-1 text-xs bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400"
              onClick={handleUp}
              disabled={currentView === 'drives'}
            >
              ↑ Up
            </button>
            <div className="flex-1 mx-2">
              <div className="bg-white border border-gray-600 px-2 py-1 text-xs">
                Address: {getAddressBarText()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status info */}
      {currentView === 'drives' && !inMyDocuments && (
        <div className="bg-gray-100 border-b border-gray-400 p-2 text-xs">
          Select an item to view its description.
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 overflow-auto">
        {inMyDocuments ? (
          <MyDocumentsApp />
        ) : currentView === 'drives' ? (
          <DrivesView
            drives={getCurrentItems()}
            selectedItem={selectedItem}
            onItemClick={setSelectedItem}
            onItemDoubleClick={handleItemDoubleClick}
          />
        ) : (
          <FolderView
            items={getCurrentItems()}
            selectedItem={selectedItem}
            onItemClick={setSelectedItem}
            onItemDoubleClick={handleItemDoubleClick}
            currentPath={currentPath}
          />
        )}
      </div>

      {/* Status bar */}
      {!inMyDocuments && (
        <div className="bg-gray-200 border-t border-gray-400 px-2 py-1 text-xs flex justify-between">
          <span>
            {getCurrentItems().length} object(s)
          </span>
          <span>
            {selectedItem && selectedItem.size && `${selectedItem.size}`}
          </span>
        </div>
      )}
    </div>
  );
};

const DrivesView = ({ drives, selectedItem, onItemClick, onItemDoubleClick }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-6">
        {drives.map(drive => (
          <div
            key={drive.id}
            className={`flex flex-col items-center p-4 cursor-pointer rounded border-2 ${selectedItem?.id === drive.id
                ? 'border-blue-500 bg-blue-100'
                : 'border-transparent hover:bg-gray-100'
              }`}
            onClick={() => onItemClick(drive)}
            onDoubleClick={() => onItemDoubleClick(drive)}
          >
            <div className="text-4xl mb-2">{drive.icon}</div>
            <div className="text-sm font-medium text-center">{drive.name}</div>
            <div className="text-xs text-gray-600 mt-1">
              {drive.accessible ? `${drive.free} free of ${drive.size}` : 'Not ready'}
            </div>
            {!drive.accessible && (
              <div className="text-xs text-red-600 mt-1">Insert disk</div>
            )}
          </div>
        ))}
      </div>

      {/* Drive details panel */}
      {selectedItem && (
        <div className="mt-8 p-4 bg-gray-50 border border-gray-300 rounded">
          <h3 className="font-bold text-sm mb-2">{selectedItem.name}</h3>
          <div className="text-xs space-y-1">
            <div>Type: {selectedItem.type === 'floppy' ? '3½ Inch Floppy Disk' :
              selectedItem.type === 'hard-disk' ? 'Local Disk' :
                'CD-ROM Disc'}</div>
            <div>Total size: {selectedItem.size}</div>
            <div>Free space: {selectedItem.free}</div>
            <div>Used space: {selectedItem.accessible ?
              `${parseFloat(selectedItem.size) - parseFloat(selectedItem.free)} ${selectedItem.size.split(' ')[1]}` :
              'Unknown'}</div>
          </div>
        </div>
      )}
    </div>
  );
};

const FolderView = ({ items, selectedItem, onItemClick, onItemDoubleClick, currentPath }) => {
  return (
    <div className="p-2">
      {/* List view header */}
      <div className="bg-gray-200 border border-gray-400 text-xs font-bold">
        <div className="flex border-b border-gray-400">
          <div className="flex-1 p-1 border-r border-gray-400">Name</div>
          <div className="w-16 p-1 border-r border-gray-400">Size</div>
          <div className="w-20 p-1 border-r border-gray-400">Type</div>
          <div className="w-24 p-1">Modified</div>
        </div>
      </div>

      {/* File/folder list */}
      <div className="border-l border-r border-b border-gray-400">
        {items.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className={`flex text-xs cursor-pointer border-b border-gray-200 hover:bg-blue-100 ${selectedItem?.name === item.name ? 'bg-blue-200' : ''
              }`}
            onClick={() => onItemClick(item)}
            onDoubleClick={() => onItemDoubleClick(item)}
          >
            <div className="flex-1 p-1 flex items-center gap-1 border-r border-gray-200">
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </div>
            <div className="w-16 p-1 border-r border-gray-200 text-right">
              {item.size}
            </div>
            <div className="w-20 p-1 border-r border-gray-200">
              {item.type === 'folder' ? 'File Folder' :
                item.name.endsWith('.exe') ? 'Application' :
                  item.name.endsWith('.bat') ? 'MS-DOS Batch File' :
                    item.name.endsWith('.sys') ? 'System File' : 'File'}
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
    </div>
  );
};

export default MyComputerApp;