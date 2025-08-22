# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a sophisticated robotics portfolio website built with vanilla JavaScript and HTML5 Canvas. The site features advanced interactive visualizations, particle systems, holographic effects, and engineering simulations - all implemented without external frameworks or build tools.

**Technology Stack**: Pure HTML5, CSS3, JavaScript ES6+  
**Architecture**: Modular component-based system with canvas-based visualizations  
**Deployment**: Static site (GitHub Pages compatible)

## Development Workflow

### Getting Started
```bash
# No build process required
# Simply open index.html in a browser
open index.html

# For development with live reload, use any static server:
python -m http.server 8000
# or
npx serve .
```

### File Structure
```
├── index.html                 # Main application entry point
├── style.css                  # Primary styles (2,973 lines)
├── hero-background.css        # Hero section background effects
├── js/                        # Modular JavaScript architecture
│   ├── main.js               # Application orchestrator & lifecycle
│   ├── utils.js              # Utilities, performance helpers
│   ├── particle-system.js    # Background particle engine
│   ├── drone-swarm.js        # Advanced kinetic typography system
│   ├── architect.js          # AI consciousness visualization
│   ├── simulation-modules.js # Engineering simulations (robotics, CFD, thrusters)
│   ├── ui-modules.js         # Navigation, forms, interactions
│   ├── data-conduits.js      # Holographic pipe system
│   ├── holographic-enhancer.js # Post-processing effects
│   └── volumetric-renderer.js  # Atmospheric and lighting effects
└── figs/                      # Project images and assets
```

## JavaScript Module Architecture

### Core Patterns

**Module Structure**: All modules follow singleton pattern with global registration:
```javascript
const ModuleName = {
    canvas: null,
    ctx: null,
    settings: { /* configuration */ },
    
    init() {
        // Canvas setup, event listeners, animation start
    },
    
    animate() {
        // Render loop with requestAnimationFrame
    }
};

window.ModuleName = ModuleName; // Global exposure for inter-module communication
```

**Initialization Chain**: Centralized in `main.js` with error handling and loading screen orchestration.

### Canvas Management System

- **One Canvas Per Module**: Each visualization has dedicated canvas element
- **Animation Loop**: 60fps target using `requestAnimationFrame`
- **Performance Optimization**: Fade-based clearing (`rgba(0,0,0,0.1)`) instead of full clear for trail effects
- **Responsive**: All canvases handle window resize events

### Key Modules

**DroneSwarm** (`drone-swarm.js`): Most complex module
- Kinetic typography with 100+ autonomous drones
- Text formation using pixel-perfect ImageData analysis
- Character-specific breakaway animations
- State machine: writing → holding → dissolving → transitioning

**SimulationModules** (`simulation-modules.js`): Engineering visualizations
- **RoboticArm**: 6-DOF forward kinematics simulation
- **CFDSimulation**: Navier-Stokes fluid dynamics with vortices
- **ThrusterSimulation**: Rocket propulsion physics with shock diamonds
- **CodeRain**: Matrix-style background animation

**DataConduits** (`data-conduits.js`): Advanced 3D-inspired pipeline system
- Procedural pipe generation with Bezier curves
- High-energy data packet simulation
- Volumetric rendering with pseudo-3D depth

## Styling Architecture

### CSS Custom Properties System
Comprehensive design system using CSS variables:
```css
:root {
    --primary-bg: #0a0a0a;          /* Dark theme base */
    --primary-accent: #00d4ff;       /* Cyan accent */
    --secondary-accent: #ff6b35;     /* Orange accent */
    --font-primary: 'Orbitron', monospace;
    --font-secondary: 'Rajdhani', sans-serif;
    /* 44 total CSS variables for colors, typography, spacing, animations */
}
```

### Visual Effects System
- **Holographic Effects**: Extensive use of backdrop filters, glows, and blur
- **Animation System**: CSS keyframes coordinated with JavaScript canvas animations
- **Responsive Design**: Mobile-first approach with multiple breakpoints
- **Engineering Overlays**: Physics equations, kinematic data, technical annotations

## Development Guidelines

### Working with Canvas Modules

**Adding New Visualizations**:
1. Create module following singleton pattern
2. Register in `main.js` initialization sequence
3. Handle canvas resize and cleanup
4. Use defensive programming (check canvas existence)

**Performance Considerations**:
- Profile canvas operations regularly using browser dev tools
- Use object pooling for particles/entities
- Implement viewport culling for large particle systems
- Consider Web Workers for heavy computations

### Module Communication

**Inter-Module APIs**:
```javascript
// Global exposure allows cross-module communication
ParticleSystem.updateMousePosition(x, y);
DataConduits.updateDataFlow(systemType, intensity);
HolographicEnhancer.adjustEnhancementLevel(activityLevel);
```

**Configuration System**: Each module exposes settings objects for runtime adjustment.

### Error Handling

Standard pattern across all modules:
```javascript
init() {
    this.canvas = document.getElementById('canvas-id');
    if (!this.canvas) {
        console.error('Canvas element not found!');
        return;
    }
    this.ctx = this.canvas.getContext('2d');
    // Continue initialization...
}
```

## Animation and Physics Systems

### Particle Systems
- **ParticleSystem**: Background interactive particles with mouse interaction
- **DroneSwarm**: Advanced swarm intelligence with formation flying
- **Architect**: Humanoid data stream with consciousness visualization

### Physics Simulations
- **Forward Kinematics**: Real-time 6-DOF robotic arm simulation
- **Fluid Dynamics**: CFD visualization with streamlines and pressure fields
- **Propulsion Physics**: Rocket thrust visualization with exhaust particles

### Performance Optimization
- Selective rendering based on visibility thresholds
- Fade-based canvas clearing to avoid expensive full clears
- Separate canvas layers to prevent unnecessary redraws
- Fixed-length arrays with shift/push for trails

## Common Tasks

### Modifying Visual Effects
1. Locate relevant module in `js/` directory
2. Adjust settings object for quick parameter changes
3. Modify animation loops for behavior changes
4. Test across different screen sizes

### Adding New Sections
1. Update `index.html` with new section markup
2. Add styles to `style.css` following existing patterns
3. Create visualization module if needed
4. Register in `main.js` initialization

### Debugging Canvas Issues
- Use browser dev tools Performance tab for frame rate analysis
- Check console for canvas-related errors
- Verify canvas element IDs match JavaScript selectors
- Test canvas context availability before operations

## Architecture Considerations

This codebase represents a unique approach - building sophisticated real-time graphics and physics simulations entirely with vanilla web technologies. The modular architecture allows for easy extension while maintaining performance through careful canvas management and optimized animation loops.

The absence of build tools means immediate feedback during development, but also requires disciplined approach to code organization and cross-browser compatibility.