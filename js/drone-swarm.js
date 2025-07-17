// Drone Swarm Module
// Handles kinetic typography with drone formations

const DroneSwarm = {
    canvas: null,
    ctx: null,
    errorGraphCanvas: null,
    errorGraphCtx: null,
    typographyDrones: [],
    lightTrails: [],
    neuralConstellations: [],
    textSequences: [
        { text: "Hello, I am Edward", duration: 4000, pause: 1000 }
    ],
    currentSequenceIndex: 0,
    sequenceStartTime: 0,
    droneFormationState: 'writing', // 'writing', 'dissolving', 'transitioning'
    animationTime: 0,
    simulationStartTime: 0,
    typographySettings: {
        droneCount: 64, // Increased for better letter formation
        fontSize: 48,
        letterSpacing: 12,
        lineHeight: 60,
        glowIntensity: 1.5,
        trailLength: 0, // No trails as specified
        dissolutionSpeed: 0.015,
        hyperKineticSpeed: 6.0,
        precisionThreshold: 1.0,
        afterburnerLength: 0 // No trails
    },

    init() {
        this.canvas = document.getElementById('drone-swarm-canvas');
        this.errorGraphCanvas = document.getElementById('error-graph-canvas');
        
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        if (this.errorGraphCanvas) {
            this.errorGraphCtx = this.errorGraphCanvas.getContext('2d');
        }
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Create neural network constellation background
        this.createNeuralConstellations();
        
        // Initialize typography drone swarm
        this.createTypographyDrones();
        
        // Initialize light trail system
        this.initializeLightTrails();
        
        // Start kinetic typography animation
        this.animate();
        
        // Update stats display
        this.updateSwarmStats();
        
        this.simulationStartTime = Date.now();
        this.sequenceStartTime = Date.now();
    },

    resizeCanvas() {
        if (!this.canvas) return;
        
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    },

    createNeuralConstellations() {
        this.neuralConstellations = [];
        const constellationCount = 15;
        
        for (let i = 0; i < constellationCount; i++) {
            const constellation = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
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
            
            this.neuralConstellations.push(constellation);
        }
    },

    createTypographyDrones() {
        this.typographyDrones = [];
        
        // Create elite vanguard squadron with unique characteristics
        const squadronNames = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa', 'Lambda', 'Mu', 'Nu', 'Xi'];
        
        for (let i = 0; i < this.typographySettings.droneCount; i++) {
            this.typographyDrones.push({
                id: i,
                callSign: squadronNames[i],
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                targetX: 0,
                targetY: 0,
                vx: 0,
                vy: 0,
                
                // Elite characteristics
                size: 3 + Math.random() * 2,
                brightness: 0.9 + Math.random() * 0.1,
                coreEnergy: 1.0,
                phase: Math.random() * Math.PI * 2,
                hyperSpeed: this.typographySettings.hyperKineticSpeed * (0.8 + Math.random() * 0.4),
                
                // Precision targeting
                precision: 0.9 + Math.random() * 0.1,
                state: 'standby',
                
                // Advanced trail systems
                afterburnerTrail: [],
                motionTrail: [],
                maxAfterburnerLength: this.typographySettings.afterburnerLength,
                maxMotionLength: 15,
                
                // Hyper-kinetic effects
                velocity: 0,
                acceleration: 0,
                motionBlurIntensity: 0,
                prevX: 0,
                prevY: 0,
                snapDistance: this.typographySettings.precisionThreshold,
                
                // Elite visual effects
                energyField: 1.0,
                thrusterGlow: 0,
                crystallineFormation: false
            });
        }
        
        // Update drone count display
        const droneCountEl = document.getElementById('drone-count');
        if (droneCountEl) {
            droneCountEl.textContent = `${this.typographySettings.droneCount} VANGUARD`;
        }
    },

    initializeLightTrails() {
        this.lightTrails = [];
    },

    animate() {
        if (!this.ctx) return;
        
        this.animationTime += 16; // ~60fps
        const time = Date.now() * 0.001;
        const currentTime = Date.now();
        
        // Clear canvas with deep black void
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw cyan grid floor
        this.drawCyanGridFloor(time);
        
        // Draw neural network constellation background
        this.drawNeuralConstellations(time);
        
        // Handle text sequence transitions
        this.handleTextSequences(currentTime);
        
        // Update and draw elite typography squadron
        this.updateTypographyDrones(time);
        
        // Draw each elite drone with advanced effects
        this.typographyDrones.forEach(drone => {
            this.drawEliteDrone(drone);
        });
        
        // Draw crystalline text formation
        this.drawCrystallineTextFormation(time);
        
        // Update statistics
        this.updateTypographyStats();
        
        requestAnimationFrame(() => this.animate());
    },

    drawCyanGridFloor(time) {
        const gridSize = 40;
        const centerY = this.canvas.height * 0.8;
        const gridAlpha = 0.2 + 0.1 * Math.sin(time * 0.5);
        
        // Draw grid lines with perspective effect
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${gridAlpha})`;
        this.ctx.lineWidth = 1;
        
        // Horizontal grid lines
        for (let y = centerY; y < this.canvas.height; y += gridSize) {
            const perspectiveScale = 1 - (y - centerY) / (this.canvas.height - centerY) * 0.5;
            const lineWidth = this.canvas.width * perspectiveScale;
            const startX = (this.canvas.width - lineWidth) / 2;
            
            this.ctx.beginPath();
            this.ctx.moveTo(startX, y);
            this.ctx.lineTo(startX + lineWidth, y);
            this.ctx.stroke();
        }
        
        // Vertical grid lines with perspective
        const verticalLines = 12;
        for (let i = 0; i <= verticalLines; i++) {
            const x = (i / verticalLines) * this.canvas.width;
            const perspectiveY = centerY + (this.canvas.height - centerY) * 0.8;
            
            this.ctx.beginPath();
            this.ctx.moveTo(x, centerY);
            this.ctx.lineTo(x, perspectiveY);
            this.ctx.stroke();
        }
        
        // Add subtle glow to grid
        this.ctx.shadowColor = '#00d4ff';
        this.ctx.shadowBlur = 3;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
    },

    drawNeuralConstellations(time) {
        this.neuralConstellations.forEach(constellation => {
            // Update constellation position
            constellation.x += constellation.driftX;
            constellation.y += constellation.driftY;
            constellation.pulsePhase += 0.02;
            
            // Wrap around canvas
            if (constellation.x < -100) constellation.x = this.canvas.width + 100;
            if (constellation.x > this.canvas.width + 100) constellation.x = -100;
            if (constellation.y < -100) constellation.y = this.canvas.height + 100;
            if (constellation.y > this.canvas.height + 100) constellation.y = -100;
            
            // Draw connections
            constellation.connections.forEach(connection => {
                const node1 = constellation.nodes[connection.from];
                const node2 = constellation.nodes[connection.to];
                
                const x1 = constellation.x + node1.x;
                const y1 = constellation.y + node1.y;
                const x2 = constellation.x + node2.x;
                const y2 = constellation.y + node2.y;
                
                const pulseAlpha = connection.opacity * (0.7 + 0.3 * Math.sin(constellation.pulsePhase));
                
                this.ctx.strokeStyle = `rgba(0, 212, 255, ${pulseAlpha})`;
                this.ctx.lineWidth = 0.5;
                this.ctx.beginPath();
                this.ctx.moveTo(x1, y1);
                this.ctx.lineTo(x2, y2);
                this.ctx.stroke();
            });
            
            // Draw nodes
            constellation.nodes.forEach(node => {
                const x = constellation.x + node.x;
                const y = constellation.y + node.y;
                const pulse = node.intensity * (0.6 + 0.4 * Math.sin(time * 2 + node.phase));
                
                this.ctx.fillStyle = `rgba(0, 212, 255, ${pulse})`;
                this.ctx.beginPath();
                this.ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                this.ctx.fill();
                
                // Add subtle glow
                if (pulse > 0.7) {
                    this.ctx.shadowColor = '#00d4ff';
                    this.ctx.shadowBlur = 4;
                    this.ctx.fill();
                    this.ctx.shadowBlur = 0;
                }
            });
        });
    },

    handleTextSequences(currentTime) {
        const currentSequence = this.textSequences[this.currentSequenceIndex];
        const elapsed = currentTime - this.sequenceStartTime;
        
        if (this.droneFormationState === 'writing') {
            if (elapsed > currentSequence.duration) {
                this.droneFormationState = 'dissolving';
            }
        } else if (this.droneFormationState === 'dissolving') {
            if (elapsed > currentSequence.duration + currentSequence.pause) {
                // Move to next sequence
                this.currentSequenceIndex = (this.currentSequenceIndex + 1) % this.textSequences.length;
                this.sequenceStartTime = currentTime;
                this.droneFormationState = 'transitioning';
            }
        } else if (this.droneFormationState === 'transitioning') {
            if (elapsed > 1000) { // 1 second transition
                this.droneFormationState = 'writing';
            }
        }
    },

    getEliteFormationPoints(text, fontSize) {
        // Create pixel-perfect formation points using canvas ImageData
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = 800;
        tempCanvas.height = 200;
        
        tempCtx.font = `bold ${fontSize}px Orbitron, monospace`;
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        tempCtx.fillStyle = 'white';
        tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);
        
        // Get pixel data
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const pixels = imageData.data;
        
        // Extract formation points from pixel data
        const formationPoints = [];
        const sampleRate = 4; // Sample every 4th pixel for density control
        
        for (let y = 0; y < tempCanvas.height; y += sampleRate) {
            for (let x = 0; x < tempCanvas.width; x += sampleRate) {
                const index = (y * tempCanvas.width + x) * 4;
                const alpha = pixels[index + 3]; // Alpha channel
                
                if (alpha > 128) { // If pixel is part of text
                    const worldX = (x / tempCanvas.width) * this.canvas.width;
                    const worldY = (y / tempCanvas.height) * this.canvas.height;
                    formationPoints.push({ x: worldX, y: worldY });
                }
            }
        }
        
        // If we have more points than drones, sample them evenly
        if (formationPoints.length > this.typographySettings.droneCount) {
            const step = formationPoints.length / this.typographySettings.droneCount;
            const sampledPoints = [];
            for (let i = 0; i < this.typographySettings.droneCount; i++) {
                const index = Math.floor(i * step);
                sampledPoints.push(formationPoints[index]);
            }
            return sampledPoints;
        }
        
        return formationPoints;
    },

    updateTypographyDrones(time) {
        const currentSequence = this.textSequences[this.currentSequenceIndex];
        const currentText = currentSequence.text;
        
        // Get elite formation points for current text
        const formationPoints = this.getEliteFormationPoints(currentText, this.typographySettings.fontSize);
        
        this.typographyDrones.forEach((drone, index) => {
            // Store previous position for motion blur and afterburners
            drone.prevX = drone.x;
            drone.prevY = drone.y;
            
            // Determine target based on formation state
            let newTargetX = drone.targetX;
            let newTargetY = drone.targetY;
            
            if (this.droneFormationState === 'writing' || this.droneFormationState === 'transitioning') {
                if (index < formationPoints.length) {
                    const targetPoint = formationPoints[index];
                    newTargetX = targetPoint.x;
                    newTargetY = targetPoint.y;
                    drone.state = 'engaging';
                    drone.crystallineFormation = true;
                } else {
                    // Standby drones maintain perimeter
                    const standbyRadius = 150;
                    const standbyAngle = (index / this.typographySettings.droneCount) * Math.PI * 2 + time * 0.3;
                    newTargetX = this.canvas.width / 2 + Math.cos(standbyAngle) * standbyRadius;
                    newTargetY = this.canvas.height / 2 + Math.sin(standbyAngle) * standbyRadius;
                    drone.state = 'standby';
                    drone.crystallineFormation = false;
                }
            } else if (this.droneFormationState === 'dissolving') {
                // Aggressive exit vectors
                const exitAngle = Math.atan2(drone.y - this.canvas.height/2, drone.x - this.canvas.width/2);
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
            
            // No trails - drones move with surgical precision
            
            // Update energy fields and phase
            drone.phase += 0.08;
            drone.energyField = drone.crystallineFormation ? 1.2 : 0.8;
            drone.coreEnergy = drone.brightness * (0.9 + 0.1 * Math.sin(drone.phase));
        });
    },

    drawEliteDrone(drone) {
        // Elite drone core with brilliant cyan glow
        const coreSize = drone.size * drone.energyField;
        const coreIntensity = drone.coreEnergy;
        
        // Main elite drone body with intense glow
        this.ctx.shadowColor = '#00d4ff';
        this.ctx.shadowBlur = 15 * this.typographySettings.glowIntensity;
        this.ctx.fillStyle = `rgba(0, 255, 255, ${coreIntensity})`;
        this.ctx.beginPath();
        this.ctx.arc(drone.x, drone.y, coreSize, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        
        // Bright core highlight
        this.ctx.fillStyle = `rgba(255, 255, 255, ${coreIntensity * 0.9})`;
        this.ctx.beginPath();
        this.ctx.arc(drone.x, drone.y, coreSize * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
    },

    drawCrystallineTextFormation(time) {
        // No text overlay - drones form the letters themselves
    },

    updateTypographyStats() {
        const currentSequence = this.textSequences[this.currentSequenceIndex];
        
        // Update display elements
        const formationProgressEl = document.getElementById('formation-progress');
        if (formationProgressEl) {
            formationProgressEl.textContent = this.droneFormationState.toUpperCase();
        }
        
        const activeDrones = this.typographyDrones.filter(d => d.state === 'forming').length;
        const solutionTimeEl = document.getElementById('solution-time');
        if (solutionTimeEl) {
            solutionTimeEl.textContent = `${((activeDrones / this.typographyDrones.length) * 100).toFixed(1)}%`;
        }
        
        const pointCloudCountEl = document.getElementById('point-cloud-count');
        if (pointCloudCountEl) {
            pointCloudCountEl.textContent = currentSequence.text.length.toString() + ' CHARS';
        }
    },

    updateSwarmStats() {
        // Update the swarm statistics display
        const currentSequence = this.textSequences[this.currentSequenceIndex];
        const formationProgressEl = document.getElementById('formation-progress');
        if (formationProgressEl) {
            formationProgressEl.textContent = 'KINETIC TYPOGRAPHY';
        }
        
        const solutionTimeEl = document.getElementById('solution-time');
        if (solutionTimeEl) {
            solutionTimeEl.textContent = '0.0%';
        }
        
        const pointCloudCountEl = document.getElementById('point-cloud-count');
        if (pointCloudCountEl) {
            pointCloudCountEl.textContent = '0';
        }
    }
}; 