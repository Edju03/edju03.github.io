// Drone Swarm Module
// Handles kinetic typography with drone formations

const DroneSwarm = {
    canvas: null,
    ctx: null,
    errorGraphCanvas: null,
    errorGraphCtx: null,
    typographyDrones: [],
    lightTrails: [],
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
        console.log('Initializing DroneSwarm simulation...');
        this.canvas = document.getElementById('drone-swarm-canvas');
        if (!this.canvas) {
            console.error('DroneSwarm: Canvas not found!');
            return;
        }
        console.log('DroneSwarm: Canvas found, initializing...');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Initialize typography drone swarm
        this.createTypographyDrones();
        
        // Initialize light trail system
        this.initializeLightTrails();
        
        // Start kinetic typography animation
        this.animateKineticTypography();
        
        // Update stats display
        this.updateSwarmStats();
        
        this.simulationStartTime = Date.now();
        this.sequenceStartTime = Date.now();
        console.log('DroneSwarm: Initialization complete');
    },

    resizeCanvas() {
        if (!this.canvas) return;
        
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
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
                size: 3 + Math.random() * 2, // Larger, more visible
                brightness: 0.9 + Math.random() * 0.1,
                coreEnergy: 1.0,
                phase: Math.random() * Math.PI * 2,
                hyperSpeed: this.typographySettings.hyperKineticSpeed * (0.8 + Math.random() * 0.4),
                
                // Precision targeting
                precision: 0.9 + Math.random() * 0.1,
                state: 'standby', // 'standby', 'engaging', 'forming', 'repositioning'
                
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
        
        // Light trails will be created dynamically as drones move
        // Each drone will contribute to the trail system
    },

    animateKineticTypography() {
        if (!this.ctx) return;
        
        this.animationTime += 16; // ~60fps
        const time = Date.now() * 0.001;
        const currentTime = Date.now();
        
        // Clear canvas with deep black void
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw cyan grid floor
        this.drawCyanGridFloor(time);
        
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
        
        requestAnimationFrame(() => this.animateKineticTypography());
    },

    drawCyanGridFloor(time) {
        const gridSize = 40;
        const centerY = this.canvas.height * 0.8; // Grid floor at bottom
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

    drawCrystallineTextFormation(time) {
        if (this.droneFormationState === 'writing' || this.droneFormationState === 'dissolving') {
            const currentSequence = this.textSequences[this.currentSequenceIndex];
            const currentText = currentSequence.text;
            
            // Draw crystalline text outline
            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;
            
            this.ctx.font = `bold ${this.typographySettings.fontSize}px Orbitron, monospace`;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Create crystalline effect with multiple layers
            const crystallineAlpha = this.droneFormationState === 'dissolving' ? 0.05 : 0.15;
            const pulse = 0.7 + 0.3 * Math.sin(time * 2);
            
            // Draw multiple offset layers for crystalline depth
            for (let layer = 0; layer < 4; layer++) {
                const offset = layer * 2;
                const alpha = crystallineAlpha * (1 - layer * 0.2) * pulse;
                
                // Crystalline stroke
                this.ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
                this.ctx.lineWidth = 2 - layer * 0.3;
                this.ctx.shadowColor = '#00ffff';
                this.ctx.shadowBlur = 15 - layer * 3;
                this.ctx.strokeText(currentText, centerX + offset, centerY + offset);
            }
            
            this.ctx.shadowBlur = 0;
            
            // Add prismatic edge effects
            const edgeCount = 6;
            for (let i = 0; i < edgeCount; i++) {
                const angle = (i / edgeCount) * Math.PI * 2;
                const distance = 3;
                const edgeX = centerX + Math.cos(angle) * distance;
                const edgeY = centerY + Math.sin(angle) * distance;
                const edgeAlpha = crystallineAlpha * 0.3;
                
                this.ctx.strokeStyle = `rgba(255, 255, 255, ${edgeAlpha})`;
                this.ctx.lineWidth = 0.5;
                this.ctx.strokeText(currentText, edgeX, edgeY);
            }
        }
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
        // Create strategic formation points for elite squadron
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        
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
        
        return formationPoints.slice(0, this.typographySettings.droneCount);
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
    },

    drawEliteDrone(drone) {
        // Draw brilliant afterburner trail
        if (drone.afterburnerTrail.length > 1) {
            for (let i = 1; i < drone.afterburnerTrail.length; i++) {
                const prev = drone.afterburnerTrail[i - 1];
                const curr = drone.afterburnerTrail[i];
                
                const alpha = (i / drone.afterburnerTrail.length) * curr.intensity * 0.9;
                const width = (i / drone.afterburnerTrail.length) * 4 + 1;
                
                // Sharp, brilliant afterburner
                this.ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
                this.ctx.lineWidth = width;
                this.ctx.lineCap = 'round';
                
                this.ctx.beginPath();
                this.ctx.moveTo(prev.x, prev.y);
                this.ctx.lineTo(curr.x, curr.y);
                this.ctx.stroke();
                
                // Add intense glow to afterburners
                if (alpha > 0.6) {
                    this.ctx.shadowColor = '#00ffff';
                    this.ctx.shadowBlur = 12;
                    this.ctx.stroke();
                    this.ctx.shadowBlur = 0;
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
                
                this.ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
                this.ctx.beginPath();
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        // Elite drone core with enhanced energy field
        const coreSize = drone.size * drone.energyField;
        const coreIntensity = drone.coreEnergy;
        
        // Energy field aura
        if (drone.crystallineFormation) {
            this.ctx.shadowColor = '#00d4ff';
            this.ctx.shadowBlur = 25;
            this.ctx.fillStyle = `rgba(0, 212, 255, 0.3)`;
            this.ctx.beginPath();
            this.ctx.arc(drone.x, drone.y, coreSize + 8, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
        
        // Thruster glow
        if (drone.thrusterGlow > 0) {
            const thrusterSize = coreSize + drone.thrusterGlow * 6;
            this.ctx.fillStyle = `rgba(255, 255, 255, ${drone.thrusterGlow * 0.4})`;
            this.ctx.beginPath();
            this.ctx.arc(drone.x, drone.y, thrusterSize, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Main elite drone body (larger, more intense)
        this.ctx.shadowColor = '#00d4ff';
        this.ctx.shadowBlur = 20 * this.typographySettings.glowIntensity;
        this.ctx.fillStyle = `rgba(0, 212, 255, ${coreIntensity})`;
        this.ctx.beginPath();
        this.ctx.arc(drone.x, drone.y, coreSize, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        
        // Elite core highlight
        this.ctx.fillStyle = `rgba(255, 255, 255, ${coreIntensity * 0.8})`;
        this.ctx.beginPath();
        this.ctx.arc(drone.x, drone.y, coreSize * 0.4, 0, Math.PI * 2);
        this.ctx.fill();
    },

    updateTypographyStats() {
        const currentSequence = this.textSequences[this.currentSequenceIndex];
        
        // Update display elements
        const progressEl = document.getElementById('formation-progress');
        if (progressEl) {
            progressEl.textContent = this.droneFormationState.toUpperCase();
        }
        
        const activeDrones = this.typographyDrones.filter(d => d.state === 'forming').length;
        const solutionEl = document.getElementById('solution-time');
        if (solutionEl) {
            solutionEl.textContent = `${((activeDrones / this.typographyDrones.length) * 100).toFixed(1)}%`;
        }
        
        const countEl = document.getElementById('point-cloud-count');
        if (countEl) {
            countEl.textContent = currentSequence.text.length.toString() + ' CHARS';
        }
    },

    updateSwarmStats() {
        // Update the swarm statistics display
        const currentSequence = this.textSequences[this.currentSequenceIndex];
        const progressEl = document.getElementById('formation-progress');
        if (progressEl) {
            progressEl.textContent = 'KINETIC TYPOGRAPHY';
        }
        const solutionEl = document.getElementById('solution-time');
        if (solutionEl) {
            solutionEl.textContent = '0.0%';
        }
        const countEl = document.getElementById('point-cloud-count');
        if (countEl) {
            countEl.textContent = '0';
        }
    }
}; 