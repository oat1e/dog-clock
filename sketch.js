// Abstract Clock: Dogs Running Around a Field
// Hour, Minute, and Second are represented by three dogs running around concentric circular paths

let lastMinute = -1;
let fieldCenterX, fieldCenterY;
let hourRadius, minuteRadius, secondRadius;
let fieldRadius;

// Pastel color scheme for prancing dogs
const hourColor = { r: 255, g: 182, b: 193 };    // Pastel pink for hour
const minuteColor = { r: 176, g: 224, b: 230 };  // Pastel blue for minute
const secondColor = { r: 255, g: 250, b: 205 };  // Pastel yellow for second

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
    // Daisy field background - light green with flowers
    background(200, 230, 180); // Light pastel green
    
    // Draw daisies across the field
    drawDaisies();
    
    // Draw the circular paths (visible but soft)
    noFill();
    stroke(150, 180, 150, 100);
    strokeWeight(2);
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
    
    // Prancing bounce effect - whole dog bounces up and down
    let pranceCycle = (frameCount * 0.2) % TWO_PI;
    let bounce = abs(sin(pranceCycle)) * 2; // Bouncy prancing motion
    
    translate(x, y - bounce * 0.5);
    rotate(angle + HALF_PI); // Rotate so dog faces direction of movement
    
    // Draw glowing effect (softer for pastels)
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = `rgba(${dogColor.r}, ${dogColor.g}, ${dogColor.b}, 0.5)`;
    
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
    
    // Prancing legs - more bouncy, playful movement
    let frontLift = sin(pranceCycle) * 4;
    let backLift = sin(pranceCycle + PI) * 4;
    
    fill(dogColor.r * 0.7, dogColor.g * 0.7, dogColor.b * 0.7);
    
    // Front legs (prancing - one lifted higher)
    rect(-6, -6 + frontLift, 4, 10, 2);
    rect(2, -8 + frontLift * 0.5, 4, 10, 2);
    
    // Back legs (prancing - one lifted higher)
    rect(-10, 6 + backLift, 4, 10, 2);
    rect(-2, 8 + backLift * 0.5, 4, 10, 2);
    
    // Tail (wagging happily, curved upward)
    stroke(dogColor.r, dogColor.g, dogColor.b, 180);
    strokeWeight(3);
    noFill();
    let tailWag = sin(frameCount * 0.15) * 0.4;
    beginShape();
    curveVertex(-18, 0);
    curveVertex(-18, 0);
    curveVertex(-22, -8 + tailWag * 2);
    curveVertex(-26, -12 + tailWag * 3);
    endShape();
    
    // Dog eye (simple dot)
    fill(80, 60, 40); // Brown eye
    noStroke();
    ellipse(17, -3, 3, 3);
    
    pop();
}

function drawDaisies() {
    // Draw daisies scattered across the field
    randomSeed(42); // Consistent daisy placement
    
    for (let i = 0; i < 50; i++) {
        let daisyX = random(width);
        let daisyY = random(height);
        
        // Skip daisies too close to center (where dogs run)
        let distFromCenter = dist(daisyX, daisyY, fieldCenterX, fieldCenterY);
        if (distFromCenter < fieldRadius * 1.1) continue;
        
        // Draw daisy stem
        stroke(100, 150, 80);
        strokeWeight(2);
        line(daisyX, daisyY, daisyX, daisyY + 15);
        
        // Draw daisy petals (white)
        noStroke();
        fill(255, 255, 255, 200);
        for (let p = 0; p < 8; p++) {
            let petalAngle = (p * TWO_PI) / 8;
            let petalX = daisyX + cos(petalAngle) * 6;
            let petalY = daisyY + sin(petalAngle) * 6;
            ellipse(petalX, petalY, 8, 4);
        }
        
        // Draw daisy center (yellow)
        fill(255, 220, 100);
        ellipse(daisyX, daisyY, 6, 6);
    }
}


