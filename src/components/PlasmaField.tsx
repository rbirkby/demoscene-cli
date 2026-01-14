import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

const PLASMA_CHARS = ' ░▒▓█';

const COLORS = [
  '\x1b[34m', // Blue
  '\x1b[36m', // Cyan
  '\x1b[32m', // Green
  '\x1b[33m', // Yellow
  '\x1b[31m', // Red
  '\x1b[35m', // Magenta
];

export const PlasmaField: React.FC = () => {
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
  const time = frame * 0.05;

  for (let y = 0; y < height; y++) {
    let line = '';
    for (let x = 0; x < width; x++) {
      // Classic plasma effect using sine and cosine functions
      const value1 = Math.sin(x / 8.0 + time);
      const value2 = Math.sin(y / 6.0 + time * 1.3);
      const value3 = Math.sin((x + y) / 10.0 + time * 0.7);
      const value4 = Math.sin(Math.sqrt(x * x + y * y) / 12.0 + time * 1.5);
      
      const plasma = (value1 + value2 + value3 + value4) / 4.0;
      
      // Map plasma value to character index
      const charIndex = Math.floor(((plasma + 1) / 2) * (PLASMA_CHARS.length - 1));
      const char = PLASMA_CHARS[Math.max(0, Math.min(PLASMA_CHARS.length - 1, charIndex))];
      
      // Map plasma value to color index
      const colorIndex = Math.floor(((plasma + 1) / 2) * COLORS.length);
      const color = COLORS[Math.max(0, Math.min(COLORS.length - 1, colorIndex))];
      
      line += color + char + '\x1b[0m';
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
