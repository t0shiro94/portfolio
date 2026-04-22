import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: () => void;
}

const bootLines = [
  { text: 'T0SHIRO_OS v1.0.0 -- avvio in corso...', delay: 500 },
  { text: 'Caricamento di security_protocols.pkg [OK]', delay: 300 },
  { text: 'Caricamento di network_drivers.pkg [OK]', delay: 200 },
  { text: 'Caricamento di react_frontend.pkg [OK]', delay: 400 },
  { text: 'Montaggio /progetti/ai_threat_intel [LIVE]', delay: 200 },
  { text: 'Montaggio /progetti/secure_gateway [IN SVILUPPO]', delay: 200 },
  { text: 'Montaggio /skills/cybersecurity [CARICATO]', delay: 300 },
  { text: 'Checking system status [TRUE]', delay: 400 },
  { text: '', delay: 200 },
  { text: '> "My crime is that of curiosity."', delay: 1200 },
  { text: '', delay: 300 } // Pause before finishing
];

const BootScreen: React.FC<Props> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, bootLines[visibleLines].delay);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [visibleLines, onComplete]);

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      padding: '3vh 4vw',
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--term-secondary)',
      fontFamily: 'var(--font-mono)'
    }}>
      {bootLines.slice(0, visibleLines).map((line, index) => {
        // Highlight [OK], [LIVE], [TRUE] in green
        let lineText = line.text;
        let isHighlighted = false;
        let isWarning = false;
        let suffix = '';
        let prefix = lineText;

        if (lineText.includes('[OK]')) {
          isHighlighted = true;
          suffix = '[OK]';
          prefix = lineText.replace('[OK]', '');
        } else if (lineText.includes('[LIVE]')) {
          isHighlighted = true;
          suffix = '[LIVE]';
          prefix = lineText.replace('[LIVE]', '');
        } else if (lineText.includes('[TRUE]')) {
          isHighlighted = true;
          suffix = '[TRUE]';
          prefix = lineText.replace('[TRUE]', '');
        } else if (lineText.includes('[CARICATO]')) {
          isHighlighted = true;
          suffix = '[CARICATO]';
          prefix = lineText.replace('[CARICATO]', '');
        } else if (lineText.includes('[IN SVILUPPO]')) {
          isWarning = true;
          suffix = '[IN SVILUPPO]';
          prefix = lineText.replace('[IN SVILUPPO]', '');
        }

        return (
          <div key={index} style={{ marginBottom: '4px' }}>
            {prefix}
            {isHighlighted && <span style={{ color: 'var(--term-highlight)' }}>{suffix}</span>}
            {isWarning && <span style={{ color: '#f59e0b' }}>{suffix}</span>}
          </div>
        );
      })}
      
      {/* Blinking cursor while loading */}
      {visibleLines < bootLines.length && (
        <div style={{ marginTop: '4px' }}>
          <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
        </div>
      )}
    </div>
  );
};

export default BootScreen;
