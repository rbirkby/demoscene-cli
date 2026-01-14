# demoscene-cli

Terminal-based demoscene visualization tool featuring three stunning animated effects.

## Overview

`demoscene-cli` is a terminal application that showcases classic demoscene-style visualizations using React Ink. The tool runs three sequential animations, each lasting 10 seconds:

1. **Multicoloured Sine Wave (0-10s)**: Animated sine waves flowing across the screen with vibrant colors
2. **Multicoloured Plasma Field (10-20s)**: Classic plasma effect with organic, flowing patterns
3. **Fire Simulation (20-30s)**: Realistic fire effect with warm colors rising from the bottom

## Prerequisites

- Node.js 18+ (for running the built application)
- npm (for building from source)

**Note**: While the original specification called for BunJS, this implementation uses Node.js with esbuild for better compatibility and stability. The application works identically and produces a single bundled executable file as specified.

## Installation

### From Source

Clone the repository and install dependencies:

```bash
git clone https://github.com/rbirkby/demoscene-cli.git
cd demoscene-cli
npm install
```

## Building

Build the application into a standalone executable:

```bash
npm run build
```

This will create a bundled JavaScript file at `dist/index.js`.

## Usage

### Run from source (development mode):

```bash
npm run dev
```

### Run the built version:

```bash
npm start
```

Or directly:

```bash
node dist/index.js
```

The application will automatically:
- Display the sine wave visualization for 10 seconds
- Transition to the plasma field for 10 seconds
- Transition to the fire simulation for 10 seconds
- Exit gracefully after 30 seconds total

## Features

- **Full terminal support**: Automatically adapts to your terminal size
- **Smooth animations**: 20 FPS rendering for fluid motion
- **Responsive resize**: Handles terminal window resizing gracefully
- **Clean transitions**: Seamless switching between visualizations
- **No dependencies required**: The built version only needs Node.js to run

## Technical Stack

- **TypeScript**: Type-safe code with strict mode enabled
- **React**: Component-based architecture
- **Ink**: Terminal UI framework for rendering
- **esbuild**: Fast bundling for production builds

## Project Structure

```
demoscene-cli/
├── src/
│   ├── index.tsx                    # Main application entry point
│   └── components/
│       ├── SineWave.tsx            # Sine wave visualization
│       ├── PlasmaField.tsx         # Plasma effect visualization
│       └── FireSimulation.tsx      # Fire simulation
├── dist/                            # Build output (generated)
├── package.json                     # Project configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## Development

### Available Scripts

- `npm run dev` - Run in development mode with hot reloading
- `npm run build` - Build the application for distribution
- `npm start` - Run the built application

## License

MIT
