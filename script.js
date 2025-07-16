// Modern Interactive JavaScript for Robot-Themed Website

// Global variables
let particlesCanvas, particlesCtx;
let particles = [];
let mouseX = 0, mouseY = 0;
let isLoaded = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeParticles();
    initializeDroneSwarm();
    initializeRoboticArm();
    initializeCFDSimulation();
    initializeThrusterSimulation();
    initializeArchitect();
    initializeCodeRain();
    initializeNavigation();
    initializeHero();
    initializeAnimations();
    initializeStats();
    initializeContactForm();
    initializeCursorTrail();
    initializeScrollIndicator();
    initializeTheme();
    
    // Show loading screen initially
    showLoadingScreen();
    
    // Hide loading screen after everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            hideLoadingScreen();
            isLoaded = true;
            startAnimations();
        }, 2000);
    });
}

// Particle System
function initializeParticles() {
    particlesCanvas = document.getElementById('particles-canvas');
    if (!particlesCanvas) return;
    
    particlesCtx = particlesCanvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create initial particles
    createParticles();
    
    // Start animation loop
    animateParticles();
}

function resizeCanvas() {
    if (!particlesCanvas) return;
    
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}

function createParticles() {
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            color: `hsl(${190 + Math.random() * 20}, 100%, 50%)`
        });
    }
}

function animateParticles() {
    if (!particlesCtx) return;
    
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = particlesCanvas.width;
        if (particle.x > particlesCanvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = particlesCanvas.height;
        if (particle.y > particlesCanvas.height) particle.y = 0;
        
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += dx * force * 0.001;
            particle.vy += dy * force * 0.001;
        }
        
        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Draw particle
        particlesCtx.beginPath();
        particlesCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        particlesCtx.fillStyle = particle.color;
        particlesCtx.globalAlpha = particle.opacity;
        particlesCtx.fill();
        
        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    particlesCtx.beginPath();
                    particlesCtx.moveTo(particle.x, particle.y);
                    particlesCtx.lineTo(otherParticle.x, otherParticle.y);
                    particlesCtx.strokeStyle = '#00d4ff';
                    particlesCtx.globalAlpha = (80 - distance) / 80 * 0.2;
                    particlesCtx.stroke();
                }
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}

// Kinetic Typography Drone Swarm System
let droneSwarmCanvas, droneSwarmCtx, errorGraphCanvas, errorGraphCtx;
let typographyDrones = [];
let lightTrails = [];
let neuralConstellations = [];
let textSequences = [
    { text: "Hello, I am Edward", duration: 4000, pause: 1000 },
    { text: "Robotics, Control, and Navigation", duration: 5000, pause: 1000 },
    { text: "AI & Machine Learning", duration: 4000, pause: 1000 },
    { text: "Autonomous Systems", duration: 4000, pause: 1000 }
];
let currentSequenceIndex = 0;
let sequenceStartTime = 0;
let droneFormationState = 'writing'; // 'writing', 'dissolving', 'transitioning'
let animationTime = 0;
let simulationStartTime = 0;
let typographySettings = {
    droneCount: 14, // Elite vanguard squadron
    fontSize: 72,
    letterSpacing: 18,
    lineHeight: 90,
    glowIntensity: 1.2,
    trailLength: 40,
    dissolutionSpeed: 0.015,
    hyperKineticSpeed: 8.0,
    precisionThreshold: 2.0,
    afterburnerLength: 30
};

function initializeDroneSwarm() {
    droneSwarmCanvas = document.getElementById('drone-swarm-canvas');
    errorGraphCanvas = document.getElementById('error-graph-canvas');
    
    if (!droneSwarmCanvas) return;
    
    droneSwarmCtx = droneSwarmCanvas.getContext('2d');
    if (errorGraphCanvas) {
        errorGraphCtx = errorGraphCanvas.getContext('2d');
    }
    
    // Set canvas size
    resizeDroneCanvas();
    window.addEventListener('resize', resizeDroneCanvas);
    
    // Create neural network constellation background
    createNeuralConstellations();
    
    // Initialize typography drone swarm
    createTypographyDrones();
    
    // Initialize light trail system
    initializeLightTrails();
    
    // Start kinetic typography animation
    animateKineticTypography();
    
    // Update stats display
    updateSwarmStats();
    
    simulationStartTime = Date.now();
    sequenceStartTime = Date.now();
}

function resizeDroneCanvas() {
    if (!droneSwarmCanvas) return;
    
    const container = droneSwarmCanvas.parentElement;
    droneSwarmCanvas.width = container.offsetWidth;
    droneSwarmCanvas.height = container.offsetHeight;
}

function createNeuralConstellations() {
    neuralConstellations = [];
    const constellationCount = 15;
    
    for (let i = 0; i < constellationCount; i++) {
        const constellation = {
            x: Math.random() * droneSwarmCanvas.width,
            y: Math.random() * droneSwarmCanvas.height,
            nodes: [],
            connections: [],
            pulsePhase: Math.random() * Math.PI * 2,
            driftX: (Math.random() - 0.5) * 0.2,
            driftY: (Math.random() - 0.5) * 0.2
        };
        
        // Create nodes for this constellation
        const nodeCount = 3 + Math.floor(Math.random() * 4);
        for (let j = 0; j < nodeCount; j++) {
            constellation.nodes.push({
                x: (Math.random() - 0.5) * 80,
                y: (Math.random() - 0.5) * 80,
                intensity: 0.3 + Math.random() * 0.4,
                phase: Math.random() * Math.PI * 2
            });
        }
        
        // Create connections between nearby nodes
        for (let a = 0; a < constellation.nodes.length; a++) {
            for (let b = a + 1; b < constellation.nodes.length; b++) {
                const node1 = constellation.nodes[a];
                const node2 = constellation.nodes[b];
                const distance = Math.sqrt((node1.x - node2.x) ** 2 + (node1.y - node2.y) ** 2);
                
                if (distance < 60) {
                    constellation.connections.push({
                        from: a,
                        to: b,
                        opacity: 0.1 + (60 - distance) / 60 * 0.2
                    });
                }
            }
        }
        
        neuralConstellations.push(constellation);
    }
}

function createTypographyDrones() {
    typographyDrones = [];
    
    // Create elite vanguard squadron with unique characteristics
    const squadronNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi'];
    
    for (let i = 0; i < typographySettings.droneCount; i++) {
        typographyDrones.push({
            id: i,
            callSign: squadronNames[i],
            x: Math.random() * droneSwarmCanvas.width,
            y: Math.random() * droneSwarmCanvas.height,
            targetX: 0,
            targetY: 0,
            vx: 0,
            vy: 0,
            
            // Elite characteristics
            size: 3 + Math.random() * 2, // Larger, more visible
            brightness: 0.9 + Math.random() * 0.1,
            coreEnergy: 1.0,
            phase: Math.random() * Math.PI * 2,
            hyperSpeed: typographySettings.hyperKineticSpeed * (0.8 + Math.random() * 0.4),
            
            // Precision targeting
            precision: 0.9 + Math.random() * 0.1,
            state: 'standby', // 'standby', 'engaging', 'forming', 'repositioning'
            
            // Advanced trail systems
            afterburnerTrail: [],
            motionTrail: [],
            maxAfterburnerLength: typographySettings.afterburnerLength,
            maxMotionLength: 15,
            
            // Hyper-kinetic effects
            velocity: 0,
            acceleration: 0,
            motionBlurIntensity: 0,
            prevX: 0,
            prevY: 0,
            snapDistance: typographySettings.precisionThreshold,
            
            // Elite visual effects
            energyField: 1.0,
            thrusterGlow: 0,
            crystallineFormation: false
        });
    }
    
    // Update drone count display
    document.getElementById('drone-count').textContent = `${typographySettings.droneCount} VANGUARD`;
}

function initializeLightTrails() {
    lightTrails = [];
    
    // Light trails will be created dynamically as drones move
    // Each drone will contribute to the trail system
}

function animateKineticTypography() {
    if (!droneSwarmCtx) return;
    
    animationTime += 16; // ~60fps
    const time = Date.now() * 0.001;
    const currentTime = Date.now();
    
    // Clear canvas with deep black void
    droneSwarmCtx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    droneSwarmCtx.fillRect(0, 0, droneSwarmCanvas.width, droneSwarmCanvas.height);
    
    // Draw cyan grid floor
    drawCyanGridFloor(time);
    
    // Draw neural network constellation background
    drawNeuralConstellations(time);
    
    // Handle text sequence transitions
    handleTextSequences(currentTime);
    
    // Update and draw elite typography squadron
    updateTypographyDrones(time);
    
    // Draw each elite drone with advanced effects
    typographyDrones.forEach(drone => {
        drawEliteDrone(drone);
    });
    
    // Draw crystalline text formation
    drawCrystallineTextFormation(time);
    
    // Update statistics
    updateTypographyStats();
    
    requestAnimationFrame(animateKineticTypography);
}

function drawCyanGridFloor(time) {
    const gridSize = 40;
    const centerY = droneSwarmCanvas.height * 0.8; // Grid floor at bottom
    const gridAlpha = 0.2 + 0.1 * Math.sin(time * 0.5);
    
    // Draw grid lines with perspective effect
    droneSwarmCtx.strokeStyle = `rgba(0, 212, 255, ${gridAlpha})`;
    droneSwarmCtx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let y = centerY; y < droneSwarmCanvas.height; y += gridSize) {
        const perspectiveScale = 1 - (y - centerY) / (droneSwarmCanvas.height - centerY) * 0.5;
        const lineWidth = droneSwarmCanvas.width * perspectiveScale;
        const startX = (droneSwarmCanvas.width - lineWidth) / 2;
        
        droneSwarmCtx.beginPath();
        droneSwarmCtx.moveTo(startX, y);
        droneSwarmCtx.lineTo(startX + lineWidth, y);
        droneSwarmCtx.stroke();
    }
    
    // Vertical grid lines with perspective
    const verticalLines = 12;
    for (let i = 0; i <= verticalLines; i++) {
        const x = (i / verticalLines) * droneSwarmCanvas.width;
        const perspectiveY = centerY + (droneSwarmCanvas.height - centerY) * 0.8;
        
        droneSwarmCtx.beginPath();
        droneSwarmCtx.moveTo(x, centerY);
        droneSwarmCtx.lineTo(x, perspectiveY);
        droneSwarmCtx.stroke();
    }
    
    // Add subtle glow to grid
    droneSwarmCtx.shadowColor = '#00d4ff';
    droneSwarmCtx.shadowBlur = 3;
    droneSwarmCtx.stroke();
    droneSwarmCtx.shadowBlur = 0;
}

function drawCrystallineTextFormation(time) {
    if (droneFormationState === 'writing' || droneFormationState === 'dissolving') {
        const currentSequence = textSequences[currentSequenceIndex];
        const currentText = currentSequence.text;
        
        // Draw crystalline text outline
        const centerX = droneSwarmCanvas.width / 2;
        const centerY = droneSwarmCanvas.height / 2;
        
        droneSwarmCtx.font = `bold ${typographySettings.fontSize}px Orbitron, monospace`;
        droneSwarmCtx.textAlign = 'center';
        droneSwarmCtx.textBaseline = 'middle';
        
        // Create crystalline effect with multiple layers
        const crystallineAlpha = droneFormationState === 'dissolving' ? 0.05 : 0.15;
        const pulse = 0.7 + 0.3 * Math.sin(time * 2);
        
        // Draw multiple offset layers for crystalline depth
        for (let layer = 0; layer < 4; layer++) {
            const offset = layer * 2;
            const alpha = crystallineAlpha * (1 - layer * 0.2) * pulse;
            
            // Crystalline stroke
            droneSwarmCtx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            droneSwarmCtx.lineWidth = 2 - layer * 0.3;
            droneSwarmCtx.shadowColor = '#00ffff';
            droneSwarmCtx.shadowBlur = 15 - layer * 3;
            droneSwarmCtx.strokeText(currentText, centerX + offset, centerY + offset);
        }
        
        droneSwarmCtx.shadowBlur = 0;
        
        // Add prismatic edge effects
        const edgeCount = 6;
        for (let i = 0; i < edgeCount; i++) {
            const angle = (i / edgeCount) * Math.PI * 2;
            const distance = 3;
            const edgeX = centerX + Math.cos(angle) * distance;
            const edgeY = centerY + Math.sin(angle) * distance;
            const edgeAlpha = crystallineAlpha * 0.3;
            
            droneSwarmCtx.strokeStyle = `rgba(255, 255, 255, ${edgeAlpha})`;
            droneSwarmCtx.lineWidth = 0.5;
            droneSwarmCtx.strokeText(currentText, edgeX, edgeY);
        }
    }
}

function drawNeuralConstellations(time) {
    neuralConstellations.forEach(constellation => {
        // Update constellation position
        constellation.x += constellation.driftX;
        constellation.y += constellation.driftY;
        constellation.pulsePhase += 0.02;
        
        // Wrap around canvas
        if (constellation.x < -100) constellation.x = droneSwarmCanvas.width + 100;
        if (constellation.x > droneSwarmCanvas.width + 100) constellation.x = -100;
        if (constellation.y < -100) constellation.y = droneSwarmCanvas.height + 100;
        if (constellation.y > droneSwarmCanvas.height + 100) constellation.y = -100;
        
        // Draw connections
        constellation.connections.forEach(connection => {
            const node1 = constellation.nodes[connection.from];
            const node2 = constellation.nodes[connection.to];
            
            const x1 = constellation.x + node1.x;
            const y1 = constellation.y + node1.y;
            const x2 = constellation.x + node2.x;
            const y2 = constellation.y + node2.y;
            
            const pulseAlpha = connection.opacity * (0.7 + 0.3 * Math.sin(constellation.pulsePhase));
            
            droneSwarmCtx.strokeStyle = `rgba(0, 212, 255, ${pulseAlpha})`;
            droneSwarmCtx.lineWidth = 0.5;
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(x1, y1);
            droneSwarmCtx.lineTo(x2, y2);
            droneSwarmCtx.stroke();
        });
        
        // Draw nodes
        constellation.nodes.forEach(node => {
            const x = constellation.x + node.x;
            const y = constellation.y + node.y;
            const pulse = node.intensity * (0.6 + 0.4 * Math.sin(time * 2 + node.phase));
            
            droneSwarmCtx.fillStyle = `rgba(0, 212, 255, ${pulse})`;
            droneSwarmCtx.beginPath();
            droneSwarmCtx.arc(x, y, 1.5, 0, Math.PI * 2);
            droneSwarmCtx.fill();
            
            // Add subtle glow
            if (pulse > 0.7) {
                droneSwarmCtx.shadowColor = '#00d4ff';
                droneSwarmCtx.shadowBlur = 4;
                droneSwarmCtx.fill();
                droneSwarmCtx.shadowBlur = 0;
            }
        });
    });
}

function handleTextSequences(currentTime) {
    const currentSequence = textSequences[currentSequenceIndex];
    const elapsed = currentTime - sequenceStartTime;
    
    if (droneFormationState === 'writing') {
        if (elapsed > currentSequence.duration) {
            droneFormationState = 'dissolving';
        }
    } else if (droneFormationState === 'dissolving') {
        if (elapsed > currentSequence.duration + currentSequence.pause) {
            // Move to next sequence
            currentSequenceIndex = (currentSequenceIndex + 1) % textSequences.length;
            sequenceStartTime = currentTime;
            droneFormationState = 'transitioning';
        }
    } else if (droneFormationState === 'transitioning') {
        if (elapsed > 1000) { // 1 second transition
            droneFormationState = 'writing';
        }
    }
}

function getEliteFormationPoints(text, fontSize) {
    // Create strategic formation points for elite squadron
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = droneSwarmCanvas.width;
    tempCanvas.height = droneSwarmCanvas.height;
    
    tempCtx.font = `${fontSize}px Orbitron, monospace`;
    tempCtx.fontWeight = 'bold';
    tempCtx.textAlign = 'center';
    tempCtx.textBaseline = 'middle';
    
    const centerX = tempCanvas.width / 2;
    const centerY = tempCanvas.height / 2;
    
    // Create text path for precise vector extraction
    tempCtx.fillStyle = 'white';
    tempCtx.strokeStyle = 'white';
    tempCtx.lineWidth = 2;
    tempCtx.fillText(text, centerX, centerY);
    tempCtx.strokeText(text, centerX, centerY);
    
    // Extract strategic formation points (corners, intersections, key curves)
    const formationPoints = [];
    const textMetrics = tempCtx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;
    
    // Create precision points based on character analysis
    const chars = text.split('');
    const charSpacing = textWidth / Math.max(1, chars.length - 1);
    const startX = centerX - textWidth / 2;
    
    chars.forEach((char, index) => {
        const charX = startX + index * charSpacing;
        
        // Add strategic points for each character
        switch (char.toUpperCase()) {
            case 'H':
                formationPoints.push(
                    { x: charX - 8, y: centerY - textHeight/3, priority: 'high' },
                    { x: charX + 8, y: centerY - textHeight/3, priority: 'high' },
                    { x: charX, y: centerY, priority: 'critical' },
                    { x: charX - 8, y: centerY + textHeight/3, priority: 'high' },
                    { x: charX + 8, y: centerY + textHeight/3, priority: 'high' }
                );
                break;
            case 'E':
                formationPoints.push(
                    { x: charX - 6, y: centerY - textHeight/3, priority: 'high' },
                    { x: charX + 6, y: centerY - textHeight/3, priority: 'medium' },
                    { x: charX - 6, y: centerY, priority: 'critical' },
                    { x: charX + 4, y: centerY, priority: 'medium' },
                    { x: charX - 6, y: centerY + textHeight/3, priority: 'high' },
                    { x: charX + 6, y: centerY + textHeight/3, priority: 'medium' }
                );
                break;
            case 'L':
                formationPoints.push(
                    { x: charX - 6, y: centerY - textHeight/3, priority: 'high' },
                    { x: charX - 6, y: centerY, priority: 'critical' },
                    { x: charX - 6, y: centerY + textHeight/3, priority: 'high' },
                    { x: charX + 6, y: centerY + textHeight/3, priority: 'medium' }
                );
                break;
            case 'O':
                formationPoints.push(
                    { x: charX, y: centerY - textHeight/3, priority: 'high' },
                    { x: charX - 8, y: centerY, priority: 'critical' },
                    { x: charX + 8, y: centerY, priority: 'critical' },
                    { x: charX, y: centerY + textHeight/3, priority: 'high' }
                );
                break;
            case 'R':
                formationPoints.push(
                    { x: charX - 6, y: centerY - textHeight/3, priority: 'high' },
                    { x: charX + 4, y: centerY - textHeight/3, priority: 'medium' },
                    { x: charX - 6, y: centerY, priority: 'critical' },
                    { x: charX + 2, y: centerY, priority: 'medium' },
                    { x: charX - 6, y: centerY + textHeight/3, priority: 'high' },
                    { x: charX + 6, y: centerY + textHeight/3, priority: 'medium' }
                );
                break;
            default:
                // Generic formation for other characters
                formationPoints.push(
                    { x: charX, y: centerY - textHeight/4, priority: 'medium' },
                    { x: charX - 4, y: centerY, priority: 'high' },
                    { x: charX + 4, y: centerY, priority: 'high' },
                    { x: charX, y: centerY + textHeight/4, priority: 'medium' }
                );
        }
    });
    
    // Sort by priority and limit to drone count
    const priorityOrder = { 'critical': 3, 'high': 2, 'medium': 1 };
    formationPoints.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    
    return formationPoints.slice(0, typographySettings.droneCount);
}

function updateTypographyDrones(time) {
    const currentSequence = textSequences[currentSequenceIndex];
    const currentText = currentSequence.text;
    
    // Get elite formation points for current text
    const formationPoints = getEliteFormationPoints(currentText, typographySettings.fontSize);
    
    typographyDrones.forEach((drone, index) => {
        // Store previous position for motion blur and afterburners
        drone.prevX = drone.x;
        drone.prevY = drone.y;
        
        // Determine target based on formation state
        let newTargetX = drone.targetX;
        let newTargetY = drone.targetY;
        
        if (droneFormationState === 'writing' || droneFormationState === 'transitioning') {
            if (index < formationPoints.length) {
                const targetPoint = formationPoints[index];
                newTargetX = targetPoint.x;
                newTargetY = targetPoint.y;
                drone.state = 'engaging';
                drone.crystallineFormation = true;
            } else {
                // Standby drones maintain perimeter
                const standbyRadius = 150;
                const standbyAngle = (index / typographySettings.droneCount) * Math.PI * 2 + time * 0.3;
                newTargetX = droneSwarmCanvas.width / 2 + Math.cos(standbyAngle) * standbyRadius;
                newTargetY = droneSwarmCanvas.height / 2 + Math.sin(standbyAngle) * standbyRadius;
                drone.state = 'standby';
                drone.crystallineFormation = false;
            }
        } else if (droneFormationState === 'dissolving') {
            // Aggressive exit vectors
            const exitAngle = Math.atan2(drone.y - droneSwarmCanvas.height/2, drone.x - droneSwarmCanvas.width/2);
            newTargetX = drone.x + Math.cos(exitAngle) * 200;
            newTargetY = drone.y + Math.sin(exitAngle) * 200;
            drone.state = 'repositioning';
            drone.crystallineFormation = false;
        }
        
        // Hyper-kinetic movement calculations
        const dx = newTargetX - drone.x;
        const dy = newTargetY - drone.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > drone.snapDistance) {
            // Aggressive acceleration towards target
            const acceleration = drone.hyperSpeed;
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            // Apply hyper-kinetic force
            drone.vx += directionX * acceleration;
            drone.vy += directionY * acceleration;
            
            // Apply drag for control
            drone.vx *= 0.85;
            drone.vy *= 0.85;
            
            // Calculate velocity and update position
            drone.velocity = Math.sqrt(drone.vx * drone.vx + drone.vy * drone.vy);
            drone.x += drone.vx;
            drone.y += drone.vy;
            
            // Motion blur intensity based on velocity
            drone.motionBlurIntensity = Math.min(1, drone.velocity / 15);
            drone.thrusterGlow = Math.min(1, drone.velocity / 10);
            
        } else {
            // Precision snap into position
            drone.x = newTargetX;
            drone.y = newTargetY;
            drone.vx = 0;
            drone.vy = 0;
            drone.velocity = 0;
            drone.motionBlurIntensity = 0;
            drone.thrusterGlow = 0;
        }
        
        // Update target for next frame
        drone.targetX = newTargetX;
        drone.targetY = newTargetY;
        
        // Update afterburner trail (sharp, bright trail)
        if (drone.velocity > 2) {
            drone.afterburnerTrail.push({
                x: drone.x,
                y: drone.y,
                intensity: Math.min(1, drone.velocity / 20),
                time: time
            });
        }
        
        if (drone.afterburnerTrail.length > drone.maxAfterburnerLength) {
            drone.afterburnerTrail.shift();
        }
        
        // Update motion trail (for position history)
        drone.motionTrail.push({ x: drone.x, y: drone.y, time: time });
        if (drone.motionTrail.length > drone.maxMotionLength) {
            drone.motionTrail.shift();
        }
        
        // Update energy fields and phase
        drone.phase += 0.08;
        drone.energyField = drone.crystallineFormation ? 1.2 : 0.8;
        drone.coreEnergy = drone.brightness * (0.9 + 0.1 * Math.sin(drone.phase));
    });
}

function drawEliteDrone(drone) {
    // Draw brilliant afterburner trail
    if (drone.afterburnerTrail.length > 1) {
        for (let i = 1; i < drone.afterburnerTrail.length; i++) {
            const prev = drone.afterburnerTrail[i - 1];
            const curr = drone.afterburnerTrail[i];
            
            const alpha = (i / drone.afterburnerTrail.length) * curr.intensity * 0.9;
            const width = (i / drone.afterburnerTrail.length) * 4 + 1;
            
            // Sharp, brilliant afterburner
            droneSwarmCtx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            droneSwarmCtx.lineWidth = width;
            droneSwarmCtx.lineCap = 'round';
            
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(prev.x, prev.y);
            droneSwarmCtx.lineTo(curr.x, curr.y);
            droneSwarmCtx.stroke();
            
            // Add intense glow to afterburners
            if (alpha > 0.6) {
                droneSwarmCtx.shadowColor = '#00ffff';
                droneSwarmCtx.shadowBlur = 12;
                droneSwarmCtx.stroke();
                droneSwarmCtx.shadowBlur = 0;
            }
        }
    }
    
    // Motion blur for hyper-speed movement
    if (drone.motionBlurIntensity > 0.4) {
        const blurSteps = 8;
        const stepX = (drone.x - drone.prevX) / blurSteps;
        const stepY = (drone.y - drone.prevY) / blurSteps;
        
        for (let i = 0; i < blurSteps; i++) {
            const alpha = (i / blurSteps) * drone.motionBlurIntensity * 0.4;
            const x = drone.prevX + stepX * i;
            const y = drone.prevY + stepY * i;
            const size = drone.size * (0.6 + (i / blurSteps) * 0.4);
            
            droneSwarmCtx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
            droneSwarmCtx.beginPath();
            droneSwarmCtx.arc(x, y, size, 0, Math.PI * 2);
            droneSwarmCtx.fill();
        }
    }
    
    // Elite drone core with enhanced energy field
    const coreSize = drone.size * drone.energyField;
    const coreIntensity = drone.coreEnergy;
    
    // Energy field aura
    if (drone.crystallineFormation) {
        droneSwarmCtx.shadowColor = '#00d4ff';
        droneSwarmCtx.shadowBlur = 25;
        droneSwarmCtx.fillStyle = `rgba(0, 212, 255, 0.3)`;
        droneSwarmCtx.beginPath();
        droneSwarmCtx.arc(drone.x, drone.y, coreSize + 8, 0, Math.PI * 2);
        droneSwarmCtx.fill();
        droneSwarmCtx.shadowBlur = 0;
    }
    
    // Thruster glow
    if (drone.thrusterGlow > 0) {
        const thrusterSize = coreSize + drone.thrusterGlow * 6;
        droneSwarmCtx.fillStyle = `rgba(255, 255, 255, ${drone.thrusterGlow * 0.4})`;
        droneSwarmCtx.beginPath();
        droneSwarmCtx.arc(drone.x, drone.y, thrusterSize, 0, Math.PI * 2);
        droneSwarmCtx.fill();
    }
    
    // Main elite drone body (larger, more intense)
    droneSwarmCtx.shadowColor = '#00d4ff';
    droneSwarmCtx.shadowBlur = 20 * typographySettings.glowIntensity;
    droneSwarmCtx.fillStyle = `rgba(0, 212, 255, ${coreIntensity})`;
    droneSwarmCtx.beginPath();
    droneSwarmCtx.arc(drone.x, drone.y, coreSize, 0, Math.PI * 2);
    droneSwarmCtx.fill();
    droneSwarmCtx.shadowBlur = 0;
    
    // Elite core highlight
    droneSwarmCtx.fillStyle = `rgba(255, 255, 255, ${coreIntensity * 0.8})`;
    droneSwarmCtx.beginPath();
    droneSwarmCtx.arc(drone.x, drone.y, coreSize * 0.4, 0, Math.PI * 2);
    droneSwarmCtx.fill();
}

function drawLightTrails() {
    typographyDrones.forEach(drone => {
        if (drone.trail.length > 1) {
            // Draw persistent light trails
            for (let i = 1; i < drone.trail.length; i++) {
                const prev = drone.trail[i - 1];
                const curr = drone.trail[i];
                
                const alpha = (i / drone.trail.length) * 0.6;
                const width = (i / drone.trail.length) * 2 + 0.5;
                
                droneSwarmCtx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                droneSwarmCtx.lineWidth = width;
                droneSwarmCtx.lineCap = 'round';
                
                droneSwarmCtx.beginPath();
                droneSwarmCtx.moveTo(prev.x, prev.y);
                droneSwarmCtx.lineTo(curr.x, curr.y);
                droneSwarmCtx.stroke();
                
                // Add glow to trails
                if (alpha > 0.4) {
                    droneSwarmCtx.shadowColor = '#00d4ff';
                    droneSwarmCtx.shadowBlur = 8;
                    droneSwarmCtx.stroke();
                    droneSwarmCtx.shadowBlur = 0;
                }
            }
        }
    });
}

function drawTextFormation(time) {
    if (droneFormationState === 'writing' || droneFormationState === 'dissolving') {
        const currentSequence = textSequences[currentSequenceIndex];
        const currentText = currentSequence.text;
        
        // Draw holographic text outline
        const centerX = droneSwarmCanvas.width / 2;
        const centerY = droneSwarmCanvas.height / 2;
        
        droneSwarmCtx.font = `${typographySettings.fontSize}px Orbitron, monospace`;
        droneSwarmCtx.textAlign = 'center';
        droneSwarmCtx.textBaseline = 'middle';
        
        // Create holographic effect
        const holoAlpha = droneFormationState === 'dissolving' ? 0.1 : 0.3;
        const pulse = 0.8 + 0.2 * Math.sin(time * 3);
        
        // Draw multiple offset text layers for depth
        for (let offset = 0; offset < 3; offset++) {
            const alpha = holoAlpha * (1 - offset * 0.3) * pulse;
            droneSwarmCtx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            droneSwarmCtx.lineWidth = 1 + offset * 0.5;
            droneSwarmCtx.strokeText(currentText, centerX + offset, centerY + offset);
        }
        
        // Add glow effect
        droneSwarmCtx.shadowColor = '#00d4ff';
        droneSwarmCtx.shadowBlur = 20;
        droneSwarmCtx.strokeStyle = `rgba(0, 212, 255, ${holoAlpha * 0.5})`;
        droneSwarmCtx.lineWidth = 0.5;
        droneSwarmCtx.strokeText(currentText, centerX, centerY);
        droneSwarmCtx.shadowBlur = 0;
    }
}

function updateTypographyStats() {
    const currentSequence = textSequences[currentSequenceIndex];
    
    // Update display elements
    document.getElementById('formation-progress').textContent = droneFormationState.toUpperCase();
    
    const activeDrones = typographyDrones.filter(d => d.state === 'forming').length;
    document.getElementById('solution-time').textContent = `${((activeDrones / typographyDrones.length) * 100).toFixed(1)}%`;
    
    document.getElementById('point-cloud-count').textContent = currentSequence.text.length.toString() + ' CHARS';
}

function updateSwarmStats() {
    // Update the swarm statistics display
    const currentSequence = textSequences[currentSequenceIndex];
    document.getElementById('formation-progress').textContent = 'KINETIC TYPOGRAPHY';
    document.getElementById('solution-time').textContent = '0.0%';
    document.getElementById('point-cloud-count').textContent = '0';
}

function updateScanningDrones(time) {
    scanningDrones.forEach(drone => {
        // Update orbital motion
        drone.targetAngle += drone.orbitSpeed;
        drone.z = Math.sin(time * drone.verticalOscillation + drone.phase) * 30;
        
        // Calculate orbital position
        drone.x = artifact.centerX + Math.cos(drone.targetAngle) * drone.orbitRadius;
        drone.y = artifact.centerY + Math.sin(drone.targetAngle) * drone.orbitRadius;
        
        // Update sensor sweeps
        if (drone.radarActive) {
            drone.radarSweepAngle += drone.radarSweepSpeed;
            if (drone.radarSweepAngle > Math.PI * 2) drone.radarSweepAngle = 0;
        }
        
        // Store trail
        drone.trailX.push(drone.x);
        drone.trailY.push(drone.y);
        if (drone.trailX.length > drone.maxTrailLength) {
            drone.trailX.shift();
            drone.trailY.shift();
        }
        
        // Draw drone trail
        if (drone.trailX.length > 1) {
            droneSwarmCtx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
            droneSwarmCtx.lineWidth = 1;
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(drone.trailX[0], drone.trailY[0]);
            for (let i = 1; i < drone.trailX.length; i++) {
                const alpha = i / drone.trailX.length;
                droneSwarmCtx.globalAlpha = alpha * 0.3;
                droneSwarmCtx.lineTo(drone.trailX[i], drone.trailY[i]);
            }
            droneSwarmCtx.stroke();
            droneSwarmCtx.globalAlpha = 1;
        }
        
        // Draw drone
        const pulseIntensity = 0.8 + 0.2 * Math.sin(time * 3 + drone.phase);
        droneSwarmCtx.fillStyle = `rgba(0, 212, 255, ${pulseIntensity})`;
        droneSwarmCtx.beginPath();
        droneSwarmCtx.arc(drone.x, drone.y, drone.size, 0, Math.PI * 2);
        droneSwarmCtx.fill();
        
        // Add glow effect
        droneSwarmCtx.shadowColor = '#00d4ff';
        droneSwarmCtx.shadowBlur = 8;
        droneSwarmCtx.fill();
        droneSwarmCtx.shadowBlur = 0;
    });
}

function generatePointCloudData() {
    // Add new points to cloud based on scanning progress
    if (pointCloud.length < maxReconstructionPoints) {
        const pointsToAdd = Math.min(15, maxReconstructionPoints - pointCloud.length);
        
        for (let i = 0; i < pointsToAdd; i++) {
            // Generate points around the artifact with some noise
            const angle = Math.random() * Math.PI * 2;
            const radius = 40 + Math.random() * 40;
            const noise = (Math.random() - 0.5) * 8;
            
            pointCloud.push({
                x: artifact.centerX + Math.cos(angle) * radius + noise,
                y: artifact.centerY + Math.sin(angle) * radius + noise,
                intensity: 0.4 + Math.random() * 0.6,
                age: 0,
                maxAge: 180 + Math.random() * 120
            });
        }
    }
    
    // Update existing points
    pointCloud.forEach(point => {
        point.age++;
        point.intensity *= 0.998; // Fade over time
    });
    
    // Remove old points
    pointCloud = pointCloud.filter(point => point.age < point.maxAge && point.intensity > 0.1);
}

function drawPointCloud() {
    // Draw shimmering nebula of point cloud data
    pointCloud.forEach(point => {
        const twinkle = 0.5 + 0.5 * Math.sin(Date.now() * 0.01 + point.x * 0.1);
        const alpha = point.intensity * twinkle;
        
        droneSwarmCtx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        droneSwarmCtx.beginPath();
        droneSwarmCtx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        droneSwarmCtx.fill();
        
        // Add subtle glow to some points
        if (Math.random() < 0.3) {
            droneSwarmCtx.shadowColor = '#00d4ff';
            droneSwarmCtx.shadowBlur = 3;
            droneSwarmCtx.fill();
            droneSwarmCtx.shadowBlur = 0;
        }
    });
}

function drawReconstructedWireframe() {
    // Draw wireframe reconstruction emerging from point cloud
    if (pointCloud.length > 100) {
        const progress = Math.min(1, (pointCloud.length - 100) / (maxReconstructionPoints - 100));
        
        // Draw simplified wireframe version of artifact
        const centerX = artifact.centerX + 120; // Offset to the side
        const centerY = artifact.centerY;
        const scale = 0.7;
        
        droneSwarmCtx.strokeStyle = `rgba(255, 107, 53, ${0.4 + progress * 0.4})`;
        droneSwarmCtx.lineWidth = 2;
        
        // Draw a simplified wireframe based on the original artifact
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 35 * scale;
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle + Math.PI/4) * radius * 0.7;
            const y2 = centerY + Math.sin(angle + Math.PI/4) * radius * 0.7;
            
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(x1, y1);
            droneSwarmCtx.lineTo(x2, y2);
            droneSwarmCtx.stroke();
        }
        
        // Add glow effect
        droneSwarmCtx.shadowColor = '#ff6b35';
        droneSwarmCtx.shadowBlur = 6;
        droneSwarmCtx.stroke();
        droneSwarmCtx.shadowBlur = 0;
    }
}

function updateScanCompleteness() {
    scanCompleteness = Math.min(100, (pointCloud.length / maxReconstructionPoints) * 100);
    document.getElementById('solution-time').textContent = scanCompleteness.toFixed(1) + '%';
    document.getElementById('point-cloud-count').textContent = pointCloud.length.toLocaleString();
    
    if (scanCompleteness > 80) {
        document.getElementById('formation-progress').textContent = 'RECONSTRUCTION COMPLETE';
    } else if (scanCompleteness > 40) {
        document.getElementById('formation-progress').textContent = 'FUSING DATA';
    } else {
        document.getElementById('formation-progress').textContent = 'SCANNING';
    }
}

function drawSensorVisualizations() {
    scanningDrones.forEach(drone => {
        const angleToArtifact = Math.atan2(artifact.centerY - drone.y, artifact.centerX - drone.x);
        
        // Draw LiDAR cone
        if (drone.lidarActive) {
            droneSwarmCtx.strokeStyle = 'rgba(0, 255, 136, 0.2)';
            droneSwarmCtx.lineWidth = 1;
            
            const coneAngle = drone.lidarConeAngle;
            const range = drone.lidarRange;
            
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(drone.x, drone.y);
            droneSwarmCtx.lineTo(
                drone.x + Math.cos(angleToArtifact - coneAngle/2) * range,
                drone.y + Math.sin(angleToArtifact - coneAngle/2) * range
            );
            droneSwarmCtx.moveTo(drone.x, drone.y);
            droneSwarmCtx.lineTo(
                drone.x + Math.cos(angleToArtifact + coneAngle/2) * range,
                drone.y + Math.sin(angleToArtifact + coneAngle/2) * range
            );
            droneSwarmCtx.stroke();
        }
        
        // Draw mmWave radar sweep
        if (drone.radarActive) {
            droneSwarmCtx.strokeStyle = 'rgba(255, 107, 53, 0.3)';
            droneSwarmCtx.lineWidth = 2;
            
            const sweepAngle = drone.radarSweepAngle;
            const sweepRange = 60;
            
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(drone.x, drone.y);
            droneSwarmCtx.lineTo(
                drone.x + Math.cos(sweepAngle) * sweepRange,
                drone.y + Math.sin(sweepAngle) * sweepRange
            );
            droneSwarmCtx.stroke();
        }
    });
}

function updateReconstructionGraph() {
    if (!errorGraphCtx) return;
    
    // Add new error data point
    const newError = Math.max(0.05, 0.9 - (scanCompleteness * 0.01));
    reconstructionError.push(newError);
    if (reconstructionError.length > 60) {
        reconstructionError.shift();
    }
    
    // Clear and draw graph
    errorGraphCtx.fillStyle = 'rgba(10, 10, 10, 0.8)';
    errorGraphCtx.fillRect(0, 0, 120, 60);
    
    // Draw error curve
    errorGraphCtx.strokeStyle = '#ff6b35';
    errorGraphCtx.lineWidth = 2;
    errorGraphCtx.beginPath();
    
    for (let i = 0; i < reconstructionError.length; i++) {
        const x = (i / (reconstructionError.length - 1)) * 120;
        const y = 60 - (reconstructionError[i] * 50);
        
        if (i === 0) {
            errorGraphCtx.moveTo(x, y);
        } else {
            errorGraphCtx.lineTo(x, y);
        }
    }
    
    errorGraphCtx.stroke();
}

function updateSwarmStats() {
    setInterval(() => {
        const droneCountEl = document.getElementById('drone-count');
        const progressEl = document.getElementById('formation-progress');
        
        if (droneCountEl && progressEl) {
            // Add subtle animation to stats for scanning drones
            const currentCount = parseInt(droneCountEl.textContent);
            if (currentCount < 12) {
                droneCountEl.textContent = Math.min(12, currentCount + 1).toString();
            }
        }
    }, 200);
}

// Robotic Arm Blueprint System
let roboticArmCanvas, roboticArmCtx;
let armSegments = [];
let energyOrb = { x: 0, y: 0, brightness: 1, angle: 0 };

function initializeRoboticArm() {
    roboticArmCanvas = document.getElementById('robotic-arm-canvas');
    if (!roboticArmCanvas) return;
    
    roboticArmCtx = roboticArmCanvas.getContext('2d');
    
    // Set canvas size
    resizeRoboticArmCanvas();
    window.addEventListener('resize', resizeRoboticArmCanvas);
    
    // Create robotic arm segments
    createRoboticArmSegments();
    
    // Start animation loop
    animateRoboticArm();
}

function resizeRoboticArmCanvas() {
    if (!roboticArmCanvas) return;
    
    const container = roboticArmCanvas.parentElement;
    roboticArmCanvas.width = container.offsetWidth;
    roboticArmCanvas.height = container.offsetHeight;
}

function createRoboticArmSegments() {
    // Define 6-DOF robotic arm segments
    armSegments = [
        { length: 60, angle: 0, baseAngle: 0, speed: 0.8, x: 150, y: 350 }, // Base
        { length: 80, angle: -30, baseAngle: -30, speed: 1.2, x: 0, y: 0 }, // Shoulder
        { length: 70, angle: 45, baseAngle: 45, speed: 1.5, x: 0, y: 0 }, // Elbow
        { length: 50, angle: -20, baseAngle: -20, speed: 2.0, x: 0, y: 0 }, // Wrist 1
        { length: 30, angle: 10, baseAngle: 10, speed: 2.5, x: 0, y: 0 }, // Wrist 2
        { length: 25, angle: 0, baseAngle: 0, speed: 3.0, x: 0, y: 0 }  // End effector
    ];
}

function animateRoboticArm() {
    if (!roboticArmCtx) return;
    
    // Clear canvas
    roboticArmCtx.clearRect(0, 0, roboticArmCanvas.width, roboticArmCanvas.height);
    
    const time = Date.now() * 0.001;
    
    // Update arm segment angles with smooth motion synchronized to The Architect
    const architectInfluence = architect.rightArm ? architect.rightArm.extension : 0.7;
    const architectAngle = architect.rightArm ? architect.rightArm.angle : 0;
    
    armSegments.forEach((segment, index) => {
        const baseMotion = Math.sin(time * segment.speed) * 15;
        const architectMotion = architectAngle * 30 * Math.pow(architectInfluence, index);
        segment.angle = segment.baseAngle + baseMotion + architectMotion;
    });
    
    // Calculate forward kinematics
    let currentX = armSegments[0].x;
    let currentY = armSegments[0].y;
    let cumulativeAngle = 0;
    
    for (let i = 0; i < armSegments.length; i++) {
        const segment = armSegments[i];
        cumulativeAngle += segment.angle * Math.PI / 180;
        
        const nextX = currentX + Math.cos(cumulativeAngle) * segment.length;
        const nextY = currentY + Math.sin(cumulativeAngle) * segment.length;
        
        segment.x = currentX;
        segment.y = currentY;
        segment.endX = nextX;
        segment.endY = nextY;
        
        currentX = nextX;
        currentY = nextY;
    }
    
    // Update energy orb position (end effector position)
    const lastSegment = armSegments[armSegments.length - 1];
    energyOrb.x = lastSegment.endX;
    energyOrb.y = lastSegment.endY;
    energyOrb.brightness = 0.7 + 0.3 * Math.sin(time * 4);
    energyOrb.angle += 0.1;
    
    // Draw robotic arm wireframe
    drawRoboticArmWireframe();
    
    // Draw kinematic data and measurement arcs
    drawKinematicData();
    
    // Draw energy orb
    drawEnergyOrb();
    
    requestAnimationFrame(animateRoboticArm);
}

function drawRoboticArmWireframe() {
    roboticArmCtx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
    roboticArmCtx.lineWidth = 2;
    roboticArmCtx.lineCap = 'round';
    
    // Draw arm segments
    for (let i = 0; i < armSegments.length; i++) {
        const segment = armSegments[i];
        
        roboticArmCtx.beginPath();
        roboticArmCtx.moveTo(segment.x, segment.y);
        roboticArmCtx.lineTo(segment.endX, segment.endY);
        roboticArmCtx.stroke();
        
        // Draw joints
        roboticArmCtx.fillStyle = 'rgba(0, 212, 255, 0.8)';
        roboticArmCtx.beginPath();
        roboticArmCtx.arc(segment.x, segment.y, 4, 0, Math.PI * 2);
        roboticArmCtx.fill();
        
        // Draw joint frame (coordinate system)
        if (i < 3) { // Only show for main joints
            const angle = armSegments.slice(0, i + 1).reduce((sum, seg) => sum + seg.angle, 0) * Math.PI / 180;
            drawCoordinateFrame(segment.x, segment.y, angle, 15);
        }
    }
    
    // Draw base platform
    roboticArmCtx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
    roboticArmCtx.beginPath();
    roboticArmCtx.arc(armSegments[0].x, armSegments[0].y, 20, 0, Math.PI * 2);
    roboticArmCtx.stroke();
}

function drawCoordinateFrame(x, y, angle, size) {
    roboticArmCtx.lineWidth = 1.5;
    
    // X-axis (red)
    roboticArmCtx.strokeStyle = 'rgba(255, 107, 53, 0.7)';
    roboticArmCtx.beginPath();
    roboticArmCtx.moveTo(x, y);
    roboticArmCtx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
    roboticArmCtx.stroke();
    
    // Y-axis (green)
    roboticArmCtx.strokeStyle = 'rgba(0, 255, 136, 0.7)';
    roboticArmCtx.beginPath();
    roboticArmCtx.moveTo(x, y);
    roboticArmCtx.lineTo(x + Math.cos(angle + Math.PI/2) * size, y + Math.sin(angle + Math.PI/2) * size);
    roboticArmCtx.stroke();
}

function drawKinematicData() {
    // Draw measurement arcs at key joints
    armSegments.forEach((segment, index) => {
        if (index < 3) { // Main joints only
            const startAngle = index === 0 ? 0 : armSegments.slice(0, index).reduce((sum, seg) => sum + seg.angle, 0) * Math.PI / 180;
            const endAngle = startAngle + segment.angle * Math.PI / 180;
            
            roboticArmCtx.strokeStyle = 'rgba(255, 107, 53, 0.5)';
            roboticArmCtx.lineWidth = 1;
            roboticArmCtx.beginPath();
            roboticArmCtx.arc(segment.x, segment.y, 25 + index * 5, startAngle, endAngle);
            roboticArmCtx.stroke();
            
            // Add angle text
            const midAngle = (startAngle + endAngle) / 2;
            const textX = segment.x + Math.cos(midAngle) * (30 + index * 5);
            const textY = segment.y + Math.sin(midAngle) * (30 + index * 5);
            
            roboticArmCtx.fillStyle = 'rgba(0, 212, 255, 0.8)';
            roboticArmCtx.font = '10px Orbitron';
            roboticArmCtx.textAlign = 'center';
            roboticArmCtx.fillText(`${segment.angle.toFixed(1)}°`, textX, textY);
        }
    });
}

function drawEnergyOrb() {
    // Draw shimmering energy orb at end effector
    const orbSize = 8 + 3 * Math.sin(Date.now() * 0.008);
    
    // Main orb
    roboticArmCtx.fillStyle = `rgba(255, 107, 53, ${energyOrb.brightness})`;
    roboticArmCtx.beginPath();
    roboticArmCtx.arc(energyOrb.x, energyOrb.y, orbSize, 0, Math.PI * 2);
    roboticArmCtx.fill();
    
    // Glow effect
    roboticArmCtx.shadowColor = '#ff6b35';
    roboticArmCtx.shadowBlur = 15;
    roboticArmCtx.fill();
    roboticArmCtx.shadowBlur = 0;
    
    // Energy particles around orb
    for (let i = 0; i < 6; i++) {
        const particleAngle = energyOrb.angle + (i * Math.PI * 2 / 6);
        const particleRadius = 15 + 5 * Math.sin(Date.now() * 0.01 + i);
        const particleX = energyOrb.x + Math.cos(particleAngle) * particleRadius;
        const particleY = energyOrb.y + Math.sin(particleAngle) * particleRadius;
        
        roboticArmCtx.fillStyle = 'rgba(0, 212, 255, 0.6)';
        roboticArmCtx.beginPath();
        roboticArmCtx.arc(particleX, particleY, 2, 0, Math.PI * 2);
        roboticArmCtx.fill();
    }
}

// CFD Simulation System
let cfdCanvas, cfdCtx;
let streamlines = [];
let vortices = [];
let flowField = [];

function initializeCFDSimulation() {
    cfdCanvas = document.getElementById('cfd-canvas');
    if (!cfdCanvas) return;
    
    cfdCtx = cfdCanvas.getContext('2d');
    
    // Set canvas size
    resizeCFDCanvas();
    window.addEventListener('resize', resizeCFDCanvas);
    
    // Create flow field and streamlines
    createFlowField();
    createStreamlines();
    createVortices();
    
    // Start animation loop
    animateCFDSimulation();
}

function resizeCFDCanvas() {
    if (!cfdCanvas) return;
    
    const container = cfdCanvas.parentElement;
    cfdCanvas.width = container.offsetWidth;
    cfdCanvas.height = container.offsetHeight;
}

function createFlowField() {
    flowField = [];
    const gridSize = 20;
    
    for (let x = 0; x < cfdCanvas.width; x += gridSize) {
        for (let y = 0; y < cfdCanvas.height; y += gridSize) {
            // Create a complex flow pattern around the robotic arm workspace
            const centerX = cfdCanvas.width * 0.3;
            const centerY = cfdCanvas.height * 0.6;
            
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Create swirling flow around the workspace
            const angle = Math.atan2(dy, dx) + Math.sin(distance * 0.02) * 0.5;
            const speed = Math.max(0.1, 2 - distance * 0.01);
            
            flowField.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                pressure: Math.sin(distance * 0.05) * 0.5 + 0.5
            });
        }
    }
}

function createStreamlines() {
    streamlines = [];
    
    for (let i = 0; i < 25; i++) {
        const startX = Math.random() * cfdCanvas.width;
        const startY = Math.random() * cfdCanvas.height;
        
        streamlines.push({
            points: [{x: startX, y: startY}],
            maxLength: 80,
            age: 0,
            color: `hsl(${180 + Math.random() * 40}, 70%, 60%)`, // Cyan to blue range
            opacity: 0.6 + Math.random() * 0.4
        });
    }
}

function createVortices() {
    vortices = [];
    
    // Create 3-4 main vortices in the flow
    for (let i = 0; i < 4; i++) {
        vortices.push({
            x: Math.random() * cfdCanvas.width,
            y: Math.random() * cfdCanvas.height,
            radius: 20 + Math.random() * 30,
            strength: (Math.random() - 0.5) * 0.02,
            age: 0,
            maxAge: 300 + Math.random() * 200
        });
    }
}

function animateCFDSimulation() {
    if (!cfdCtx) return;
    
    // Clear canvas with fade effect
    cfdCtx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    cfdCtx.fillRect(0, 0, cfdCanvas.width, cfdCanvas.height);
    
    const time = Date.now() * 0.001;
    
    // Update and draw streamlines
    streamlines.forEach((streamline, index) => {
        const currentPoint = streamline.points[streamline.points.length - 1];
        
        // Calculate flow velocity at current position
        let vx = 0, vy = 0;
        
        // Sample from flow field
        const gridX = Math.floor(currentPoint.x / 20) * 20;
        const gridY = Math.floor(currentPoint.y / 20) * 20;
        
        const fieldPoint = flowField.find(p => p.x === gridX && p.y === gridY);
        if (fieldPoint) {
            vx += fieldPoint.vx;
            vy += fieldPoint.vy;
        }
        
        // Add vortex influences
        vortices.forEach(vortex => {
            const dx = currentPoint.x - vortex.x;
            const dy = currentPoint.y - vortex.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < vortex.radius * 2) {
                const influence = vortex.strength * (1 - distance / (vortex.radius * 2));
                vx += -dy * influence;
                vy += dx * influence;
            }
        });
        
        // Add some turbulence
        vx += (Math.random() - 0.5) * 0.5;
        vy += (Math.random() - 0.5) * 0.5;
        
        // Add new point to streamline
        const newX = currentPoint.x + vx;
        const newY = currentPoint.y + vy;
        
        // Boundary conditions
        if (newX > 0 && newX < cfdCanvas.width && newY > 0 && newY < cfdCanvas.height) {
            streamline.points.push({x: newX, y: newY});
        } else {
            // Restart streamline from random position
            streamline.points = [{
                x: Math.random() * cfdCanvas.width,
                y: Math.random() * cfdCanvas.height
            }];
        }
        
        // Limit streamline length
        if (streamline.points.length > streamline.maxLength) {
            streamline.points.shift();
        }
        
        // Draw streamline
        if (streamline.points.length > 1) {
            cfdCtx.strokeStyle = streamline.color.replace('60%', `${streamline.opacity * 60}%`);
            cfdCtx.lineWidth = 1.5;
            cfdCtx.lineCap = 'round';
            
            cfdCtx.beginPath();
            cfdCtx.moveTo(streamline.points[0].x, streamline.points[0].y);
            
            for (let i = 1; i < streamline.points.length; i++) {
                const alpha = i / streamline.points.length;
                cfdCtx.globalAlpha = alpha * streamline.opacity;
                cfdCtx.lineTo(streamline.points[i].x, streamline.points[i].y);
            }
            
            cfdCtx.stroke();
            cfdCtx.globalAlpha = 1;
        }
    });
    
    // Update and draw vortices
    vortices.forEach((vortex, index) => {
        vortex.age++;
        
        // Move vortices slowly
        vortex.x += Math.sin(time * 0.5 + index) * 0.3;
        vortex.y += Math.cos(time * 0.3 + index) * 0.2;
        
        // Draw vortex as spiral
        const spiralTurns = 3;
        const maxRadius = vortex.radius;
        
        cfdCtx.strokeStyle = `rgba(0, 212, 255, 0.4)`;
        cfdCtx.lineWidth = 2;
        
        cfdCtx.beginPath();
        for (let angle = 0; angle < spiralTurns * Math.PI * 2; angle += 0.2) {
            const radius = (angle / (spiralTurns * Math.PI * 2)) * maxRadius;
            const x = vortex.x + Math.cos(angle + time * vortex.strength * 10) * radius;
            const y = vortex.y + Math.sin(angle + time * vortex.strength * 10) * radius;
            
            if (angle === 0) {
                cfdCtx.moveTo(x, y);
            } else {
                cfdCtx.lineTo(x, y);
            }
        }
        cfdCtx.stroke();
        
        // Regenerate vortex if too old
        if (vortex.age > vortex.maxAge) {
            vortex.x = Math.random() * cfdCanvas.width;
            vortex.y = Math.random() * cfdCanvas.height;
            vortex.age = 0;
        }
    });
    
    requestAnimationFrame(animateCFDSimulation);
}

// Thruster Simulation System
let thrusterCanvas, thrusterCtx;
let shockDiamonds = [];
let exhaustParticles = [];
let pressureWaves = [];

function initializeThrusterSimulation() {
    thrusterCanvas = document.getElementById('thruster-canvas');
    if (!thrusterCanvas) return;
    
    thrusterCtx = thrusterCanvas.getContext('2d');
    
    // Set canvas size
    resizeThrusterCanvas();
    window.addEventListener('resize', resizeThrusterCanvas);
    
    // Create thruster elements
    createShockDiamonds();
    createExhaustParticles();
    createPressureWaves();
    
    // Start animation loop
    animateThrusterSimulation();
}

function resizeThrusterCanvas() {
    if (!thrusterCanvas) return;
    
    const container = thrusterCanvas.parentElement;
    thrusterCanvas.width = container.offsetWidth;
    thrusterCanvas.height = container.offsetHeight;
}

function createShockDiamonds() {
    shockDiamonds = [];
    
    // Create diamond pattern in exhaust plume
    for (let i = 0; i < 6; i++) {
        shockDiamonds.push({
            x: 30 + i * 25,
            y: thrusterCanvas.height * 0.5,
            width: 20 - i * 2,
            height: 15 - i * 1.5,
            phase: i * Math.PI / 3,
            intensity: 0.8 - i * 0.1
        });
    }
}

function createExhaustParticles() {
    exhaustParticles = [];
    
    for (let i = 0; i < 60; i++) {
        exhaustParticles.push({
            x: 10 + Math.random() * 20,
            y: thrusterCanvas.height * 0.5 + (Math.random() - 0.5) * 20,
            vx: 2 + Math.random() * 3,
            vy: (Math.random() - 0.5) * 0.5,
            size: 1 + Math.random() * 2,
            temperature: 0.7 + Math.random() * 0.3,
            life: 1
        });
    }
}

function createPressureWaves() {
    pressureWaves = [];
    
    for (let i = 0; i < 4; i++) {
        pressureWaves.push({
            x: 20,
            y: thrusterCanvas.height * 0.5,
            radius: 20 + i * 15,
            maxRadius: 80,
            speed: 0.8 + i * 0.2,
            intensity: 0.6 - i * 0.1
        });
    }
}

function animateThrusterSimulation() {
    if (!thrusterCtx) return;
    
    // Clear canvas
    thrusterCtx.fillStyle = 'rgba(10, 10, 10, 0.2)';
    thrusterCtx.fillRect(0, 0, thrusterCanvas.width, thrusterCanvas.height);
    
    const time = Date.now() * 0.001;
    
    // Draw shock diamonds
    shockDiamonds.forEach((diamond, index) => {
        const oscillation = Math.sin(time * 3 + diamond.phase) * 0.3;
        
        thrusterCtx.strokeStyle = `rgba(255, 107, 53, ${diamond.intensity + oscillation})`;
        thrusterCtx.lineWidth = 2;
        
        // Draw diamond shape
        thrusterCtx.beginPath();
        thrusterCtx.moveTo(diamond.x - diamond.width/2, diamond.y);
        thrusterCtx.lineTo(diamond.x, diamond.y - diamond.height/2);
        thrusterCtx.lineTo(diamond.x + diamond.width/2, diamond.y);
        thrusterCtx.lineTo(diamond.x, diamond.y + diamond.height/2);
        thrusterCtx.closePath();
        thrusterCtx.stroke();
        
        // Add glow effect
        thrusterCtx.shadowColor = '#ff6b35';
        thrusterCtx.shadowBlur = 8;
        thrusterCtx.stroke();
        thrusterCtx.shadowBlur = 0;
    });
    
    // Update and draw exhaust particles
    exhaustParticles.forEach((particle, index) => {
        // Update particle physics
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += (Math.random() - 0.5) * 0.1; // Turbulence
        particle.life -= 0.01;
        particle.size *= 0.995;
        
        // Temperature-based color
        const red = Math.floor(255 * particle.temperature);
        const green = Math.floor(150 * (1 - particle.temperature));
        const blue = Math.floor(50 * (1 - particle.temperature));
        
        thrusterCtx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${particle.life})`;
        thrusterCtx.beginPath();
        thrusterCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        thrusterCtx.fill();
        
        // Reset particle if dead or out of bounds
        if (particle.life <= 0 || particle.x > thrusterCanvas.width) {
            particle.x = 10 + Math.random() * 20;
            particle.y = thrusterCanvas.height * 0.5 + (Math.random() - 0.5) * 20;
            particle.vx = 2 + Math.random() * 3;
            particle.vy = (Math.random() - 0.5) * 0.5;
            particle.size = 1 + Math.random() * 2;
            particle.temperature = 0.7 + Math.random() * 0.3;
            particle.life = 1;
        }
    });
    
    // Update and draw pressure waves
    pressureWaves.forEach((wave, index) => {
        wave.radius += wave.speed;
        
        if (wave.radius > wave.maxRadius) {
            wave.radius = 20;
        }
        
        thrusterCtx.strokeStyle = `rgba(0, 212, 255, ${wave.intensity * (1 - wave.radius / wave.maxRadius)})`;
        thrusterCtx.lineWidth = 1;
        thrusterCtx.beginPath();
        thrusterCtx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        thrusterCtx.stroke();
    });
    
    // Draw velocity vectors
    for (let i = 0; i < 8; i++) {
        const x = 40 + i * 20;
        const y = thrusterCanvas.height * 0.5 + Math.sin(time * 2 + i * 0.5) * 10;
        const length = 15 + Math.sin(time * 3 + i) * 5;
        
        thrusterCtx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
        thrusterCtx.lineWidth = 1.5;
        thrusterCtx.beginPath();
        thrusterCtx.moveTo(x, y);
        thrusterCtx.lineTo(x + length, y);
        
        // Arrowhead
        thrusterCtx.lineTo(x + length - 3, y - 2);
        thrusterCtx.moveTo(x + length, y);
        thrusterCtx.lineTo(x + length - 3, y + 2);
        thrusterCtx.stroke();
    }
    
    requestAnimationFrame(animateThrusterSimulation);
}

// The Architect - Divine AI Consciousness System
let architectCanvas, architectCtx;
let trajectoryCanvas, trajectoryCtx;
let quantumFieldCanvas, quantumFieldCtx;
let dataPortalsCanvas, dataPortalsCtx;
let codeRainCanvas, codeRainCtx;

let architect = {
    x: 0, y: 0,
    gesturePhase: 0,
    rightArm: { angle: 0, extension: 0 },
    dataStreams: [],
    consciousness: { level: 0.8, pulsePhase: 0 },
    divineEnergy: 1.0
};

let trajectoryPlanning = {
    decisionTrees: [],
    optimalPath: [],
    branchingPaths: [],
    planningDepth: 5,
    pathHistory: []
};

let quantumField = {
    fluctuations: [],
    energyWaves: [],
    particleCount: 80,
    coherenceLevel: 0.7
};

let dataPortals = {
    portals: [],
    streamFlows: [],
    dataPackets: [],
    portalCount: 4
};

let codeRain = {
    streams: [],
    characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>(){}[]=+-*/%$#@!&|^~`'
};

function initializeArchitect() {
    // Get canvas elements
    architectCanvas = document.getElementById('architect-canvas');
    trajectoryCanvas = document.getElementById('trajectory-canvas');
    quantumFieldCanvas = document.getElementById('quantum-field-canvas');
    dataPortalsCanvas = document.getElementById('data-portals-canvas');
    
    if (!architectCanvas) return;
    
    // Get contexts
    architectCtx = architectCanvas.getContext('2d');
    if (trajectoryCanvas) trajectoryCtx = trajectoryCanvas.getContext('2d');
    if (quantumFieldCanvas) quantumFieldCtx = quantumFieldCanvas.getContext('2d');
    if (dataPortalsCanvas) dataPortalsCtx = dataPortalsCanvas.getContext('2d');
    
    // Set canvas sizes
    resizeArchitectCanvas();
    window.addEventListener('resize', resizeArchitectCanvas);
    
    // Initialize Architect components
    createArchitectForm();
    createTrajectoryPlanning();
    initializeQuantumField();
    initializeDataPortals();
    
    // Start animation loop
    animateArchitect();
}

function initializeCodeRain() {
    codeRainCanvas = document.getElementById('code-rain-canvas');
    if (!codeRainCanvas) return;
    
    codeRainCtx = codeRainCanvas.getContext('2d');
    
    resizeCodeRainCanvas();
    window.addEventListener('resize', resizeCodeRainCanvas);
    
    createCodeStreams();
    animateCodeRain();
}

function resizeArchitectCanvas() {
    if (!architectCanvas) return;
    
    const container = architectCanvas.parentElement;
    architectCanvas.width = container.offsetWidth;
    architectCanvas.height = container.offsetHeight;
    
    architect.x = architectCanvas.width / 2;
    architect.y = architectCanvas.height / 2;
}

function resizeCodeRainCanvas() {
    if (!codeRainCanvas) return;
    
    codeRainCanvas.width = window.innerWidth;
    codeRainCanvas.height = window.innerHeight;
}

function createArchitectForm() {
    // Create data streams that form the humanoid figure
    architect.dataStreams = [];
    
    const streamCount = 150;
    for (let i = 0; i < streamCount; i++) {
        architect.dataStreams.push({
            id: i,
            x: 0, y: 0,
            targetX: 0, targetY: 0,
            intensity: 0.5 + Math.random() * 0.5,
            phase: Math.random() * Math.PI * 2,
            frequency: 0.02 + Math.random() * 0.03,
            bodyPart: Math.floor(Math.random() * 5), // 0=core, 1=head, 2=leftArm, 3=rightArm, 4=legs
            flowSpeed: 1 + Math.random() * 2
        });
    }
}

function createTrajectoryPlanning() {
    if (!trajectoryCanvas) return;
    
    // Create multi-layered decision trees for trajectory planning
    trajectoryPlanning.decisionTrees = [];
    
    // Generate multiple decision tree layers
    for (let layer = 0; layer < trajectoryPlanning.planningDepth; layer++) {
        const nodesInLayer = Math.pow(2, layer + 1); // Exponential branching
        const layerNodes = [];
        
        for (let node = 0; node < Math.min(nodesInLayer, 32); node++) { // Cap at 32 nodes per layer
            layerNodes.push({
                x: 20 + (node / Math.max(1, nodesInLayer - 1)) * 160,
                y: 20 + layer * 20,
                confidence: 0.3 + Math.random() * 0.4,
                isOptimal: false,
                connections: [],
                pathWeight: Math.random(),
                futureReward: Math.random()
            });
        }
        
        trajectoryPlanning.decisionTrees.push(layerNodes);
    }
    
    // Create connections between layers
    for (let layer = 0; layer < trajectoryPlanning.decisionTrees.length - 1; layer++) {
        const currentLayer = trajectoryPlanning.decisionTrees[layer];
        const nextLayer = trajectoryPlanning.decisionTrees[layer + 1];
        
        currentLayer.forEach((node, nodeIndex) => {
            // Each node connects to 2-3 nodes in next layer
            const connectionCount = 2 + Math.floor(Math.random() * 2);
            const startIndex = Math.floor(nodeIndex * 2);
            
            for (let c = 0; c < connectionCount && startIndex + c < nextLayer.length; c++) {
                node.connections.push({
                    targetLayer: layer + 1,
                    targetNode: startIndex + c,
                    weight: Math.random(),
                    isOptimal: false
                });
            }
        });
    }
    
    // Mark one optimal path
    markOptimalPath();
}

function markOptimalPath() {
    // Clear previous optimal markings
    trajectoryPlanning.decisionTrees.forEach(layer => {
        layer.forEach(node => {
            node.isOptimal = false;
            node.connections.forEach(conn => conn.isOptimal = false);
        });
    });
    
    // Create one optimal path from root to leaf
    let currentNodeIndex = 0;
    
    for (let layer = 0; layer < trajectoryPlanning.decisionTrees.length; layer++) {
        const currentLayer = trajectoryPlanning.decisionTrees[layer];
        if (currentNodeIndex < currentLayer.length) {
            const currentNode = currentLayer[currentNodeIndex];
            currentNode.isOptimal = true;
            
            if (currentNode.connections.length > 0) {
                // Choose random connection as optimal
                const optimalConnection = currentNode.connections[Math.floor(Math.random() * currentNode.connections.length)];
                optimalConnection.isOptimal = true;
                currentNodeIndex = optimalConnection.targetNode;
            }
        }
    }
}

function initializeQuantumField() {
    if (!quantumFieldCanvas) return;
    
    // Create quantum field fluctuations
    quantumField.fluctuations = [];
    for (let i = 0; i < quantumField.particleCount; i++) {
        quantumField.fluctuations.push({
            x: Math.random() * 160,
            y: Math.random() * 90,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            energy: 0.3 + Math.random() * 0.7,
            phase: Math.random() * Math.PI * 2,
            frequency: 0.02 + Math.random() * 0.03
        });
    }
    
    // Create energy waves
    quantumField.energyWaves = [];
    for (let i = 0; i < 6; i++) {
        quantumField.energyWaves.push({
            x: Math.random() * 160,
            y: Math.random() * 90,
            radius: 0,
            maxRadius: 30 + Math.random() * 20,
            speed: 0.8 + Math.random() * 0.4,
            intensity: 0.4 + Math.random() * 0.3
        });
    }
}

function initializeDataPortals() {
    if (!dataPortalsCanvas) return;
    
    // Create data portals
    dataPortals.portals = [];
    for (let i = 0; i < dataPortals.portalCount; i++) {
        dataPortals.portals.push({
            x: 30 + (i % 2) * 100,
            y: 25 + Math.floor(i / 2) * 40,
            radius: 15 + Math.random() * 10,
            rotation: 0,
            rotationSpeed: 0.02 + Math.random() * 0.02,
            intensity: 0.6 + Math.random() * 0.4,
            pulsePhase: Math.random() * Math.PI * 2
        });
    }
    
    // Create data stream flows
    dataPortals.streamFlows = [];
    for (let i = 0; i < 20; i++) {
        dataPortals.streamFlows.push({
            x: Math.random() * 150,
            y: Math.random() * 80,
            targetPortal: Math.floor(Math.random() * dataPortals.portalCount),
            speed: 1 + Math.random() * 2,
            life: 1,
            maxLife: 60 + Math.random() * 40
        });
    }
}

function createCodeStreams() {
    codeRain.streams = [];
    const streamCount = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < streamCount; i++) {
        codeRain.streams.push({
            x: i * 20,
            y: Math.random() * window.innerHeight,
            speed: 1 + Math.random() * 3,
            characters: [],
            maxLength: 15 + Math.random() * 10
        });
        
        // Initialize characters for this stream
        for (let j = 0; j < codeRain.streams[i].maxLength; j++) {
            codeRain.streams[i].characters.push({
                char: codeRain.characters[Math.floor(Math.random() * codeRain.characters.length)],
                opacity: Math.random()
            });
        }
    }
}

function animateArchitect() {
    if (!architectCtx) return;
    
    const time = Date.now() * 0.001;
    
    // Clear canvas
    architectCtx.clearRect(0, 0, architectCanvas.width, architectCanvas.height);
    
    // Update Architect's gesture
    architect.gesturePhase += 0.008;
    architect.rightArm.angle = Math.sin(architect.gesturePhase) * 0.3;
    architect.rightArm.extension = 0.7 + Math.sin(architect.gesturePhase * 1.3) * 0.2;
    
    // Update consciousness pulse
    architect.consciousness.pulsePhase += 0.05;
    architect.consciousness.level = 0.8 + Math.sin(architect.consciousness.pulsePhase) * 0.2;
    
    // Draw The Architect
    drawArchitectForm(time);
    drawGodRays();
    
    // Update and draw trajectory planning
    updateTrajectoryPlanning(time);
    drawTrajectoryPlanning();
    
    // Update and draw quantum field
    updateQuantumField(time);
    drawQuantumField();
    
    // Update and draw data portals
    updateDataPortals(time);
    drawDataPortals();
    
    requestAnimationFrame(animateArchitect);
}

function drawArchitectForm(time) {
    const centerX = architect.x;
    const centerY = architect.y;
    
    // Draw core consciousness
    const coreRadius = 15 + Math.sin(architect.consciousness.pulsePhase) * 3;
    const coreIntensity = architect.consciousness.level;
    
    architectCtx.shadowColor = '#00d4ff';
    architectCtx.shadowBlur = 20;
    architectCtx.fillStyle = `rgba(0, 212, 255, ${coreIntensity})`;
    architectCtx.beginPath();
    architectCtx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
    architectCtx.fill();
    architectCtx.shadowBlur = 0;
    
    // Draw data streams forming humanoid shape
    architect.dataStreams.forEach((stream, index) => {
        // Calculate target position based on body part
        let targetX = centerX, targetY = centerY;
        
        switch (stream.bodyPart) {
            case 0: // Core
                const coreAngle = (index / 30) * Math.PI * 2;
                targetX = centerX + Math.cos(coreAngle + time * 0.5) * 25;
                targetY = centerY + Math.sin(coreAngle + time * 0.5) * 25;
                break;
            case 1: // Head
                const headAngle = (index / 20) * Math.PI * 2;
                targetX = centerX + Math.cos(headAngle) * 15;
                targetY = centerY - 40 + Math.sin(headAngle) * 12;
                break;
            case 2: // Left Arm
                targetX = centerX - 30 - (index % 10) * 4;
                targetY = centerY + Math.sin(time + index * 0.2) * 8;
                break;
            case 3: // Right Arm (connected to robotic arm)
                const armExtension = architect.rightArm.extension;
                const armAngle = architect.rightArm.angle;
                targetX = centerX + 30 + (index % 15) * 3 * armExtension;
                targetY = centerY + Math.sin(armAngle + index * 0.1) * 15;
                break;
            case 4: // Legs
                targetX = centerX + ((index % 2) * 2 - 1) * 15;
                targetY = centerY + 50 + (index % 8) * 5;
                break;
        }
        
        // Smooth movement towards target
        stream.x += (targetX - stream.x) * 0.1;
        stream.y += (targetY - stream.y) * 0.1;
        
        // Draw data stream point
        const intensity = stream.intensity * (0.7 + 0.3 * Math.sin(time * stream.frequency + stream.phase));
        architectCtx.fillStyle = `rgba(0, 212, 255, ${intensity})`;
        architectCtx.beginPath();
        architectCtx.arc(stream.x, stream.y, 1 + intensity, 0, Math.PI * 2);
        architectCtx.fill();
        
        // Draw connections between nearby streams
        if (index % 3 === 0) {
            const nextStream = architect.dataStreams[(index + 1) % architect.dataStreams.length];
            const distance = Math.sqrt((stream.x - nextStream.x) ** 2 + (stream.y - nextStream.y) ** 2);
            
            if (distance < 40) {
                architectCtx.strokeStyle = `rgba(0, 212, 255, ${0.3 * intensity})`;
                architectCtx.lineWidth = 1;
                architectCtx.beginPath();
                architectCtx.moveTo(stream.x, stream.y);
                architectCtx.lineTo(nextStream.x, nextStream.y);
                architectCtx.stroke();
            }
        }
    });
}

function drawGodRays() {
    const centerX = architect.x;
    const centerY = architect.y;
    const rayCount = 8;
    
    for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2 + architect.consciousness.pulsePhase * 0.1;
        const length = 80 + Math.sin(architect.consciousness.pulsePhase + i) * 20;
        
        const gradient = architectCtx.createLinearGradient(
            centerX, centerY,
            centerX + Math.cos(angle) * length,
            centerY + Math.sin(angle) * length
        );
        gradient.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
        
        architectCtx.strokeStyle = gradient;
        architectCtx.lineWidth = 3;
        architectCtx.beginPath();
        architectCtx.moveTo(centerX, centerY);
        architectCtx.lineTo(
            centerX + Math.cos(angle) * length,
            centerY + Math.sin(angle) * length
        );
        architectCtx.stroke();
    }
}

function updateTrajectoryPlanning(time) {
    // Periodically recompute optimal path
    if (Math.floor(time * 0.5) % 3 === 0) {
        markOptimalPath();
    }
    
    // Update decision confidence based on Architect's will
    trajectoryPlanning.decisionTrees.forEach(layer => {
        layer.forEach(node => {
            const architectInfluence = architect.consciousness.level * architect.divineEnergy;
            node.confidence = Math.max(0.1, Math.min(1, 
                node.confidence + (Math.random() - 0.5) * 0.1 + architectInfluence * 0.05
            ));
        });
    });
}

function drawTrajectoryPlanning() {
    if (!trajectoryCtx) return;
    
    trajectoryCtx.clearRect(0, 0, 200, 120);
    
    // Draw all possible paths (faint)
    trajectoryPlanning.decisionTrees.forEach((layer, layerIndex) => {
        layer.forEach(node => {
            node.connections.forEach(connection => {
                const targetLayer = trajectoryPlanning.decisionTrees[connection.targetLayer];
                if (targetLayer && targetLayer[connection.targetNode]) {
                    const targetNode = targetLayer[connection.targetNode];
                    
                    const alpha = connection.isOptimal ? 0.9 : 0.2;
                    const width = connection.isOptimal ? 3 : 1;
                    const color = connection.isOptimal ? '#00d4ff' : '#00d4ff';
                    
                    trajectoryCtx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                    trajectoryCtx.lineWidth = width;
                    trajectoryCtx.beginPath();
                    trajectoryCtx.moveTo(node.x, node.y);
                    trajectoryCtx.lineTo(targetNode.x, targetNode.y);
                    trajectoryCtx.stroke();
                    
                    // Add glow to optimal path
                    if (connection.isOptimal) {
                        trajectoryCtx.shadowColor = '#00d4ff';
                        trajectoryCtx.shadowBlur = 8;
                        trajectoryCtx.stroke();
                        trajectoryCtx.shadowBlur = 0;
                    }
                }
            });
        });
    });
    
    // Draw decision nodes
    trajectoryPlanning.decisionTrees.forEach(layer => {
        layer.forEach(node => {
            const size = node.isOptimal ? 4 : 2;
            const alpha = node.isOptimal ? 1 : node.confidence * 0.6;
            
            trajectoryCtx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
            trajectoryCtx.beginPath();
            trajectoryCtx.arc(node.x, node.y, size, 0, Math.PI * 2);
            trajectoryCtx.fill();
            
            if (node.isOptimal) {
                trajectoryCtx.shadowColor = '#00d4ff';
                trajectoryCtx.shadowBlur = 6;
                trajectoryCtx.fill();
                trajectoryCtx.shadowBlur = 0;
            }
        });
    });
}

function updateQuantumField(time) {
    // Update quantum fluctuations
    quantumField.fluctuations.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.phase += particle.frequency;
        
        // Quantum tunneling (random teleportation)
        if (Math.random() < 0.002) {
            particle.x = Math.random() * 160;
            particle.y = Math.random() * 90;
        }
        
        // Boundary wrapping
        if (particle.x < 0) particle.x = 160;
        if (particle.x > 160) particle.x = 0;
        if (particle.y < 0) particle.y = 90;
        if (particle.y > 90) particle.y = 0;
        
        // Update energy based on Architect's divine influence
        const baseEnergy = 0.5 + 0.3 * Math.sin(particle.phase);
        particle.energy = baseEnergy * architect.divineEnergy * quantumField.coherenceLevel;
    });
    
    // Update energy waves
    quantumField.energyWaves.forEach(wave => {
        wave.radius += wave.speed;
        if (wave.radius > wave.maxRadius) {
            wave.radius = 0;
            wave.x = Math.random() * 160;
            wave.y = Math.random() * 90;
        }
    });
}

function drawQuantumField() {
    if (!quantumFieldCtx) return;
    
    quantumFieldCtx.clearRect(0, 0, 180, 100);
    
    // Draw energy waves
    quantumField.energyWaves.forEach(wave => {
        const alpha = wave.intensity * (1 - wave.radius / wave.maxRadius);
        quantumFieldCtx.strokeStyle = `rgba(255, 107, 53, ${alpha})`;
        quantumFieldCtx.lineWidth = 1;
        quantumFieldCtx.beginPath();
        quantumFieldCtx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        quantumFieldCtx.stroke();
    });
    
    // Draw quantum fluctuations
    quantumField.fluctuations.forEach(particle => {
        const alpha = particle.energy * 0.8;
        const size = 0.5 + particle.energy * 1.5;
        
        quantumFieldCtx.fillStyle = `rgba(255, 107, 53, ${alpha})`;
        quantumFieldCtx.beginPath();
        quantumFieldCtx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        quantumFieldCtx.fill();
        
        // Add quantum glow
        if (particle.energy > 0.7) {
            quantumFieldCtx.shadowColor = '#ff6b35';
            quantumFieldCtx.shadowBlur = 4;
            quantumFieldCtx.fill();
            quantumFieldCtx.shadowBlur = 0;
        }
    });
}

function updateDataPortals(time) {
    // Update portal rotations and pulses
    dataPortals.portals.forEach(portal => {
        portal.rotation += portal.rotationSpeed;
        portal.pulsePhase += 0.03;
        portal.intensity = 0.6 + 0.3 * Math.sin(portal.pulsePhase) * architect.consciousness.level;
    });
    
    // Update data stream flows
    dataPortals.streamFlows.forEach((flow, index) => {
        const targetPortal = dataPortals.portals[flow.targetPortal];
        if (targetPortal) {
            const dx = targetPortal.x - flow.x;
            const dy = targetPortal.y - flow.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > 5) {
                flow.x += (dx / distance) * flow.speed;
                flow.y += (dy / distance) * flow.speed;
            } else {
                // Reset to new random position
                flow.x = Math.random() * 150;
                flow.y = Math.random() * 80;
                flow.targetPortal = Math.floor(Math.random() * dataPortals.portalCount);
            }
        }
        
        flow.life--;
        if (flow.life <= 0) {
            flow.life = flow.maxLife;
            flow.x = Math.random() * 150;
            flow.y = Math.random() * 80;
        }
    });
}

function drawDataPortals() {
    if (!dataPortalsCtx) return;
    
    dataPortalsCtx.clearRect(0, 0, 160, 90);
    
    // Draw data stream flows
    dataPortals.streamFlows.forEach(flow => {
        const alpha = flow.life / flow.maxLife * 0.6;
        dataPortalsCtx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
        dataPortalsCtx.beginPath();
        dataPortalsCtx.arc(flow.x, flow.y, 1, 0, Math.PI * 2);
        dataPortalsCtx.fill();
    });
    
    // Draw portals
    dataPortals.portals.forEach(portal => {
        // Portal ring
        dataPortalsCtx.strokeStyle = `rgba(0, 255, 136, ${portal.intensity})`;
        dataPortalsCtx.lineWidth = 2;
        dataPortalsCtx.beginPath();
        dataPortalsCtx.arc(portal.x, portal.y, portal.radius, 0, Math.PI * 2);
        dataPortalsCtx.stroke();
        
        // Inner swirl
        const swirls = 3;
        dataPortalsCtx.strokeStyle = `rgba(0, 255, 136, ${portal.intensity * 0.7})`;
        dataPortalsCtx.lineWidth = 1;
        for (let i = 0; i < swirls; i++) {
            const spiralRadius = portal.radius * 0.7;
            const startAngle = portal.rotation + (i * Math.PI * 2 / swirls);
            
            dataPortalsCtx.beginPath();
            dataPortalsCtx.arc(portal.x, portal.y, spiralRadius, startAngle, startAngle + Math.PI * 0.7);
            dataPortalsCtx.stroke();
        }
        
        // Central glow
        dataPortalsCtx.fillStyle = `rgba(0, 255, 136, ${portal.intensity * 0.8})`;
        dataPortalsCtx.shadowColor = '#00ff88';
        dataPortalsCtx.shadowBlur = 8;
        dataPortalsCtx.beginPath();
        dataPortalsCtx.arc(portal.x, portal.y, 3, 0, Math.PI * 2);
        dataPortalsCtx.fill();
        dataPortalsCtx.shadowBlur = 0;
    });
}

function updateNeuralNetwork(time) {
    // Simulate neural activity
    neuralNetwork.layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.nodes; i++) {
            const baseActivity = 0.3 + Math.sin(time * 2 + layerIndex + i) * 0.3;
            const architectInfluence = architect.consciousness.level * 0.4;
            neuralNetwork.activations[layerIndex][i] = Math.max(0, Math.min(1, baseActivity + architectInfluence));
        }
    });
    
    // Update connection activities
    neuralNetwork.connections.forEach(connection => {
        const fromActivation = neuralNetwork.activations[connection.fromLayer][connection.fromNode];
        const toActivation = neuralNetwork.activations[connection.toLayer][connection.toNode];
        connection.activity = (fromActivation + toActivation) * 0.5;
    });
}

function drawNeuralNetwork() {
    if (!neuralNetworkCtx) return;
    
    neuralNetworkCtx.clearRect(0, 0, 150, 80);
    
    const layerHeight = 60;
    
    // Draw connections
    neuralNetwork.connections.forEach(connection => {
        const fromLayer = neuralNetwork.layers[connection.fromLayer];
        const toLayer = neuralNetwork.layers[connection.toLayer];
        
        const fromY = (connection.fromNode / (fromLayer.nodes - 1)) * layerHeight + 10;
        const toY = (connection.toNode / (toLayer.nodes - 1)) * layerHeight + 10;
        
        neuralNetworkCtx.strokeStyle = `rgba(0, 212, 255, ${connection.activity * 0.5})`;
        neuralNetworkCtx.lineWidth = 1;
        neuralNetworkCtx.beginPath();
        neuralNetworkCtx.moveTo(fromLayer.x, fromY);
        neuralNetworkCtx.lineTo(toLayer.x, toY);
        neuralNetworkCtx.stroke();
    });
    
    // Draw nodes
    neuralNetwork.layers.forEach((layer, layerIndex) => {
        for (let i = 0; i < layer.nodes; i++) {
            const y = (i / (layer.nodes - 1)) * layerHeight + 10;
            const activation = neuralNetwork.activations[layerIndex][i];
            
            neuralNetworkCtx.fillStyle = `rgba(0, 212, 255, ${activation})`;
            neuralNetworkCtx.beginPath();
            neuralNetworkCtx.arc(layer.x, y, 3, 0, Math.PI * 2);
            neuralNetworkCtx.fill();
            
            // Add glow for highly active nodes
            if (activation > 0.7) {
                neuralNetworkCtx.shadowColor = '#00d4ff';
                neuralNetworkCtx.shadowBlur = 6;
                neuralNetworkCtx.fill();
                neuralNetworkCtx.shadowBlur = 0;
            }
        }
    });
}

function updateCognitiveMetrics(time) {
    // Add new data points based on Architect's activity
    const newLoad = 0.4 + architect.consciousness.level * 0.4 + Math.sin(time * 1.5) * 0.2;
    const newEntropy = 0.3 + (1 - architect.consciousness.level) * 0.3 + Math.sin(time * 0.8) * 0.15;
    
    cognitiveMetrics.load.push(Math.max(0, Math.min(1, newLoad)));
    cognitiveMetrics.entropy.push(Math.max(0, Math.min(1, newEntropy)));
    
    // Keep arrays at max size
    if (cognitiveMetrics.load.length > cognitiveMetrics.maxDataPoints) {
        cognitiveMetrics.load.shift();
    }
    if (cognitiveMetrics.entropy.length > cognitiveMetrics.maxDataPoints) {
        cognitiveMetrics.entropy.shift();
    }
}

function drawCognitiveMetrics() {
    // Draw cognitive load
    if (cognitiveLoadCtx) {
        cognitiveLoadCtx.clearRect(0, 0, 100, 40);
        
        cognitiveLoadCtx.strokeStyle = '#ff6b35';
        cognitiveLoadCtx.lineWidth = 2;
        cognitiveLoadCtx.beginPath();
        
        for (let i = 0; i < cognitiveMetrics.load.length; i++) {
            const x = (i / (cognitiveMetrics.load.length - 1)) * 100;
            const y = 40 - (cognitiveMetrics.load[i] * 35);
            
            if (i === 0) {
                cognitiveLoadCtx.moveTo(x, y);
            } else {
                cognitiveLoadCtx.lineTo(x, y);
            }
        }
        cognitiveLoadCtx.stroke();
    }
    
    // Draw entropy
    if (entropyCtx) {
        entropyCtx.clearRect(0, 0, 100, 40);
        
        entropyCtx.strokeStyle = '#00ff88';
        entropyCtx.lineWidth = 2;
        entropyCtx.beginPath();
        
        for (let i = 0; i < cognitiveMetrics.entropy.length; i++) {
            const x = (i / (cognitiveMetrics.entropy.length - 1)) * 100;
            const y = 40 - (cognitiveMetrics.entropy[i] * 35);
            
            if (i === 0) {
                entropyCtx.moveTo(x, y);
            } else {
                entropyCtx.lineTo(x, y);
            }
        }
        entropyCtx.stroke();
    }
}

function animateCodeRain() {
    if (!codeRainCtx) return;
    
    // Clear canvas with fade effect
    codeRainCtx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    codeRainCtx.fillRect(0, 0, codeRainCanvas.width, codeRainCanvas.height);
    
    // Update and draw code streams
    codeRain.streams.forEach(stream => {
        stream.y += stream.speed;
        
        // Reset stream if it goes off screen
        if (stream.y > codeRainCanvas.height + stream.maxLength * 20) {
            stream.y = -stream.maxLength * 20;
            
            // Refresh characters
            for (let i = 0; i < stream.characters.length; i++) {
                if (Math.random() < 0.1) {
                    stream.characters[i].char = codeRain.characters[Math.floor(Math.random() * codeRain.characters.length)];
                }
            }
        }
        
        // Draw characters
        for (let i = 0; i < stream.characters.length; i++) {
            const char = stream.characters[i];
            const y = stream.y - i * 15;
            
            if (y > -20 && y < codeRainCanvas.height + 20) {
                const alpha = char.opacity * (1 - i / stream.characters.length);
                codeRainCtx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.6})`;
                codeRainCtx.font = '12px monospace';
                codeRainCtx.fillText(char.char, stream.x, y);
            }
        }
    });
    
    requestAnimationFrame(animateCodeRain);
}

// Navigation
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for anchor links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For other links (like index.html), let the default behavior happen
        });
    });
    
    // Hide/show navbar on scroll
    let lastScrollTop = 0;
    let navbarHeight = navbar.offsetHeight;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            // Add mobile menu functionality here
            console.log('Mobile menu toggled');
        });
    }
}

// Hero Section
function initializeHero() {
    const robotAvatar = document.querySelector('.robot-avatar');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    // Robot eye following mouse
    document.addEventListener('mousemove', function(e) {
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - eyeX;
            const deltaY = e.clientY - eyeY;
            const angle = Math.atan2(deltaY, deltaX);
            
            const distance = Math.min(3, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 10);
            const translateX = Math.cos(angle) * distance;
            const translateY = Math.sin(angle) * distance;
            
            eye.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
    
    // Add click interactions to hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Staggered animation for project cards
                if (entry.target.classList.contains('project-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe other animated elements
    document.querySelectorAll('.stat-card, .info-card, .text-card').forEach(card => {
        observer.observe(card);
    });
}

// Stats Counter Animation
function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target > 1000) {
                    stat.textContent = Math.floor(current).toLocaleString();
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
    }
    
    // Trigger animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Add input focus effects
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('invalid');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('invalid');
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitButton.disabled = true;
        
        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            submitButton.innerHTML = '<i class="fas fa-check"></i> <span>Sent!</span>';
            submitButton.style.background = '#00ff88';
            
            // Reset form
            contactForm.reset();
            formInputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
                input.parentElement.classList.remove('focused');
            });
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
            
        } catch (error) {
            submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Error!</span>';
            submitButton.style.background = '#ff4444';
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// Cursor Trail
function initializeCursorTrail() {
    const cursorTrail = document.querySelector('.cursor-trail');
    if (!cursorTrail) return;
    
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorTrail.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursorTrail.style.opacity = '0';
    });
    
    function updateCursorTrail() {
        trailX += (cursorX - trailX) * 0.1;
        trailY += (cursorY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX - 10 + 'px';
        cursorTrail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(updateCursorTrail);
    }
    
    updateCursorTrail();
}

// Scroll Indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide scroll indicator when scrolling
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const opacity = Math.max(0, 1 - scrollTop / 300);
        scrollIndicator.style.opacity = opacity;
    });
}

// Theme Toggle (removed - no longer needed)
function initializeTheme() {
    // Theme toggle functionality removed
}

// Loading Screen
function showLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Start animations after loading
function startAnimations() {
    // Add any animations that should start after loading
    document.querySelectorAll('.hero-text, .hero-visual').forEach(element => {
        element.style.animationPlayState = 'running';
    });
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add ripple effect to buttons
function addRippleEffect(button, e) {
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation keyframes
const rippleKeyframes = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleKeyframes;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll and resize events
const optimizedResize = debounce(() => {
    resizeCanvas();
    createParticles();
}, 250);

window.addEventListener('resize', optimizedResize);

// Global error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Export functions for external use
window.scrollToSection = scrollToSection;