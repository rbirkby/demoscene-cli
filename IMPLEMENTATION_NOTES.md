# Implementation Notes

## Overview
This demoscene visualization tool was implemented using TypeScript and React Ink, providing a terminal-based animation experience.

## Technical Choices

### Runtime Environment
- **Node.js** was used instead of BunJS (as originally specified) due to environment availability
- The codebase can be easily adapted to run with Bun by updating the build scripts
- All dependencies are compatible with both runtimes

### Architecture
- **Modular Effects**: Each visualization effect is implemented as a separate React component
- **Timer-based Transitions**: Effects switch automatically after 10 seconds using setTimeout
- **Frame-based Animation**: All effects update at 20 FPS (50ms intervals) for smooth animation

### Effects Implementation

#### 1. Sine Wave (0-10s)
- Multiple overlapping sine waves with different frequencies and phases
- Color cycling through 6 vibrant colors
- Uses Unicode block characters (█, ▓, ░) for depth effect
- Terminal-aware sizing

#### 2. Plasma Field (10-20s)
- Classic demoscene plasma algorithm using sin/cos functions
- 24-color ANSI palette for smooth gradients
- Four overlapping wave functions create organic patterns
- Distance-based calculations for circular effects

#### 3. Fire Simulation (20-30s)
- Cellular automaton-based fire algorithm
- Upward propagation with cooling and turbulence
- 16-step color gradient from black to white through red/orange/yellow
- Random horizontal drift for realistic flame movement

## Performance
- All effects run at a consistent 20 FPS
- Terminal dimension detection for responsive layouts
- Minimal CPU usage through efficient rendering

## Exit Behavior
- Automatic exit after 30 seconds (graceful process termination)
- Manual exit via 'q' key or Esc key
- Proper cleanup of timers and intervals

## Testing
- Verified complete 30-second cycle
- Tested transition smoothness between effects
- Confirmed graceful exit behavior
- No memory leaks or warnings in production build

## Security
- No vulnerabilities found (CodeQL scan passed)
- No dependencies with known security issues
- Proper input handling and no external data sources
