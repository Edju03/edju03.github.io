// Performance Optimizer
// Reduces stuttering and improves frame rate consistency

const PerformanceOptimizer = {
    frameCount: 0,
    lastTime: performance.now(),
    fps: 60,
    frameTimeBuffer: [],
    stutterDetected: false,
    
    init() {
        console.log('Initializing Performance Optimizer...');
        
        // Optimize canvas settings globally
        this.optimizeCanvasSettings();
        
        // Reduce animation complexity when stuttering detected
        this.monitorPerformance();
        
        // Pre-allocate arrays to avoid garbage collection
        this.preallocateMemory();
        
        console.log('Performance Optimizer: Active');
    },
    
    optimizeCanvasSettings() {
        // Disable image smoothing for better performance
        const canvases = document.querySelectorAll('canvas');
        canvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.imageSmoothingEnabled = false;
                // Use lower quality for better performance
                ctx.globalCompositeOperation = 'source-over';
            }
        });
    },
    
    preallocateMemory() {
        // Pre-allocate arrays to avoid GC during animation
        if (window.ParticleSystem) {
            // Use fixed-size arrays
            ParticleSystem.particlePool = new Array(1000);
        }
        
        if (window.DroneSwarm) {
            // Reduce drone trail allocations
            DroneSwarm.typographySettings.trailLength = 4; // Reduced from 8
            DroneSwarm.typographySettings.afterburnerLength = 3; // Reduced from 6
        }
    },
    
    monitorPerformance() {
        const measure = () => {
            const now = performance.now();
            const delta = now - this.lastTime;
            this.lastTime = now;
            
            // Track frame times
            this.frameTimeBuffer.push(delta);
            if (this.frameTimeBuffer.length > 60) {
                this.frameTimeBuffer.shift();
            }
            
            // Detect stuttering (frame time > 33ms = below 30fps)
            if (delta > 33) {
                this.stutterDetected = true;
                this.reduceComplexity();
            } else if (delta < 20 && this.stutterDetected) {
                // Performance recovered
                this.stutterDetected = false;
                this.restoreComplexity();
            }
            
            this.frameCount++;
            
            // Calculate FPS every second
            if (this.frameCount % 60 === 0) {
                const avgFrameTime = this.frameTimeBuffer.reduce((a, b) => a + b, 0) / this.frameTimeBuffer.length;
                this.fps = Math.round(1000 / avgFrameTime);
                
                // Log performance stats
                if (this.fps < 50) {
                    console.warn(`Performance Warning: ${this.fps} FPS`);
                }
            }
            
            requestAnimationFrame(measure);
        };
        
        requestAnimationFrame(measure);
    },
    
    reduceComplexity() {
        // Dynamically reduce visual complexity when stuttering
        console.log('Reducing visual complexity to improve performance');
        
        // Reduce particle connections
        if (window.ParticleSystem) {
            const particles = ParticleSystem.particles;
            // Skip particle connections when performance is low
            ParticleSystem.skipConnections = true;
        }
        
        // Reduce drone effects
        if (window.DroneSwarm) {
            DroneSwarm.typographySettings.droneCount = Math.min(50, DroneSwarm.typographySettings.droneCount);
        }
        
        // Reduce equation count
        if (window.RoboticsEquations) {
            RoboticsEquations.equations = RoboticsEquations.equations.slice(0, 5);
        }
    },
    
    restoreComplexity() {
        // Restore visual complexity when performance improves
        console.log('Restoring visual complexity');
        
        if (window.ParticleSystem) {
            ParticleSystem.skipConnections = false;
        }
        
        if (window.DroneSwarm) {
            DroneSwarm.typographySettings.droneCount = 100;
        }
    }
};

// Auto-initialize
window.PerformanceOptimizer = PerformanceOptimizer;