import React, { useState, useEffect } from 'react';

interface Props {
  text: string;
  onComplete?: () => void;
  speed?: number;
}

const Typewriter: React.FC<Props> = ({ text, onComplete, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span>{displayedText}<span style={{ animation: 'blink 1s step-end infinite' }}>_</span></span>;
};

export default Typewriter;
