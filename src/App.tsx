import React, { useState, useEffect } from 'react';
import { Box, useApp, useInput } from 'ink';
import SineWave from './effects/SineWave.js';
import PlasmaField from './effects/PlasmaField.js';
import FireSimulation from './effects/FireSimulation.js';

type Effect = 'sine' | 'plasma' | 'fire' | 'done';

const App: React.FC = () => {
  const [currentEffect, setCurrentEffect] = useState<Effect>('sine');
  const { exit } = useApp();

  useEffect(() => {
    // Sine wave: 0-10 seconds
    const timer1 = setTimeout(() => {
      setCurrentEffect('plasma');
    }, 10000);

    // Plasma field: 10-20 seconds
    const timer2 = setTimeout(() => {
      setCurrentEffect('fire');
    }, 20000);

    // Fire simulation: 20-30 seconds, then exit
    const timer3 = setTimeout(() => {
      setCurrentEffect('done');
      exit();
    }, 30000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [exit]);

  // Allow early exit with q or Ctrl+C
  useInput((input: string, key: any) => {
    if (input === 'q' || key.escape || key.ctrl && input === 'c') {
      exit();
    }
  });

  return (
    <Box flexDirection="column" width="100%" height="100%">
      {currentEffect === 'sine' && <SineWave />}
      {currentEffect === 'plasma' && <PlasmaField />}
      {currentEffect === 'fire' && <FireSimulation />}
    </Box>
  );
};

export default App;
