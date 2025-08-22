// Humanoid Robot Visualization Module
// Realistic humanoid robot animation for featured projects

const HumanoidRobot = {
    canvas: null,
    ctx: null,
    robot: {
        x: 0,
        y: 0,
        scale: 1,
        // Skeletal structure with joint angles
        joints: {
            // Head and Neck
            neck: { angle: 0, targetAngle: 0, speed: 0.05 },
            head: { angle: 0, targetAngle: 0, speed: 0.03 },
            
            // Arms (left and right)
            leftShoulder: { angle: 0, targetAngle: 0, speed: 0.04 },
            leftElbow: { angle: 0, targetAngle: 0, speed: 0.05 },
            leftWrist: { angle: 0, targetAngle: 0, speed: 0.06 },
            rightShoulder: { angle: 0, targetAngle: 0, speed: 0.04 },
            rightElbow: { angle: 0, targetAngle: 0, speed: 0.05 },
            rightWrist: { angle: 0, targetAngle: 0, speed: 0.06 },
            
            // Torso
            waist: { angle: 0, targetAngle: 0, speed: 0.03 },
            chest: { angle: 0, targetAngle: 0, speed: 0.02 },
            
            // Legs
            leftHip: { angle: 0, targetAngle: 0, speed: 0.04 },
            leftKnee: { angle: 0, targetAngle: 0, speed: 0.05 },
            leftAnkle: { angle: 0, targetAngle: 0, speed: 0.06 },
            rightHip: { angle: 0, targetAngle: 0, speed: 0.04 },
            rightKnee: { angle: 0, targetAngle: 0, speed: 0.05 },
            rightAnkle: { angle: 0, targetAngle: 0, speed: 0.06 }
        },
        // Animation states
        animationState: 'idle', // 'idle', 'walking', 'waving', 'balancing'
        animationPhase: 0,
        balanceOffset: 0,
        
        // Visual effects
        energyCore: { brightness: 1, pulse: 0 },
        jointGlow: 1,
        wireframeOpacity: 0.8,
        hologramEffect: true
    },
    
    // Telemetry data for display
    telemetry: {
        jointTorques: {},
        imuData: { roll: 0, pitch: 0, yaw: 0 },
        batteryLevel: 95,
        cpuTemp: 42,
        motorTemp: 38,
        comHeight: 0.95, // Center of mass height
        zmp: { x: 0, y: 0 } // Zero moment point
    },

    init() {
        console.log('Initializing Humanoid Robot Visualization...');
        
        // Try to find canvas in featured project section
        this.canvas = document.getElementById('humanoid-canvas');
        if (!this.canvas) {
            // Create canvas if it doesn't exist
            this.createCanvas();
        }
        
        if (!this.canvas) {
            console.error('HumanoidRobot: Could not create canvas');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Set robot position - moved higher to be more visible
        this.robot.x = this.canvas.width / 2;
        this.robot.y = this.canvas.height * 0.45; // Moved from 0.7 to 0.45 (higher)
        
        // Start animation
        this.animate();
        
        // Start behavior cycles
        this.startBehaviorCycle();
        
        console.log('Humanoid Robot: Initialization complete');
    },

    createCanvas() {
        // Find the featured project with humanoid title
        const projectCards = document.querySelectorAll('.project-card');
        for (let card of projectCards) {
            const titleOverlay = card.querySelector('.project-title-overlay');
            if (titleOverlay && titleOverlay.textContent.includes('HUMANOID')) {
                const visualContainer = card.querySelector('.project-visual');
                if (visualContainer) {
                    // Create and insert canvas
                    this.canvas = document.createElement('canvas');
                    this.canvas.id = 'humanoid-canvas';
                    this.canvas.style.position = 'absolute';
                    this.canvas.style.top = '0';
                    this.canvas.style.left = '0';
                    this.canvas.style.width = '100%';
                    this.canvas.style.height = '100%';
                    this.canvas.style.zIndex = '1';
                    visualContainer.appendChild(this.canvas);
                    break;
                }
            }
        }
    },

    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
        
        // Update robot position - higher to be more visible
        this.robot.x = this.canvas.width / 2;
        this.robot.y = this.canvas.height * 0.45; // Higher position
        
        // Scale robot based on canvas size - made bigger
        this.robot.scale = Math.min(this.canvas.width, this.canvas.height) / 300; // Increased from 400 to 300 (bigger)
    },

    startBehaviorCycle() {
        // Cycle through different animations
        const behaviors = ['idle', 'walking', 'waving', 'balancing'];
        let currentBehavior = 0;
        
        setInterval(() => {
            this.robot.animationState = behaviors[currentBehavior];
            currentBehavior = (currentBehavior + 1) % behaviors.length;
            
            // Reset animation phase
            this.robot.animationPhase = 0;
        }, 5000); // Change every 5 seconds
    },

    animate() {
        if (!this.ctx) return;
        
        const time = Date.now() * 0.001;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update animation
        this.updateAnimation(time);
        
        // Draw grid floor
        this.drawGridFloor(time);
        
        // Draw the humanoid robot
        this.drawHumanoid(time);
        
        // Draw telemetry overlay
        this.drawTelemetry(time);
        
        // Draw energy effects
        this.drawEnergyEffects(time);
        
        requestAnimationFrame(() => this.animate());
    },

    updateAnimation(time) {
        this.robot.animationPhase += 0.02;
        
        // Update joint angles based on animation state
        switch(this.robot.animationState) {
            case 'idle':
                this.updateIdleAnimation(time);
                break;
            case 'walking':
                this.updateWalkingAnimation(time);
                break;
            case 'waving':
                this.updateWavingAnimation(time);
                break;
            case 'balancing':
                this.updateBalancingAnimation(time);
                break;
        }
        
        // Smooth joint transitions
        for (let joint in this.robot.joints) {
            const j = this.robot.joints[joint];
            j.angle += (j.targetAngle - j.angle) * j.speed;
        }
        
        // Update energy core pulse
        this.robot.energyCore.pulse = 0.7 + 0.3 * Math.sin(time * 3);
        this.robot.energyCore.brightness = 0.8 + 0.2 * Math.sin(time * 2);
    },

    updateIdleAnimation(time) {
        // Subtle breathing motion
        this.robot.joints.chest.targetAngle = Math.sin(time * 0.5) * 0.05;
        this.robot.joints.waist.targetAngle = Math.sin(time * 0.3) * 0.03;
        
        // Slight arm movement
        this.robot.joints.leftShoulder.targetAngle = Math.sin(time * 0.4) * 0.1;
        this.robot.joints.rightShoulder.targetAngle = -Math.sin(time * 0.4) * 0.1;
        
        // Head micro-movements
        this.robot.joints.head.targetAngle = Math.sin(time * 0.6) * 0.05;
    },

    updateWalkingAnimation(time) {
        const phase = this.robot.animationPhase;
        
        // Walking gait
        this.robot.joints.leftHip.targetAngle = Math.sin(phase * 4) * 0.4;
        this.robot.joints.rightHip.targetAngle = -Math.sin(phase * 4) * 0.4;
        
        this.robot.joints.leftKnee.targetAngle = Math.max(0, Math.sin(phase * 4) * 0.6);
        this.robot.joints.rightKnee.targetAngle = Math.max(0, -Math.sin(phase * 4) * 0.6);
        
        // Arm swing
        this.robot.joints.leftShoulder.targetAngle = -Math.sin(phase * 4) * 0.3;
        this.robot.joints.rightShoulder.targetAngle = Math.sin(phase * 4) * 0.3;
        
        // Torso sway
        this.robot.joints.waist.targetAngle = Math.sin(phase * 8) * 0.05;
    },

    updateWavingAnimation(time) {
        // Wave with right arm
        this.robot.joints.rightShoulder.targetAngle = -1.2;
        this.robot.joints.rightElbow.targetAngle = -0.5;
        this.robot.joints.rightWrist.targetAngle = Math.sin(this.robot.animationPhase * 5) * 0.5;
        
        // Reset other joints
        this.robot.joints.leftShoulder.targetAngle = 0;
        this.robot.joints.leftElbow.targetAngle = 0;
        
        // Slight head tilt
        this.robot.joints.head.targetAngle = -0.1;
    },

    updateBalancingAnimation(time) {
        // Dynamic balancing motion
        const balance = Math.sin(this.robot.animationPhase * 2);
        
        this.robot.joints.waist.targetAngle = balance * 0.2;
        this.robot.joints.leftHip.targetAngle = -balance * 0.1;
        this.robot.joints.rightHip.targetAngle = balance * 0.1;
        
        // Arms for balance
        this.robot.joints.leftShoulder.targetAngle = balance * 0.3;
        this.robot.joints.rightShoulder.targetAngle = -balance * 0.3;
        
        // Update balance offset for visual effect
        this.robot.balanceOffset = balance * 5;
    },

    drawGridFloor(time) {
        const gridSize = 30;
        const gridY = this.robot.y + 100; // Adjusted floor position for higher robot
        const perspective = 0.5;
        
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        // Draw perspective grid
        for (let i = -5; i <= 5; i++) {
            const x = this.robot.x + i * gridSize;
            
            // Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(x, gridY);
            const topX = this.robot.x + i * gridSize * perspective;
            this.ctx.lineTo(topX, gridY - 50);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let j = 0; j < 3; j++) {
            const y = gridY - j * 20;
            const width = gridSize * 10 * (1 - j * 0.15);
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.robot.x - width/2, y);
            this.ctx.lineTo(this.robot.x + width/2, y);
            this.ctx.stroke();
        }
    },

    drawHumanoid(time) {
        const x = this.robot.x + this.robot.balanceOffset;
        const y = this.robot.y;
        const scale = this.robot.scale;
        
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.scale(scale, scale);
        
        // Draw shadow
        this.drawShadow();
        
        // Draw robot body parts
        this.drawTorso();
        this.drawHead();
        this.drawArms();
        this.drawLegs();
        
        // Draw joint connections
        this.drawJoints();
        
        // Draw energy core
        this.drawEnergyCore();
        
        this.ctx.restore();
    },

    drawShadow() {
        const gradient = this.ctx.createRadialGradient(0, 80, 0, 0, 80, 40);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(-40, 60, 80, 40);
    },

    drawTorso() {
        const waistAngle = this.robot.joints.waist.angle;
        const chestAngle = this.robot.joints.chest.angle;
        
        this.ctx.save();
        this.ctx.rotate(waistAngle);
        
        // Main torso
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${this.robot.wireframeOpacity})`;
        this.ctx.lineWidth = 2;
        
        // Chest
        this.ctx.save();
        this.ctx.translate(0, -30);
        this.ctx.rotate(chestAngle);
        
        this.ctx.beginPath();
        this.ctx.moveTo(-20, 0);
        this.ctx.lineTo(-15, -25);
        this.ctx.lineTo(15, -25);
        this.ctx.lineTo(20, 0);
        this.ctx.lineTo(15, 15);
        this.ctx.lineTo(-15, 15);
        this.ctx.closePath();
        this.ctx.stroke();
        
        // Chest details
        this.ctx.beginPath();
        this.ctx.moveTo(-10, -20);
        this.ctx.lineTo(10, -20);
        this.ctx.moveTo(-10, -10);
        this.ctx.lineTo(10, -10);
        this.ctx.stroke();
        
        this.ctx.restore();
        
        // Waist
        this.ctx.beginPath();
        this.ctx.moveTo(-15, -15);
        this.ctx.lineTo(-12, 0);
        this.ctx.lineTo(12, 0);
        this.ctx.lineTo(15, -15);
        this.ctx.stroke();
        
        this.ctx.restore();
    },

    drawHead() {
        const neckAngle = this.robot.joints.neck.angle;
        const headAngle = this.robot.joints.head.angle;
        
        this.ctx.save();
        this.ctx.translate(0, -55);
        this.ctx.rotate(neckAngle);
        
        // Neck
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${this.robot.wireframeOpacity})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(-5, 0);
        this.ctx.lineTo(-5, -5);
        this.ctx.moveTo(5, 0);
        this.ctx.lineTo(5, -5);
        this.ctx.stroke();
        
        // Head
        this.ctx.save();
        this.ctx.translate(0, -10);
        this.ctx.rotate(headAngle);
        
        // Head outline
        this.ctx.beginPath();
        this.ctx.moveTo(-12, -8);
        this.ctx.lineTo(-12, -20);
        this.ctx.lineTo(-8, -25);
        this.ctx.lineTo(8, -25);
        this.ctx.lineTo(12, -20);
        this.ctx.lineTo(12, -8);
        this.ctx.lineTo(8, -4);
        this.ctx.lineTo(-8, -4);
        this.ctx.closePath();
        this.ctx.stroke();
        
        // Eyes (glowing)
        this.ctx.fillStyle = `rgba(0, 255, 255, ${this.robot.energyCore.brightness})`;
        this.ctx.beginPath();
        this.ctx.arc(-5, -15, 2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(5, -15, 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Face details
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${this.robot.wireframeOpacity * 0.5})`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(-8, -18);
        this.ctx.lineTo(8, -18);
        this.ctx.stroke();
        
        this.ctx.restore();
        this.ctx.restore();
    },

    drawArms() {
        // Left arm
        this.drawArm('left', -20, -45);
        
        // Right arm
        this.drawArm('right', 20, -45);
    },

    drawArm(side, startX, startY) {
        const shoulder = this.robot.joints[`${side}Shoulder`].angle;
        const elbow = this.robot.joints[`${side}Elbow`].angle;
        const wrist = this.robot.joints[`${side}Wrist`].angle;
        
        this.ctx.save();
        this.ctx.translate(startX, startY);
        this.ctx.rotate(shoulder);
        
        // Upper arm
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${this.robot.wireframeOpacity})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, 25);
        this.ctx.stroke();
        
        // Shoulder joint
        this.drawJointCircle(0, 0, 4);
        
        // Forearm
        this.ctx.save();
        this.ctx.translate(0, 25);
        this.ctx.rotate(elbow);
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, 20);
        this.ctx.stroke();
        
        // Elbow joint
        this.drawJointCircle(0, 0, 3);
        
        // Hand
        this.ctx.save();
        this.ctx.translate(0, 20);
        this.ctx.rotate(wrist);
        
        this.ctx.beginPath();
        this.ctx.moveTo(-3, 0);
        this.ctx.lineTo(-3, 8);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, 10);
        this.ctx.moveTo(3, 0);
        this.ctx.lineTo(3, 8);
        this.ctx.stroke();
        
        // Wrist joint
        this.drawJointCircle(0, 0, 2);
        
        this.ctx.restore();
        this.ctx.restore();
        this.ctx.restore();
    },

    drawLegs() {
        // Left leg
        this.drawLeg('left', -10, 0);
        
        // Right leg
        this.drawLeg('right', 10, 0);
    },

    drawLeg(side, startX, startY) {
        const hip = this.robot.joints[`${side}Hip`].angle;
        const knee = this.robot.joints[`${side}Knee`].angle;
        const ankle = this.robot.joints[`${side}Ankle`].angle;
        
        this.ctx.save();
        this.ctx.translate(startX, startY);
        this.ctx.rotate(hip);
        
        // Thigh
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${this.robot.wireframeOpacity})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, 35);
        this.ctx.stroke();
        
        // Hip joint
        this.drawJointCircle(0, 0, 4);
        
        // Shin
        this.ctx.save();
        this.ctx.translate(0, 35);
        this.ctx.rotate(knee);
        
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, 30);
        this.ctx.stroke();
        
        // Knee joint
        this.drawJointCircle(0, 0, 3);
        
        // Foot
        this.ctx.save();
        this.ctx.translate(0, 30);
        this.ctx.rotate(ankle);
        
        this.ctx.beginPath();
        this.ctx.moveTo(-8, 0);
        this.ctx.lineTo(8, 0);
        this.ctx.lineTo(10, 5);
        this.ctx.lineTo(-6, 5);
        this.ctx.closePath();
        this.ctx.stroke();
        
        // Ankle joint
        this.drawJointCircle(0, 0, 2);
        
        this.ctx.restore();
        this.ctx.restore();
        this.ctx.restore();
    },

    drawJointCircle(x, y, radius) {
        // Glowing joint
        this.ctx.fillStyle = `rgba(255, 107, 53, ${this.robot.jointGlow * 0.8})`;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Joint outline
        this.ctx.strokeStyle = `rgba(255, 107, 53, ${this.robot.jointGlow})`;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
        this.ctx.stroke();
    },

    drawJoints() {
        // Draw connecting lines between major joints
        this.ctx.strokeStyle = `rgba(0, 212, 255, ${this.robot.wireframeOpacity * 0.3})`;
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([2, 4]);
        
        // Spine
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -55);
        this.ctx.stroke();
        
        // Shoulders
        this.ctx.beginPath();
        this.ctx.moveTo(-20, -45);
        this.ctx.lineTo(20, -45);
        this.ctx.stroke();
        
        // Hips
        this.ctx.beginPath();
        this.ctx.moveTo(-10, 0);
        this.ctx.lineTo(10, 0);
        this.ctx.stroke();
        
        this.ctx.setLineDash([]);
    },

    drawEnergyCore() {
        // Central energy core in chest
        const coreX = 0;
        const coreY = -35;
        const coreRadius = 8;
        
        // Outer glow
        const gradient = this.ctx.createRadialGradient(
            coreX, coreY, 0,
            coreX, coreY, coreRadius * 3
        );
        gradient.addColorStop(0, `rgba(0, 255, 255, ${this.robot.energyCore.brightness * 0.8})`);
        gradient.addColorStop(0.5, `rgba(0, 200, 255, ${this.robot.energyCore.brightness * 0.4})`);
        gradient.addColorStop(1, 'rgba(0, 150, 255, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(coreX - coreRadius * 3, coreY - coreRadius * 3, 
                         coreRadius * 6, coreRadius * 6);
        
        // Core
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.robot.energyCore.pulse})`;
        this.ctx.beginPath();
        this.ctx.arc(coreX, coreY, coreRadius * this.robot.energyCore.pulse, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Core ring
        this.ctx.strokeStyle = `rgba(0, 255, 255, ${this.robot.energyCore.brightness})`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.arc(coreX, coreY, coreRadius + 2, 0, Math.PI * 2);
        this.ctx.stroke();
    },

    drawTelemetry(time) {
        // Removed telemetry text overlay - keeping it clean
        // Update telemetry values internally for animation purposes
        this.telemetry.imuData.roll = Math.sin(time * 0.5) * 5;
        this.telemetry.imuData.pitch = Math.cos(time * 0.3) * 3;
        this.telemetry.imuData.yaw = Math.sin(time * 0.7) * 10;
        this.telemetry.comHeight = 0.95 + Math.sin(time) * 0.05;
    },

    drawEnergyEffects(time) {
        // Draw energy particles around the robot
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (i / particleCount) * Math.PI * 2 + time * 0.5;
            const radius = 100 + Math.sin(time * 2 + i) * 20;
            const x = this.robot.x + Math.cos(angle) * radius;
            const y = this.robot.y + Math.sin(angle) * radius * 0.3;
            
            const alpha = 0.3 + Math.sin(time * 3 + i) * 0.2;
            
            this.ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 1, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Draw holographic scanlines if enabled
        if (this.robot.hologramEffect) {
            this.drawHologramScanlines(time);
        }
    },

    drawHologramScanlines(time) {
        const scanlineY = (time * 50) % this.canvas.height;
        
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        // Horizontal scanline
        this.ctx.beginPath();
        this.ctx.moveTo(0, scanlineY);
        this.ctx.lineTo(this.canvas.width, scanlineY);
        this.ctx.stroke();
        
        // Interference pattern
        for (let y = 0; y < this.canvas.height; y += 4) {
            const alpha = 0.02 + Math.sin(y * 0.1 + time * 2) * 0.01;
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }
};

// Make it globally available
window.HumanoidRobot = HumanoidRobot;