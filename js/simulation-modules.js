// Holographic Robotics Simulation Modules
// Advanced 3D volumetric robotics theory visualizations + Classic fluid dynamics

// Original Robotic Arm Simulation
const RoboticArm = {
    canvas: null,
    ctx: null,
    armSegments: [],
    energyOrb: { x: 0, y: 0, brightness: 1, angle: 0 },

    init() {
        this.canvas = document.getElementById('robotic-arm-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.createArmSegments();
        this.animate();
    },

    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    },

    createArmSegments() {
        // Define 6-DOF robotic arm segments
        this.armSegments = [
            { length: 60, angle: 0, baseAngle: 0, speed: 0.8, x: 150, y: 350 }, // Base
            { length: 80, angle: -30, baseAngle: -30, speed: 1.2, x: 0, y: 0 }, // Shoulder
            { length: 70, angle: 45, baseAngle: 45, speed: 1.5, x: 0, y: 0 }, // Elbow
            { length: 50, angle: -20, baseAngle: -20, speed: 2.0, x: 0, y: 0 }, // Wrist 1
            { length: 30, angle: 10, baseAngle: 10, speed: 2.5, x: 0, y: 0 }, // Wrist 2
            { length: 25, angle: 0, baseAngle: 0, speed: 3.0, x: 0, y: 0 }  // End effector
        ];
    },

    animate() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const time = Date.now() * 0.001;
        
        // Update arm segment angles with smooth motion
        this.armSegments.forEach((segment, index) => {
            const baseMotion = Math.sin(time * segment.speed) * 15;
            segment.angle = segment.baseAngle + baseMotion;
        });
        
        // Calculate forward kinematics
        let currentX = this.armSegments[0].x;
        let currentY = this.armSegments[0].y;
        let cumulativeAngle = 0;
        
        for (let i = 0; i < this.armSegments.length; i++) {
            const segment = this.armSegments[i];
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
        
        // Update energy orb position
        const lastSegment = this.armSegments[this.armSegments.length - 1];
        this.energyOrb.x = lastSegment.endX;
        this.energyOrb.y = lastSegment.endY;
        this.energyOrb.brightness = 0.7 + 0.3 * Math.sin(time * 4);
        this.energyOrb.angle += 0.1;
        
        this.drawWireframe();
        this.drawKinematicData();
        this.drawEnergyOrb();
        
        requestAnimationFrame(() => this.animate());
    },

    drawWireframe() {
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        
        // Draw arm segments
        for (let i = 0; i < this.armSegments.length; i++) {
            const segment = this.armSegments[i];
            
            this.ctx.beginPath();
            this.ctx.moveTo(segment.x, segment.y);
            this.ctx.lineTo(segment.endX, segment.endY);
            this.ctx.stroke();
            
            // Draw joints
            this.ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
            this.ctx.beginPath();
            this.ctx.arc(segment.x, segment.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw joint frame (coordinate system)
            if (i < 3) {
                const angle = this.armSegments.slice(0, i + 1).reduce((sum, seg) => sum + seg.angle, 0) * Math.PI / 180;
                this.drawCoordinateFrame(segment.x, segment.y, angle, 15);
            }
        }
        
        // Draw base platform
        this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
        this.ctx.beginPath();
        this.ctx.arc(this.armSegments[0].x, this.armSegments[0].y, 20, 0, Math.PI * 2);
        this.ctx.stroke();
    },

    drawCoordinateFrame(x, y, angle, size) {
        this.ctx.lineWidth = 1.5;
        
        // X-axis (red)
        this.ctx.strokeStyle = 'rgba(255, 107, 53, 0.7)';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        this.ctx.stroke();
        
        // Y-axis (green)
        this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.7)';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + Math.cos(angle + Math.PI/2) * size, y + Math.sin(angle + Math.PI/2) * size);
        this.ctx.stroke();
    },

    drawKinematicData() {
        // Draw measurement arcs at key joints
        this.armSegments.forEach((segment, index) => {
            if (index < 3) {
                const startAngle = index === 0 ? 0 : this.armSegments.slice(0, index).reduce((sum, seg) => sum + seg.angle, 0) * Math.PI / 180;
                const endAngle = startAngle + segment.angle * Math.PI / 180;
                
                this.ctx.strokeStyle = 'rgba(255, 107, 53, 0.5)';
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.arc(segment.x, segment.y, 25 + index * 5, startAngle, endAngle);
                this.ctx.stroke();
                
                // Add angle text
                const midAngle = (startAngle + endAngle) / 2;
                const textX = segment.x + Math.cos(midAngle) * (30 + index * 5);
                const textY = segment.y + Math.sin(midAngle) * (30 + index * 5);
                
                this.ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
                this.ctx.font = '10px Orbitron';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(`${segment.angle.toFixed(1)}°`, textX, textY);
            }
        });
    },

    drawEnergyOrb() {
        const orbSize = 8 + 3 * Math.sin(Date.now() * 0.008);
        
        // Main orb
        this.ctx.fillStyle = `rgba(255, 107, 53, ${this.energyOrb.brightness})`;
        this.ctx.beginPath();
        this.ctx.arc(this.energyOrb.x, this.energyOrb.y, orbSize, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Glow effect
        this.ctx.shadowColor = '#ff6b35';
        this.ctx.shadowBlur = 15;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        
        // Energy particles around orb
        for (let i = 0; i < 6; i++) {
            const particleAngle = this.energyOrb.angle + (i * Math.PI * 2 / 6);
            const particleRadius = 15 + 5 * Math.sin(Date.now() * 0.01 + i);
            const particleX = this.energyOrb.x + Math.cos(particleAngle) * particleRadius;
            const particleY = this.energyOrb.y + Math.sin(particleAngle) * particleRadius;
            
            this.ctx.fillStyle = 'rgba(0, 212, 255, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(particleX, particleY, 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
};

// Original CFD Simulation (Navier-Stokes)
const CFDSimulation = {
    canvas: null,
    ctx: null,
    streamlines: [],
    vortices: [],
    flowField: [],

    init() {
        this.canvas = document.getElementById('cfd-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.createFlowField();
        this.createStreamlines();
        this.createVortices();
        this.animate();
    },

    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    },

    createFlowField() {
        this.flowField = [];
        const gridSize = 20;
        
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            for (let y = 0; y < this.canvas.height; y += gridSize) {
                const centerX = this.canvas.width * 0.3;
                const centerY = this.canvas.height * 0.6;
                
                const dx = x - centerX;
                const dy = y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Create swirling flow around the workspace
                const angle = Math.atan2(dy, dx) + Math.sin(distance * 0.02) * 0.5;
                const speed = Math.max(0.1, 2 - distance * 0.01);
                
                this.flowField.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    pressure: Math.sin(distance * 0.05) * 0.5 + 0.5
                });
            }
        }
    },

    createStreamlines() {
        this.streamlines = [];
        
        for (let i = 0; i < 25; i++) {
            const startX = Math.random() * this.canvas.width;
            const startY = Math.random() * this.canvas.height;
            
            this.streamlines.push({
                points: [{x: startX, y: startY}],
                maxLength: 80,
                age: 0,
                color: `hsl(${180 + Math.random() * 40}, 70%, 60%)`,
                opacity: 0.6 + Math.random() * 0.4
            });
        }
    },

    createVortices() {
        this.vortices = [];
        
        for (let i = 0; i < 4; i++) {
            this.vortices.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 20 + Math.random() * 30,
                strength: (Math.random() - 0.5) * 0.02,
                age: 0,
                maxAge: 300 + Math.random() * 200
            });
        }
    },

    animate() {
        if (!this.ctx) return;
        
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.001;
        
        // Update and draw streamlines
        this.streamlines.forEach((streamline, index) => {
            const currentPoint = streamline.points[streamline.points.length - 1];
            
            // Calculate flow velocity at current position
            let vx = 0, vy = 0;
            
            // Sample from flow field
            const gridX = Math.floor(currentPoint.x / 20) * 20;
            const gridY = Math.floor(currentPoint.y / 20) * 20;
            
            const fieldPoint = this.flowField.find(p => p.x === gridX && p.y === gridY);
            if (fieldPoint) {
                vx += fieldPoint.vx;
                vy += fieldPoint.vy;
            }
            
            // Add vortex influences
            this.vortices.forEach(vortex => {
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
            if (newX > 0 && newX < this.canvas.width && newY > 0 && newY < this.canvas.height) {
                streamline.points.push({x: newX, y: newY});
            } else {
                streamline.points = [{
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height
                }];
            }
            
            // Limit streamline length
            if (streamline.points.length > streamline.maxLength) {
                streamline.points.shift();
            }
            
            // Draw streamline
            if (streamline.points.length > 1) {
                this.ctx.strokeStyle = streamline.color.replace('60%', `${streamline.opacity * 60}%`);
                this.ctx.lineWidth = 1.5;
                this.ctx.lineCap = 'round';
                
                this.ctx.beginPath();
                this.ctx.moveTo(streamline.points[0].x, streamline.points[0].y);
                
                for (let i = 1; i < streamline.points.length; i++) {
                    const alpha = i / streamline.points.length;
                    this.ctx.globalAlpha = alpha * streamline.opacity;
                    this.ctx.lineTo(streamline.points[i].x, streamline.points[i].y);
                }
                
                this.ctx.stroke();
                this.ctx.globalAlpha = 1;
            }
        });
        
        // Update and draw vortices
        this.vortices.forEach((vortex, index) => {
            vortex.age++;
            
            // Move vortices slowly
            vortex.x += Math.sin(time * 0.5 + index) * 0.3;
            vortex.y += Math.cos(time * 0.3 + index) * 0.2;
            
            // Draw vortex as spiral
            const spiralTurns = 3;
            const maxRadius = vortex.radius;
            
            this.ctx.strokeStyle = `rgba(0, 212, 255, 0.4)`;
            this.ctx.lineWidth = 2;
            
            this.ctx.beginPath();
            for (let angle = 0; angle < spiralTurns * Math.PI * 2; angle += 0.2) {
                const radius = (angle / (spiralTurns * Math.PI * 2)) * maxRadius;
                const x = vortex.x + Math.cos(angle + time * vortex.strength * 10) * radius;
                const y = vortex.y + Math.sin(angle + time * vortex.strength * 10) * radius;
                
                if (angle === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
            
            // Regenerate vortex if too old
            if (vortex.age > vortex.maxAge) {
                vortex.x = Math.random() * this.canvas.width;
                vortex.y = Math.random() * this.canvas.height;
                vortex.age = 0;
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
};

// Original Thruster Simulation
const ThrusterSimulation = {
    canvas: null,
    ctx: null,
    shockDiamonds: [],
    exhaustParticles: [],
    pressureWaves: [],

    init() {
        this.canvas = document.getElementById('thruster-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.createShockDiamonds();
        this.createExhaustParticles();
        this.createPressureWaves();
        this.animate();
    },

    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    },

    createShockDiamonds() {
        this.shockDiamonds = [];
        
        for (let i = 0; i < 6; i++) {
            this.shockDiamonds.push({
                x: 30 + i * 25,
                y: this.canvas.height * 0.5,
                width: 20 - i * 2,
                height: 15 - i * 1.5,
                phase: i * Math.PI / 3,
                intensity: 0.8 - i * 0.1
            });
        }
    },

    createExhaustParticles() {
        this.exhaustParticles = [];
        
        for (let i = 0; i < 60; i++) {
            this.exhaustParticles.push({
                x: 10 + Math.random() * 20,
                y: this.canvas.height * 0.5 + (Math.random() - 0.5) * 20,
                vx: 2 + Math.random() * 3,
                vy: (Math.random() - 0.5) * 0.5,
                size: 1 + Math.random() * 2,
                temperature: 0.7 + Math.random() * 0.3,
                life: 1
            });
        }
    },

    createPressureWaves() {
        this.pressureWaves = [];
        
        for (let i = 0; i < 4; i++) {
            this.pressureWaves.push({
                x: 20,
                y: this.canvas.height * 0.5,
                radius: 20 + i * 15,
                maxRadius: 80,
                speed: 0.8 + i * 0.2,
                intensity: 0.6 - i * 0.1
            });
        }
    },

    animate() {
        if (!this.ctx) return;
        
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.001;
        
        // Draw shock diamonds
        this.shockDiamonds.forEach((diamond, index) => {
            const oscillation = Math.sin(time * 3 + diamond.phase) * 0.3;
            
            this.ctx.strokeStyle = `rgba(255, 107, 53, ${diamond.intensity + oscillation})`;
            this.ctx.lineWidth = 2;
            
            // Draw diamond shape
            this.ctx.beginPath();
            this.ctx.moveTo(diamond.x - diamond.width/2, diamond.y);
            this.ctx.lineTo(diamond.x, diamond.y - diamond.height/2);
            this.ctx.lineTo(diamond.x + diamond.width/2, diamond.y);
            this.ctx.lineTo(diamond.x, diamond.y + diamond.height/2);
            this.ctx.closePath();
            this.ctx.stroke();
            
            // Add glow effect
            this.ctx.shadowColor = '#ff6b35';
            this.ctx.shadowBlur = 8;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        });
        
        // Update and draw exhaust particles
        this.exhaustParticles.forEach((particle, index) => {
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
            
            this.ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${particle.life})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Reset particle if dead or out of bounds
            if (particle.life <= 0 || particle.x > this.canvas.width) {
                particle.x = 10 + Math.random() * 20;
                particle.y = this.canvas.height * 0.5 + (Math.random() - 0.5) * 20;
                particle.vx = 2 + Math.random() * 3;
                particle.vy = (Math.random() - 0.5) * 0.5;
                particle.size = 1 + Math.random() * 2;
                particle.temperature = 0.7 + Math.random() * 0.3;
                particle.life = 1;
            }
        });
        
        // Update and draw pressure waves
        this.pressureWaves.forEach((wave, index) => {
            wave.radius += wave.speed;
            
            if (wave.radius > wave.maxRadius) {
                wave.radius = 20;
            }
            
            this.ctx.strokeStyle = `rgba(0, 212, 255, ${wave.intensity * (1 - wave.radius / wave.maxRadius)})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
            this.ctx.stroke();
        });
        
        // Draw velocity vectors
        for (let i = 0; i < 8; i++) {
            const x = 40 + i * 20;
            const y = this.canvas.height * 0.5 + Math.sin(time * 2 + i * 0.5) * 10;
            const length = 15 + Math.sin(time * 3 + i) * 5;
            
            this.ctx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
            this.ctx.lineWidth = 1.5;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x + length, y);
            
            // Arrowhead
            this.ctx.lineTo(x + length - 3, y - 2);
            this.ctx.moveTo(x + length, y);
            this.ctx.lineTo(x + length - 3, y + 2);
            this.ctx.stroke();
        }
        
        requestAnimationFrame(() => this.animate());
    }
};

// New Holographic Robotics Visualizations
const RRTVisualization = {
    canvas: null,
    ctx: null,
    tree: { nodes: [], edges: [] },
    optimalPath: [],
    growthRate: 0.02,
    
    init() {
        // RRT visualization is now part of the existing CFD simulation
        return;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.generateRRT();
        this.animate();
    },
    
    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    },
    
    generateRRT() {
        // Create rapidly-exploring random tree
        this.tree.nodes = [{ x: 50, y: this.canvas.height - 50, parent: -1 }];
        this.tree.edges = [];
        
        const targetX = this.canvas.width - 50;
        const targetY = 50;
        
        for (let i = 0; i < 150; i++) {
            const randomX = Math.random() * this.canvas.width;
            const randomY = Math.random() * this.canvas.height;
            
            // Find nearest node
            let nearestIdx = 0;
            let nearestDist = Infinity;
            
            this.tree.nodes.forEach((node, idx) => {
                const dist = Math.sqrt((node.x - randomX) ** 2 + (node.y - randomY) ** 2);
                if (dist < nearestDist) {
                    nearestDist = dist;
                    nearestIdx = idx;
                }
            });
            
            const nearest = this.tree.nodes[nearestIdx];
            const stepSize = 30;
            const angle = Math.atan2(randomY - nearest.y, randomX - nearest.x);
            
            const newNode = {
                x: nearest.x + Math.cos(angle) * stepSize,
                y: nearest.y + Math.sin(angle) * stepSize,
                parent: nearestIdx
            };
            
            this.tree.nodes.push(newNode);
            this.tree.edges.push({ from: nearestIdx, to: this.tree.nodes.length - 1 });
        }
        
        // Find path to target
        this.findOptimalPath(targetX, targetY);
    },
    
    findOptimalPath(targetX, targetY) {
        let closestIdx = 0;
        let closestDist = Infinity;
        
        this.tree.nodes.forEach((node, idx) => {
            const dist = Math.sqrt((node.x - targetX) ** 2 + (node.y - targetY) ** 2);
            if (dist < closestDist) {
                closestDist = dist;
                closestIdx = idx;
            }
        });
        
        // Trace back path
        this.optimalPath = [];
        let currentIdx = closestIdx;
        while (currentIdx !== -1) {
            this.optimalPath.unshift(this.tree.nodes[currentIdx]);
            currentIdx = this.tree.nodes[currentIdx].parent;
        }
    },
    
    animate() {
        if (!this.ctx) return;
        
        const time = Date.now() * 0.001;
        
        // Clear with deep void
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw tree edges with faint cyan
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
        this.ctx.lineWidth = 1;
        this.tree.edges.forEach(edge => {
            const from = this.tree.nodes[edge.from];
            const to = this.tree.nodes[edge.to];
            
            this.ctx.beginPath();
            this.ctx.moveTo(from.x, from.y);
            this.ctx.lineTo(to.x, to.y);
            this.ctx.stroke();
        });
        
        // Draw optimal path with brilliant green
        if (this.optimalPath.length > 1) {
            this.ctx.strokeStyle = 'rgba(0, 255, 0, 0.9)';
            this.ctx.lineWidth = 3;
            this.ctx.shadowColor = '#00ff00';
            this.ctx.shadowBlur = 10;
            
            this.ctx.beginPath();
            this.ctx.moveTo(this.optimalPath[0].x, this.optimalPath[0].y);
            for (let i = 1; i < this.optimalPath.length; i++) {
                this.ctx.lineTo(this.optimalPath[i].x, this.optimalPath[i].y);
            }
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }
        
        // Draw nodes
        this.tree.nodes.forEach(node => {
            this.ctx.fillStyle = 'rgba(0, 255, 255, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
};

const StateEstimationEllipsoid = {
    canvas: null,
    ctx: null,
    ellipsoid: { x: 0, y: 0, a: 100, b: 60, angle: 0 },
    confidence: 0.5,
    
    init() {
        // State estimation is now part of the existing thruster simulation
        return;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.ellipsoid.x = this.canvas.width / 2;
        this.ellipsoid.y = this.canvas.height / 2;
        this.animate();
    },
    
    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    },
    
    animate() {
        if (!this.ctx) return;
        
        const time = Date.now() * 0.001;
        
        // Clear with deep void
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update ellipsoid (shrinking over time to show increasing certainty)
        this.confidence += 0.005;
        this.ellipsoid.a = Math.max(20, 100 - this.confidence * 50);
        this.ellipsoid.b = Math.max(15, 60 - this.confidence * 30);
        this.ellipsoid.angle += 0.01;
        
        if (this.confidence > 2) this.confidence = 0; // Reset
        
        // Draw covariance ellipsoid
        this.ctx.save();
        this.ctx.translate(this.ellipsoid.x, this.ellipsoid.y);
        this.ctx.rotate(this.ellipsoid.angle);
        
        // Luminous ellipsoid
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.8)';
        this.ctx.lineWidth = 2;
        this.ctx.shadowColor = '#00ffff';
        this.ctx.shadowBlur = 15;
        
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, this.ellipsoid.a, this.ellipsoid.b, 0, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Inner glow
        this.ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
        this.ctx.fill();
        
        this.ctx.restore();
        this.ctx.shadowBlur = 0;
        
        // Draw Kalman filter equation
        this.ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
        this.ctx.font = '14px Orbitron, monospace';
        this.ctx.fillText('Pₖ = (I - KₖHₖ)Pₖ⁻', 20, this.canvas.height - 20);
        
        requestAnimationFrame(() => this.animate());
    }
};

const ControlBarrierFunction = {
    canvas: null,
    ctx: null,
    barriers: [],
    agent: { x: 0, y: 0, vx: 2, vy: 1 },
    
    init() {
        // CBF visualization is now part of the existing robotic arm simulation
        return;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.initializeBarriers();
        this.agent.x = 50;
        this.agent.y = this.canvas.height / 2;
        this.animate();
    },
    
    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    },
    
    initializeBarriers() {
        this.barriers = [
            { x: this.canvas.width * 0.3, y: this.canvas.height * 0.4, radius: 40 },
            { x: this.canvas.width * 0.6, y: this.canvas.height * 0.7, radius: 35 },
            { x: this.canvas.width * 0.8, y: this.canvas.height * 0.3, radius: 45 }
        ];
    },
    
    animate() {
        if (!this.ctx) return;
        
        const time = Date.now() * 0.001;
        
        // Clear with deep void
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update agent position
        this.agent.x += this.agent.vx;
        this.agent.y += this.agent.vy;
        
        // Wrap around
        if (this.agent.x > this.canvas.width) this.agent.x = 0;
        if (this.agent.y > this.canvas.height) this.agent.y = 0;
        if (this.agent.y < 0) this.agent.y = this.canvas.height;
        
        // Draw control barrier functions
        this.barriers.forEach(barrier => {
            const dist = Math.sqrt((this.agent.x - barrier.x) ** 2 + (this.agent.y - barrier.y) ** 2);
            const isNear = dist < barrier.radius + 50;
            
            // Energy shield intensity based on proximity
            const intensity = isNear ? Math.max(0.3, 1 - (dist - barrier.radius) / 50) : 0.1;
            
            // Translucent energy shield
            this.ctx.strokeStyle = `rgba(255, 100, 0, ${intensity})`;
            this.ctx.lineWidth = isNear ? 3 : 1;
            this.ctx.shadowColor = '#ff6400';
            this.ctx.shadowBlur = isNear ? 20 : 5;
            
            this.ctx.beginPath();
            this.ctx.arc(barrier.x, barrier.y, barrier.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Pulsing energy field
            if (isNear) {
                this.ctx.fillStyle = `rgba(255, 100, 0, ${intensity * 0.2})`;
                this.ctx.fill();
            }
        });
        
        this.ctx.shadowBlur = 0;
        
        // Draw agent
        this.ctx.fillStyle = 'rgba(0, 255, 255, 0.9)';
        this.ctx.shadowColor = '#00ffff';
        this.ctx.shadowBlur = 10;
        this.ctx.beginPath();
        this.ctx.arc(this.agent.x, this.agent.y, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
        
        // Draw CBF equation
        this.ctx.fillStyle = 'rgba(255, 100, 0, 0.7)';
        this.ctx.font = '12px Orbitron, monospace';
        this.ctx.fillText('ḣ(x) ≥ -α(h(x))', 20, this.canvas.height - 20);
        
        requestAnimationFrame(() => this.animate());
    }
};

const CodeRain = {
    canvas: null,
    ctx: null,
    streams: [],
    
    init() {
        this.canvas = document.getElementById('code-rain-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.initializeStreams();
        this.animate();
    },
    
    resizeCanvas() {
        if (!this.canvas) return;
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    },
    
    initializeStreams() {
        this.streams = [];
        const streamCount = Math.floor(this.canvas.width / 20);
        
        for (let i = 0; i < streamCount; i++) {
            this.streams.push({
                x: i * 20,
                y: Math.random() * this.canvas.height,
                speed: 2 + Math.random() * 3,
                chars: []
            });
        }
    },
    
    animate() {
        if (!this.ctx) return;
        
        // Clear with fade
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.streams.forEach(stream => {
            stream.y += stream.speed;
            
            if (stream.y > this.canvas.height) {
                stream.y = -20;
            }
            
            // Draw character
            this.ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
            this.ctx.font = '14px monospace';
            const char = String.fromCharCode(0x30A0 + Math.random() * 96);
            this.ctx.fillText(char, stream.x, stream.y);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}; 