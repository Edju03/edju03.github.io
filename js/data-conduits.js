// Holographic Data Conduit System
// A masterpiece of computational art - 3D pipes reimagined as hyper-advanced data conduits

const DataConduits = {
    canvas: null,
    ctx: null,
    pipes: [],
    dataPackets: [],
    dataPorts: [],
    lightTendrils: [],
    gridNodes: [],
    animationTime: 0,
    
    // Visual settings for cinematic quality - Unreal Engine 5 inspired
    settings: {
        pipeCount: 15,
        baseGlow: 1.0,
        dataFlowSpeed: 3.2,
        packetSpeed: 5.5,
        tendrilCount: 12,
        crystallineOpacity: 0.4,
        volumetricIntensity: 1.6,
        refractionEffect: 0.25,
        holographicShimmer: 0.8,
        depthLayers: 5,
        energyFluctuations: 1.2
    },

    init() {
        console.log('Initializing Holographic Data Conduit System...');
        this.canvas = document.getElementById('data-conduits-canvas');
        if (!this.canvas) {
            console.error('DataConduits: Canvas not found - creating background layer...');
            this.createBackgroundCanvas();
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        
        // Initialize the living supercomputer
        this.generateCrystallinePipes();
        this.createDataPorts();
        this.spawnDataPackets();
        this.initializeGridNetwork();
        
        // Start the holographic simulation
        this.animate();
        console.log('Holographic Data Conduits: Online');
    },

    createBackgroundCanvas() {
        // Create a background canvas layer for the conduit system
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'data-conduits-canvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.7';
        
        // Insert behind other elements
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.position = 'relative';
            heroBackground.insertBefore(this.canvas, heroBackground.firstChild);
        }
    },

    resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    generateCrystallinePipes() {
        this.pipes = [];
        
        // Create sophisticated pipe network connecting key areas
        const keyPoints = [
            { x: window.innerWidth * 0.15, y: window.innerHeight * 0.8, type: 'roboticArm' },
            { x: window.innerWidth * 0.85, y: window.innerHeight * 0.5, type: 'droneSwarm' },
            { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3, type: 'architect' },
            { x: window.innerWidth * 0.3, y: window.innerHeight * 0.7, type: 'cfd' },
            { x: window.innerWidth * 0.7, y: window.innerHeight * 0.75, type: 'thruster' }
        ];

        // Generate primary conduits between key systems
        for (let i = 0; i < keyPoints.length; i++) {
            for (let j = i + 1; j < keyPoints.length; j++) {
                this.createCrystallinePipe(keyPoints[i], keyPoints[j]);
            }
        }

        // Add secondary distribution pipes
        for (let i = 0; i < this.settings.pipeCount; i++) {
            this.createDistributionPipe();
        }
    },

    createCrystallinePipe(start, end) {
        const segments = 20;
        const pipe = {
            id: `pipe_${this.pipes.length}`,
            segments: [],
            diameter: 8 + Math.random() * 4,
            glowIntensity: this.settings.baseGlow + Math.random() * 0.4,
            dataFlow: Math.random() * 0.5 + 0.5,
            type: 'primary',
            connectionStrength: 0.9,
            crystallinePattern: Math.random() * Math.PI * 2
        };

        // Generate curved path with procedural variation
        for (let i = 0; i <= segments; i++) {
            const t = i / segments;
            const curveOffset = Math.sin(t * Math.PI * 3) * 50 * (0.5 + Math.random() * 0.5);
            
            // Bezier-like curve with sophisticated flow dynamics
            const x = start.x + (end.x - start.x) * t + curveOffset * Math.sin(t * Math.PI);
            const y = start.y + (end.y - start.y) * t + curveOffset * Math.cos(t * Math.PI * 2);
            const z = Math.sin(t * Math.PI) * 30; // Pseudo-3D depth
            
            pipe.segments.push({
                x: x,
                y: y,
                z: z,
                width: pipe.diameter * (0.7 + 0.3 * Math.sin(t * Math.PI)),
                opacity: 0.6 + 0.4 * Math.sin(t * Math.PI * 2),
                dataIntensity: Math.random()
            });
        }

        this.pipes.push(pipe);
    },

    createDistributionPipe() {
        const pipe = {
            id: `dist_${this.pipes.length}`,
            segments: [],
            diameter: 4 + Math.random() * 3,
            glowIntensity: this.settings.baseGlow * 0.7,
            dataFlow: Math.random() * 0.3 + 0.2,
            type: 'distribution',
            connectionStrength: 0.5,
            crystallinePattern: Math.random() * Math.PI * 2
        };

        // Create organic, growing distribution networks
        const segments = 15;
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight * 0.6 + Math.random() * window.innerHeight * 0.3;
        
        let currentX = startX;
        let currentY = startY;
        let direction = Math.random() * Math.PI * 2;

        for (let i = 0; i <= segments; i++) {
            // Procedural growth with organic curves
            direction += (Math.random() - 0.5) * 0.5;
            const stepSize = 20 + Math.random() * 30;
            
            currentX += Math.cos(direction) * stepSize;
            currentY += Math.sin(direction) * stepSize;
            
            // Keep within bounds with graceful curves
            if (currentX < 50) { currentX = 50; direction = Math.random() * Math.PI - Math.PI/2; }
            if (currentX > window.innerWidth - 50) { currentX = window.innerWidth - 50; direction = Math.PI + Math.random() * Math.PI - Math.PI/2; }
            if (currentY < 50) { currentY = 50; direction = Math.random() * Math.PI; }
            if (currentY > window.innerHeight - 50) { currentY = window.innerHeight - 50; direction = -Math.random() * Math.PI; }

            pipe.segments.push({
                x: currentX,
                y: currentY,
                z: Math.sin(i * 0.3) * 15,
                width: pipe.diameter * (0.8 + 0.2 * Math.sin(i * 0.5)),
                opacity: 0.4 + 0.3 * Math.sin(i * 0.7),
                dataIntensity: Math.random()
            });
        }

        this.pipes.push(pipe);
    },

    createDataPorts() {
        this.dataPorts = [
            { x: window.innerWidth * 0.15, y: window.innerHeight * 0.8, type: 'roboticArm', activity: 0.8 },
            { x: window.innerWidth * 0.85, y: window.innerHeight * 0.5, type: 'droneSwarm', activity: 0.9 },
            { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3, type: 'architect', activity: 1.0 },
            { x: window.innerWidth * 0.3, y: window.innerHeight * 0.7, type: 'cfd', activity: 0.7 },
            { x: window.innerWidth * 0.7, y: window.innerHeight * 0.75, type: 'thruster', activity: 0.75 }
        ];

        // Initialize light tendrils for each port
        this.dataPorts.forEach(port => {
            port.tendrils = [];
            for (let i = 0; i < this.settings.tendrilCount; i++) {
                port.tendrils.push({
                    angle: (i / this.settings.tendrilCount) * Math.PI * 2,
                    length: 20 + Math.random() * 30,
                    intensity: 0.5 + Math.random() * 0.5,
                    phase: Math.random() * Math.PI * 2,
                    pulseSpeed: 0.05 + Math.random() * 0.03
                });
            }
        });
    },

    spawnDataPackets() {
        this.dataPackets = [];
        
        // Create high-energy data packets that zip through conduits
        this.pipes.forEach((pipe, pipeIndex) => {
            if (pipe.type === 'primary') {
                for (let i = 0; i < 4; i++) {
                    this.dataPackets.push({
                        pipeId: pipeIndex,
                        position: Math.random(),
                        speed: this.settings.packetSpeed * (0.8 + Math.random() * 0.6),
                        intensity: 0.8 + Math.random() * 0.2,
                        size: 4 + Math.random() * 3,
                        type: Math.random() > 0.6 ? 'priority' : 'standard',
                        energy: Math.random(),
                        trailLength: 0.15 + Math.random() * 0.1,
                        holographicShimmer: Math.random() * Math.PI * 2
                    });
                }
            }
        });
    },

    initializeGridNetwork() {
        this.gridNodes = [];
        const gridSpacing = 60;
        
        // Create a sophisticated grid network on the floor
        for (let x = 0; x < window.innerWidth; x += gridSpacing) {
            for (let y = window.innerHeight * 0.7; y < window.innerHeight; y += gridSpacing) {
                this.gridNodes.push({
                    x: x,
                    y: y,
                    activity: Math.random() * 0.3,
                    pulsePhase: Math.random() * Math.PI * 2,
                    connectionStrength: Math.random() * 0.5
                });
            }
        }
    },

    animate() {
        if (!this.ctx) return;
        
        this.animationTime += 0.016; // ~60fps
        const time = Date.now() * 0.001;
        
        // Clear with deep void for maximum contrast
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render the living supercomputer
        this.drawGridNetwork(time);
        this.drawCrystallinePipes(time);
        this.updateAndDrawDataPackets(time);
        this.drawDataPorts(time);
        this.drawLightTendrils(time);
        this.drawVolumetricEffects(time);
        
        requestAnimationFrame(() => this.animate());
    },

    drawGridNetwork(time) {
        // Draw the sophisticated dark grid floor
        this.ctx.strokeStyle = 'rgba(0, 150, 200, 0.1)';
        this.ctx.lineWidth = 0.5;
        
        this.gridNodes.forEach(node => {
            node.pulsePhase += 0.02;
            const pulse = 0.5 + 0.5 * Math.sin(node.pulsePhase);
            const activity = node.activity * pulse;
            
            if (activity > 0.2) {
                this.ctx.strokeStyle = `rgba(0, 212, 255, ${activity * 0.3})`;
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        });
    },

    drawCrystallinePipes(time) {
        this.pipes.forEach(pipe => {
            this.drawPipeStructure(pipe, time);
            this.drawDataFlow(pipe, time);
        });
    },

    drawPipeStructure(pipe, time) {
        // Draw the crystalline pipe structure with volumetric glow
        const segments = pipe.segments;
        
        for (let i = 0; i < segments.length - 1; i++) {
            const current = segments[i];
            const next = segments[i + 1];
            
            // Depth-based scaling for pseudo-3D effect
            const depthScale = 1 + current.z * 0.01;
            const width = current.width * depthScale;
            
            // Crystalline structure with refraction effects
            const crystallineAlpha = this.settings.crystallineOpacity * current.opacity;
            
            // Outer glow layer
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${crystallineAlpha * 0.3})`;
            this.ctx.lineWidth = width + 4;
            this.ctx.lineCap = 'round';
            this.ctx.shadowColor = '#00d4ff';
            this.ctx.shadowBlur = 8 * this.settings.volumetricIntensity;
            
            this.ctx.beginPath();
            this.ctx.moveTo(current.x, current.y);
            this.ctx.lineTo(next.x, next.y);
            this.ctx.stroke();
            
            // Crystalline core
            this.ctx.shadowBlur = 0;
            this.ctx.strokeStyle = `rgba(150, 220, 255, ${crystallineAlpha * 0.8})`;
            this.ctx.lineWidth = width * 0.6;
            this.ctx.stroke();
            
            // Inner reflection
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${crystallineAlpha * 0.2})`;
            this.ctx.lineWidth = width * 0.2;
            this.ctx.stroke();
        }
    },

    drawDataFlow(pipe, time) {
        // Draw the flowing orange data streams inside pipes
        const segments = pipe.segments;
        const flowOffset = (time * this.settings.dataFlowSpeed * pipe.dataFlow) % 1;
        
        for (let i = 0; i < segments.length - 1; i++) {
            const current = segments[i];
            const next = segments[i + 1];
            const t = i / segments.length;
            
            // Flowing data stream calculation
            const flowPhase = (t + flowOffset) % 1;
            const flowIntensity = Math.sin(flowPhase * Math.PI * 4) * 0.5 + 0.5;
            const dataAlpha = current.dataIntensity * flowIntensity * 0.8;
            
            if (dataAlpha > 0.1) {
                const depthScale = 1 + current.z * 0.01;
                const flowWidth = current.width * 0.4 * depthScale;
                
                // High-energy orange data stream
                this.ctx.strokeStyle = `rgba(255, 140, 30, ${dataAlpha})`;
                this.ctx.lineWidth = flowWidth;
                this.ctx.lineCap = 'round';
                this.ctx.shadowColor = '#ff8c1e';
                this.ctx.shadowBlur = 6;
                
                this.ctx.beginPath();
                this.ctx.moveTo(current.x, current.y);
                this.ctx.lineTo(next.x, next.y);
                this.ctx.stroke();
                this.ctx.shadowBlur = 0;
            }
        }
    },

    updateAndDrawDataPackets(time) {
        this.dataPackets.forEach((packet, index) => {
            const pipe = this.pipes[packet.pipeId];
            if (!pipe) return;
            
            // Update packet position
            packet.position += packet.speed * 0.01;
            if (packet.position > 1) {
                packet.position = 0;
                packet.energy = Math.random(); // Refresh energy
            }
            
            // Calculate packet location along pipe
            const segmentIndex = Math.floor(packet.position * (pipe.segments.length - 1));
            const segmentT = (packet.position * (pipe.segments.length - 1)) % 1;
            
            if (segmentIndex < pipe.segments.length - 1) {
                const current = pipe.segments[segmentIndex];
                const next = pipe.segments[segmentIndex + 1];
                
                const x = current.x + (next.x - current.x) * segmentT;
                const y = current.y + (next.y - current.y) * segmentT;
                const z = current.z + (next.z - current.z) * segmentT;
                
                this.drawDataPacket(x, y, z, packet, time);
                this.drawPacketTrail(packet, pipe, time);
            }
        });
    },

    drawDataPacket(x, y, z, packet, time) {
        const depthScale = 1 + z * 0.01;
        const size = packet.size * depthScale;
        const pulse = 0.8 + 0.2 * Math.sin(time * 8 + packet.energy * Math.PI * 2);
        
        // Glowing data cube
        const alpha = packet.intensity * pulse;
        
        if (packet.type === 'priority') {
            // Priority packets: brilliant white-orange
            this.ctx.fillStyle = `rgba(255, 200, 100, ${alpha})`;
            this.ctx.shadowColor = '#ffcb64';
        } else {
            // Standard packets: pure orange energy
            this.ctx.fillStyle = `rgba(255, 140, 30, ${alpha})`;
            this.ctx.shadowColor = '#ff8c1e';
        }
        
        this.ctx.shadowBlur = 12;
        this.ctx.fillRect(x - size/2, y - size/2, size, size);
        this.ctx.shadowBlur = 0;
        
        // Central bright core
        this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        this.ctx.fillRect(x - size/4, y - size/4, size/2, size/2);
    },

    drawPacketTrail(packet, pipe, time) {
        // Draw energy trail behind data packets
        const trailSegments = 8;
        
        for (let i = 0; i < trailSegments; i++) {
            const trailT = packet.position - (i * packet.trailLength / trailSegments);
            if (trailT < 0) continue;
            
            const segmentIndex = Math.floor(trailT * (pipe.segments.length - 1));
            const segmentT = (trailT * (pipe.segments.length - 1)) % 1;
            
            if (segmentIndex >= 0 && segmentIndex < pipe.segments.length - 1) {
                const current = pipe.segments[segmentIndex];
                const next = pipe.segments[segmentIndex + 1];
                
                const x = current.x + (next.x - current.x) * segmentT;
                const y = current.y + (next.y - current.y) * segmentT;
                
                const trailAlpha = packet.intensity * (1 - i / trailSegments) * 0.3;
                const trailSize = packet.size * (1 - i / trailSegments) * 0.5;
                
                this.ctx.fillStyle = `rgba(255, 140, 30, ${trailAlpha})`;
                this.ctx.fillRect(x - trailSize/2, y - trailSize/2, trailSize, trailSize);
            }
        }
    },

    drawDataPorts(time) {
        this.dataPorts.forEach(port => {
            const activity = port.activity * (0.8 + 0.2 * Math.sin(time * 2));
            
            // Complex glowing data port
            this.ctx.shadowColor = '#00d4ff';
            this.ctx.shadowBlur = 20;
            this.ctx.fillStyle = `rgba(0, 212, 255, ${activity * 0.8})`;
            this.ctx.beginPath();
            this.ctx.arc(port.x, port.y, 12, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            
            // Central core
            this.ctx.fillStyle = `rgba(255, 255, 255, ${activity * 0.6})`;
            this.ctx.beginPath();
            this.ctx.arc(port.x, port.y, 6, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Activity rings
            for (let ring = 1; ring <= 3; ring++) {
                const ringAlpha = activity * (0.3 / ring);
                this.ctx.strokeStyle = `rgba(0, 212, 255, ${ringAlpha})`;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(port.x, port.y, 12 + ring * 8, 0, Math.PI * 2);
                this.ctx.stroke();
            }
        });
    },

    drawLightTendrils(time) {
        this.dataPorts.forEach(port => {
            port.tendrils.forEach(tendril => {
                tendril.phase += tendril.pulseSpeed;
                const pulse = 0.5 + 0.5 * Math.sin(tendril.phase);
                const alpha = tendril.intensity * pulse * port.activity * 0.4;
                
                if (alpha > 0.1) {
                    const endX = port.x + Math.cos(tendril.angle + time * 0.3) * tendril.length;
                    const endY = port.y + Math.sin(tendril.angle + time * 0.3) * tendril.length - 20;
                    
                    // Fine tendrils of light arcing upwards
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.shadowColor = '#00d4ff';
                    this.ctx.shadowBlur = 4;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(port.x, port.y);
                    
                    // Curved tendril with organic flow
                    const controlX = port.x + (endX - port.x) * 0.5;
                    const controlY = port.y - tendril.length * 0.7;
                    this.ctx.quadraticCurveTo(controlX, controlY, endX, endY);
                    
                    this.ctx.stroke();
                    this.ctx.shadowBlur = 0;
                }
            });
        });
    },

    drawVolumetricEffects(time) {
        // Add subtle volumetric lighting effects
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width * 0.5, this.canvas.height * 0.3, 0,
            this.canvas.width * 0.5, this.canvas.height * 0.3, this.canvas.width * 0.6
        );
        
        gradient.addColorStop(0, 'rgba(0, 50, 100, 0.05)');
        gradient.addColorStop(0.5, 'rgba(0, 30, 60, 0.02)');
        gradient.addColorStop(1, 'rgba(0, 10, 20, 0)');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },

    // Dynamic pipe growth system
    growPipe(fromPoint, toPoint) {
        // TODO: Implement procedural pipe growth for dynamic connections
        // This would allow pipes to grow and re-route based on system needs
    },

    // Data flow intensity based on system activity
    updateDataFlow(systemType, intensity) {
        this.dataPorts.forEach(port => {
            if (port.type === systemType) {
                port.activity = Math.min(1.0, intensity);
            }
        });
    }
};