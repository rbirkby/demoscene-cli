import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';

const FIRE_COLORS = [
  '\x1b[30m', // Black (no fire)
  '\x1b[31m', // Red
  '\x1b[33m', // Yellow
  '\x1b[97m', // Bright White
];

const FIRE_CHARS = ' ░▒▓█';

export const FireSimulation: React.FC = () => {
  const [dimensions, setDimensions] = useState({
    width: process.stdout.columns || 80,
    height: process.stdout.rows || 24,
  });
  const [fireBuffer, setFireBuffer] = useState<number[][]>([]);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = process.stdout.columns || 80;
      const newHeight = process.stdout.rows || 24;
      setDimensions({ width: newWidth, height: newHeight });
      
      // Reinitialize buffer on resize
      const buffer: number[][] = [];
      for (let y = 0; y < newHeight; y++) {
        buffer[y] = new Array(newWidth).fill(0);
      }
      setFireBuffer(buffer);
    };

    handleResize();
    process.stdout.on('resize', handleResize);
    
    return () => {
      process.stdout.off('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (fireBuffer.length === 0) return;

    const interval = setInterval(() => {
      setFireBuffer((prevBuffer) => {
        const newBuffer = prevBuffer.map((row) => [...row]);
        const { width, height } = dimensions;

        // Set bottom row to maximum heat with some randomness
        for (let x = 0; x < width; x++) {
          newBuffer[height - 1][x] = Math.random() > 0.2 ? 255 : 0;
        }

        // Propagate fire upwards with cooling and turbulence
        for (let y = 0; y < height - 1; y++) {
          for (let x = 0; x < width; x++) {
            // Add turbulence by sampling from slightly offset position
            const offset = Math.floor(Math.random() * 3) - 1;
            const sourceX = Math.max(0, Math.min(width - 1, x + offset));
            const sourceY = Math.min(height - 1, y + 1);
            
            // Cool down the fire as it rises
            const cooling = Math.floor(Math.random() * 10);
            const heat = Math.max(0, newBuffer[sourceY][sourceX] - cooling);
            
            newBuffer[y][x] = heat;
          }
        }

        return newBuffer;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [fireBuffer.length, dimensions]);

  if (fireBuffer.length === 0) {
    return null;
  }

  const lines: string[] = [];

  for (let y = 0; y < dimensions.height; y++) {
    let line = '';
    for (let x = 0; x < dimensions.width; x++) {
      const heat = fireBuffer[y][x];
      
      // Map heat to character and color
      let color: string;
      let char: string;
      
      if (heat < 64) {
        color = FIRE_COLORS[0];
        char = FIRE_CHARS[0];
      } else if (heat < 128) {
        color = FIRE_COLORS[1];
        const intensity = Math.floor((heat - 64) / 64 * (FIRE_CHARS.length - 1));
        char = FIRE_CHARS[intensity];
      } else if (heat < 192) {
        color = FIRE_COLORS[2];
        const intensity = Math.floor((heat - 128) / 64 * (FIRE_CHARS.length - 1));
        char = FIRE_CHARS[Math.min(FIRE_CHARS.length - 1, intensity + 2)];
      } else {
        color = FIRE_COLORS[3];
        char = FIRE_CHARS[FIRE_CHARS.length - 1];
      }
      
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
