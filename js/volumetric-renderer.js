// Volumetric Rendering Engine
// Advanced visual effects for the holographic data conduit system

const VolumetricRenderer = {
    canvas: null,
    ctx: null,
    
    // Advanced rendering techniques
    effects: {
        atmosphericScattering: true,
        volumetricLighting: true,
        refractionMapping: true,
        subsurfaceScattering: true,
        chromaticAberration: true
    },

    init() {
        console.log('Initializing Volumetric Rendering Engine...');
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'volumetric-effects-canvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '2';
        this.canvas.style.mixBlendMode = 'screen';
        this.canvas.style.opacity = '0.6';
        
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.animate();
        console.log('Volumetric Renderer: Online');
    },

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    animate() {
        if (!this.ctx) return;
        
        const time = Date.now() * 0.001;
        
        // Clear with subtle base
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Render volumetric effects
        this.renderAtmosphericScattering(time);
        this.renderVolumetricLighting(time);
        this.renderDataFieldDistortion(time);
        this.renderChromaticEffects(time);
        
        requestAnimationFrame(() => this.animate());
    },

    renderAtmosphericScattering(time) {
        // Simulate light scattering through the holographic medium
        const scatterPoints = 15;
        
        for (let i = 0; i < scatterPoints; i++) {
            const x = (i / scatterPoints) * this.canvas.width;
            const y = this.canvas.height * 0.4 + Math.sin(time * 0.5 + i) * 30;
            
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 120);
            gradient.addColorStop(0, 'rgba(0, 150, 255, 0.08)');
            gradient.addColorStop(0.3, 'rgba(0, 100, 200, 0.04)');
            gradient.addColorStop(1, 'rgba(0, 50, 100, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x - 120, y - 120, 240, 240);
        }
    },

    renderVolumetricLighting(time) {
        // God rays and volumetric light shafts
        const rayCount = 8;
        const centerX = this.canvas.width * 0.5;
        const centerY = this.canvas.height * 0.2;
        
        for (let i = 0; i < rayCount; i++) {
            const angle = (i / rayCount) * Math.PI * 2 + time * 0.1;
            const length = 200 + Math.sin(time + i) * 50;
            
            const gradient = this.ctx.createLinearGradient(
                centerX, centerY,
                centerX + Math.cos(angle) * length,
                centerY + Math.sin(angle) * length
            );
            
            gradient.addColorStop(0, 'rgba(0, 200, 255, 0.15)');
            gradient.addColorStop(0.3, 'rgba(0, 150, 255, 0.08)');
            gradient.addColorStop(1, 'rgba(0, 100, 200, 0)');
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 3;
            this.ctx.shadowColor = '#00c8ff';
            this.ctx.shadowBlur = 15;
            
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(
                centerX + Math.cos(angle) * length,
                centerY + Math.sin(angle) * length
            );
            this.ctx.stroke();
        }
        this.ctx.shadowBlur = 0;
    },

    renderDataFieldDistortion(time) {
        // Simulate electromagnetic field distortions from data flow
        const fieldPoints = 12;
        
        for (let i = 0; i < fieldPoints; i++) {
            const x = Math.sin(time * 0.3 + i) * this.canvas.width * 0.3 + this.canvas.width * 0.5;
            const y = Math.cos(time * 0.2 + i * 2) * this.canvas.height * 0.2 + this.canvas.height * 0.6;
            
            const distortionRadius = 40 + Math.sin(time * 2 + i) * 20;
            const intensity = 0.3 + Math.sin(time + i) * 0.2;
            
            // Electromagnetic distortion effect
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, distortionRadius);
            gradient.addColorStop(0, `rgba(255, 150, 50, ${intensity * 0.1})`);
            gradient.addColorStop(0.5, `rgba(200, 100, 0, ${intensity * 0.05})`);
            gradient.addColorStop(1, 'rgba(100, 50, 0, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x - distortionRadius, y - distortionRadius, 
                            distortionRadius * 2, distortionRadius * 2);
        }
    },

    renderChromaticEffects(time) {
        // Subtle chromatic aberration and prismatic effects
        const aberrationPoints = 6;
        
        for (let i = 0; i < aberrationPoints; i++) {
            const x = (i / aberrationPoints) * this.canvas.width + Math.sin(time + i) * 30;
            const y = this.canvas.height * 0.7 + Math.cos(time * 0.7 + i) * 20;
            
            // Red channel offset
            this.ctx.fillStyle = 'rgba(255, 0, 100, 0.02)';
            this.ctx.fillRect(x - 1, y - 1, 20, 20);
            
            // Green channel
            this.ctx.fillStyle = 'rgba(0, 255, 150, 0.02)';
            this.ctx.fillRect(x, y, 20, 20);
            
            // Blue channel offset
            this.ctx.fillStyle = 'rgba(100, 150, 255, 0.02)';
            this.ctx.fillRect(x + 1, y + 1, 20, 20);
        }
    },

    // Advanced lighting calculation for realistic volumetric effects
    calculateVolumetricLighting(sourceX, sourceY, targetX, targetY, intensity) {
        const distance = Math.sqrt((targetX - sourceX) ** 2 + (targetY - sourceY) ** 2);
        const falloff = Math.max(0, 1 - distance / 300);
        return intensity * falloff * falloff; // Quadratic falloff for realism
    },

    // Particle system for floating holographic elements
    renderHolographicParticles(time) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const x = Math.sin(time * 0.1 + i) * this.canvas.width * 0.4 + this.canvas.width * 0.5;
            const y = Math.cos(time * 0.15 + i * 2) * this.canvas.height * 0.3 + this.canvas.height * 0.4;
            const z = Math.sin(time * 0.2 + i) * 50;
            
            const size = 2 + z * 0.05;
            const alpha = 0.3 + Math.sin(time * 3 + i) * 0.2;
            
            this.ctx.fillStyle = `rgba(0, 255, 200, ${alpha})`;
            this.ctx.shadowColor = '#00ffc8';
            this.ctx.shadowBlur = 8;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.shadowBlur = 0;
    }
};