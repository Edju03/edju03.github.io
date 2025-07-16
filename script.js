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

// Pathfinding Swarm System
let droneSwarmCanvas, droneSwarmCtx;
let drones = [];
let maze = [];
let mazeWidth = 25;
let mazeHeight = 20;
let cellSize = 20;
let startPoint = {x: 1, y: 1};
let endPoint = {x: 23, y: 18};
let solutionPath = [];
let animationTime = 0;
let simulationStartTime = 0;
let pathFound = false;

function initializeDroneSwarm() {
    droneSwarmCanvas = document.getElementById('drone-swarm-canvas');
    if (!droneSwarmCanvas) return;
    
    droneSwarmCtx = droneSwarmCanvas.getContext('2d');
    
    // Set canvas size
    resizeDroneCanvas();
    window.addEventListener('resize', resizeDroneCanvas);
    
    // Generate complex maze
    generateMaze();
    
    // Create micro-drones for pathfinding
    createPathfindingSwarm();
    
    // Start animation loop
    animatePathfindingSwarm();
    
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

function generateMaze() {
    // Initialize maze with walls
    maze = [];
    for (let y = 0; y < mazeHeight; y++) {
        maze[y] = [];
        for (let x = 0; x < mazeWidth; x++) {
            maze[y][x] = 1; // 1 = wall, 0 = path
        }
    }
    
    // Recursive backtracking maze generation
    function carvePath(x, y) {
        maze[y][x] = 0;
        
        const directions = [
            [0, -2], [2, 0], [0, 2], [-2, 0]
        ].sort(() => Math.random() - 0.5);
        
        for (let [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx > 0 && nx < mazeWidth - 1 && ny > 0 && ny < mazeHeight - 1 && maze[ny][nx] === 1) {
                maze[y + dy/2][x + dx/2] = 0;
                carvePath(nx, ny);
            }
        }
    }
    
    carvePath(startPoint.x, startPoint.y);
    
    // Ensure start and end are paths
    maze[startPoint.y][startPoint.x] = 0;
    maze[endPoint.y][endPoint.x] = 0;
    
    // Add some additional paths for complexity
    for (let i = 0; i < 15; i++) {
        const x = Math.floor(Math.random() * (mazeWidth - 2)) + 1;
        const y = Math.floor(Math.random() * (mazeHeight - 2)) + 1;
        if (Math.random() < 0.3) maze[y][x] = 0;
    }
}

function createPathfindingSwarm() {
    const droneCount = 800; // Swarm agents for pathfinding
    
    // A* pathfinding algorithm to find solution
    solutionPath = findPath(startPoint, endPoint);
    
    for (let i = 0; i < droneCount; i++) {
        // Start drones at random valid positions
        let startX, startY;
        do {
            startX = Math.floor(Math.random() * mazeWidth);
            startY = Math.floor(Math.random() * mazeHeight);
        } while (maze[startY][startX] === 1);
        
        drones.push({
            mazeX: startX,
            mazeY: startY,
            x: startX * cellSize + cellSize/2 + 50,
            y: startY * cellSize + cellSize/2 + 50,
            targetX: endPoint.x * cellSize + cellSize/2 + 50,
            targetY: endPoint.y * cellSize + cellSize/2 + 50,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.2 + 0.8,
            brightness: Math.random() * 0.4 + 0.6,
            trailX: [],
            trailY: [],
            explorationRadius: Math.random() * 3 + 2,
            pathfindingState: 'exploring', // exploring, following, arrived
            foundPath: false,
            pathIndex: 0,
            lastMove: Date.now()
        });
    }
    
    // Update drone count display
    document.getElementById('drone-count').textContent = droneCount.toLocaleString();
}

function findPath(start, end) {
    // A* pathfinding implementation
    const openList = [{x: start.x, y: start.y, f: 0, g: 0, h: 0, parent: null}];
    const closedList = [];
    
    while (openList.length > 0) {
        let current = openList[0];
        let currentIndex = 0;
        
        for (let i = 1; i < openList.length; i++) {
            if (openList[i].f < current.f) {
                current = openList[i];
                currentIndex = i;
            }
        }
        
        openList.splice(currentIndex, 1);
        closedList.push(current);
        
        if (current.x === end.x && current.y === end.y) {
            const path = [];
            let curr = current;
            while (curr) {
                path.unshift({x: curr.x, y: curr.y});
                curr = curr.parent;
            }
            return path;
        }
        
        const neighbors = [
            {x: current.x + 1, y: current.y},
            {x: current.x - 1, y: current.y},
            {x: current.x, y: current.y + 1},
            {x: current.x, y: current.y - 1}
        ];
        
        for (let neighbor of neighbors) {
            if (neighbor.x < 0 || neighbor.x >= mazeWidth || 
                neighbor.y < 0 || neighbor.y >= mazeHeight ||
                maze[neighbor.y][neighbor.x] === 1) continue;
            
            if (closedList.some(node => node.x === neighbor.x && node.y === neighbor.y)) continue;
            
            const g = current.g + 1;
            const h = Math.abs(neighbor.x - end.x) + Math.abs(neighbor.y - end.y);
            const f = g + h;
            
            const existing = openList.find(node => node.x === neighbor.x && node.y === neighbor.y);
            if (!existing) {
                openList.push({...neighbor, f, g, h, parent: current});
            } else if (g < existing.g) {
                existing.g = g;
                existing.f = f;
                existing.parent = current;
            }
        }
    }
    
    return []; // No path found
}

function animatePathfindingSwarm() {
    if (!droneSwarmCtx) return;
    
    animationTime += 16; // ~60fps
    
    // Clear canvas with trail effect
    droneSwarmCtx.fillStyle = 'rgba(10, 10, 10, 0.15)';
    droneSwarmCtx.fillRect(0, 0, droneSwarmCanvas.width, droneSwarmCanvas.height);
    
    // Draw maze structure
    drawMaze();
    
    // Update simulation time
    const elapsedTime = (Date.now() - simulationStartTime) / 1000;
    document.getElementById('solution-time').textContent = elapsedTime.toFixed(2) + 's';
    
    // Check if solution is converged
    const arrivedDrones = drones.filter(d => d.pathfindingState === 'arrived').length;
    const progressPercent = Math.floor((arrivedDrones / drones.length) * 100);
    
    if (!pathFound && progressPercent > 15) {
        pathFound = true;
        document.getElementById('formation-progress').textContent = 'SOLUTION CONVERGED';
    } else if (!pathFound) {
        document.getElementById('formation-progress').textContent = 'ANALYZING';
    }
    
    // Animate pathfinding drones
    drones.forEach((drone, index) => {
        // Pathfinding behavior
        if (drone.pathfindingState === 'exploring') {
            // Random exploration with bias toward target
            const targetAngle = Math.atan2(drone.targetY - drone.y, drone.targetX - drone.x);
            const explorationAngle = targetAngle + (Math.random() - 0.5) * Math.PI;
            
            drone.vx += Math.cos(explorationAngle) * 0.3;
            drone.vy += Math.sin(explorationAngle) * 0.3;
            
            // Check if close to solution path
            if (solutionPath.length > 0) {
                for (let pathPoint of solutionPath) {
                    const pathX = pathPoint.x * cellSize + cellSize/2 + 50;
                    const pathY = pathPoint.y * cellSize + cellSize/2 + 50;
                    const dist = Math.sqrt((drone.x - pathX) ** 2 + (drone.y - pathY) ** 2);
                    
                    if (dist < 30 && Math.random() < 0.1) {
                        drone.pathfindingState = 'following';
                        drone.foundPath = true;
                        break;
                    }
                }
            }
        } else if (drone.pathfindingState === 'following' && solutionPath.length > 0) {
            // Follow the solution path
            const targetIndex = Math.min(drone.pathIndex, solutionPath.length - 1);
            const pathPoint = solutionPath[targetIndex];
            const pathX = pathPoint.x * cellSize + cellSize/2 + 50;
            const pathY = pathPoint.y * cellSize + cellSize/2 + 50;
            
            drone.vx += (pathX - drone.x) * 0.08;
            drone.vy += (pathY - drone.y) * 0.08;
            
            const dist = Math.sqrt((drone.x - pathX) ** 2 + (drone.y - pathY) ** 2);
            if (dist < 15 && drone.pathIndex < solutionPath.length - 1) {
                drone.pathIndex++;
            } else if (drone.pathIndex >= solutionPath.length - 1 && dist < 20) {
                drone.pathfindingState = 'arrived';
            }
        }
        
        // Apply velocity damping and constraints
        drone.vx *= 0.92;
        drone.vy *= 0.92;
        
        // Update position
        drone.x += drone.vx;
        drone.y += drone.vy;
        
        // Boundary constraints (keep in maze area)
        drone.x = Math.max(50, Math.min(drone.x, mazeWidth * cellSize + 50));
        drone.y = Math.max(50, Math.min(drone.y, mazeHeight * cellSize + 50));
        
        // Wall collision detection and avoidance
        const mazeX = Math.floor((drone.x - 50) / cellSize);
        const mazeY = Math.floor((drone.y - 50) / cellSize);
        
        if (mazeX >= 0 && mazeX < mazeWidth && mazeY >= 0 && mazeY < mazeHeight) {
            if (maze[mazeY][mazeX] === 1) {
                drone.vx *= -0.5;
                drone.vy *= -0.5;
                drone.x += drone.vx * 2;
                drone.y += drone.vy * 2;
            }
        }
        
        // Store trail
        drone.trailX.push(drone.x);
        drone.trailY.push(drone.y);
        if (drone.trailX.length > 8) {
            drone.trailX.shift();
            drone.trailY.shift();
        }
        
        // Draw drone trail with different colors based on state
        if (drone.trailX.length > 1) {
            droneSwarmCtx.beginPath();
            droneSwarmCtx.moveTo(drone.trailX[0], drone.trailY[0]);
            for (let i = 1; i < drone.trailX.length; i++) {
                droneSwarmCtx.lineTo(drone.trailX[i], drone.trailY[i]);
            }
            
            let trailColor = '0, 212, 255'; // cyan for exploring
            if (drone.pathfindingState === 'following') trailColor = '0, 255, 136'; // green for following
            if (drone.pathfindingState === 'arrived') trailColor = '255, 107, 53'; // orange for arrived
            
            droneSwarmCtx.strokeStyle = `rgba(${trailColor}, ${0.4 * drone.brightness})`;
            droneSwarmCtx.lineWidth = 0.8;
            droneSwarmCtx.stroke();
        }
        
        // Draw drone with state-based coloring
        let droneColor = '0, 212, 255'; // cyan for exploring
        let glowIntensity = 0.6;
        
        if (drone.pathfindingState === 'following') {
            droneColor = '0, 255, 136'; // green for following path
            glowIntensity = 0.8;
        } else if (drone.pathfindingState === 'arrived') {
            droneColor = '255, 107, 53'; // orange for arrived
            glowIntensity = 1.0;
        }
        
        const alpha = drone.brightness * (0.7 + 0.3 * Math.sin(animationTime * 0.008 + index));
        
        droneSwarmCtx.beginPath();
        droneSwarmCtx.arc(drone.x, drone.y, drone.size, 0, Math.PI * 2);
        droneSwarmCtx.fillStyle = `rgba(${droneColor}, ${alpha})`;
        droneSwarmCtx.fill();
        
        // Add glow effect
        droneSwarmCtx.shadowColor = `rgb(${droneColor})`;
        droneSwarmCtx.shadowBlur = 4 * glowIntensity;
        droneSwarmCtx.fill();
        droneSwarmCtx.shadowBlur = 0;
    });
    
    // Draw solution path if found
    if (pathFound && solutionPath.length > 1) {
        drawSolutionPath();
    }
    
    requestAnimationFrame(animatePathfindingSwarm);
}

function drawMaze() {
    // Draw maze structure as wireframe
    droneSwarmCtx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
    droneSwarmCtx.lineWidth = 1;
    
    for (let y = 0; y < mazeHeight; y++) {
        for (let x = 0; x < mazeWidth; x++) {
            if (maze[y][x] === 1) { // Wall
                const posX = x * cellSize + 50;
                const posY = y * cellSize + 50;
                
                droneSwarmCtx.strokeRect(posX, posY, cellSize, cellSize);
            }
        }
    }
    
    // Draw start and end points with special highlighting
    droneSwarmCtx.fillStyle = 'rgba(0, 255, 136, 0.6)';
    droneSwarmCtx.fillRect(
        startPoint.x * cellSize + 50 + 2, 
        startPoint.y * cellSize + 50 + 2, 
        cellSize - 4, cellSize - 4
    );
    
    droneSwarmCtx.fillStyle = 'rgba(255, 107, 53, 0.6)';
    droneSwarmCtx.fillRect(
        endPoint.x * cellSize + 50 + 2, 
        endPoint.y * cellSize + 50 + 2, 
        cellSize - 4, cellSize - 4
    );
}

function drawSolutionPath() {
    if (solutionPath.length < 2) return;
    
    // Draw the optimal path with glowing effect
    droneSwarmCtx.strokeStyle = 'rgba(255, 107, 53, 0.8)';
    droneSwarmCtx.lineWidth = 3;
    droneSwarmCtx.lineCap = 'round';
    droneSwarmCtx.lineJoin = 'round';
    
    droneSwarmCtx.beginPath();
    for (let i = 0; i < solutionPath.length; i++) {
        const point = solutionPath[i];
        const x = point.x * cellSize + cellSize/2 + 50;
        const y = point.y * cellSize + cellSize/2 + 50;
        
        if (i === 0) {
            droneSwarmCtx.moveTo(x, y);
        } else {
            droneSwarmCtx.lineTo(x, y);
        }
    }
    
    // Add glow effect to solution path
    droneSwarmCtx.shadowColor = '#ff6b35';
    droneSwarmCtx.shadowBlur = 8;
    droneSwarmCtx.stroke();
    droneSwarmCtx.shadowBlur = 0;
    
    // Draw path nodes
    droneSwarmCtx.fillStyle = 'rgba(255, 107, 53, 0.9)';
    for (let point of solutionPath) {
        const x = point.x * cellSize + cellSize/2 + 50;
        const y = point.y * cellSize + cellSize/2 + 50;
        
        droneSwarmCtx.beginPath();
        droneSwarmCtx.arc(x, y, 2, 0, Math.PI * 2);
        droneSwarmCtx.fill();
    }
}

function updateSwarmStats() {
    setInterval(() => {
        const droneCountEl = document.getElementById('drone-count');
        const progressEl = document.getElementById('formation-progress');
        
        if (droneCountEl && progressEl) {
            // Add subtle animation to stats (update for smaller drone count)
            const currentCount = parseInt(droneCountEl.textContent.replace(/,/g, ''));
            if (currentCount < 800) {
                droneCountEl.textContent = Math.min(800, currentCount + 25).toLocaleString();
            }
        }
    }, 100);
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