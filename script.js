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
    initializeRoboticArm();
    initializeCFDSimulation();
    initializeThrusterSimulation();
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

// 3D Scanning Drone Swarm System
let droneSwarmCanvas, droneSwarmCtx, errorGraphCanvas, errorGraphCtx;
let scanningDrones = [];
let artifact = {};
let pointCloud = [];
let reconstructedWireframe = [];
let lidarScans = [];
let radarSweeps = [];
let animationTime = 0;
let simulationStartTime = 0;
let scanCompleteness = 0;
let reconstructionError = [];
let maxReconstructionPoints = 3000;

function initializeDroneSwarm() {
    droneSwarmCanvas = document.getElementById('drone-swarm-canvas');
    errorGraphCanvas = document.getElementById('error-graph-canvas');
    
    if (!droneSwarmCanvas) return;
    
    droneSwarmCtx = droneSwarmCanvas.getContext('2d');
    if (errorGraphCanvas) {
        errorGraphCtx = errorGraphCanvas.getContext('2d');
    }
    
    // Set canvas size
    resizeDroneCanvas();
    window.addEventListener('resize', resizeDroneCanvas);
    
    // Create mysterious crystalline artifact
    createCrystallineArtifact();
    
    // Create scanning drone swarm
    createScanningDroneSwarm();
    
    // Initialize reconstruction tracking
    initializeReconstruction();
    
    // Start animation loop
    animateScanningSwarm();
    
    // Update stats display
    updateSwarmStats();
    
    simulationStartTime = Date.now();
}

function resizeDroneCanvas() {
    if (!droneSwarmCanvas) return;
    
    const container = droneSwarmCanvas.parentElement;
    droneSwarmCanvas.width = container.offsetWidth;
    droneSwarmCanvas.height = container.offsetHeight;
}

function createCrystallineArtifact() {
    const centerX = droneSwarmCanvas.width / 2;
    const centerY = droneSwarmCanvas.height / 2;
    
    artifact = {
        centerX: centerX,
        centerY: centerY,
        radius: 60,
        vertices: [],
        faces: [],
        rotation: { x: 0, y: 0, z: 0 },
        rotationSpeed: { x: 0.008, y: 0.012, z: 0.005 }
    };
    
    // Create complex crystalline structure (icosahedron-like)
    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
    const scale = 30;
    
    // Define vertices of an icosahedron
    const baseVertices = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];
    
    // Normalize and scale vertices
    artifact.vertices = baseVertices.map(v => {
        const length = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
        return [
            (v[0] / length) * scale,
            (v[1] / length) * scale,
            (v[2] / length) * scale
        ];
    });
    
    // Define faces (triangles) - simplified for performance
    artifact.faces = [
        [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
        [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
        [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
        [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
    ];
}

function createScanningDroneSwarm() {
    const droneCount = 12; // Elite scanning UAVs
    scanningDrones = [];
    
    const centerX = artifact.centerX;
    const centerY = artifact.centerY;
    const orbitRadius = 120;
    
    for (let i = 0; i < droneCount; i++) {
        const angle = (i / droneCount) * Math.PI * 2;
        const orbitHeight = Math.sin(i * 0.5) * 40; // Varied orbit heights
        
        scanningDrones.push({
            id: i,
            x: centerX + Math.cos(angle) * orbitRadius,
            y: centerY + Math.sin(angle) * orbitRadius,
            z: orbitHeight,
            targetAngle: angle,
            orbitRadius: orbitRadius + Math.random() * 20 - 10,
            orbitSpeed: 0.01 + Math.random() * 0.005,
            verticalOscillation: Math.random() * 0.008 + 0.003,
            phase: i * Math.PI / 6,
            size: 3 + Math.random() * 2,
            brightness: 0.8 + Math.random() * 0.2,
            
            // Sensor systems
            lidarActive: Math.random() < 0.7,
            radarActive: Math.random() < 0.5,
            lidarConeAngle: Math.PI / 8,
            lidarRange: 80,
            radarSweepAngle: 0,
            radarSweepSpeed: 0.05,
            
            // Data collection
            scanData: [],
            contributedPoints: 0,
            
            // Visual trail
            trailX: [],
            trailY: [],
            maxTrailLength: 15
        });
    }
    
    // Update drone count display
    document.getElementById('drone-count').textContent = droneCount.toString();
}

function initializeReconstruction() {
    pointCloud = [];
    reconstructedWireframe = [];
    reconstructionError = [];
    scanCompleteness = 0;
    
    // Initialize error tracking with high initial error
    for (let i = 0; i < 50; i++) {
        reconstructionError.push(1.0 - (i * 0.015));
    }
}

function animateScanningSwarm() {
    if (!droneSwarmCtx) return;
    
    animationTime += 16; // ~60fps
    
    // Clear canvas with subtle trail effect
    droneSwarmCtx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    droneSwarmCtx.fillRect(0, 0, droneSwarmCanvas.width, droneSwarmCanvas.height);
    
    const time = Date.now() * 0.001;
    
    // Update artifact rotation
    artifact.rotation.x += artifact.rotationSpeed.x;
    artifact.rotation.y += artifact.rotationSpeed.y;
    artifact.rotation.z += artifact.rotationSpeed.z;
    
    // Draw the mysterious crystalline artifact
    drawCrystallineArtifact();
    
    // Update and draw scanning drones
    updateScanningDrones(time);
    
    // Process point cloud generation
    generatePointCloudData();
    
    // Draw point cloud
    drawPointCloud();
    
    // Draw reconstructed wireframe
    drawReconstructedWireframe();
    
    // Update scan completeness
    updateScanCompleteness();
    
    // Draw sensor visualizations
    drawSensorVisualizations();
    
    // Update reconstruction error graph
    updateReconstructionGraph();
    
    requestAnimationFrame(animateScanningSwarm);
}

function drawCrystallineArtifact() {
    const centerX = artifact.centerX;
    const centerY = artifact.centerY;
    
    // Rotate and project vertices
    const projectedVertices = artifact.vertices.map(vertex => {
        // Apply rotations
        let [x, y, z] = vertex;
        
        // Rotate around Y axis
        const cosY = Math.cos(artifact.rotation.y);
        const sinY = Math.sin(artifact.rotation.y);
        const newX = x * cosY - z * sinY;
        const newZ = x * sinY + z * cosY;
        x = newX;
        z = newZ;
        
        // Rotate around X axis
        const cosX = Math.cos(artifact.rotation.x);
        const sinX = Math.sin(artifact.rotation.x);
        const newY = y * cosX - z * sinX;
        z = y * sinX + z * cosX;
        y = newY;
        
        // Project to 2D (simple orthographic projection)
        return {
            x: centerX + x,
            y: centerY + y,
            z: z
        };
    });
    
    // Draw faces with depth-based opacity
    artifact.faces.forEach(face => {
        const v1 = projectedVertices[face[0]];
        const v2 = projectedVertices[face[1]];
        const v3 = projectedVertices[face[2]];
        
        // Calculate average depth
        const avgZ = (v1.z + v2.z + v3.z) / 3;
        const depthAlpha = 0.3 + (avgZ / 60) * 0.4;
        
        droneSwarmCtx.strokeStyle = `rgba(0, 255, 136, ${Math.max(0.1, depthAlpha)})`;
        droneSwarmCtx.lineWidth = 1.5;
        
        droneSwarmCtx.beginPath();
        droneSwarmCtx.moveTo(v1.x, v1.y);
        droneSwarmCtx.lineTo(v2.x, v2.y);
        droneSwarmCtx.lineTo(v3.x, v3.y);
        droneSwarmCtx.closePath();
        droneSwarmCtx.stroke();
    });
    
    // Add crystalline glow effect
    droneSwarmCtx.shadowColor = '#00ff88';
    droneSwarmCtx.shadowBlur = 10;
    
    // Draw vertices as glowing points
    projectedVertices.forEach(vertex => {
        droneSwarmCtx.fillStyle = `rgba(0, 255, 136, 0.8)`;
        droneSwarmCtx.beginPath();
        droneSwarmCtx.arc(vertex.x, vertex.y, 2, 0, Math.PI * 2);
        droneSwarmCtx.fill();
    });
    
    droneSwarmCtx.shadowBlur = 0;
}

function updateScanningDrones(time) {
    scanningDrones.forEach(drone => {
        // Update orbital motion
        drone.targetAngle += drone.orbitSpeed;
        drone.z = Math.sin(time * drone.verticalOscillation + drone.phase) * 30;
        
        // Calculate orbital position
        drone.x = artifact.centerX + Math.cos(drone.targetAngle) * drone.orbitRadius;
        drone.y = artifact.centerY + Math.sin(drone.targetAngle) * drone.orbitRadius;
        
        // Update sensor sweeps
        if (drone.radarActive) {
            drone.radarSweepAngle += drone.radarSweepSpeed;
            if (drone.radarSweepAngle > Math.PI * 2) drone.radarSweepAngle = 0;
        }
        
        // Store trail
        drone.trailX.push(drone.x);
        drone.trailY.push(drone.y);
        if (drone.trailX.length > drone.maxTrailLength) {
            drone.trailX.shift();
            drone.trailY.shift();
        }
        
        // Draw drone trail
        if (drone.trailX.length > 1) {
            droneSwarmCtx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
            droneSwarmCtx.lineWidth = 1;
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(drone.trailX[0], drone.trailY[0]);
            for (let i = 1; i < drone.trailX.length; i++) {
                const alpha = i / drone.trailX.length;
                droneSwarmCtx.globalAlpha = alpha * 0.3;
                droneSwarmCtx.lineTo(drone.trailX[i], drone.trailY[i]);
            }
            droneSwarmCtx.stroke();
            droneSwarmCtx.globalAlpha = 1;
        }
        
        // Draw drone
        const pulseIntensity = 0.8 + 0.2 * Math.sin(time * 3 + drone.phase);
        droneSwarmCtx.fillStyle = `rgba(0, 212, 255, ${pulseIntensity})`;
        droneSwarmCtx.beginPath();
        droneSwarmCtx.arc(drone.x, drone.y, drone.size, 0, Math.PI * 2);
        droneSwarmCtx.fill();
        
        // Add glow effect
        droneSwarmCtx.shadowColor = '#00d4ff';
        droneSwarmCtx.shadowBlur = 8;
        droneSwarmCtx.fill();
        droneSwarmCtx.shadowBlur = 0;
    });
}

function generatePointCloudData() {
    // Add new points to cloud based on scanning progress
    if (pointCloud.length < maxReconstructionPoints) {
        const pointsToAdd = Math.min(15, maxReconstructionPoints - pointCloud.length);
        
        for (let i = 0; i < pointsToAdd; i++) {
            // Generate points around the artifact with some noise
            const angle = Math.random() * Math.PI * 2;
            const radius = 40 + Math.random() * 40;
            const noise = (Math.random() - 0.5) * 8;
            
            pointCloud.push({
                x: artifact.centerX + Math.cos(angle) * radius + noise,
                y: artifact.centerY + Math.sin(angle) * radius + noise,
                intensity: 0.4 + Math.random() * 0.6,
                age: 0,
                maxAge: 180 + Math.random() * 120
            });
        }
    }
    
    // Update existing points
    pointCloud.forEach(point => {
        point.age++;
        point.intensity *= 0.998; // Fade over time
    });
    
    // Remove old points
    pointCloud = pointCloud.filter(point => point.age < point.maxAge && point.intensity > 0.1);
}

function drawPointCloud() {
    // Draw shimmering nebula of point cloud data
    pointCloud.forEach(point => {
        const twinkle = 0.5 + 0.5 * Math.sin(Date.now() * 0.01 + point.x * 0.1);
        const alpha = point.intensity * twinkle;
        
        droneSwarmCtx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        droneSwarmCtx.beginPath();
        droneSwarmCtx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        droneSwarmCtx.fill();
        
        // Add subtle glow to some points
        if (Math.random() < 0.3) {
            droneSwarmCtx.shadowColor = '#00d4ff';
            droneSwarmCtx.shadowBlur = 3;
            droneSwarmCtx.fill();
            droneSwarmCtx.shadowBlur = 0;
        }
    });
}

function drawReconstructedWireframe() {
    // Draw wireframe reconstruction emerging from point cloud
    if (pointCloud.length > 100) {
        const progress = Math.min(1, (pointCloud.length - 100) / (maxReconstructionPoints - 100));
        
        // Draw simplified wireframe version of artifact
        const centerX = artifact.centerX + 120; // Offset to the side
        const centerY = artifact.centerY;
        const scale = 0.7;
        
        droneSwarmCtx.strokeStyle = `rgba(255, 107, 53, ${0.4 + progress * 0.4})`;
        droneSwarmCtx.lineWidth = 2;
        
        // Draw a simplified wireframe based on the original artifact
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 35 * scale;
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle + Math.PI/4) * radius * 0.7;
            const y2 = centerY + Math.sin(angle + Math.PI/4) * radius * 0.7;
            
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(x1, y1);
            droneSwarmCtx.lineTo(x2, y2);
            droneSwarmCtx.stroke();
        }
        
        // Add glow effect
        droneSwarmCtx.shadowColor = '#ff6b35';
        droneSwarmCtx.shadowBlur = 6;
        droneSwarmCtx.stroke();
        droneSwarmCtx.shadowBlur = 0;
    }
}

function updateScanCompleteness() {
    scanCompleteness = Math.min(100, (pointCloud.length / maxReconstructionPoints) * 100);
    document.getElementById('solution-time').textContent = scanCompleteness.toFixed(1) + '%';
    document.getElementById('point-cloud-count').textContent = pointCloud.length.toLocaleString();
    
    if (scanCompleteness > 80) {
        document.getElementById('formation-progress').textContent = 'RECONSTRUCTION COMPLETE';
    } else if (scanCompleteness > 40) {
        document.getElementById('formation-progress').textContent = 'FUSING DATA';
    } else {
        document.getElementById('formation-progress').textContent = 'SCANNING';
    }
}

function drawSensorVisualizations() {
    scanningDrones.forEach(drone => {
        const angleToArtifact = Math.atan2(artifact.centerY - drone.y, artifact.centerX - drone.x);
        
        // Draw LiDAR cone
        if (drone.lidarActive) {
            droneSwarmCtx.strokeStyle = 'rgba(0, 255, 136, 0.2)';
            droneSwarmCtx.lineWidth = 1;
            
            const coneAngle = drone.lidarConeAngle;
            const range = drone.lidarRange;
            
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(drone.x, drone.y);
            droneSwarmCtx.lineTo(
                drone.x + Math.cos(angleToArtifact - coneAngle/2) * range,
                drone.y + Math.sin(angleToArtifact - coneAngle/2) * range
            );
            droneSwarmCtx.moveTo(drone.x, drone.y);
            droneSwarmCtx.lineTo(
                drone.x + Math.cos(angleToArtifact + coneAngle/2) * range,
                drone.y + Math.sin(angleToArtifact + coneAngle/2) * range
            );
            droneSwarmCtx.stroke();
        }
        
        // Draw mmWave radar sweep
        if (drone.radarActive) {
            droneSwarmCtx.strokeStyle = 'rgba(255, 107, 53, 0.3)';
            droneSwarmCtx.lineWidth = 2;
            
            const sweepAngle = drone.radarSweepAngle;
            const sweepRange = 60;
            
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(drone.x, drone.y);
            droneSwarmCtx.lineTo(
                drone.x + Math.cos(sweepAngle) * sweepRange,
                drone.y + Math.sin(sweepAngle) * sweepRange
            );
            droneSwarmCtx.stroke();
        }
    });
}

function updateReconstructionGraph() {
    if (!errorGraphCtx) return;
    
    // Add new error data point
    const newError = Math.max(0.05, 0.9 - (scanCompleteness * 0.01));
    reconstructionError.push(newError);
    if (reconstructionError.length > 60) {
        reconstructionError.shift();
    }
    
    // Clear and draw graph
    errorGraphCtx.fillStyle = 'rgba(10, 10, 10, 0.8)';
    errorGraphCtx.fillRect(0, 0, 120, 60);
    
    // Draw error curve
    errorGraphCtx.strokeStyle = '#ff6b35';
    errorGraphCtx.lineWidth = 2;
    errorGraphCtx.beginPath();
    
    for (let i = 0; i < reconstructionError.length; i++) {
        const x = (i / (reconstructionError.length - 1)) * 120;
        const y = 60 - (reconstructionError[i] * 50);
        
        if (i === 0) {
            errorGraphCtx.moveTo(x, y);
        } else {
            errorGraphCtx.lineTo(x, y);
        }
    }
    
    errorGraphCtx.stroke();
}

function updateSwarmStats() {
    setInterval(() => {
        const droneCountEl = document.getElementById('drone-count');
        const progressEl = document.getElementById('formation-progress');
        
        if (droneCountEl && progressEl) {
            // Add subtle animation to stats for scanning drones
            const currentCount = parseInt(droneCountEl.textContent);
            if (currentCount < 12) {
                droneCountEl.textContent = Math.min(12, currentCount + 1).toString();
            }
        }
    }, 200);
}

// Robotic Arm Blueprint System
let roboticArmCanvas, roboticArmCtx;
let armSegments = [];
let energyOrb = { x: 0, y: 0, brightness: 1, angle: 0 };

function initializeRoboticArm() {
    roboticArmCanvas = document.getElementById('robotic-arm-canvas');
    if (!roboticArmCanvas) return;
    
    roboticArmCtx = roboticArmCanvas.getContext('2d');
    
    // Set canvas size
    resizeRoboticArmCanvas();
    window.addEventListener('resize', resizeRoboticArmCanvas);
    
    // Create robotic arm segments
    createRoboticArmSegments();
    
    // Start animation loop
    animateRoboticArm();
}

function resizeRoboticArmCanvas() {
    if (!roboticArmCanvas) return;
    
    const container = roboticArmCanvas.parentElement;
    roboticArmCanvas.width = container.offsetWidth;
    roboticArmCanvas.height = container.offsetHeight;
}

function createRoboticArmSegments() {
    // Define 6-DOF robotic arm segments
    armSegments = [
        { length: 60, angle: 0, baseAngle: 0, speed: 0.8, x: 150, y: 350 }, // Base
        { length: 80, angle: -30, baseAngle: -30, speed: 1.2, x: 0, y: 0 }, // Shoulder
        { length: 70, angle: 45, baseAngle: 45, speed: 1.5, x: 0, y: 0 }, // Elbow
        { length: 50, angle: -20, baseAngle: -20, speed: 2.0, x: 0, y: 0 }, // Wrist 1
        { length: 30, angle: 10, baseAngle: 10, speed: 2.5, x: 0, y: 0 }, // Wrist 2
        { length: 25, angle: 0, baseAngle: 0, speed: 3.0, x: 0, y: 0 }  // End effector
    ];
}

function animateRoboticArm() {
    if (!roboticArmCtx) return;
    
    // Clear canvas
    roboticArmCtx.clearRect(0, 0, roboticArmCanvas.width, roboticArmCanvas.height);
    
    const time = Date.now() * 0.001;
    
    // Update arm segment angles with smooth motion
    armSegments.forEach((segment, index) => {
        segment.angle = segment.baseAngle + Math.sin(time * segment.speed) * 15;
    });
    
    // Calculate forward kinematics
    let currentX = armSegments[0].x;
    let currentY = armSegments[0].y;
    let cumulativeAngle = 0;
    
    for (let i = 0; i < armSegments.length; i++) {
        const segment = armSegments[i];
        cumulativeAngle += segment.angle * Math.PI / 180;
        
        const nextX = currentX + Math.cos(cumulativeAngle) * segment.length;
        const nextY = currentY + Math.sin(cumulativeAngle) * segment.length;
        
        segment.x = currentX;
        segment.y = currentY;
        segment.endX = nextX;
        segment.endY = nextY;
        
        currentX = nextX;
        currentY = nextY;
    }
    
    // Update energy orb position (end effector position)
    const lastSegment = armSegments[armSegments.length - 1];
    energyOrb.x = lastSegment.endX;
    energyOrb.y = lastSegment.endY;
    energyOrb.brightness = 0.7 + 0.3 * Math.sin(time * 4);
    energyOrb.angle += 0.1;
    
    // Draw robotic arm wireframe
    drawRoboticArmWireframe();
    
    // Draw kinematic data and measurement arcs
    drawKinematicData();
    
    // Draw energy orb
    drawEnergyOrb();
    
    requestAnimationFrame(animateRoboticArm);
}

function drawRoboticArmWireframe() {
    roboticArmCtx.strokeStyle = 'rgba(0, 212, 255, 0.6)';
    roboticArmCtx.lineWidth = 2;
    roboticArmCtx.lineCap = 'round';
    
    // Draw arm segments
    for (let i = 0; i < armSegments.length; i++) {
        const segment = armSegments[i];
        
        roboticArmCtx.beginPath();
        roboticArmCtx.moveTo(segment.x, segment.y);
        roboticArmCtx.lineTo(segment.endX, segment.endY);
        roboticArmCtx.stroke();
        
        // Draw joints
        roboticArmCtx.fillStyle = 'rgba(0, 212, 255, 0.8)';
        roboticArmCtx.beginPath();
        roboticArmCtx.arc(segment.x, segment.y, 4, 0, Math.PI * 2);
        roboticArmCtx.fill();
        
        // Draw joint frame (coordinate system)
        if (i < 3) { // Only show for main joints
            const angle = armSegments.slice(0, i + 1).reduce((sum, seg) => sum + seg.angle, 0) * Math.PI / 180;
            drawCoordinateFrame(segment.x, segment.y, angle, 15);
        }
    }
    
    // Draw base platform
    roboticArmCtx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
    roboticArmCtx.beginPath();
    roboticArmCtx.arc(armSegments[0].x, armSegments[0].y, 20, 0, Math.PI * 2);
    roboticArmCtx.stroke();
}

function drawCoordinateFrame(x, y, angle, size) {
    roboticArmCtx.lineWidth = 1.5;
    
    // X-axis (red)
    roboticArmCtx.strokeStyle = 'rgba(255, 107, 53, 0.7)';
    roboticArmCtx.beginPath();
    roboticArmCtx.moveTo(x, y);
    roboticArmCtx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
    roboticArmCtx.stroke();
    
    // Y-axis (green)
    roboticArmCtx.strokeStyle = 'rgba(0, 255, 136, 0.7)';
    roboticArmCtx.beginPath();
    roboticArmCtx.moveTo(x, y);
    roboticArmCtx.lineTo(x + Math.cos(angle + Math.PI/2) * size, y + Math.sin(angle + Math.PI/2) * size);
    roboticArmCtx.stroke();
}

function drawKinematicData() {
    // Draw measurement arcs at key joints
    armSegments.forEach((segment, index) => {
        if (index < 3) { // Main joints only
            const startAngle = index === 0 ? 0 : armSegments.slice(0, index).reduce((sum, seg) => sum + seg.angle, 0) * Math.PI / 180;
            const endAngle = startAngle + segment.angle * Math.PI / 180;
            
            roboticArmCtx.strokeStyle = 'rgba(255, 107, 53, 0.5)';
            roboticArmCtx.lineWidth = 1;
            roboticArmCtx.beginPath();
            roboticArmCtx.arc(segment.x, segment.y, 25 + index * 5, startAngle, endAngle);
            roboticArmCtx.stroke();
            
            // Add angle text
            const midAngle = (startAngle + endAngle) / 2;
            const textX = segment.x + Math.cos(midAngle) * (30 + index * 5);
            const textY = segment.y + Math.sin(midAngle) * (30 + index * 5);
            
            roboticArmCtx.fillStyle = 'rgba(0, 212, 255, 0.8)';
            roboticArmCtx.font = '10px Orbitron';
            roboticArmCtx.textAlign = 'center';
            roboticArmCtx.fillText(`${segment.angle.toFixed(1)}°`, textX, textY);
        }
    });
}

function drawEnergyOrb() {
    // Draw shimmering energy orb at end effector
    const orbSize = 8 + 3 * Math.sin(Date.now() * 0.008);
    
    // Main orb
    roboticArmCtx.fillStyle = `rgba(255, 107, 53, ${energyOrb.brightness})`;
    roboticArmCtx.beginPath();
    roboticArmCtx.arc(energyOrb.x, energyOrb.y, orbSize, 0, Math.PI * 2);
    roboticArmCtx.fill();
    
    // Glow effect
    roboticArmCtx.shadowColor = '#ff6b35';
    roboticArmCtx.shadowBlur = 15;
    roboticArmCtx.fill();
    roboticArmCtx.shadowBlur = 0;
    
    // Energy particles around orb
    for (let i = 0; i < 6; i++) {
        const particleAngle = energyOrb.angle + (i * Math.PI * 2 / 6);
        const particleRadius = 15 + 5 * Math.sin(Date.now() * 0.01 + i);
        const particleX = energyOrb.x + Math.cos(particleAngle) * particleRadius;
        const particleY = energyOrb.y + Math.sin(particleAngle) * particleRadius;
        
        roboticArmCtx.fillStyle = 'rgba(0, 212, 255, 0.6)';
        roboticArmCtx.beginPath();
        roboticArmCtx.arc(particleX, particleY, 2, 0, Math.PI * 2);
        roboticArmCtx.fill();
    }
}

// CFD Simulation System
let cfdCanvas, cfdCtx;
let streamlines = [];
let vortices = [];
let flowField = [];

function initializeCFDSimulation() {
    cfdCanvas = document.getElementById('cfd-canvas');
    if (!cfdCanvas) return;
    
    cfdCtx = cfdCanvas.getContext('2d');
    
    // Set canvas size
    resizeCFDCanvas();
    window.addEventListener('resize', resizeCFDCanvas);
    
    // Create flow field and streamlines
    createFlowField();
    createStreamlines();
    createVortices();
    
    // Start animation loop
    animateCFDSimulation();
}

function resizeCFDCanvas() {
    if (!cfdCanvas) return;
    
    const container = cfdCanvas.parentElement;
    cfdCanvas.width = container.offsetWidth;
    cfdCanvas.height = container.offsetHeight;
}

function createFlowField() {
    flowField = [];
    const gridSize = 20;
    
    for (let x = 0; x < cfdCanvas.width; x += gridSize) {
        for (let y = 0; y < cfdCanvas.height; y += gridSize) {
            // Create a complex flow pattern around the robotic arm workspace
            const centerX = cfdCanvas.width * 0.3;
            const centerY = cfdCanvas.height * 0.6;
            
            const dx = x - centerX;
            const dy = y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Create swirling flow around the workspace
            const angle = Math.atan2(dy, dx) + Math.sin(distance * 0.02) * 0.5;
            const speed = Math.max(0.1, 2 - distance * 0.01);
            
            flowField.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                pressure: Math.sin(distance * 0.05) * 0.5 + 0.5
            });
        }
    }
}

function createStreamlines() {
    streamlines = [];
    
    for (let i = 0; i < 25; i++) {
        const startX = Math.random() * cfdCanvas.width;
        const startY = Math.random() * cfdCanvas.height;
        
        streamlines.push({
            points: [{x: startX, y: startY}],
            maxLength: 80,
            age: 0,
            color: `hsl(${180 + Math.random() * 40}, 70%, 60%)`, // Cyan to blue range
            opacity: 0.6 + Math.random() * 0.4
        });
    }
}

function createVortices() {
    vortices = [];
    
    // Create 3-4 main vortices in the flow
    for (let i = 0; i < 4; i++) {
        vortices.push({
            x: Math.random() * cfdCanvas.width,
            y: Math.random() * cfdCanvas.height,
            radius: 20 + Math.random() * 30,
            strength: (Math.random() - 0.5) * 0.02,
            age: 0,
            maxAge: 300 + Math.random() * 200
        });
    }
}

function animateCFDSimulation() {
    if (!cfdCtx) return;
    
    // Clear canvas with fade effect
    cfdCtx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    cfdCtx.fillRect(0, 0, cfdCanvas.width, cfdCanvas.height);
    
    const time = Date.now() * 0.001;
    
    // Update and draw streamlines
    streamlines.forEach((streamline, index) => {
        const currentPoint = streamline.points[streamline.points.length - 1];
        
        // Calculate flow velocity at current position
        let vx = 0, vy = 0;
        
        // Sample from flow field
        const gridX = Math.floor(currentPoint.x / 20) * 20;
        const gridY = Math.floor(currentPoint.y / 20) * 20;
        
        const fieldPoint = flowField.find(p => p.x === gridX && p.y === gridY);
        if (fieldPoint) {
            vx += fieldPoint.vx;
            vy += fieldPoint.vy;
        }
        
        // Add vortex influences
        vortices.forEach(vortex => {
            const dx = currentPoint.x - vortex.x;
            const dy = currentPoint.y - vortex.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < vortex.radius * 2) {
                const influence = vortex.strength * (1 - distance / (vortex.radius * 2));
                vx += -dy * influence;
                vy += dx * influence;
            }
        });
        
        // Add some turbulence
        vx += (Math.random() - 0.5) * 0.5;
        vy += (Math.random() - 0.5) * 0.5;
        
        // Add new point to streamline
        const newX = currentPoint.x + vx;
        const newY = currentPoint.y + vy;
        
        // Boundary conditions
        if (newX > 0 && newX < cfdCanvas.width && newY > 0 && newY < cfdCanvas.height) {
            streamline.points.push({x: newX, y: newY});
        } else {
            // Restart streamline from random position
            streamline.points = [{
                x: Math.random() * cfdCanvas.width,
                y: Math.random() * cfdCanvas.height
            }];
        }
        
        // Limit streamline length
        if (streamline.points.length > streamline.maxLength) {
            streamline.points.shift();
        }
        
        // Draw streamline
        if (streamline.points.length > 1) {
            cfdCtx.strokeStyle = streamline.color.replace('60%', `${streamline.opacity * 60}%`);
            cfdCtx.lineWidth = 1.5;
            cfdCtx.lineCap = 'round';
            
            cfdCtx.beginPath();
            cfdCtx.moveTo(streamline.points[0].x, streamline.points[0].y);
            
            for (let i = 1; i < streamline.points.length; i++) {
                const alpha = i / streamline.points.length;
                cfdCtx.globalAlpha = alpha * streamline.opacity;
                cfdCtx.lineTo(streamline.points[i].x, streamline.points[i].y);
            }
            
            cfdCtx.stroke();
            cfdCtx.globalAlpha = 1;
        }
    });
    
    // Update and draw vortices
    vortices.forEach((vortex, index) => {
        vortex.age++;
        
        // Move vortices slowly
        vortex.x += Math.sin(time * 0.5 + index) * 0.3;
        vortex.y += Math.cos(time * 0.3 + index) * 0.2;
        
        // Draw vortex as spiral
        const spiralTurns = 3;
        const maxRadius = vortex.radius;
        
        cfdCtx.strokeStyle = `rgba(0, 212, 255, 0.4)`;
        cfdCtx.lineWidth = 2;
        
        cfdCtx.beginPath();
        for (let angle = 0; angle < spiralTurns * Math.PI * 2; angle += 0.2) {
            const radius = (angle / (spiralTurns * Math.PI * 2)) * maxRadius;
            const x = vortex.x + Math.cos(angle + time * vortex.strength * 10) * radius;
            const y = vortex.y + Math.sin(angle + time * vortex.strength * 10) * radius;
            
            if (angle === 0) {
                cfdCtx.moveTo(x, y);
            } else {
                cfdCtx.lineTo(x, y);
            }
        }
        cfdCtx.stroke();
        
        // Regenerate vortex if too old
        if (vortex.age > vortex.maxAge) {
            vortex.x = Math.random() * cfdCanvas.width;
            vortex.y = Math.random() * cfdCanvas.height;
            vortex.age = 0;
        }
    });
    
    requestAnimationFrame(animateCFDSimulation);
}

// Thruster Simulation System
let thrusterCanvas, thrusterCtx;
let shockDiamonds = [];
let exhaustParticles = [];
let pressureWaves = [];

function initializeThrusterSimulation() {
    thrusterCanvas = document.getElementById('thruster-canvas');
    if (!thrusterCanvas) return;
    
    thrusterCtx = thrusterCanvas.getContext('2d');
    
    // Set canvas size
    resizeThrusterCanvas();
    window.addEventListener('resize', resizeThrusterCanvas);
    
    // Create thruster elements
    createShockDiamonds();
    createExhaustParticles();
    createPressureWaves();
    
    // Start animation loop
    animateThrusterSimulation();
}

function resizeThrusterCanvas() {
    if (!thrusterCanvas) return;
    
    const container = thrusterCanvas.parentElement;
    thrusterCanvas.width = container.offsetWidth;
    thrusterCanvas.height = container.offsetHeight;
}

function createShockDiamonds() {
    shockDiamonds = [];
    
    // Create diamond pattern in exhaust plume
    for (let i = 0; i < 6; i++) {
        shockDiamonds.push({
            x: 30 + i * 25,
            y: thrusterCanvas.height * 0.5,
            width: 20 - i * 2,
            height: 15 - i * 1.5,
            phase: i * Math.PI / 3,
            intensity: 0.8 - i * 0.1
        });
    }
}

function createExhaustParticles() {
    exhaustParticles = [];
    
    for (let i = 0; i < 60; i++) {
        exhaustParticles.push({
            x: 10 + Math.random() * 20,
            y: thrusterCanvas.height * 0.5 + (Math.random() - 0.5) * 20,
            vx: 2 + Math.random() * 3,
            vy: (Math.random() - 0.5) * 0.5,
            size: 1 + Math.random() * 2,
            temperature: 0.7 + Math.random() * 0.3,
            life: 1
        });
    }
}

function createPressureWaves() {
    pressureWaves = [];
    
    for (let i = 0; i < 4; i++) {
        pressureWaves.push({
            x: 20,
            y: thrusterCanvas.height * 0.5,
            radius: 20 + i * 15,
            maxRadius: 80,
            speed: 0.8 + i * 0.2,
            intensity: 0.6 - i * 0.1
        });
    }
}

function animateThrusterSimulation() {
    if (!thrusterCtx) return;
    
    // Clear canvas
    thrusterCtx.fillStyle = 'rgba(10, 10, 10, 0.2)';
    thrusterCtx.fillRect(0, 0, thrusterCanvas.width, thrusterCanvas.height);
    
    const time = Date.now() * 0.001;
    
    // Draw shock diamonds
    shockDiamonds.forEach((diamond, index) => {
        const oscillation = Math.sin(time * 3 + diamond.phase) * 0.3;
        
        thrusterCtx.strokeStyle = `rgba(255, 107, 53, ${diamond.intensity + oscillation})`;
        thrusterCtx.lineWidth = 2;
        
        // Draw diamond shape
        thrusterCtx.beginPath();
        thrusterCtx.moveTo(diamond.x - diamond.width/2, diamond.y);
        thrusterCtx.lineTo(diamond.x, diamond.y - diamond.height/2);
        thrusterCtx.lineTo(diamond.x + diamond.width/2, diamond.y);
        thrusterCtx.lineTo(diamond.x, diamond.y + diamond.height/2);
        thrusterCtx.closePath();
        thrusterCtx.stroke();
        
        // Add glow effect
        thrusterCtx.shadowColor = '#ff6b35';
        thrusterCtx.shadowBlur = 8;
        thrusterCtx.stroke();
        thrusterCtx.shadowBlur = 0;
    });
    
    // Update and draw exhaust particles
    exhaustParticles.forEach((particle, index) => {
        // Update particle physics
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += (Math.random() - 0.5) * 0.1; // Turbulence
        particle.life -= 0.01;
        particle.size *= 0.995;
        
        // Temperature-based color
        const red = Math.floor(255 * particle.temperature);
        const green = Math.floor(150 * (1 - particle.temperature));
        const blue = Math.floor(50 * (1 - particle.temperature));
        
        thrusterCtx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${particle.life})`;
        thrusterCtx.beginPath();
        thrusterCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        thrusterCtx.fill();
        
        // Reset particle if dead or out of bounds
        if (particle.life <= 0 || particle.x > thrusterCanvas.width) {
            particle.x = 10 + Math.random() * 20;
            particle.y = thrusterCanvas.height * 0.5 + (Math.random() - 0.5) * 20;
            particle.vx = 2 + Math.random() * 3;
            particle.vy = (Math.random() - 0.5) * 0.5;
            particle.size = 1 + Math.random() * 2;
            particle.temperature = 0.7 + Math.random() * 0.3;
            particle.life = 1;
        }
    });
    
    // Update and draw pressure waves
    pressureWaves.forEach((wave, index) => {
        wave.radius += wave.speed;
        
        if (wave.radius > wave.maxRadius) {
            wave.radius = 20;
        }
        
        thrusterCtx.strokeStyle = `rgba(0, 212, 255, ${wave.intensity * (1 - wave.radius / wave.maxRadius)})`;
        thrusterCtx.lineWidth = 1;
        thrusterCtx.beginPath();
        thrusterCtx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        thrusterCtx.stroke();
    });
    
    // Draw velocity vectors
    for (let i = 0; i < 8; i++) {
        const x = 40 + i * 20;
        const y = thrusterCanvas.height * 0.5 + Math.sin(time * 2 + i * 0.5) * 10;
        const length = 15 + Math.sin(time * 3 + i) * 5;
        
        thrusterCtx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
        thrusterCtx.lineWidth = 1.5;
        thrusterCtx.beginPath();
        thrusterCtx.moveTo(x, y);
        thrusterCtx.lineTo(x + length, y);
        
        // Arrowhead
        thrusterCtx.lineTo(x + length - 3, y - 2);
        thrusterCtx.moveTo(x + length, y);
        thrusterCtx.lineTo(x + length - 3, y + 2);
        thrusterCtx.stroke();
    }
    
    requestAnimationFrame(animateThrusterSimulation);
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