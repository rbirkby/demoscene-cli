import React, { useState, useEffect } from 'react';
import { render } from 'ink';
import { SineWave } from './components/SineWave.js';
import { PlasmaField } from './components/PlasmaField.js';
import { FireSimulation } from './components/FireSimulation.js';

type Visualization = 'sine' | 'plasma' | 'fire' | 'done';

const App = () => {
  const [currentViz, setCurrentViz] = useState<Visualization>('sine');
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (elapsed < 10000) {
        setCurrentViz('sine');
      } else if (elapsed < 20000) {
        setCurrentViz('plasma');
      } else if (elapsed < 30000) {
        setCurrentViz('fire');
      } else {
        setCurrentViz('done');
        clearInterval(interval);
        setTimeout(() => process.exit(0), 100);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [startTime]);

  if (currentViz === 'done') {
    return null;
  }

  return (
    <>
      {currentViz === 'sine' && <SineWave />}
      {currentViz === 'plasma' && <PlasmaField />}
      {currentViz === 'fire' && <FireSimulation />}
    </>
  );
};

render(<App />);
