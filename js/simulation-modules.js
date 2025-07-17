// Holographic Robotics Simulation Modules
// Advanced 3D volumetric robotics theory visualizations

const RRTVisualization = {
    canvas: null,
    ctx: null,
    tree: { nodes: [], edges: [] },
    optimalPath: [],
    growthRate: 0.02,
    
    init() {
        this.canvas = document.getElementById('cfd-canvas');
        if (!this.canvas) return;
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
        this.canvas = document.getElementById('thruster-canvas');
        if (!this.canvas) return;
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
        this.canvas = document.getElementById('robotic-arm-canvas');
        if (!this.canvas) return;
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