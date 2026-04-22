import React, { useState, useEffect, useRef } from 'react';
import type { SectionContent, OutputLine } from '../../data/terminalContent';
import Typewriter from './Typewriter';
import { terminalContent } from '../../data/terminalContent';

interface Props {
  content: SectionContent;
}

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

const TerminalOutput: React.FC<Props> = ({ content }) => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentCommandIndex(0);
    setIsTyping(true);
    setHistory([]);
    setInputValue('');
  }, [content]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentCommandIndex, isTyping, content, history, inputValue]);

  // Focus input when clicking anywhere on the output container (if typing is done)
  const handleContainerClick = () => {
    if (currentCommandIndex === content.commands.length - 1 && !isTyping && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
    if (currentCommandIndex < content.commands.length - 1) {
      setTimeout(() => {
        setCurrentCommandIndex(prev => prev + 1);
        setIsTyping(true);
      }, 300);
    } else {
      // Focus input automatically when done
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  };

  const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = inputValue.trim().toLowerCase();
      if (!cmd) return;

      let outNode: React.ReactNode = null;

      if (cmd === 'help') {
        outNode = (
          <div style={{ color: 'var(--term-secondary)', marginBottom: '10px' }}>
            <div style={{ color: 'var(--term-dimmed)' }}>Moduli disponibili:</div>
            {Object.values(terminalContent).map((section, i) => (
              <div key={i} style={{ color: 'var(--term-secondary)' }}>
                - {section.id}
              </div>
            ))}
            <div style={{ marginTop: '5px' }}>Digita il nome di un modulo per navigare.</div>
          </div>
        );
      } else if (terminalContent[cmd]) {
        outNode = (
          <div style={{ color: 'var(--term-highlight)', marginBottom: '10px' }}>
            Caricamento modulo '{cmd}'...
          </div>
        );
        setTimeout(() => {
          window.location.hash = cmd;
        }, 300);
      } else {
        outNode = (
          <div style={{ color: '#ef4444', marginBottom: '10px' }}>
            Comando non trovato: {cmd}. Digita 'help' per la lista dei comandi.
          </div>
        );
      }

      setHistory(prev => [...prev, { command: cmd, output: outNode }]);
      setInputValue('');
      
      // Keep focus
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 0);
    }
  };

  const renderOutputLine = (line: OutputLine, idx: number) => {
    let style: React.CSSProperties = { marginBottom: '4px' };
    let contentNode = line.value;

    switch (line.type) {
      case 'comment':
        style.color = 'var(--term-dimmed)';
        style.fontStyle = 'italic';
        break;
      case 'dim':
        style.color = 'var(--term-dimmed)';
        break;
      case 'accent':
        style.color = 'var(--term-primary)';
        style.fontWeight = 'bold';
        break;
      case 'list':
        style.color = 'var(--term-secondary)';
        break;
      case 'system':
        style.color = 'var(--term-dimmed)';
        style.opacity = 0.7;
        break;
      case 'link':
        if (line.href === 'https://wa.me/390000000000') {
          return (
            <div key={idx} style={{ marginTop: '10px', marginBottom: '10px' }}>
              <a href={line.href} target="_blank" rel="noreferrer" style={{
                color: 'var(--term-bg)',
                backgroundColor: 'var(--term-primary)',
                padding: '4px 10px',
                fontWeight: 'bold',
                display: 'inline-block',
                textDecoration: 'none'
              }}>
                {line.value}
              </a>
            </div>
          );
        }
        return (
          <div key={idx} style={{ marginBottom: '4px' }}>
            <a href={line.href} target="_blank" rel="noreferrer" style={{
              color: 'var(--term-highlight)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--term-dimmed)',
              paddingBottom: '2px'
            }}>
              {line.value}
            </a>
          </div>
        );
      case 'divider':
        return (
          <div key={idx} style={{ 
            borderTop: '1px solid var(--term-dimmed)', 
            marginTop: '12px', 
            marginBottom: '12px',
            opacity: 0.3 
          }} />
        );
      case 'normal':
      default:
        style.color = 'var(--term-secondary)';
        break;
    }

    return (
      <div key={idx} style={style}>
        {contentNode}
      </div>
    );
  };

  return (
    <div 
      ref={containerRef}
      onClick={handleContainerClick}
      style={{ 
        flex: 1, 
        overflowY: 'auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '24px',
        paddingRight: '15px'
      }}
    >
      {content.commands.slice(0, currentCommandIndex + 1).map((cmd, index) => {
        const isActiveCommand = index === currentCommandIndex;
        const isCurrentlyTyping = isActiveCommand && isTyping;

        return (
          <div key={index}>
            <div style={{ color: 'var(--term-primary)', fontWeight: 'bold', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ color: 'var(--term-highlight)' }}>t0shiro94@portfolio</span>
              <span style={{ color: 'var(--term-dimmed)' }}>:</span>
              <span style={{ color: '#3b82f6' }}>~</span>
              <span style={{ margin: '0 8px' }}>$</span>
              
              {isCurrentlyTyping ? (
                <Typewriter text={cmd.command} onComplete={handleTypingComplete} speed={30} />
              ) : (
                <span style={{ color: 'var(--term-primary)', fontWeight: 'normal' }}>{cmd.command}</span>
              )}
            </div>
            
            {!isCurrentlyTyping && (
              <div style={{ 
                marginTop: '12px', 
                whiteSpace: 'pre-wrap',
                lineHeight: '1.6'
              }}>
                {cmd.output.map((line, idx) => renderOutputLine(line, idx))}
              </div>
            )}
          </div>
        );
      })}
      
      {/* Interactive History Rendering */}
      {history.map((item, i) => (
        <div key={`hist-${i}`} style={{ marginBottom: '10px' }}>
          <div style={{ color: 'var(--term-primary)', fontWeight: 'bold', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: 'var(--term-highlight)' }}>t0shiro94@portfolio</span>
            <span style={{ color: 'var(--term-dimmed)' }}>:</span>
            <span style={{ color: '#3b82f6' }}>~</span>
            <span style={{ margin: '0 8px' }}>$</span>
            <span style={{ color: 'var(--term-primary)', fontWeight: 'normal' }}>{item.command}</span>
          </div>
          <div style={{ marginTop: '8px' }}>
            {item.output}
          </div>
        </div>
      ))}

      {/* Interactive Prompt Input */}
      {currentCommandIndex === content.commands.length - 1 && !isTyping && (
         <div style={{ color: 'var(--term-primary)', marginTop: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--term-highlight)' }}>t0shiro94@portfolio</span>
          <span style={{ color: 'var(--term-dimmed)' }}>:</span>
          <span style={{ color: '#3b82f6' }}>~</span>
          <span style={{ margin: '0 8px' }}>$</span>
          
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1, minWidth: '200px' }}>
            <input 
              ref={inputRef}
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleCommandSubmit}
              placeholder="digita un comando (prova: help)"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--term-primary)',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                outline: 'none',
                width: '100%',
                fontWeight: 'normal',
                caretColor: 'transparent' // Hide default cursor, we use custom
              }}
            />
            {/* Custom blinking cursor that follows the text */}
            <span style={{ 
              position: 'absolute', 
              left: `calc(${inputValue.length}ch)`, 
              animation: 'blink 1s step-end infinite', 
              fontWeight: 'normal',
              pointerEvents: 'none'
            }}>_</span>
          </div>
       </div>
      )}
    </div>
  );
};

export default TerminalOutput;
