/*///////////////////////////////////////////


The idea is to create two canvases altogether where one will print out the text behind the screen and one will output the bubbles according to the x and y co-ordinates of each an every pixels of the text! To get where the text is located in we have to figure out the pixels containing r (red), g (green), b (blue), a (alpha or opacity) and having at least getter than 0 in a range of 255 as their values so that the canvas can output meticulously what so ever the text colour is! 

# Step 1 : Place the bubbles at a random position ! (Line 207 & 208)

# Step 2 : Decrease or Increase the x's and y's of bubbles by speed with respect to where the final position is ! (Line 168 to 186)

# Step 3 : Add a click event listener to reset the random position ! (Line 62 to 80)

That's it ! ENJOY ! And yeah this is without p5 🤘 ! 

        -- Arb 
        -- 27 - 08 - 2019


///////////////////////////////////////////*/



let w = window.innerWidth;
let h = window.innerHeight;
let mainCanvas, particleCanvas, ctx1, ctx2;
let img = new Image();
img.src = 'https://i.ibb.co/H2JvL00/bubble-clipart-clipart-bubble-256x256-7f2e.png';
let img1 = new Image();
img1.src = 'https://i.ibb.co/n03ZxtR/pink-bubble-prop-by-randomcartoongirl-dcsebg0-fullview.png';
let images = [img, img1];
let ran = random(0, images.length); 

let randomWords = ['Cool!', 'Love!', 'Moon!', 'Pink!', 'Hope!', 'Ride!', 'Wake!', 'Charm!', 'Delicate!', 'Root!', 'Peace!', 'Happy!', 'Fault!', 'Math!', 'Shape!', 'Never!', 'Save!', 'Random!', 'Key!', 'Bubble!'];

let rn = random(0, randomWords.length);

window.onload = () => {

    // Initialize canvas

    initCanvas();
    
    // Text style's 
    
    ctx1.fillStyle = "white";
    ctx1.font = "45vmin bold sans-serif";
    ctx1.textAlign = "center";
    ctx1.textBaseline = "middle";
    
    // Get the pixels 
    
    getPixels();
    
    // Print the bubbles
    
    print();
    
    // Event listener to reset position
    
    particleCanvas.addEventListener('click', e => {
        
        
        for (let i = 0; i < bubbles.length; i++){
            
            bubbles[i].x = random(-100, w + 100);
            bubbles[i].y = random(-100, h + 100);
            if (bubbles[i].img == img){
                bubbles[i].img = img1;
            }
            else
            {
                bubbles[i].img = img;
            }
        }
        
        
        
    });
    
    
    
}

// Bubbles array to contain the all the bubbles

let bubbles = [];

// Main or Final Position array

let mainPos = [];

// Get pixels

function getPixels(){

    // Set Text
    
    let t = prompt('Enter your text : (Max : 12 Words)', randomWords[rn]) || randomWords[rn];
    
    ctx1.fillText(t.length > 12 ? 'Max 12 Words' : t, w/2, h/2, w);
    
    // Get the pixel data of the screen using getImageData() function 
    
    let pixel = ctx1.getImageData(0,0,w,h);
    
    // pixel.data is an array containing all the pixels of the screen 
    
    // The formula for where the expected pixel is 
    
    // pixel = (j + (i * width)) * 4;
    
    // Where j is x co-ordinates and i is y co-ordinates
    
    // Density of the pixels
    
    let density = 5;
    
    for (let i = 0; i < h; i += density){
        for (let j = 0; j < w; j += density){
            if (
            pixel.data[((j + (i * w)) * 4)] > 0 &&       // Red 
            pixel.data[((j + (i * w)) * 4) + 1] > 0 && // Blue
            pixel.data[((j + (i * w)) * 4) + 2] > 0 && // Green
            pixel.data[((j + (i * w)) * 4) + 3] > 0     // Alpha
            ){
                
                // Push the x and y 
                
                mainPos.push({x : j, y : i});
                
                // Make a new bubble everytime
                
                let b = new Bubble(ran);
                bubbles.push(b);
                
                
                
                
            }
        }
    }
    
    
}



function print(){

    
    // Clear the canvas

    ctx2.beginPath();
    ctx2.clearRect(0,0,w,h);
    ctx2.closePath();
    
    // Positioning
    
    for (let i = 0; i < bubbles.length; i++){
    
        let speed = Math.random() * 3.5;
        
        bubbles[i].print();
        
        
        if (bubbles[i].x < mainPos[i].x && bubbles[i].y < mainPos[i].y){
            bubbles[i].x += speed * 0.9;
            bubbles[i].y += speed;
        }
        
        if (bubbles[i].x > mainPos[i].x && bubbles[i].y > mainPos[i].y){
            bubbles[i].x -= speed * 0.8;
            bubbles[i].y -= speed * 0.5;
        }
        
        if (bubbles[i].x > mainPos[i].x && bubbles[i].y < mainPos[i].y){
            bubbles[i].x -= speed * 0.5;
            bubbles[i].y += speed;
        }
        
        if (bubbles[i].x < mainPos[i].x && bubbles[i].y > mainPos[i].y){
            bubbles[i].x += speed;
            bubbles[i].y -= speed * 0.8;
        }
        
        
        
        
        
        
    }
    
    requestAnimationFrame(print);
    
}


// Bubble Class

class Bubble{
    constructor(ran){
    
    // Initiale random position
    
        this.x = random(-100, w + 100);
        this.y = random(-100, h + 100);
        this.ran = ran;
        this.img = images[this.ran];
        
    }
    
    print(){
       
        ctx2.beginPath();
        ctx2.drawImage(this.img, this.x, this.y, 10, 10);
        ctx2.closePath();
    }
    
}

// To get random integers

function random(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}


function initCanvas(){
    let body = document.getElementsByTagName('body')[0];
    
    // First or main canvas where the text will be printed
    
    mainCanvas = document.createElement('canvas');
    
    // Second canvas to show the bubbles
    
    particleCanvas = document.createElement('canvas');
    
    mainCanvas.height = particleCanvas.height = h;
    mainCanvas.width = particleCanvas.width = w;
   particleCanvas.style.background = '#212121';
   
   
    ctx1 = mainCanvas.getContext('2d');
    ctx2 = particleCanvas.getContext('2d');
    
    body.appendChild(mainCanvas);
    body.appendChild(particleCanvas);
}

/////////*************************///////////