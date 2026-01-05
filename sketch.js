// Abstract Clock: Dogs Running Around a Field
// Hour, Minute, and Second are represented by three dogs running around concentric circular paths

let lastMinute = -1;
let fieldCenterX, fieldCenterY;
let hourRadius, minuteRadius, secondRadius;
let fieldRadius;

// Color scheme matching the reference design
const hourColor = { r: 255, g: 50, b: 50 };      // Red for hour
const minuteColor = { r: 50, g: 255, b: 255 };   // Cyan for minute
const secondColor = { r: 255, g: 255, b: 255 };  // White for second

function setup() {
    // Create canvas that fits well on screen
    let canvas = createCanvas(800, 800);
    canvas.parent('canvas-container');
    
    fieldCenterX = width / 2;
    fieldCenterY = height / 2;
    fieldRadius = min(width, height) * 0.4;
    
    // Three concentric circles for the three dogs
    hourRadius = fieldRadius * 0.85;    // Outermost (largest circle)
    minuteRadius = fieldRadius * 0.60;  // Middle circle
    secondRadius = fieldRadius * 0.35;  // Innermost (smallest circle)
}

function draw() {
    // Field background - dark green field color
    background(12, 25, 8);
    
    // Draw subtle grass texture
    drawGrass();
    
    // Draw the circular paths (very subtle guides - like worn paths)
    noFill();
    stroke(25, 35, 20, 30);
    strokeWeight(0.5);
    circle(fieldCenterX, fieldCenterY, hourRadius * 2);
    circle(fieldCenterX, fieldCenterY, minuteRadius * 2);
    circle(fieldCenterX, fieldCenterY, secondRadius * 2);
    
    // Get current time
    let h = hour() % 12; // 12-hour format (0-11)
    let m = minute();
    let s = second();
    
    // Log minute when it changes
    if (m !== lastMinute) {
        console.log("Minute:", m);
        lastMinute = m;
    }
    
    // Map time values to angles
    // Hour: 0-11 maps to 0-360 degrees (12 hours = full circle)
    // Minute: 0-59 maps to 0-360 degrees (60 minutes = full circle)
    // Second: 0-59 maps to 0-360 degrees (60 seconds = full circle)
    let hourAngle = map(h, 0, 12, 0, TWO_PI) - HALF_PI; // Start at top
    let minuteAngle = map(m, 0, 60, 0, TWO_PI) - HALF_PI;
    let secondAngle = map(s, 0, 60, 0, TWO_PI) - HALF_PI;
    
    // Calculate positions for each dog
    let hourX = fieldCenterX + cos(hourAngle) * hourRadius;
    let hourY = fieldCenterY + sin(hourAngle) * hourRadius;
    
    let minuteX = fieldCenterX + cos(minuteAngle) * minuteRadius;
    let minuteY = fieldCenterY + sin(minuteAngle) * minuteRadius;
    
    let secondX = fieldCenterX + cos(secondAngle) * secondRadius;
    let secondY = fieldCenterY + sin(secondAngle) * secondRadius;
    
    // Draw the dogs
    drawDog(hourX, hourY, hourAngle, hourColor, hourRadius, 'H');
    drawDog(minuteX, minuteY, minuteAngle, minuteColor, minuteRadius, 'M');
    drawDog(secondX, secondY, secondAngle, secondColor, secondRadius, 'S');
}

function drawDog(x, y, angle, dogColor, radius, type) {
    push();
    translate(x, y);
    rotate(angle + HALF_PI); // Rotate so dog faces direction of movement
    
    // Draw glowing effect
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = `rgba(${dogColor.r}, ${dogColor.g}, ${dogColor.b}, 0.6)`;
    
    noStroke();
    
    // Dog body (more dog-like shape - tapered oval)
    fill(dogColor.r, dogColor.g, dogColor.b);
    ellipse(0, 0, 32, 20);
    
    // Dog head (more rounded, dog-like)
    ellipse(14, 0, 18, 18);
    
    // Dog snout
    fill(dogColor.r * 0.9, dogColor.g * 0.9, dogColor.b * 0.9);
    ellipse(20, 0, 8, 6);
    
    // Dog ears (floppy ears)
    fill(dogColor.r * 0.7, dogColor.g * 0.7, dogColor.b * 0.7);
    // Left ear
    beginShape();
    vertex(8, -8);
    vertex(5, -12);
    vertex(10, -10);
    endShape(CLOSE);
    // Right ear
    beginShape();
    vertex(8, 8);
    vertex(5, 12);
    vertex(10, 10);
    endShape(CLOSE);
    
    // Running legs - animated position based on frame count
    let legCycle = (frameCount * 0.3) % TWO_PI;
    let frontLegOffset = sin(legCycle) * 3;
    let backLegOffset = sin(legCycle + PI) * 3;
    
    fill(dogColor.r * 0.6, dogColor.g * 0.6, dogColor.b * 0.6);
    
    // Front legs (running position)
    rect(-6, -8 + frontLegOffset, 5, 12, 2);
    rect(2, -8 + frontLegOffset, 5, 12, 2);
    
    // Back legs (running position)
    rect(-10, 8 + backLegOffset, 5, 12, 2);
    rect(-2, 8 + backLegOffset, 5, 12, 2);
    
    // Tail (wagging, curved)
    stroke(dogColor.r, dogColor.g, dogColor.b, 200);
    strokeWeight(4);
    noFill();
    let tailWag = sin(frameCount * 0.2) * 0.3;
    beginShape();
    curveVertex(-18, 0);
    curveVertex(-18, 0);
    curveVertex(-24, -6 + tailWag * 2);
    curveVertex(-28, -10 + tailWag * 3);
    endShape();
    
    // Dog eye (simple dot)
    fill(255);
    noStroke();
    ellipse(17, -3, 3, 3);
    
    pop();
}

function drawGrass() {
    // Draw subtle grass blades scattered across the field
    stroke(20, 35, 15, 30);
    strokeWeight(1);
    randomSeed(42); // Consistent grass placement
    for (let i = 0; i < 200; i++) {
        let grassX = random(width);
        let grassY = random(height);
        let grassHeight = random(3, 8);
        line(grassX, grassY, grassX + random(-2, 2), grassY - grassHeight);
    }
}


