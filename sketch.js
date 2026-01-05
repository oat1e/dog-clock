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
    // Dark background representing the field
    background(15, 15, 15);
    
    // Draw the circular paths (subtle guides)
    noFill();
    stroke(40, 40, 40);
    strokeWeight(1);
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
    
    // Draw labels above each dog
    drawLabel(hourX, hourY, hourAngle, str(h === 0 ? 12 : h), hourColor);
    drawLabel(minuteX, minuteY, minuteAngle, str(m), minuteColor);
    drawLabel(secondX, secondY, secondAngle, str(s), secondColor);
}

function drawDog(x, y, angle, color, radius, type) {
    push();
    translate(x, y);
    rotate(angle + HALF_PI); // Rotate so dog faces direction of movement
    
    // Draw glowing effect
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    
    // Draw dog body (simplified shape)
    fill(color.r, color.g, color.b);
    stroke(255, 255, 255, 100);
    strokeWeight(1);
    
    // Dog body (oval)
    ellipse(0, 0, 30, 18);
    
    // Dog head (circle, slightly ahead in direction of movement)
    ellipse(12, 0, 16, 16);
    
    // Dog legs (four small rectangles for running effect)
    fill(color.r * 0.8, color.g * 0.8, color.b * 0.8);
    noStroke();
    
    // Front legs
    rect(-8, -10, 4, 8);
    rect(-2, -10, 4, 8);
    
    // Back legs
    rect(-8, 10, 4, -8);
    rect(-2, 10, 4, -8);
    
    // Tail (curved line)
    stroke(color.r, color.g, color.b, 150);
    strokeWeight(3);
    noFill();
    beginShape();
    curveVertex(-15, 0);
    curveVertex(-15, 0);
    curveVertex(-20, -5);
    curveVertex(-22, -8);
    endShape();
    
    pop();
}

function drawLabel(x, y, angle, labelText, color) {
    push();
    translate(x, y);
    
    // Position label above the dog
    let labelX = cos(angle - HALF_PI) * 35;
    let labelY = sin(angle - HALF_PI) * 35;
    
    // Draw label background
    fill(0, 0, 0, 150);
    noStroke();
    rectMode(CENTER);
    rect(labelX, labelY, 30, 20, 5);
    
    // Draw label text
    fill(color.r, color.g, color.b);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(labelText, labelX, labelY);
    
    pop();
}

