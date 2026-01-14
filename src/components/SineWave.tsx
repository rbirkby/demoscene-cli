import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

const COLORS = [
  '\x1b[31m', // Red
  '\x1b[33m', // Yellow
  '\x1b[32m', // Green
  '\x1b[36m', // Cyan
  '\x1b[34m', // Blue
  '\x1b[35m', // Magenta
];

export const SineWave: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const [dimensions, setDimensions] = useState({
    width: process.stdout.columns || 80,
    height: process.stdout.rows || 24,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: process.stdout.columns || 80,
        height: process.stdout.rows || 24,
      });
    };

    process.stdout.on('resize', handleResize);
    return () => {
      process.stdout.off('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => f + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const lines: string[] = [];
  const { width, height } = dimensions;

  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      const time = frame * 0.1;
      
      // Multiple sine waves with different frequencies and phases
      const wave1 = Math.sin(x * 0.1 + time) * 3;
      const wave2 = Math.sin(x * 0.15 + time * 1.3) * 2;
      const wave3 = Math.sin(x * 0.08 + time * 0.7) * 4;
      
      const combinedWave = wave1 + wave2 + wave3;
      const centerY = height / 2;
      const waveY = centerY + combinedWave;
      
      // Determine if current position is part of any wave
      const distance = Math.abs(y - waveY);
      
      if (distance < 1.5) {
        // Select color based on x position and time
        const colorIndex = Math.floor((x + frame * 2) / 8) % COLORS.length;
        const char = distance < 0.5 ? '█' : distance < 1.0 ? '▓' : '▒';
        line += COLORS[colorIndex] + char + '\x1b[0m';
      } else {
        line += ' ';
      }
    }
    lines.push(line);
  }

  return (
    <Box flexDirection="column">
      {lines.map((line, i) => (
        <Text key={i}>{line}</Text>
      ))}
    </Box>
  );
};
