import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { ANIMATION_INTERVAL_MS } from '../constants.js';

const PlasmaField: React.FC = () => {
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

  const generatePlasma = (): string[] => {
    const lines: string[] = [];
    
    // Color palette using ANSI escape codes
    const palette = [
      '\x1b[38;5;16m', // Black
      '\x1b[38;5;17m', // Dark blue
      '\x1b[38;5;18m', // Blue
      '\x1b[38;5;19m', // Bright blue
      '\x1b[38;5;21m', // Cyan-blue
      '\x1b[38;5;27m', // Cyan
      '\x1b[38;5;33m', // Light cyan
      '\x1b[38;5;39m', // Bright cyan
      '\x1b[38;5;45m', // Very bright cyan
      '\x1b[38;5;51m', // White-cyan
      '\x1b[38;5;87m', // Pale cyan
      '\x1b[38;5;123m', // Light blue-cyan
      '\x1b[38;5;159m', // Very light cyan
      '\x1b[38;5;195m', // Near white
      '\x1b[38;5;229m', // Pale yellow
      '\x1b[38;5;226m', // Yellow
      '\x1b[38;5;220m', // Orange-yellow
      '\x1b[38;5;214m', // Orange
      '\x1b[38;5;208m', // Dark orange
      '\x1b[38;5;202m', // Red-orange
      '\x1b[38;5;196m', // Red
      '\x1b[38;5;161m', // Magenta-red
      '\x1b[38;5;127m', // Magenta
      '\x1b[38;5;93m', // Purple-magenta
    ];
    const reset = '\x1b[0m';

    const chars = ['█', '▓', '▒', '░'];

    for (let y = 0; y < dimensions.height; y++) {
      let line = '';
      for (let x = 0; x < dimensions.width; x++) {
        // Classic plasma formula using multiple sine/cosine waves
        const value1 = Math.sin(x * 0.04 + frame * 0.03);
        const value2 = Math.sin(y * 0.04 + frame * 0.04);
        const value3 = Math.sin((x + y) * 0.03 + frame * 0.02);
        const value4 = Math.cos(Math.sqrt(x * x + y * y) * 0.03 + frame * 0.025);
        
        const plasma = (value1 + value2 + value3 + value4) / 4;
        
        // Map plasma value to color index
        const colorIndex = Math.floor(((plasma + 1) / 2) * (palette.length - 1));
        const color = palette[Math.max(0, Math.min(palette.length - 1, colorIndex))];
        
        // Map plasma value to character
        const charIndex = Math.floor(((plasma + 1) / 2) * chars.length);
        const char = chars[Math.max(0, Math.min(chars.length - 1, charIndex))];
        
        line += color + char + reset;
      }
      lines.push(line);
    }

    return lines;
  };

  const lines = generatePlasma();

  return (
    <Box flexDirection="column">
      {lines.map((line, i) => (
        <Text key={i}>{line}</Text>
      ))}
    </Box>
  );
};

export default PlasmaField;
