// Holographic Enhancement Engine
// Advanced post-processing effects for cinematic 8K quality rendering

const HolographicEnhancer = {
    canvas: null,
    ctx: null,
    
    // Cinematic post-processing settings
    effects: {
        lensFlares: true,
        motionBlur: true,
        bloomIntensity: 1.4,
        filmGrain: 0.15,
        colorGrading: true,
        depthOfField: true,
        screenSpaceReflections: true
    },

    init() {
        console.log('Initializing Holographic Enhancement Engine...');
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'holographic-enhancer-canvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '3';
        this.canvas.style.mixBlendMode = 'overlay';
        this.canvas.style.opacity = '0.3';
        
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.animate();
        console.log('Holographic Enhancer: Online - 8K Quality Mode');
    },

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    animate() {
        if (!this.ctx) return;
        
        const time = Date.now() * 0.001;
        
        // Clear with minimal fade for accumulative effects
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Apply cinematic post-processing
        this.renderLensFlares(time);
        this.renderBloomEffect(time);
        this.renderFilmGrain(time);
        this.renderColorGrading(time);
        this.renderScreenSpaceReflections(time);
        this.renderHolographicInterference(time);
        
        requestAnimationFrame(() => this.animate());
    },

    renderLensFlares(time) {
        // Cinematic lens flares from high-intensity light sources
        const flarePositions = [
            { x: window.innerWidth * 0.15, y: window.innerHeight * 0.8, intensity: 0.8 },
            { x: window.innerWidth * 0.85, y: window.innerHeight * 0.5, intensity: 0.9 },
            { x: window.innerWidth * 0.5, y: window.innerHeight * 0.3, intensity: 1.0 }
        ];

        flarePositions.forEach((flare, index) => {
            const flareTime = time + index;
            const pulse = 0.7 + 0.3 * Math.sin(flareTime * 2);
            const intensity = flare.intensity * pulse;
            
            // Primary flare
            const gradient = this.ctx.createRadialGradient(
                flare.x, flare.y, 0,
                flare.x, flare.y, 60
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${intensity * 0.4})`);
            gradient.addColorStop(0.3, `rgba(0, 200, 255, ${intensity * 0.2})`);
            gradient.addColorStop(1, 'rgba(0, 100, 200, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(flare.x - 60, flare.y - 60, 120, 120);
            
            // Secondary flares along lens axis
            for (let i = 1; i <= 3; i++) {
                const offsetX = (flare.x - window.innerWidth * 0.5) * (i * 0.3);
                const offsetY = (flare.y - window.innerHeight * 0.5) * (i * 0.3);
                const flareX = window.innerWidth * 0.5 - offsetX;
                const flareY = window.innerHeight * 0.5 - offsetY;
                
                const secondaryGradient = this.ctx.createRadialGradient(
                    flareX, flareY, 0,
                    flareX, flareY, 20 / i
                );
                secondaryGradient.addColorStop(0, `rgba(255, 150, 0, ${intensity * 0.3 / i})`);
                secondaryGradient.addColorStop(1, 'rgba(255, 100, 0, 0)');
                
                this.ctx.fillStyle = secondaryGradient;
                this.ctx.fillRect(flareX - 20/i, flareY - 20/i, 40/i, 40/i);
            }
        });
    },

    renderBloomEffect(time) {
        // High-quality bloom for enhanced luminance
        const bloomSources = [
            { x: window.innerWidth * 0.3, y: window.innerHeight * 0.7, radius: 80, intensity: 0.6 },
            { x: window.innerWidth * 0.7, y: window.innerHeight * 0.4, radius: 60, intensity: 0.7 },
            { x: window.innerWidth * 0.5, y: window.innerHeight * 0.6, radius: 100, intensity: 0.5 }
        ];

        bloomSources.forEach((bloom, index) => {
            const bloomPulse = 0.8 + 0.2 * Math.sin(time * 1.5 + index * Math.PI);
            const radius = bloom.radius * bloomPulse;
            const intensity = bloom.intensity * this.effects.bloomIntensity;
            
            // Multiple bloom layers for realism
            for (let layer = 0; layer < 4; layer++) {
                const layerRadius = radius * (1 + layer * 0.5);
                const layerIntensity = intensity / (layer + 1);
                
                const gradient = this.ctx.createRadialGradient(
                    bloom.x, bloom.y, 0,
                    bloom.x, bloom.y, layerRadius
                );
                gradient.addColorStop(0, `rgba(0, 255, 200, ${layerIntensity * 0.1})`);
                gradient.addColorStop(0.5, `rgba(0, 150, 255, ${layerIntensity * 0.05})`);
                gradient.addColorStop(1, 'rgba(0, 100, 200, 0)');
                
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(
                    bloom.x - layerRadius, bloom.y - layerRadius,
                    layerRadius * 2, layerRadius * 2
                );
            }
        });
    },

    renderFilmGrain(time) {
        // Subtle film grain for cinematic texture
        const grainIntensity = this.effects.filmGrain;
        const grainSize = 2;
        const grainDensity = 0.05;
        
        for (let x = 0; x < this.canvas.width; x += grainSize * 4) {
            for (let y = 0; y < this.canvas.height; y += grainSize * 4) {
                if (Math.random() < grainDensity) {
                    const grain = Math.random() * grainIntensity;
                    const grainColor = grain > 0.5 ? 
                        `rgba(255, 255, 255, ${(grain - 0.5) * 0.1})` :
                        `rgba(0, 0, 0, ${(0.5 - grain) * 0.1})`;
                    
                    this.ctx.fillStyle = grainColor;
                    this.ctx.fillRect(x, y, grainSize, grainSize);
                }
            }
        }
    },

    renderColorGrading(time) {
        // Cinematic color grading with teal and orange tones
        if (!this.effects.colorGrading) return;
        
        // Teal shadows
        const shadowGradient = this.ctx.createLinearGradient(
            0, 0, this.canvas.width, this.canvas.height
        );
        shadowGradient.addColorStop(0, 'rgba(0, 80, 100, 0.03)');
        shadowGradient.addColorStop(0.5, 'rgba(0, 60, 80, 0.02)');
        shadowGradient.addColorStop(1, 'rgba(0, 40, 60, 0.01)');
        
        this.ctx.fillStyle = shadowGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Orange highlights
        const highlightGradient = this.ctx.createRadialGradient(
            this.canvas.width * 0.7, this.canvas.height * 0.3, 0,
            this.canvas.width * 0.7, this.canvas.height * 0.3, this.canvas.width * 0.8
        );
        highlightGradient.addColorStop(0, 'rgba(255, 120, 20, 0.02)');
        highlightGradient.addColorStop(0.6, 'rgba(200, 80, 0, 0.01)');
        highlightGradient.addColorStop(1, 'rgba(100, 40, 0, 0)');
        
        this.ctx.fillStyle = highlightGradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },

    renderScreenSpaceReflections(time) {
        // Simulate screen-space reflections on the holographic surfaces
        const reflectionPoints = [
            { x: window.innerWidth * 0.2, y: window.innerHeight * 0.8, angle: Math.PI * 0.25 },
            { x: window.innerWidth * 0.8, y: window.innerHeight * 0.6, angle: Math.PI * 0.75 },
            { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4, angle: Math.PI * 1.25 }
        ];

        reflectionPoints.forEach((reflection, index) => {
            const reflectionTime = time + index;
            const shimmer = 0.5 + 0.5 * Math.sin(reflectionTime * 3);
            
            // Reflection gradient
            const reflectionGradient = this.ctx.createLinearGradient(
                reflection.x, reflection.y,
                reflection.x + Math.cos(reflection.angle) * 100,
                reflection.y + Math.sin(reflection.angle) * 100
            );
            
            reflectionGradient.addColorStop(0, `rgba(255, 255, 255, ${shimmer * 0.15})`);
            reflectionGradient.addColorStop(0.3, `rgba(200, 220, 255, ${shimmer * 0.08})`);
            reflectionGradient.addColorStop(1, 'rgba(100, 150, 200, 0)');
            
            this.ctx.strokeStyle = reflectionGradient;
            this.ctx.lineWidth = 2;
            this.ctx.shadowColor = '#ffffff';
            this.ctx.shadowBlur = 8;
            
            this.ctx.beginPath();
            this.ctx.moveTo(reflection.x, reflection.y);
            this.ctx.lineTo(
                reflection.x + Math.cos(reflection.angle) * 80,
                reflection.y + Math.sin(reflection.angle) * 80
            );
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        });
    },

    renderHolographicInterference(time) {
        // Holographic interference patterns for authenticity
        const interferenceLines = 8;
        
        for (let i = 0; i < interferenceLines; i++) {
            const y = (i / interferenceLines) * this.canvas.height;
            const phase = time * 2 + i * Math.PI / 4;
            const intensity = 0.02 + 0.01 * Math.sin(phase);
            
            // Horizontal interference
            this.ctx.strokeStyle = `rgba(0, 255, 200, ${intensity})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.setLineDash([2, 8]);
            
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
            
            this.ctx.setLineDash([]);
        }
        
        // Vertical interference
        const verticalLines = 6;
        for (let i = 0; i < verticalLines; i++) {
            const x = (i / verticalLines) * this.canvas.width;
            const phase = time * 1.5 + i * Math.PI / 3;
            const intensity = 0.015 + 0.01 * Math.sin(phase);
            
            this.ctx.strokeStyle = `rgba(0, 200, 255, ${intensity})`;
            this.ctx.lineWidth = 0.3;
            this.ctx.setLineDash([1, 12]);
            
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
            
            this.ctx.setLineDash([]);
        }
    },

    // Dynamic enhancement based on scene activity
    adjustEnhancementLevel(activityLevel) {
        this.effects.bloomIntensity = 1.0 + activityLevel * 0.5;
        this.effects.filmGrain = 0.1 + activityLevel * 0.05;
        this.canvas.style.opacity = Math.min(0.5, 0.2 + activityLevel * 0.3);
    }
};