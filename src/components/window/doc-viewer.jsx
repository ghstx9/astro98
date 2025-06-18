import React, { useState } from 'react';

const WordDocViewer = ({ fileName = "Document1.doc", onClose }) => {
  const [currentDocument, setCurrentDocument] = useState(fileName);
  const [zoomLevel, setZoomLevel] = useState(100);

  const getDocumentContent = (docName) => {
    const documents = {
      "Resume.doc": {
        title: "Professional Resume",
        content: `
Ricky Aldiansyah M. Al-Rasuli
Batam City, Indonesia
Phone: (555) 123-4567
Email: jsmith@email.com

OBJECTIVE
Seeking a challenging position in software development where I can utilize my programming skills and contribute to innovative projects.

EDUCATION
Bachelor of Science in Computer Science
State University, 1996
GPA: 3.7/4.0

EXPERIENCE
Software Developer - Tech Solutions Inc. (1997-Present)
• Developed Windows applications using Visual Basic and C++
• Maintained legacy systems and databases
• Collaborated with team members on various projects

Intern - Local Computer Store (Summer 1996)
• Assisted customers with computer purchases
• Performed basic hardware troubleshooting
• Organized inventory and maintained store displays

SKILLS
• Programming Languages: C++, Visual Basic, Pascal
• Operating Systems: Windows 95/98, DOS
• Applications: Microsoft Office, Netscape Navigator
• Database: Microsoft Access, dBase

REFERENCES
Available upon request
        `
      },
      "Birthday List.doc": {
        title: "Birthday List - 1998",
        content: `
FAMILY & FRIENDS BIRTHDAYS

January
• Mom - January 15th
• Uncle Bob - January 28th

February  
• Sarah (sister) - February 12th
• Coworker Mike - February 23rd

March
• Dad - March 8th
• Best friend Lisa - March 17th

April
• Neighbor Mrs. Johnson - April 3rd
• Cousin Tom - April 19th

May
• Grandma - May 25th

June
• Brother Jim - June 14th

July
• Anniversary (Mom & Dad) - July 4th

August
• My Birthday! - August 22nd

September
• Nephew Billy - September 9th

October
• Friend Dave - October 31st (Halloween baby!)

November
• Aunt Mary - November 11th

December
• Christmas parties all month!
• New Year's Eve party planning

NOTES:
- Remember to buy cards early
- Mom likes flowers, Dad prefers books
- Don't forget anniversary gift!
        `
      },
      "Vacation Plans.doc": {
        title: "Summer Vacation Plans 1999",
        content: `
SUMMER VACATION PLANNING

DESTINATION OPTIONS:

1. YELLOWSTONE NATIONAL PARK
Pros:
• Beautiful scenery and wildlife
• Educational for the kids
• Reasonable driving distance
• Camping available

Cons:
• Crowded in summer
• Weather can be unpredictable
• Limited dining options

2. FLORIDA BEACHES
Pros:
• Warm weather guaranteed
• Lots of activities for family
• Good restaurants
• Theme parks nearby

Cons:
• Expensive flights
• Very crowded
• Hurricane season

3. COLORADO MOUNTAINS
Pros:
• Cool temperatures
• Great hiking trails
• Beautiful mountain views
• Relatively affordable

Cons:
• Long drive
• Altitude adjustment needed
• Limited entertainment for kids

BUDGET ESTIMATE:
Transportation: $800
Lodging (7 nights): $700
Food & Dining: $500
Activities: $400
Miscellaneous: $200
Total: $2,600

DECISION: Leaning towards Colorado - great compromise between cost and experience!

TO DO:
□ Book hotel reservations
□ Plan driving route
□ Pack camping gear
□ Arrange pet care
□ Stop mail delivery
        `
      },
      "Meeting Notes.doc": {
        title: "Weekly Team Meeting - December 14, 1998",
        content: `
WEEKLY TEAM MEETING NOTES
Date: December 14, 1998
Attendees: John, Sarah, Mike, Lisa, Bob (Manager)

AGENDA ITEMS DISCUSSED:

1. Y2K PREPARATION UPDATE
• Testing completed on main systems
• Database backup procedures reviewed
• Emergency contact list finalized
• Status: ON TRACK

2. NEW CLIENT PROJECT - ACCOUNTING SOFTWARE
• Requirements gathering phase complete
• Design document in progress
• Timeline: 6 months development
• Resources: 3 developers assigned

3. OFFICE EQUIPMENT UPGRADES
• New computers approved for Q1 1999
• Pentium II processors, 64MB RAM
• Windows 98 licenses purchased
• Installation scheduled for January

4. TRAINING OPPORTUNITIES
• Visual Basic 6.0 training available
• Web development workshop in February
• Conference in Las Vegas - approved for 2 attendees

ACTION ITEMS:
• John: Complete database design by Dec 18
• Sarah: Review UI mockups with client
• Mike: Research backup solutions
• Lisa: Coordinate equipment delivery
• Bob: Finalize training budget

NEXT MEETING: December 21, 1998

NOTES:
- Holiday party scheduled for December 18th
- Office closed December 24-25, January 1
- Remember to submit timesheets by Friday
        `
      },
      "Web Ideas.txt": {
        title: "Website Development Ideas",
        content: `
WEBSITE DEVELOPMENT IDEAS & NOTES

CURRENT TRENDS (1998):
• Animated GIFs are very popular
• Background music on websites
• Visitor counters essential
• Guest books for interaction
• Frames for navigation
• Blinking text for emphasis

TECHNICAL CONSIDERATIONS:
• HTML 4.0 features to explore
• JavaScript for interactivity  
• CSS for better styling
• Image optimization for dial-up
• Browser compatibility (IE4, Netscape 4)

PROJECT IDEAS:

1. COMPANY WEBSITE REDESIGN
Current site problems:
- Takes too long to load (56k modem)
- Navigation is confusing
- Information is outdated
- No search functionality

Proposed improvements:
- Streamlined graphics
- Clear navigation menu
- Regular content updates
- Contact form
- Product catalog

2. PERSONAL PORTFOLIO SITE
Features to include:
- Resume and work samples
- Photo gallery
- Personal blog/journal
- Links to favorite sites
- Email contact form

3. LOCAL BUSINESS DIRECTORY
Concept:
- Directory of local businesses
- Categories and search
- Maps and directions
- Customer reviews
- Advertising opportunities

LEARNING RESOURCES:
• "HTML: The Definitive Guide" book
• WebMonkey tutorials online
• Local college web design course
• Web developer forums and newsgroups

TOOLS TO MASTER:
• FrontPage 98
• Dreamweaver
• Photoshop for web graphics
• FTP client for uploads
• Web server administration

FUTURE CONSIDERATIONS:
• E-commerce possibilities
• Database integration
• Server-side scripting
• Flash animations
• Streaming media

Note: Keep watching technology trends - the web is changing fast!
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
          <select className="px-2 py-1 bg-white border border-gray-600 text-xs">
            <option>Times New Roman</option>
            <option>Arial</option>
            <option>Courier New</option>
          </select>
          <select className="px-2 py-1 bg-white border border-gray-600 text-xs">
            <option>12</option>
            <option>10</option>
            <option>14</option>
            <option>16</option>
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
            maxWidth: '100%',
            fontSize: `${zoomLevel}%`,
            fontFamily: 'Times New Roman, serif',
            lineHeight: '1.5'
          }}
        >
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {document.title}
            </h1>
          </div>
          
          <div className="whitespace-pre-line text-sm leading-relaxed">
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