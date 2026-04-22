import { useState, useEffect } from 'react';
import Terminal from './components/Terminal/Terminal';
import BootScreen from './components/Terminal/BootScreen';
import './index.css';

function App() {
  const [isBooting, setIsBooting] = useState(true);

  // Allow skipping boot with a hash parameter if needed, but default to true
  useEffect(() => {
    if (window.location.hash.includes('noboot')) {
      setIsBooting(false);
    }
  }, []);

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  return (
    <Terminal />
  );
}

export default App;
