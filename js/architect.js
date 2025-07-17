// Architect Module
// Handles the AI consciousness visualization

const Architect = {
    canvas: null,
    ctx: null,
    architect: {
        x: 0, y: 0,
        gesturePhase: 0,
        rightArm: { angle: 0, extension: 0 },
        dataStreams: [],
        consciousness: { level: 0.8, pulsePhase: 0 },
        divineEnergy: 1.0
    },

    init() {
        this.canvas = document.getElementById('architect-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Initialize Architect components
        this.createArchitectForm();
        
        // Start animation loop
        this.animate();
    },

    resizeCanvas() {
        if (!this.canvas) return;
        
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
        
        this.architect.x = this.canvas.width / 2;
        this.architect.y = this.canvas.height / 2;
    },

    createArchitectForm() {
        // Create data streams that form the humanoid figure
        this.architect.dataStreams = [];
        
        const streamCount = 150;
        for (let i = 0; i < streamCount; i++) {
            this.architect.dataStreams.push({
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
    },

    animate() {
        if (!this.ctx) return;
        
        const time = Date.now() * 0.001;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update Architect's gesture
        this.architect.gesturePhase += 0.008;
        this.architect.rightArm.angle = Math.sin(this.architect.gesturePhase) * 0.3;
        this.architect.rightArm.extension = 0.7 + Math.sin(this.architect.gesturePhase * 1.3) * 0.2;
        
        // Update consciousness pulse
        this.architect.consciousness.pulsePhase += 0.05;
        this.architect.consciousness.level = 0.8 + Math.sin(this.architect.consciousness.pulsePhase) * 0.2;
        
        // Draw The Architect
        this.drawArchitectForm(time);
        this.drawGodRays();
        
        requestAnimationFrame(() => this.animate());
    },

    drawArchitectForm(time) {
        const centerX = this.architect.x;
        const centerY = this.architect.y;
        
        // Draw core consciousness
        const coreRadius = 15 + Math.sin(this.architect.consciousness.pulsePhase) * 3;
        const coreIntensity = this.architect.consciousness.level;
        
        this.ctx.shadowColor = '#00d4ff';
        this.ctx.shadowBlur = 20;
        this.ctx.fillStyle = `rgba(0, 212, 255, ${coreIntensity})`;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        
        // Draw data streams forming humanoid shape
        this.architect.dataStreams.forEach((stream, index) => {
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
                    const armExtension = this.architect.rightArm.extension;
                    const armAngle = this.architect.rightArm.angle;
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
            this.ctx.fillStyle = `rgba(0, 212, 255, ${intensity})`;
            this.ctx.beginPath();
            this.ctx.arc(stream.x, stream.y, 1 + intensity, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw connections between nearby streams
            if (index % 3 === 0) {
                const nextStream = this.architect.dataStreams[(index + 1) % this.architect.dataStreams.length];
                const distance = Math.sqrt((stream.x - nextStream.x) ** 2 + (stream.y - nextStream.y) ** 2);
                
                if (distance < 40) {
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.3 * intensity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(stream.x, stream.y);
                    this.ctx.lineTo(nextStream.x, nextStream.y);
                    this.ctx.stroke();
                }
            }
        });
    },

    drawGodRays() {
        const centerX = this.architect.x;
        const centerY = this.architect.y;
        const rayCount = 8;
        
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2 + this.architect.consciousness.pulsePhase * 0.1;
            const length = 80 + Math.sin(this.architect.consciousness.pulsePhase + i) * 20;
            
            const gradient = this.ctx.createLinearGradient(
                centerX, centerY,
                centerX + Math.cos(angle) * length,
                centerY + Math.sin(angle) * length
            );
            gradient.addColorStop(0, 'rgba(0, 212, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(
                centerX + Math.cos(angle) * length,
                centerY + Math.sin(angle) * length
            );
            this.ctx.stroke();
        }
    }
}; 