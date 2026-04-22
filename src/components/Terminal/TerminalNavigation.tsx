import React, { useEffect } from 'react';
import { terminalContent } from '../../data/terminalContent';

interface Props {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const TerminalNavigation: React.FC<Props> = ({ activeSection, onNavigate }) => {
  const sections = Object.values(terminalContent);
  const activeIndex = sections.findIndex(s => s.id === activeSection);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const nextIndex = (activeIndex + 1) % sections.length;
        onNavigate(sections[nextIndex].id);
      } else if (e.key === 'ArrowLeft') {
        const prevIndex = (activeIndex - 1 + sections.length) % sections.length;
        onNavigate(sections[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, sections, onNavigate]);

  return (
    <div style={{ marginTop: 'auto', paddingTop: '30px' }}>
      <div style={{ marginBottom: '15px', color: 'var(--term-dimmed)' }}>
        root@t0shiro/nav <span style={{ color: 'var(--term-primary)' }}>&gt;</span> SELEZIONA MODULO [frecce {'<>'} + INVIO o clic]
      </div>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        {sections.map((section, index) => {
          const isActive = section.id === activeSection;
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              style={{
                background: isActive ? 'var(--term-primary)' : 'transparent',
                color: isActive ? '#000' : 'var(--term-dimmed)',
                border: 'none',
                padding: '4px 12px',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: isActive ? 'bold' : 'normal',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.1s ease'
              }}
            >
              {isActive && '> '}
              {String(index + 1).padStart(2, '0')}._
              {section.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TerminalNavigation;
