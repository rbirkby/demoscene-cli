import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { ANIMATION_INTERVAL_MS } from '../constants.js';

const SineWave: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 80, height: 24 });

  useEffect(() => {
    // Get terminal dimensions
    const width = process.stdout.columns || 80;
    const height = process.stdout.rows || 24;
    setDimensions({ width, height });

    // Animation loop
    const interval = setInterval(() => {
      setFrame((f) => f + 1);
    }, ANIMATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const generateWave = (): string[] => {
    const lines: string[] = [];
    const colors = [
      '\x1b[91m', // Bright red
      '\x1b[93m', // Bright yellow
      '\x1b[92m', // Bright green
      '\x1b[96m', // Bright cyan
      '\x1b[94m', // Bright blue
      '\x1b[95m', // Bright magenta
    ];
    const reset = '\x1b[0m';

    for (let y = 0; y < dimensions.height; y++) {
      let line = '';
      for (let x = 0; x < dimensions.width; x++) {
        // Multiple sine waves with different frequencies and phases
        const wave1 = Math.sin(x * 0.1 + frame * 0.05) * 3;
        const wave2 = Math.sin(x * 0.15 + frame * 0.08 + Math.PI / 3) * 2.5;
        const wave3 = Math.sin(x * 0.08 + frame * 0.06 + Math.PI / 2) * 3.5;
        
        const centerY = dimensions.height / 2;
        const waveY = centerY + wave1 + wave2 + wave3;
        
        // Determine which color to use based on position
        const colorIndex = Math.floor((x + frame * 2) / 10) % colors.length;
        const color = colors[colorIndex];
        
        // Check if current position is on the wave
        if (Math.abs(y - waveY) < 1.5) {
          line += color + '█' + reset;
        } else if (Math.abs(y - waveY) < 2.5) {
          line += color + '▓' + reset;
        } else if (Math.abs(y - waveY) < 3.5) {
          line += color + '░' + reset;
        } else {
          line += ' ';
        }
      }
      lines.push(line);
    }

    return lines;
  };

  const lines = generateWave();

  return (
    <Box flexDirection="column">
      {lines.map((line, i) => (
        <Text key={i}>{line}</Text>
      ))}
    </Box>
  );
};

export default SineWave;
