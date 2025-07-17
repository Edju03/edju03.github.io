// Main entry point for the robot-themed website
// Handles initialization and global state management

// Global variables
let isLoaded = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    ParticleSystem.init();
    DroneSwarm.init();
    
    // Original simulations
    RoboticArm.init();
    CFDSimulation.init();
    ThrusterSimulation.init();
    
    // New holographic simulations are embedded in existing canvases
    
    Architect.init();
    CodeRain.init();
    Navigation.init();
    Hero.init();
    Animations.init();
    Stats.init();
    ContactForm.init();
    CursorTrail.init();
    ScrollIndicator.init();
    Theme.init();
    
    // Show loading screen initially
    LoadingScreen.show();
    
    // Hide loading screen after everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            LoadingScreen.hide();
            isLoaded = true;
            startAnimations();
        }, 2000);
    });
}

// Start animations after loading
function startAnimations() {
    // Add any animations that should start after loading
    document.querySelectorAll('.hero-text, .hero-visual').forEach(element => {
        element.style.animationPlayState = 'running';
    });
}

// Loading Screen
const LoadingScreen = {
    show() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.remove('hidden');
        }
    },
    
    hide() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }
};

// Export for global access
window.initializeApp = initializeApp; 