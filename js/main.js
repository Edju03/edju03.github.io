// Main entry point for the robot-themed website
// Handles initialization and global state management

// Global variables
let isLoaded = false;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize EmailJS
function initEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual EmailJS public key
        console.log('📧 EmailJS initialized');
    } else {
        console.warn('⚠️ EmailJS not loaded');
    }
}

function initializeApp() {
    console.log('Starting app initialization...');
    
    // Initialize EmailJS first
    initEmailJS();
    
    try {
        // Initialize performance optimizer first
        if (typeof PerformanceOptimizer !== 'undefined') {
            PerformanceOptimizer.init();
        }
        
        // Initialize core components
        ParticleSystem.init();
        DroneSwarm.init();
        
        // Original simulations
        RoboticArm.init();
        CFDSimulation.init();
        ThrusterSimulation.init();
        
        // Humanoid robot visualization
        if (typeof HumanoidRobot !== 'undefined') {
            HumanoidRobot.init();
        }
        
        // Floating robotics equations
        if (typeof RoboticsEquations !== 'undefined') {
            RoboticsEquations.init();
        }
        
        CodeRain.init();
        
        // Data conduit system removed - keeping clean background
        
        Navigation.init();
        Hero.init();
        Animations.init();
        Stats.init();
        ContactForm.init();
        // CursorTrail.init(); // Disabled for better performance
        ScrollIndicator.init();
        Theme.init();
        
        console.log('All components initialized successfully');
        
        // Show loading screen initially
        LoadingScreen.show();
        
        // Hide loading screen after a good viewing time
        setTimeout(() => {
            LoadingScreen.hide();
            isLoaded = true;
            startAnimations();
            console.log('Loading complete, animations started');
        }, 1500); // Sweet spot - not too fast, not too slow
        
    } catch (error) {
        console.error('Error during initialization:', error);
        // Force hide loading screen on error
        setTimeout(() => {
            LoadingScreen.hide();
        }, 1000);
    }
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