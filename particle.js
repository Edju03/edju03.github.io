// particles.js
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = {
            x: null,
            y: null,
            radius: 150
        };
        
        this.init();
        this.setupEventListeners();
    }

    init() {
        // Set canvas size
        this.handleResize();
        
        // Create particles
        const numberOfParticles = (this.canvas.width * this.canvas.height) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * (this.canvas.width - size * 2);
            const y = Math.random() * (this.canvas.height - size * 2);
            const directionX = Math.random() * 2 - 1;
            const directionY = Math.random() * 2 - 1;
            
            this.particles.push(new Particle(this, x, y, directionX, directionY, size));
        }
    }

    handleResize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        window.addEventListener('resize', this.handleResize);
        
        this.canvas.addEventListener('mousemove', (event) => {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].draw();
        }
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

class Particle {
    constructor(system, x, y, directionX, directionY, size) {
        this.system = system;
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.density = Math.random() * 30 + 1;
    }

    draw() {
        this.system.ctx.beginPath();
        this.system.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.system.ctx.fillStyle = 'rgba(158, 202, 186, 0.8)';
        this.system.ctx.closePath();
        this.system.ctx.fill();
    }

    update() {
        if (this.system.mouse.x != null && this.system.mouse.y != null) {
            let dx = this.system.mouse.x - this.x;
            let dy = this.system.mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.system.mouse.radius) {
                const force = (this.system.mouse.radius - distance) / this.system.mouse.radius;
                const directionX = dx / distance;
                const directionY = dy / distance;
                this.x -= directionX * force * this.density;
                this.y -= directionY * force * this.density;
            }
        }

        // Return to original position
        if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx/20;
        }
        if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy/20;
        }
    }
}

// Initialize the particle system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const particleSystem = new ParticleSystem(canvas);
        particleSystem.animate();
    }
});
