import React, { useState, useEffect } from 'react';

const TerminalHeader: React.FC = () => {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    
    // Format to look like '2167d 22:53:14'
    const daysStr = d > 0 ? `${d}d ` : '';
    return `${daysStr}${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ 
      marginBottom: '30px', 
      paddingBottom: '20px',
      borderBottom: '1px solid var(--term-dimmed)',
      display: 'flex',
      justifyContent: 'space-between',
      opacity: 0.8, // Make header slightly dimmer
      fontSize: '14px',
      lineHeight: '1.6'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>SYS.NAME : <span style={{ color: 'var(--term-primary)' }}>T0SHIRO_OS v1.0.0</span></span>
        <span>SYS.AUTH : <span style={{ color: 'var(--term-highlight)' }}>ACCESSO OSPITE CONCESSO</span></span>
        <span>SYS.NODE : t0shiro94.dev</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
        <span>TEMPO DI ATTIVITA : {formatUptime(uptime)}</span>
        <span>TERMINALE : TTY0</span>
        <span>STATO : <span style={{ color: '#f59e0b' }}>200</span></span>
      </div>
    </div>
  );
};

export default TerminalHeader;
