// Modern Interactive JavaScript for Robot-Themed Website

// Global variables
let particlesCanvas, particlesCtx;
let particles = [];
let mouseX = 0, mouseY = 0;
let isLoaded = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeParticles();
    initializeDroneSwarm();
    initializeNavigation();
    initializeHero();
    initializeAnimations();
    initializeStats();
    initializeContactForm();
    initializeCursorTrail();
    initializeScrollIndicator();
    initializeTheme();
    
    // Show loading screen initially
    showLoadingScreen();
    
    // Hide loading screen after everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            hideLoadingScreen();
            isLoaded = true;
            startAnimations();
        }, 2000);
    });
}

// Particle System
function initializeParticles() {
    particlesCanvas = document.getElementById('particles-canvas');
    if (!particlesCanvas) return;
    
    particlesCtx = particlesCanvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create initial particles
    createParticles();
    
    // Start animation loop
    animateParticles();
}

function resizeCanvas() {
    if (!particlesCanvas) return;
    
    particlesCanvas.width = window.innerWidth;
    particlesCanvas.height = window.innerHeight;
}

function createParticles() {
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            color: `hsl(${190 + Math.random() * 20}, 100%, 50%)`
        });
    }
}

function animateParticles() {
    if (!particlesCtx) return;
    
    particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
    
    particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = particlesCanvas.width;
        if (particle.x > particlesCanvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = particlesCanvas.height;
        if (particle.y > particlesCanvas.height) particle.y = 0;
        
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += dx * force * 0.001;
            particle.vy += dy * force * 0.001;
        }
        
        // Apply friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Draw particle
        particlesCtx.beginPath();
        particlesCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        particlesCtx.fillStyle = particle.color;
        particlesCtx.globalAlpha = particle.opacity;
        particlesCtx.fill();
        
        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
            if (index !== otherIndex) {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    particlesCtx.beginPath();
                    particlesCtx.moveTo(particle.x, particle.y);
                    particlesCtx.lineTo(otherParticle.x, otherParticle.y);
                    particlesCtx.strokeStyle = '#00d4ff';
                    particlesCtx.globalAlpha = (80 - distance) / 80 * 0.2;
                    particlesCtx.stroke();
                }
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}

// Drone Swarm System
let droneSwarmCanvas, droneSwarmCtx;
let drones = [];
let hypercubeVertices = [];
let formationProgress = 0;
let targetFormation = 'hypercube';
let animationTime = 0;

function initializeDroneSwarm() {
    droneSwarmCanvas = document.getElementById('drone-swarm-canvas');
    if (!droneSwarmCanvas) return;
    
    droneSwarmCtx = droneSwarmCanvas.getContext('2d');
    
    // Set canvas size
    resizeDroneCanvas();
    window.addEventListener('resize', resizeDroneCanvas);
    
    // Create hypercube vertices (4D projected to 2D)
    createHypercubeVertices();
    
    // Create micro-drones
    createDroneSwarm();
    
    // Start animation loop
    animateDroneSwarm();
    
    // Update stats display
    updateSwarmStats();
}

function resizeDroneCanvas() {
    if (!droneSwarmCanvas) return;
    
    const container = droneSwarmCanvas.parentElement;
    droneSwarmCanvas.width = container.offsetWidth;
    droneSwarmCanvas.height = container.offsetHeight;
}

function createHypercubeVertices() {
    hypercubeVertices = [];
    const centerX = 250;
    const centerY = 250;
    const scale = 80;
    
    // 4D hypercube vertices projected to 2D
    // Using a simplified projection for visual effect
    const vertices4D = [
        [-1, -1, -1, -1], [1, -1, -1, -1], [-1, 1, -1, -1], [1, 1, -1, -1],
        [-1, -1, 1, -1], [1, -1, 1, -1], [-1, 1, 1, -1], [1, 1, 1, -1],
        [-1, -1, -1, 1], [1, -1, -1, 1], [-1, 1, -1, 1], [1, 1, -1, 1],
        [-1, -1, 1, 1], [1, -1, 1, 1], [-1, 1, 1, 1], [1, 1, 1, 1]
    ];
    
    vertices4D.forEach((vertex, i) => {
        // Project 4D to 2D with rotation and perspective
        const time = Date.now() * 0.001;
        const rotX = Math.cos(time * 0.3) * vertex[0] - Math.sin(time * 0.3) * vertex[3];
        const rotY = vertex[1];
        const rotZ = Math.cos(time * 0.2) * vertex[2] - Math.sin(time * 0.2) * vertex[3];
        
        hypercubeVertices.push({
            x: centerX + rotX * scale,
            y: centerY + rotY * scale,
            z: rotZ * scale,
            originalIndex: i
        });
    });
}

function createDroneSwarm() {
    const droneCount = 2000; // Thousands of micro-drones
    
    for (let i = 0; i < droneCount; i++) {
        drones.push({
            x: Math.random() * 500,
            y: Math.random() * 500,
            z: Math.random() * 200 - 100,
            targetX: 0,
            targetY: 0,
            targetZ: 0,
            vx: 0,
            vy: 0,
            vz: 0,
            size: Math.random() * 1.5 + 0.5,
            brightness: Math.random() * 0.5 + 0.5,
            trailX: [],
            trailY: [],
            targetVertex: i % hypercubeVertices.length,
            formationDelay: Math.random() * 1000
        });
    }
    
    // Update drone count display
    document.getElementById('drone-count').textContent = droneCount.toLocaleString();
}

function animateDroneSwarm() {
    if (!droneSwarmCtx) return;
    
    animationTime += 16; // ~60fps
    
    // Clear canvas with trail effect
    droneSwarmCtx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    droneSwarmCtx.fillRect(0, 0, droneSwarmCanvas.width, droneSwarmCanvas.height);
    
    // Update hypercube vertices rotation
    createHypercubeVertices();
    
    // Calculate formation progress
    formationProgress = Math.min(100, (animationTime - 2000) / 50);
    if (formationProgress < 0) formationProgress = 0;
    
    // Update formation progress display
    document.getElementById('formation-progress').textContent = Math.floor(formationProgress) + '%';
    
    // Animate drones
    drones.forEach((drone, index) => {
        if (animationTime > drone.formationDelay) {
            // Calculate target position (hypercube vertex with some variation)
            const targetVertex = hypercubeVertices[drone.targetVertex];
            const variation = 20;
            
            drone.targetX = targetVertex.x + (Math.sin(animationTime * 0.001 + index) * variation);
            drone.targetY = targetVertex.y + (Math.cos(animationTime * 0.001 + index) * variation);
            drone.targetZ = targetVertex.z + (Math.sin(animationTime * 0.002 + index) * variation);
            
            // Apply flocking behavior and formation attraction
            const formationStrength = formationProgress / 100;
            
            // Move towards target position
            drone.vx += (drone.targetX - drone.x) * 0.02 * formationStrength;
            drone.vy += (drone.targetY - drone.y) * 0.02 * formationStrength;
            drone.vz += (drone.targetZ - drone.z) * 0.01 * formationStrength;
            
            // Add some random movement for organic feel
            drone.vx += (Math.random() - 0.5) * 0.5 * (1 - formationStrength);
            drone.vy += (Math.random() - 0.5) * 0.5 * (1 - formationStrength);
            drone.vz += (Math.random() - 0.5) * 0.3 * (1 - formationStrength);
            
            // Apply velocity damping
            drone.vx *= 0.95;
            drone.vy *= 0.95;
            drone.vz *= 0.95;
            
            // Update position
            drone.x += drone.vx;
            drone.y += drone.vy;
            drone.z += drone.vz;
            
            // Store trail
            drone.trailX.push(drone.x);
            drone.trailY.push(drone.y);
            if (drone.trailX.length > 5) {
                drone.trailX.shift();
                drone.trailY.shift();
            }
        }
        
        // Draw drone trail
        if (drone.trailX.length > 1) {
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(drone.trailX[0], drone.trailY[0]);
            for (let i = 1; i < drone.trailX.length; i++) {
                droneSwarmCtx.lineTo(drone.trailX[i], drone.trailY[i]);
            }
            droneSwarmCtx.strokeStyle = `rgba(0, 212, 255, ${0.2 * drone.brightness})`;
            droneSwarmCtx.lineWidth = 0.5;
            droneSwarmCtx.stroke();
        }
        
        // Draw drone
        const size = drone.size * (1 + drone.z * 0.002); // Perspective scaling
        const alpha = drone.brightness * (0.8 + 0.2 * Math.sin(animationTime * 0.01 + index));
        
        droneSwarmCtx.beginPath();
        droneSwarmCtx.arc(drone.x, drone.y, size, 0, Math.PI * 2);
        droneSwarmCtx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        droneSwarmCtx.fill();
        
        // Add glow effect
        droneSwarmCtx.shadowColor = '#00d4ff';
        droneSwarmCtx.shadowBlur = 5;
        droneSwarmCtx.fill();
        droneSwarmCtx.shadowBlur = 0;
    });
    
    // Draw connections between nearby drones (hypercube edges)
    if (formationProgress > 50) {
        drawHypercubeConnections();
    }
    
    requestAnimationFrame(animateDroneSwarm);
}

function drawHypercubeConnections() {
    // Draw edges of the hypercube
    const edges = [
        [0,1], [2,3], [4,5], [6,7], [8,9], [10,11], [12,13], [14,15], // edges of cubes
        [0,2], [1,3], [4,6], [5,7], [8,10], [9,11], [12,14], [13,15],
        [0,4], [1,5], [2,6], [3,7], [8,12], [9,13], [10,14], [11,15],
        [0,8], [1,9], [2,10], [3,11], [4,12], [5,13], [6,14], [7,15] // 4D connections
    ];
    
    edges.forEach(edge => {
        const v1 = hypercubeVertices[edge[0]];
        const v2 = hypercubeVertices[edge[1]];
        
        droneSwarmCtx.beginPath();
        droneSwarmCtx.moveTo(v1.x, v1.y);
        droneSwarmCtx.lineTo(v2.x, v2.y);
        droneSwarmCtx.strokeStyle = `rgba(0, 212, 255, ${0.3 * (formationProgress - 50) / 50})`;
        droneSwarmCtx.lineWidth = 1;
        droneSwarmCtx.stroke();
    });
}

function updateSwarmStats() {
    setInterval(() => {
        const droneCountEl = document.getElementById('drone-count');
        const progressEl = document.getElementById('formation-progress');
        
        if (droneCountEl && progressEl) {
            // Add subtle animation to stats
            const currentCount = parseInt(droneCountEl.textContent.replace(/,/g, ''));
            if (currentCount < 2000) {
                droneCountEl.textContent = Math.min(2000, currentCount + 50).toLocaleString();
            }
        }
    }, 100);
}

// Navigation
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for anchor links (starting with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For other links (like index.html), let the default behavior happen
        });
    });
    
    // Hide/show navbar on scroll
    let lastScrollTop = 0;
    let navbarHeight = navbar.offsetHeight;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            // Add mobile menu functionality here
            console.log('Mobile menu toggled');
        });
    }
}

// Hero Section
function initializeHero() {
    const robotAvatar = document.querySelector('.robot-avatar');
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    
    // Robot eye following mouse
    document.addEventListener('mousemove', function(e) {
        const eyes = document.querySelectorAll('.eye');
        eyes.forEach(eye => {
            const rect = eye.getBoundingClientRect();
            const eyeX = rect.left + rect.width / 2;
            const eyeY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - eyeX;
            const deltaY = e.clientY - eyeY;
            const angle = Math.atan2(deltaY, deltaX);
            
            const distance = Math.min(3, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 10);
            const translateX = Math.cos(angle) * distance;
            const translateY = Math.sin(angle) * distance;
            
            eye.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });
    
    // Add click interactions to hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.4)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Staggered animation for project cards
                if (entry.target.classList.contains('project-card')) {
                    const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe other animated elements
    document.querySelectorAll('.stat-card, .info-card, .text-card').forEach(card => {
        observer.observe(card);
    });
}

// Stats Counter Animation
function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (target > 1000) {
                    stat.textContent = Math.floor(current).toLocaleString();
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
    }
    
    // Trigger animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.about-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Add input focus effects
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation
        input.addEventListener('input', function() {
            if (this.checkValidity()) {
                this.classList.remove('invalid');
                this.classList.add('valid');
            } else {
                this.classList.remove('valid');
                this.classList.add('invalid');
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
        submitButton.disabled = true;
        
        // Simulate form submission
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            submitButton.innerHTML = '<i class="fas fa-check"></i> <span>Sent!</span>';
            submitButton.style.background = '#00ff88';
            
            // Reset form
            contactForm.reset();
            formInputs.forEach(input => {
                input.classList.remove('valid', 'invalid');
                input.parentElement.classList.remove('focused');
            });
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
            
        } catch (error) {
            submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Error!</span>';
            submitButton.style.background = '#ff4444';
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.style.background = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// Cursor Trail
function initializeCursorTrail() {
    const cursorTrail = document.querySelector('.cursor-trail');
    if (!cursorTrail) return;
    
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    
    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorTrail.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursorTrail.style.opacity = '0';
    });
    
    function updateCursorTrail() {
        trailX += (cursorX - trailX) * 0.1;
        trailY += (cursorY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX - 10 + 'px';
        cursorTrail.style.top = trailY - 10 + 'px';
        
        requestAnimationFrame(updateCursorTrail);
    }
    
    updateCursorTrail();
}

// Scroll Indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Hide scroll indicator when scrolling
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const opacity = Math.max(0, 1 - scrollTop / 300);
        scrollIndicator.style.opacity = opacity;
    });
}

// Theme Toggle (removed - no longer needed)
function initializeTheme() {
    // Theme toggle functionality removed
}

// Loading Screen
function showLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// Start animations after loading
function startAnimations() {
    // Add any animations that should start after loading
    document.querySelectorAll('.hero-text, .hero-visual').forEach(element => {
        element.style.animationPlayState = 'running';
    });
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add ripple effect to buttons
function addRippleEffect(button, e) {
    const ripple = document.createElement('div');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation keyframes
const rippleKeyframes = `
@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleKeyframes;
document.head.appendChild(style);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll and resize events
const optimizedResize = debounce(() => {
    resizeCanvas();
    createParticles();
}, 250);

window.addEventListener('resize', optimizedResize);

// Global error handling
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

// Export functions for external use
window.scrollToSection = scrollToSection;