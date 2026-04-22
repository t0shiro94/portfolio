import React, { useState, useEffect } from 'react';
import TerminalHeader from './TerminalHeader';
import TerminalNavigation from './TerminalNavigation';
import TerminalOutput from './TerminalOutput';
import { terminalContent } from '../../data/terminalContent';

const Terminal: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (terminalContent[hash]) {
        setActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (sectionId: string) => {
    window.location.hash = sectionId;
  };

  const currentContent = terminalContent[activeSection];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      width: '100%',
      maxWidth: '1000px', // Center the content and scrollbar like the reference
      padding: '3vh 4vw', 
      margin: '0 auto' 
    }}>
      <TerminalHeader />
      <TerminalOutput content={currentContent} />
      <TerminalNavigation activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
  );
};

export default Terminal;
