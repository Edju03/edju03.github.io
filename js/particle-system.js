// Particle System Module
// Handles background particle effects and interactions

const ParticleSystem = {
    canvas: null,
    ctx: null,
    particles: [],
    mouseX: 0,
    mouseY: 0,

    init() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Create initial particles
        this.createParticles();
        
        // Start animation loop
        this.animate();
    },

    resizeCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    createParticles() {
        // Increased particle count for denser network (was /15000, now /8000)
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 8000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${190 + Math.random() * 20}, 100%, 50%)`
            });
        }
    },

    animate() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Mouse interaction - increased range
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {  // Increased mouse interaction range
                const force = (120 - distance) / 120;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }
            
            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            
            // Draw connections - balanced for performance and visibility
            if (!this.skipConnections) {
                // Check more particles but still optimized
                for (let j = index + 1; j < this.particles.length; j++) {
                    const otherParticle = this.particles[j];
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    
                    // Quick distance check before expensive sqrt - increased range
                    if (Math.abs(dx) > 100 || Math.abs(dy) > 100) continue;
                    
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {  // Increased from 80 to 100 for more connections
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = '#00d4ff';
                        this.ctx.globalAlpha = (100 - distance) / 100 * 0.25;  // Slightly brighter
                        this.ctx.stroke();
                    }
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    },

    updateMousePosition(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }
};

// Global mouse tracking
document.addEventListener('mousemove', (e) => {
    ParticleSystem.updateMousePosition(e.clientX, e.clientY);
}); 