
// Project Butterfly | Annabel Zhang
// Animal Behavior
// Final Project
// 2022-04-21

var c = document.getElementById('garden');
var c2 = document.getElementById('butterfly');
var spawnButton = document.getElementById('buttonSpawn');
var startButton = document.getElementById('buttonStart');
var stopButton = document.getElementById('buttonStop');
var clearButton = document.getElementById('buttonClear');
var resetButton = document.getElementById('buttonReset');

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d")
var ctx2 = c2.getContext("2d")

var requestID;

//flower coordinates {x coord, y coord, sweetness level, color}
var flower1 = {"x": 600, "y": 320, "sweetness": 0, "color":"red"};
var flower2 = {"x": 350, "y": 180, "sweetness": 0, "color":"red"};

//color levels (0 to 5)
var red = 4;
var yellow = 3;
var pink = 4;
var black = 0;

//butterfly info
var totalB = 3;

function createButterfly(x, y, species) {
  let butterflyImg = document.createElement("img");
  // butterflyImg.src = '../static/img/ya_love.png';

  //random species
  //whiteC = white cabbage | blueM = blue morpho
  var dice = Math.floor(Math.random() * 4);
  console.log(dice);
  var species = "none";
      if (dice == 0){
          species = "whiteC";
          butterflyImg.src = '../static/img/ya_love.png';}
      else if (dice == 1){
          species = "blueM";
          butterflyImg.src = '../static/img/ya_love.png';}
      else if (dice == 2){
          species = "clipper";
          butterflyImg.src = '../static/img/ya_love.png';}
      else{
          species = "skipper";
          butterflyImg.src = '../static/img/ya_love.png';}

  return {x: x, y: y, img: butterflyImg, species: species};
}

var butterflies = []
for (var i = 0; i < totalB; i++) {
  butterflies.push(createButterfly());
}

console.log(butterflies);


// Functions
function drawPetals(x, y) {
  ctx.beginPath();
  ctx.arc(x, y-20, 20, 0, 360);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x, y+20, 20, 0, 360);
  ctx.arc(x-20, y, 20, 0, 360);
  ctx.arc(x+20, y, 20, 0, 360);

  ctx.fillStyle = "red";
  ctx.fill();
};

window.onload = drawGarden = () => {
    console.log("drawGarden invoked...")

    //petals
    drawPetals(600, 320);
    drawPetals(350, 180);

    //flower centers
    ctx.beginPath();
    ctx.arc(600, 320, 20, 0, 360);
    ctx.arc(350, 180, 20, 0, 360);

    ctx.fillStyle = "yellow";
    ctx.fill();
};


let dx,dy;

function gcd_funct(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
};

let gcd = gcd_funct(flower1["x"], flower1["y"]);
dx = flower1["x"]/gcd/gcd*2;
dy = flower1["y"]/gcd/gcd*2;

canSpawn = true;

function spawn(){

  console.log("butterfly is being drawn");

  //random spawn
  if (canSpawn === true){

      for (let i = 0; i < totalB; i++){
        //sets random coords per butterfly
        butterflies[i].x = Math.random()*800;
        butterflies[i].y = Math.random()*600;
        console.log("X: " + butterflies[i].x + " | Y: " + butterflies[i].y);
        //draws butterfly
        ctx2.drawImage(butterflies[i].img, butterflies[i].x, butterflies[i].y, 40, 30);
        console.log("drawn one butterfly");
      }
  }

  canSpawn = false;

  //current coords
  for (let i = 0; i < totalB; i++){
    butterflies[i].x += dx;
    butterflies[i].y += dy;
  }


  if (canSpawn === false){
    for (let i = 0; i < totalB; i++){
      ctx2.drawImage(butterflies[i].img, butterflies[i].x, butterflies[i].y, 40, 30);
      console.log("butterfly drawn successfully");
    }

    if (dvdx <= 0  || dvdx >= c.width - 120 ) {
      dx = dx * -1;
    }
    if (dvdy <= 0 || dvdy >= c.height - 80 ) {
      dy = dy *-1;
    }
  }
};


var move = () => {

  console.log("butterfly should be moving");
  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(move);
  ctx2.clearRect(0, 0, c2.width, c2.height);
  spawn();
};

var stop = () => {
  console.log("stop invoked...");
  console.log(requestID);

  window.cancelAnimationFrame(requestID);
};


var clear = (e) => {
  console.log("clear invoked...");
  ctx.clearRect(0, 0, c.width, c.height);
  ctx2.clearRect(0, 0, c2.width, c2.height);
};

var reset = () => {
  location.reload();
};

// var template;
//   function setTemplate(dropbox){
//     template = document.getElementById(dropbox).value;
//     window.alert(template);
//   }

// Event Listeners
// spawnButton.addEventListener("click", spawn);
startButton.addEventListener("click", move);
stopButton.addEventListener("click", stop);
clearButton.addEventListener("click", clear);
resetButton.addEventListener("click", reset);
