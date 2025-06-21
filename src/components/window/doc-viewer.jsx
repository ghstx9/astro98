import React, { useState } from 'react';

const WordDocViewer = ({ fileName = "Document1.doc", onClose }) => {
  const [currentDocument, setCurrentDocument] = useState(fileName);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedFont, setSelectedFont] = useState('Times New Roman');
  const [fontSize, setFontSize] = useState(12);

  const getDocumentContent = (docName) => {
    const documents = {
      "Resume.doc": {
        title: "My Resume.",
        content: `
Ricky Aldiansyah M. Al-Rasuli
Batam City, Indonesia
Email: rickyaldiansyah92@gmail.com

OBJECTIVE
Seeking experience in software development and programming, with a focus on Windows applications and legacy systems.

EDUCATION
SMK Negeri 7 Batam
Currently enrolled in Computer Science program

EXPERIENCE
Software Developer - SMK Negeri 7 Batam (2024-Present)
• Developed Windows applications using C++
• Worked on over 7 projects using frameworks like Astro and React
• Collaborated with team members to enhance software functionality

REFERENCES
Available upon request
        `
      },
      "Birthday List.doc": {
        title: "Birthday List - 1998",
        content: `
FAMILY & FRIENDS BIRTHDAYS

January
• Bro - January 3, 1998

February
• Lil Bro - February 25, 1998

March
• Me - March 18, 1998

God bless us Ricky brothers, our birthdays are all in the first quarter and lining lmao.
        `
      },
      "Vacation Plans.doc": {
        title: "Summer Vacation Plans 1999",
        content: `
SUMMER VACATION PLANNING

DESTINATION OPTIONS:

1. Batam, Indonesia
   - Beaches and water sports
   - Cultural experiences
   - Probably will visit the stardom of Batam Centre  

2. Singapore
   - Shopping and entertainment
   - Universal Studios
   - Gardens by the Bay

3. West Sumatra, Indonesia
   - Nature and adventure
   - Cultural heritage of the Minangkabau people
   - Delicious local cuisine of the West Highlands

4. Jerusalem, Palestine
   - Historical and religious sites
   - Definitely will visit the Al-Aqsa Mosque
   - Cultural experiences in the Old City
   - Heard that the local food is amazing

5. Constantinople, Turkey
   - Rich history and architecture
   - Hagia Sophia and Topkapi Palace
   - Cultural experiences in the city
   - Blue Mosque is a must-see
   - Bosporus cruise for stunning views
        `
      },
      "Complaint Letter.doc": {
        title: "Complaint Letter to Skaju Corporation",
        content: `
This company despite being one of the most popular in the city is so fucking disappointing in terms of its facility.

1. Initially when I got here, my first impression was great due to its fast internet connection and good food. However, as time goes its internet became one of the worst and its food is getting worse. I don't know what the hell is going on with this company but I am so disappointed with it.

2. The staff here are so unprofessional. They don't know how to treat their customers well. I have been here for a month and I have never seen them smile or greet their customers. They are always on their phones and don't care about the customers.

3. The facilities here are so dirty and unkempt. The bathrooms are always dirty and the floors are sticky. I have seen rats running around the washroom and I am so disgusted by it.

4. The mosque here is so small and cramped. It can only accommodate a few people and it is always full. I have seen people praying in their room because there is no space inside.

5. A lot of customers here knows how to code but the company doesn't utilize their skills. They just sit around and do nothing. I have seen people who can create amazing websites and apps but the company doesn't care about it.
      `
      }
    };

    return documents[docName] || {
      title: docName,
      content: `This document appears to be empty or the content cannot be displayed.\n\nDocument: ${docName}\nLast Modified: ${new Date().toLocaleDateString()}\n\nThis is a simulated Word document viewer for the Windows 98 desktop environment.`
    };
  };

  const document = getDocumentContent(currentDocument);

  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel(zoomLevel + 25);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) {
      setZoomLevel(zoomLevel - 25);
    }
  };

  const handleFontChange = (event) => {
    setSelectedFont(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value));
  };

  const getFontFamily = () => {
    switch (selectedFont) {
      case 'Times New Roman':
        return 'Times New Roman, serif';
      case 'Arial':
        return 'Arial, sans-serif';
      case 'Courier New':
        return 'Courier New, monospace';
      default:
        return 'Times New Roman, serif';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="bg-gray-200 border-b border-gray-400 p-1">
        <div className="flex items-center gap-1 text-xs">
          {/* File operations */}
          <button className="px-3 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400">
            📄 New
          </button>
          <button className="px-3 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400">
            📂 Open
          </button>
          <button className="px-3 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400">
            💾 Save
          </button>
          
          <div className="w-px h-6 bg-gray-400 mx-1"></div>
          
          {/* Formatting */}
          <button className="px-3 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400">
            🖨️ Print
          </button>
          <button className="px-3 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400">
            ✂️ Cut
          </button>
          <button className="px-3 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400">
            📋 Copy
          </button>
          <button className="px-3 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400">
            📄 Paste
          </button>

          <div className="w-px h-6 bg-gray-400 mx-1"></div>

          {/* Zoom controls */}
          <button 
            className="px-2 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 50}
          >
            🔍-
          </button>
          <span className="px-2 py-1 bg-white border border-gray-600 min-w-12 text-center">
            {zoomLevel}%
          </span>
          <button 
            className="px-2 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 200}
          >
            🔍+
          </button>
        </div>
      </div>

      {/* Formatting toolbar */}
      <div className="bg-gray-200 border-b border-gray-400 p-1">
        <div className="flex items-center gap-1 text-xs">
          <select 
            className="px-2 py-1 bg-white border border-gray-600 text-xs"
            value={selectedFont}
            onChange={handleFontChange}
          >
            <option value="Times New Roman">Times New Roman</option>
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
          </select>
          <select 
            className="px-2 py-1 bg-white border border-gray-600 text-xs"
            value={fontSize}
            onChange={handleFontSizeChange}
          >
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={14}>14</option>
            <option value={16}>16</option>
            <option value={18}>18</option>
            <option value={20}>20</option>
            <option value={24}>24</option>
            <option value={28}>28</option>
            <option value={32}>32</option>
            <option value={36}>36</option>
          </select>
          
          <div className="w-px h-6 bg-gray-400 mx-1"></div>
          
          <button className="px-2 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400 font-bold">
            B
          </button>
          <button className="px-2 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400 italic">
            I
          </button>
          <button className="px-2 py-1 bg-gray-300 border border-gray-100 border-r-gray-600 border-b-gray-600 hover:bg-gray-400 underline">
            U
          </button>
        </div>
      </div>

      {/* Document area */}
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        <div 
          className="bg-white shadow-lg mx-auto p-12 min-h-full"
          style={{
            width: '8.5in',
            transform: `scale(${zoomLevel / 100})`, 
            transformOrigin: 'top center',           
            fontFamily: getFontFamily(),
            lineHeight: '1.5'
          }}
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {document.title}
            </h1>
          </div>
          
          <div className="whitespace-pre-line leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
            {document.content}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="bg-gray-200 border-t border-gray-400 px-2 py-1 text-xs flex justify-between items-center">
        <div className="flex gap-4">
          <span>Page 1 of 1</span>
          <span>Line 1</span>
          <span>Column 1</span>
        </div>
        <div className="flex gap-4">
          <span>{currentDocument}</span>
          <span className="text-green-600">●</span>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
};

export default WordDocViewer;