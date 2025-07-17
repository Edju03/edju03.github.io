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
        { text: "Hello, I am Edward", duration: 4000, pause: 1200, type: 'introduction' },
        { text: "I am interested in", duration: 3500, pause: 1000, type: 'transition' },
        { text: "Computer Vision", duration: 3000, pause: 1000, type: 'expertise' },
        { text: "Control", duration: 2500, pause: 1000, type: 'expertise' },
        { text: "Planning and Navigation", duration: 4000, pause: 2000, type: 'expertise' }
    ],
    currentSequenceIndex: 0,
    sequenceStartTime: 0,
    droneFormationState: 'writing', // 'writing', 'dissolving', 'transitioning'
    animationTime: 0,
    simulationStartTime: 0,
    typographySettings: {
        droneCount: 60, // Further reduced for minimal coverage
        fontSize: 72, // Even larger text
        letterSpacing: 18,
        lineHeight: 90,
        glowIntensity: 0.4, // Much lower brightness
        trailLength: 8, // Very short trails
        dissolutionSpeed: 0.02,
        hyperKineticSpeed: 6.0, // Slower movement
        precisionThreshold: 2.0,
        afterburnerLength: 6, // Minimal trails
        breakawaySpeed: 8.0, // Slower breakaway
        formationHoldTime: 4000, // Even longer hold time
        transitionTime: 1800 // Longer transition
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
                size: 1 + Math.random() * 0.5, // Much smaller drones
                brightness: 0.4 + Math.random() * 0.2, // Very low brightness
                coreEnergy: 0.6,
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
        
        // Clear canvas with deeper fade for better contrast
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
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
            
            // Create crystalline effect with multiple layers - enhanced visibility
            const crystallineAlpha = this.droneFormationState === 'dissolving' ? 0.15 : 0.35;
            const pulse = 0.8 + 0.2 * Math.sin(time * 2);
            
            // Draw multiple offset layers for crystalline depth
            for (let layer = 0; layer < 3; layer++) {
                const offset = layer * 1.5;
                const alpha = crystallineAlpha * (1 - layer * 0.25) * pulse;
                
                // Crystalline stroke with better visibility
                this.ctx.strokeStyle = `rgba(100, 255, 255, ${alpha})`;
                this.ctx.lineWidth = 3 - layer * 0.5;
                this.ctx.shadowColor = '#40ffff';
                this.ctx.shadowBlur = 20 - layer * 5;
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
        // Create pixel-perfect formation points using canvas ImageData
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = 1200; // Higher resolution for better precision
        tempCanvas.height = 300;
        
        tempCtx.font = `bold ${fontSize * 2}px Orbitron, monospace`; // Double size for better sampling
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        tempCtx.fillStyle = 'white';
        tempCtx.fillText(text, tempCanvas.width / 2, tempCanvas.height / 2);
        
        // Get pixel data for precise formation points
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const pixels = imageData.data;
        
        // Extract formation points from pixel data with intelligent sampling
        const formationPoints = [];
        const sampleRate = 6; // Much sparser formation for outline effect
        
        for (let y = 0; y < tempCanvas.height; y += sampleRate) {
            for (let x = 0; x < tempCanvas.width; x += sampleRate) {
                const index = (y * tempCanvas.width + x) * 4;
                const alpha = pixels[index + 3]; // Alpha channel
                
                if (alpha > 128) { // If pixel is part of text
                    // Convert back to world coordinates
                    const worldX = (x / tempCanvas.width) * this.canvas.width;
                    const worldY = (y / tempCanvas.height) * this.canvas.height;
                    
                    // Add priority based on position (edges get higher priority)
                    const edgeDetection = this.detectEdge(pixels, x, y, tempCanvas.width, tempCanvas.height);
                    const priority = edgeDetection ? 'critical' : 'medium';
                    
                    formationPoints.push({ 
                        x: worldX, 
                        y: worldY, 
                        priority: priority,
                        char: this.getCharacterAtPosition(text, x, tempCanvas.width)
                    });
                }
            }
        }
        
        // Sort by priority and distribute evenly
        const priorityOrder = { 'critical': 3, 'high': 2, 'medium': 1 };
        formationPoints.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        
        // If we have more points than drones, sample them intelligently
        if (formationPoints.length > this.typographySettings.droneCount) {
            const step = formationPoints.length / this.typographySettings.droneCount;
            const sampledPoints = [];
            for (let i = 0; i < this.typographySettings.droneCount; i++) {
                const index = Math.floor(i * step);
                if (formationPoints[index]) {
                    sampledPoints.push(formationPoints[index]);
                }
            }
            return sampledPoints;
        }
        
        return formationPoints;
    },

    detectEdge(pixels, x, y, width, height) {
        // Simple edge detection for letter outlines
        const index = (y * width + x) * 4;
        const current = pixels[index + 3];
        
        // Check neighboring pixels
        const neighbors = [
            {x: x-1, y: y}, {x: x+1, y: y}, 
            {x: x, y: y-1}, {x: x, y: y+1}
        ];
        
        for (let neighbor of neighbors) {
            if (neighbor.x >= 0 && neighbor.x < width && neighbor.y >= 0 && neighbor.y < height) {
                const nIndex = (neighbor.y * width + neighbor.x) * 4;
                const neighborAlpha = pixels[nIndex + 3];
                if (Math.abs(current - neighborAlpha) > 128) {
                    return true; // Edge detected
                }
            }
        }
        return false;
    },

    getCharacterAtPosition(text, x, totalWidth) {
        // Estimate which character this position belongs to
        const charIndex = Math.floor((x / totalWidth) * text.length);
        return text[Math.min(charIndex, text.length - 1)];
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
                    
                    // Character-specific positioning for dramatic breakaway effects
                    drone.assignedCharacter = targetPoint.char;
                    drone.characterIndex = this.getCharacterIndex(targetPoint.char, currentText);
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
                // Character-specific dramatic breakaway effects
                this.executeBreakawayManeuver(drone, time);
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
        // Enhanced breakaway motion blur streaks
        if (drone.state === 'breakaway' && drone.breakawayIntensity > 0) {
            this.drawBreakawayStreaks(drone);
        }
        
        // Draw minimal afterburner trail
        if (drone.afterburnerTrail.length > 1 && drone.velocity > 4) {
            for (let i = Math.max(1, drone.afterburnerTrail.length - 3); i < drone.afterburnerTrail.length; i++) {
                const prev = drone.afterburnerTrail[i - 1];
                const curr = drone.afterburnerTrail[i];
                
                const alpha = (i / drone.afterburnerTrail.length) * curr.intensity * 0.3; // Much lower alpha
                const width = 1; // Fixed thin width
                
                // Minimal afterburner
                this.ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
                this.ctx.lineWidth = width;
                this.ctx.lineCap = 'round';
                
                this.ctx.beginPath();
                this.ctx.moveTo(prev.x, prev.y);
                this.ctx.lineTo(curr.x, curr.y);
                this.ctx.stroke();
                
                // No glow for minimal effect
            }
        }
        
        // Minimal motion blur only for very fast movement
        const motionIntensity = drone.motionBlurIntensity * (drone.breakawayIntensity || 1) * 0.3;
        if (motionIntensity > 0.4 && drone.velocity > 6) {
            const blurSteps = 3; // Very few steps
            const stepX = (drone.x - drone.prevX) / blurSteps;
            const stepY = (drone.y - drone.prevY) / blurSteps;
            
            for (let i = 0; i < blurSteps; i++) {
                const alpha = (i / blurSteps) * motionIntensity * 0.2; // Very low alpha
                const x = drone.prevX + stepX * i;
                const y = drone.prevY + stepY * i;
                const size = drone.size * 0.6; // Smaller blur dots
                
                // Subtle blur effect
                this.ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
                this.ctx.beginPath();
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
        
        // Elite drone core with enhanced energy field
        const coreSize = drone.size * drone.energyField;
        const coreIntensity = drone.coreEnergy;
        
        // Minimal energy field aura only when forming letters
        if (drone.crystallineFormation && drone.state === 'engaging') {
            this.ctx.shadowColor = '#00d4ff';
            this.ctx.shadowBlur = 6; // Much smaller glow
            this.ctx.fillStyle = `rgba(0, 212, 255, 0.1)`; // Very subtle
            this.ctx.beginPath();
            this.ctx.arc(drone.x, drone.y, coreSize + 2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
        
        // No thruster glow to keep it minimal
        
        // Main elite drone body - minimal glow
        this.ctx.shadowColor = '#00d4ff';
        this.ctx.shadowBlur = 3 * this.typographySettings.glowIntensity; // Very small glow
        this.ctx.fillStyle = `rgba(0, 212, 255, ${coreIntensity * 0.7})`;
        this.ctx.beginPath();
        this.ctx.arc(drone.x, drone.y, coreSize, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        
        // Minimal core highlight
        this.ctx.fillStyle = `rgba(255, 255, 255, ${coreIntensity * 0.3})`;
        this.ctx.beginPath();
        this.ctx.arc(drone.x, drone.y, coreSize * 0.2, 0, Math.PI * 2);
        this.ctx.fill();
    },

    drawBreakawayStreaks(drone) {
        // Draw subtle breakaway streaks - reduced intensity
        const streakLength = 30 * (drone.breakawayIntensity || 1);
        const streakCount = 8; // Fewer streaks
        
        for (let i = 0; i < streakCount; i++) {
            const angle = (i / streakCount) * Math.PI * 2;
            const distance = streakLength * (0.4 + Math.random() * 0.4);
            const endX = drone.x + Math.cos(angle) * distance;
            const endY = drone.y + Math.sin(angle) * distance;
            
            // Create gradient streak effect - more subtle
            const gradient = this.ctx.createLinearGradient(drone.x, drone.y, endX, endY);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
            gradient.addColorStop(0.3, 'rgba(255, 200, 100, 0.3)');
            gradient.addColorStop(0.7, 'rgba(0, 200, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 100, 200, 0)');
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2 * (drone.breakawayIntensity || 1);
            this.ctx.lineCap = 'round';
            this.ctx.shadowColor = '#ffffff';
            this.ctx.shadowBlur = 4;
            
            this.ctx.beginPath();
            this.ctx.moveTo(drone.x, drone.y);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }
        
        // Decay breakaway intensity over time
        if (drone.breakawayIntensity) {
            drone.breakawayIntensity -= 0.03; // Faster decay
            if (drone.breakawayIntensity <= 0) {
                drone.breakawayIntensity = 0;
                drone.streakMultiplier = 1;
            }
        }
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
    },

    getCharacterIndex(char, text) {
        // Find the index position of character in text for breakaway sequencing
        for (let i = 0; i < text.length; i++) {
            if (text[i] === char) {
                return i;
            }
        }
        return 0;
    },

    executeBreakawayManeuver(drone, time) {
        // Dramatic character-specific breakaway with surgical precision
        if (!drone.assignedCharacter || drone.characterIndex === undefined) {
            // Default aggressive exit for unassigned drones
            const exitAngle = Math.atan2(drone.y - this.canvas.height/2, drone.x - this.canvas.width/2);
            drone.targetX = drone.x + Math.cos(exitAngle) * 200;
            drone.targetY = drone.y + Math.sin(exitAngle) * 200;
            drone.state = 'repositioning';
            drone.crystallineFormation = false;
            return;
        }

        // Character-specific breakaway patterns
        const breakawayDelay = drone.characterIndex * 50; // Staggered timing per character
        const breakawayTime = time * 1000 - this.sequenceStartTime;
        
        if (breakawayTime > breakawayDelay) {
            // Brilliant streak breakaway based on character position
            const characterDirection = this.getCharacterBreakawayVector(drone.assignedCharacter, drone.characterIndex);
            const streakDistance = this.typographySettings.breakawaySpeed * 8;
            
            // Hyper-speed repositioning with motion blur streaks
            drone.targetX = drone.x + characterDirection.x * streakDistance;
            drone.targetY = drone.y + characterDirection.y * streakDistance;
            drone.state = 'breakaway';
            drone.crystallineFormation = false;
            
            // Enhanced motion blur for breakaway effect
            drone.breakawayIntensity = 1.0;
            drone.streakMultiplier = 2.5;
        }
    },

    getCharacterBreakawayVector(char, charIndex) {
        // Define unique breakaway vectors for different character types
        const characterVectors = {
            'H': { x: -0.8, y: -0.6 }, // Sharp diagonal up-left
            'e': { x: 0.9, y: -0.4 }, // Aggressive right-up
            'l': { x: 0.2, y: -1.0 }, // Straight up
            'o': { x: 0.7, y: 0.7 }, // Curved down-right
            'I': { x: -0.5, y: -0.9 }, // Strong vertical
            'a': { x: 0.6, y: 0.8 }, // Flowing arc
            'm': { x: -0.9, y: 0.3 }, // Wide left sweep
            'E': { x: 0.8, y: -0.6 }, // Dynamic right-up
            'd': { x: -0.4, y: 0.9 }, // Gentle down-left
            'w': { x: 0.3, y: -0.7 }, // Upward wave
            'r': { x: -0.7, y: -0.7 }, // Sharp diagonal
            'n': { x: 0.5, y: -0.8 }, // Diagonal up-right
            't': { x: 0.1, y: -0.9 }, // Straight up
            's': { x: 0.8, y: 0.3 }, // S-curve right
            'C': { x: -0.9, y: -0.2 }, // Wide left arc
            'u': { x: 0.4, y: 0.9 }, // U-curve down
            'p': { x: -0.6, y: 0.8 }, // P-loop down-left
            'V': { x: 0.7, y: -0.7 }, // V-formation diagonal
            'i': { x: 0.1, y: -0.95 }, // Dot up
            'g': { x: -0.3, y: 0.95 }, // G-tail down
            'P': { x: -0.8, y: -0.4 }, // P-strong left
            'N': { x: 0.9, y: -0.4 }, // N-diagonal
            'v': { x: 0.6, y: -0.8 }, // Small v up
            'f': { x: -0.2, y: -0.98 }, // F-flag up
            ',': { x: 0.1, y: 0.99 }, // Comma drops
            ' ': { x: 0.0, y: 1.0 } // Spaces fall straight down
        };

        // Get character-specific vector or default
        const vector = characterVectors[char] || { x: Math.cos(charIndex), y: Math.sin(charIndex) };
        
        // Add some randomization for organic movement
        const randomOffset = 0.2;
        return {
            x: vector.x + (Math.random() - 0.5) * randomOffset,
            y: vector.y + (Math.random() - 0.5) * randomOffset
        };
    }
}; 