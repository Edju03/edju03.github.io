// Robotics Equations Floating Animation
// Displays beautiful mathematical equations in the background

const RoboticsEquations = {
    canvas: null,
    ctx: null,
    equations: [],
    
    // Advanced control theory equations - reduced brightness
    equationTemplates: [
        // Control Barrier Function
        { 
            text: "ḣ(x,u) ≥ -α(h(x)), ∀x ∈ ∂C",
            description: "Control Barrier Function",
            color: "rgba(0, 150, 200, 0.4)"
        },
        // Lyapunov Stability
        {
            text: "V̇(x) = ∇V(x)ᵀf(x,u) < -γV(x)",
            description: "Lyapunov Stability",
            color: "rgba(0, 180, 150, 0.4)"
        },
        // Control Lyapunov Function
        {
            text: "inf[u∈U] {LfV(x) + LgV(x)u} < -W(x)",
            description: "Control Lyapunov Function",
            color: "rgba(80, 140, 200, 0.4)"
        },
        // QP-CBF Optimization
        {
            text: "min‖u-uref‖² s.t. Lfh+Lgh·u≥-α(h)",
            description: "QP-CBF Safety Filter",
            color: "rgba(100, 120, 180, 0.4)"
        },
        // Hamilton-Jacobi-Bellman
        {
            text: "∂V/∂t + min[H(x,∇V,u)] = 0",
            description: "HJB Equation",
            color: "rgba(120, 160, 140, 0.4)"
        },
        // Pontryagin's Maximum Principle
        {
            text: "H(x*,u*,λ*,t) ≥ H(x*,u,λ*,t)",
            description: "Pontryagin's Principle",
            color: "rgba(140, 140, 100, 0.4)"
        },
        // LQR Riccati Equation
        {
            text: "PA + AᵀP - PBR⁻¹BᵀP + Q = 0",
            description: "Algebraic Riccati",
            color: "rgba(100, 130, 180, 0.4)"
        },
        // Model Predictive Control
        {
            text: "min Σ[xᵀQx + uᵀRu] s.t. x̄=Ax+Bu",
            description: "MPC Optimization",
            color: "rgba(80, 180, 180, 0.4)"
        },
        // Adaptive Control
        {
            text: "θ̂̇ = -Γ∇J(θ̂), J = ½eᵀPe",
            description: "Adaptive Control Law",
            color: "rgba(120, 100, 160, 0.4)"
        },
        // Sliding Mode Control
        {
            text: "u = -K·sgn(s), s = cx₁ + x₂",
            description: "Sliding Mode Control",
            color: "rgba(140, 160, 80, 0.4)"
        },
        // Feedback Linearization
        {
            text: "u = (Lfⁿy - v)/LgLfⁿ⁻¹y",
            description: "Feedback Linearization",
            color: "rgba(100, 140, 140, 0.4)"
        },
        // H-infinity Control
        {
            text: "‖Tzw‖∞ < γ, Tzw = FL(P,K)",
            description: "H∞ Robust Control",
            color: "rgba(120, 120, 160, 0.4)"
        }
    ],

    init() {
        console.log('Initializing Robotics Equations...');
        
        // Create canvas for equations
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'equations-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100vw';
        this.canvas.style.height = '100vh';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '2';
        this.canvas.style.opacity = '0.4';
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Create initial equations
        this.createEquations();
        
        // Start animation
        this.animate();
        
        console.log('Robotics Equations: Initialized');
    },

    resizeCanvas() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    createEquations() {
        this.equations = [];
        
        // Create floating equations at random positions
        for (let i = 0; i < 8; i++) {
            const template = this.equationTemplates[i % this.equationTemplates.length];
            
            this.equations.push({
                text: template.text,
                description: template.description,
                color: template.color,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                scale: 0.8 + Math.random() * 0.4,
                opacity: 0,
                targetOpacity: 0.3 + Math.random() * 0.2,
                fadeSpeed: 0.01,
                phase: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.001,
                rotation: 0,
                lifetime: 0,
                maxLifetime: 300 + Math.random() * 200,
                glowIntensity: 0.5 + Math.random() * 0.5
            });
        }
    },

    animate() {
        if (!this.ctx) return;
        
        const time = Date.now() * 0.001;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw equations
        this.equations.forEach((equation, index) => {
            // Update position
            equation.x += equation.vx;
            equation.y += equation.vy;
            
            // Gentle floating motion
            equation.y += Math.sin(time * 0.5 + equation.phase) * 0.2;
            equation.x += Math.cos(time * 0.3 + equation.phase) * 0.1;
            
            // Update rotation
            equation.rotation += equation.rotationSpeed;
            
            // Update lifetime
            equation.lifetime++;
            
            // Fade in/out
            if (equation.lifetime < 50) {
                equation.opacity = Math.min(equation.targetOpacity, equation.opacity + equation.fadeSpeed);
            } else if (equation.lifetime > equation.maxLifetime - 50) {
                equation.opacity = Math.max(0, equation.opacity - equation.fadeSpeed);
            }
            
            // Reset equation when it fades out or goes off screen
            if (equation.opacity <= 0 || equation.lifetime > equation.maxLifetime ||
                equation.x < -200 || equation.x > window.innerWidth + 200 ||
                equation.y < -100 || equation.y > window.innerHeight + 100) {
                this.resetEquation(equation, index);
            }
            
            // Draw equation
            this.drawEquation(equation, time);
        });
        
        requestAnimationFrame(() => this.animate());
    },

    drawEquation(equation, time) {
        this.ctx.save();
        
        // Apply transformations
        this.ctx.translate(equation.x, equation.y);
        this.ctx.rotate(equation.rotation);
        this.ctx.scale(equation.scale, equation.scale);
        
        // Set font
        this.ctx.font = 'bold 18px "Courier New", monospace';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        // Subtle glow effect - much reduced
        const glowPulse = 0.8 + 0.2 * Math.sin(time * 2 + equation.phase);
        this.ctx.shadowColor = equation.color.replace('0.4', '0.6');
        this.ctx.shadowBlur = 5 * equation.glowIntensity * glowPulse;
        
        // Draw equation text
        this.ctx.fillStyle = equation.color.replace('0.4', String(equation.opacity));
        this.ctx.fillText(equation.text, 0, 0);
        
        // Draw description below
        this.ctx.font = '10px "Orbitron", sans-serif';
        this.ctx.fillStyle = equation.color.replace('0.4', String(equation.opacity * 0.7));
        this.ctx.shadowBlur = 3;
        this.ctx.fillText(equation.description, 0, 25);
        
        // Draw decorative brackets
        this.ctx.strokeStyle = equation.color.replace('0.4', String(equation.opacity * 0.3));
        this.ctx.lineWidth = 1;
        this.ctx.shadowBlur = 0;
        
        // Left bracket
        this.ctx.beginPath();
        this.ctx.moveTo(-80, -20);
        this.ctx.lineTo(-90, -20);
        this.ctx.lineTo(-90, 20);
        this.ctx.lineTo(-80, 20);
        this.ctx.stroke();
        
        // Right bracket
        this.ctx.beginPath();
        this.ctx.moveTo(80, -20);
        this.ctx.lineTo(90, -20);
        this.ctx.lineTo(90, 20);
        this.ctx.lineTo(80, 20);
        this.ctx.stroke();
        
        this.ctx.restore();
    },

    resetEquation(equation, index) {
        const template = this.equationTemplates[index % this.equationTemplates.length];
        
        // Reset from random edge
        const edge = Math.floor(Math.random() * 4);
        switch(edge) {
            case 0: // Top
                equation.x = Math.random() * window.innerWidth;
                equation.y = -50;
                equation.vy = Math.abs(equation.vy);
                break;
            case 1: // Right
                equation.x = window.innerWidth + 50;
                equation.y = Math.random() * window.innerHeight;
                equation.vx = -Math.abs(equation.vx);
                break;
            case 2: // Bottom
                equation.x = Math.random() * window.innerWidth;
                equation.y = window.innerHeight + 50;
                equation.vy = -Math.abs(equation.vy);
                break;
            case 3: // Left
                equation.x = -50;
                equation.y = Math.random() * window.innerHeight;
                equation.vx = Math.abs(equation.vx);
                break;
        }
        
        equation.text = template.text;
        equation.description = template.description;
        equation.color = template.color;
        equation.opacity = 0;
        equation.targetOpacity = 0.3 + Math.random() * 0.2;
        equation.lifetime = 0;
        equation.maxLifetime = 300 + Math.random() * 200;
        equation.rotation = 0;
    },

    // Add interaction - equations move away from mouse
    handleMouseMove(x, y) {
        this.equations.forEach(equation => {
            const dx = equation.x - x;
            const dy = equation.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                equation.vx += (dx / distance) * force * 0.5;
                equation.vy += (dy / distance) * force * 0.5;
                
                // Limit velocity
                equation.vx = Math.max(-2, Math.min(2, equation.vx));
                equation.vy = Math.max(-2, Math.min(2, equation.vy));
            }
        });
    }
};

// Add mouse interaction
document.addEventListener('mousemove', (e) => {
    if (RoboticsEquations.canvas) {
        RoboticsEquations.handleMouseMove(e.clientX, e.clientY);
    }
});

// Export for global use
window.RoboticsEquations = RoboticsEquations;