import React from 'react';

const AboutTxtViewer = () => {
  const aboutContent = `About Astro98
=====================================

Welcome to this nostalgic recreation of the classic Windows 98 desktop experience!

System Information:
------------------
• Operating System: Windows 98 Simulation
• Version: 1.0.0
• Built with: React & Tailwind CSS
• Desktop Environment: Classic Windows UI

Features:
---------
• Authentic Windows 98 visual design
• Draggable and resizable windows
• Desktop icons with selection
• Functional taskbar
• Multiple application windows
• Classic menu bars and window controls

Applications Available:
----------------------
• My Computer - Browse system resources
• My Documents - View and open documents
• Static Solitaire - Classic card game
• About.txt - This information file

Credits:
--------
This simulation recreates the beloved Windows 98 interface for educational and nostalgic purposes. All classic Windows elements have been faithfully reproduced to bring back memories of computing in the late 1990s.

© 2025 Ricky Aldiansyah Marouf

Although this project is incomplete and I probably won't continue it anytime soon, i still want to thank you for exploring this retro computing experience!

p.s if you want to fork the github repo, you have my blessing to do so. just don't forget to give credit where it's due. 😊
`;

  return (
    <div className="h-full bg-white font-mono text-sm">
      <div className="p-4 h-full overflow-auto">
        <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {aboutContent}
        </pre>
      </div>
    </div>
  );
};

export default AboutTxtViewer;