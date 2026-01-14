import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import { ANIMATION_INTERVAL_MS } from '../constants.js';

const FireSimulation: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 80, height: 24 });
  const [fireBuffer, setFireBuffer] = useState<number[][]>([]);

  useEffect(() => {
    // Get terminal dimensions
    const width = process.stdout.columns || 80;
    const height = process.stdout.rows || 24;
    setDimensions({ width, height });

    // Initialize fire buffer
    const buffer: number[][] = [];
    for (let y = 0; y < height; y++) {
      buffer[y] = [];
      for (let x = 0; x < width; x++) {
        buffer[y][x] = 0;
      }
    }
    setFireBuffer(buffer);

    // Animation loop
    const interval = setInterval(() => {
      setFrame((f) => f + 1);
    }, ANIMATION_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (fireBuffer.length === 0) return;

    // Update fire simulation
    const newBuffer = fireBuffer.map(row => [...row]);

    // Set fire source at the bottom
    for (let x = 0; x < dimensions.width; x++) {
      // Create hotspots at the bottom with some randomness
      if (Math.random() > 0.1) {
        newBuffer[dimensions.height - 1][x] = 255;
      }
    }

    // Propagate fire upward with cooling and diffusion
    for (let y = 0; y < dimensions.height - 1; y++) {
      for (let x = 0; x < dimensions.width; x++) {
        // Get pixel below and apply cooling
        const below = newBuffer[y + 1][x];
        
        // Random horizontal drift
        const drift = Math.floor(Math.random() * 3) - 1;
        const sourceX = Math.max(0, Math.min(dimensions.width - 1, x + drift));
        
        // Cooling factor (fire dissipates as it rises)
        const cooling = Math.floor(Math.random() * 3);
        
        newBuffer[y][x] = Math.max(0, newBuffer[y + 1][sourceX] - cooling);
      }
    }

    setFireBuffer(newBuffer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame, dimensions.width, dimensions.height]);

  const generateFire = (): string[] => {
    if (fireBuffer.length === 0) return [];

    const lines: string[] = [];
    
    // Fire color palette (dark to bright, black -> red -> orange -> yellow -> white)
    const palette = [
      { char: ' ', color: '\x1b[38;5;16m' },      // Black
      { char: '░', color: '\x1b[38;5;52m' },      // Dark red
      { char: '░', color: '\x1b[38;5;88m' },      // Red
      { char: '▒', color: '\x1b[38;5;124m' },     // Brighter red
      { char: '▒', color: '\x1b[38;5;160m' },     // Bright red
      { char: '▓', color: '\x1b[38;5;196m' },     // Very bright red
      { char: '▓', color: '\x1b[38;5;202m' },     // Red-orange
      { char: '█', color: '\x1b[38;5;208m' },     // Orange
      { char: '█', color: '\x1b[38;5;214m' },     // Bright orange
      { char: '█', color: '\x1b[38;5;220m' },     // Orange-yellow
      { char: '█', color: '\x1b[38;5;226m' },     // Yellow
      { char: '█', color: '\x1b[38;5;227m' },     // Bright yellow
      { char: '█', color: '\x1b[38;5;228m' },     // Very bright yellow
      { char: '█', color: '\x1b[38;5;229m' },     // Near white
      { char: '█', color: '\x1b[38;5;230m' },     // White-yellow
      { char: '█', color: '\x1b[38;5;231m' },     // White
    ];
    const reset = '\x1b[0m';

    for (let y = 0; y < dimensions.height; y++) {
      let line = '';
      for (let x = 0; x < dimensions.width; x++) {
        const value = fireBuffer[y][x];
        
        // Map fire intensity to palette index
        const paletteIndex = Math.floor((value / 255) * (palette.length - 1));
        const { char, color } = palette[Math.max(0, Math.min(palette.length - 1, paletteIndex))];
        
        line += color + char + reset;
      }
      lines.push(line);
    }

    return lines;
  };

  const lines = generateFire();

  return (
    <Box flexDirection="column">
      {lines.map((line, i) => (
        <Text key={i}>{line}</Text>
      ))}
    </Box>
  );
};

export default FireSimulation;
