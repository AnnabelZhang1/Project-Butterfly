
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

//butterfly coords
var butterfly0 = [0, 0];
var butterfly1 = [0, 0];

// Loads in all the images
// let garden = document.createElement("img");
// garden.src = '../static/img/???.png';

let butterfly = document.createElement("img");
butterfly.src = '../static/img/demob.png';

let butterflyDerp0 = document.createElement("img");
butterflyDerp0.src = '../static/img/ya_love.png';

let butterflyDerp1 = document.createElement("img");
butterflyDerp1.src = '../static/img/ya_love.png';

let butterflyDerp2 = document.createElement("img");
butterflyDerp2.src = '../static/img/ya_love.png';


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


// var dvdx = 0;
// var dvdy = 0;

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
  // console.log(canSpawn);

  //random spawn
  if (canSpawn === true){

      butterfly0[0] = Math.random()*800;
      butterfly0[1] = Math.random()*600;

      console.log("X: " + butterfly0[0] + " | Y: " + butterfly0[1]);
      ctx2.drawImage(butterflyDerp0, butterfly0[0], butterfly0[1], 40, 30);
      console.log("drawn one butterfly");

      butterfly1[0] = Math.random()*800;
      butterfly1[1] = Math.random()*600;

      console.log("X: " + butterfly1[0] + " | Y: " + butterfly1[1]);
      ctx2.drawImage(butterflyDerp1, butterfly1[0], butterfly1[1], 40, 30);
      console.log("drawn one butterfly");
    }


  canSpawn = false;

  //current coords
  butterfly0[0] += dx;
  butterfly0[1] += dy;

  butterfly1[0] += dx;
  butterfly1[1] += dy;

  if (canSpawn === false){
    ctx2.drawImage(butterflyDerp0, butterfly0[0], butterfly0[1], 40, 30);
    ctx2.drawImage(butterflyDerp1, butterfly1[0], butterfly1[1], 40, 30);
    console.log("butterfly drawn successfully");
  }

  if (dvdx <= 0  || dvdx >= c.width - 120 ) {
    dx = dx * -1;
  }
  if (dvdy <= 0 || dvdy >= c.height - 80 ) {
    dy = dy *-1;
  }
};


var move = () => {

  console.log("butterfly should be moving");
  window.cancelAnimationFrame(requestID);
  requestID = window.requestAnimationFrame(move);
  ctx2.clearRect(0, 0, c2.width, c2.height);


  // spawn(template);
  spawn();
  if (canSpawn === false){
    ctx2.drawImage(butterflyDerp0, butterfly0[0], butterfly0[1], 40, 30);
    ctx2.drawImage(butterflyDerp1, butterfly1[0], butterfly1[1], 40, 30);
  }

  console.log(butterfly0[0] + "DVDX0");
  console.log(butterfly1[0] + "DVDX1");
};

var stop = () => {
  console.log("stop invoked...")
  console.log(requestID);

  window.cancelAnimationFrame(requestID);
};


var clear = (e) => {
  console.log("clear invoked...")
  ctx.clearRect(0, 0, c.width, c.height);
  ctx2.clearRect(0, 0, c2.width, c2.height);
};

var reset = () => {
  location.reload();
}

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
