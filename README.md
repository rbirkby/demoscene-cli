# demoscene-cli

Terminal-based demoscene visualization tool showcasing three different animated effects.

## Description

This tool runs three sequential visualizations, each lasting exactly 10 seconds:

1. **Multicoloured Sine Wave (0-10 seconds)** - Animated sine waves with vibrant colors flowing across the screen
2. **Multicoloured Plasma Field (10-20 seconds)** - Classic plasma effect with organic, flowing patterns
3. **Fire Simulation (20-30 seconds)** - Realistic fire/flame effect with warm colors rising from the bottom

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm

### Install Dependencies

```bash
npm install
```

## Usage

### Quick Start with npx

If the package is published to npm, you can run it directly without installation:

```bash
npx demoscene-cli
```

### Development Mode

Run the visualization in development mode:

```bash
npm run dev
```

### Build

Compile the TypeScript source to JavaScript:

```bash
npm run build
```

### Run Built Version

After building, run the compiled version:

```bash
npm start
```

Or run directly:

```bash
node dist/index.js
```

### Install Globally

To make the tool available as a command anywhere on your system:

```bash
npm install -g .
demoscene-cli
```

Or if published to npm:

```bash
npm install -g demoscene-cli
demoscene-cli
```

## Controls

- Press `q` or `Esc` to exit early
- The visualization will automatically exit after 30 seconds

## Technical Details

### Stack

- **TypeScript** - Primary programming language
- **React Ink** - Terminal UI framework for rendering
- **Node.js** - Runtime environment

**Note**: While the original specification called for BunJS, this implementation uses Node.js for broader compatibility. The code can be easily adapted to run with Bun if desired by changing the build scripts in `package.json`.

### Features

- Full terminal dimension support
- Smooth 20 FPS animations
- ANSI color support (256 colors)
- Graceful exit handling
- Responsive to terminal resize

## License

MIT
