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
    ControlBarrierFunction.init();
    RRTVisualization.init();
    StateEstimationEllipsoid.init();
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
            Animations.start();
        }, 2000);
    });
}

// Export for global access
window.initializeApp = initializeApp; 