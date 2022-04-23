
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

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d")
var ctx2 = c2.getContext("2d")

var requestID;
var flower1 = {"x": 600, "y": 320};

// Loads in all the images
let garden = document.createElement("img");
garden.src = '../static/img/???.png';

let butterfly = document.createElement("img");
butterfly.src = '../static/img/demob.png';

// Functions
window.onload = drawGarden = () => {
    console.log("drawGarden invoked...")
    // var mouseX = e.offsetX
    // var mouseY = e.offsetY
    // console.log ("mouseclick registered at ", mouseX, mouseY);

    ctx.beginPath();
    ctx.arc(600, 320, 30, 0, 360);
    ctx.fillStyle = "red";
    ctx.fill();
};

var drawButterfly = () => {
  console.log("drawButterfly invoked...")
  ctx.drawImage(butterfly, 0, 0, 40, 30);

};

// var dvdx = Math.floor(Math.random() * c.clientWidth/2);
// var dvdy = Math.floor(Math.random() * c.clientHeight/2);
var dvdx = 0;
var dvdy = 0;

let dx,dy;

function gcd_two_numbers(x, y) {
  if ((typeof x !== 'number') || (typeof y !== 'number'))
    return false;
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

// dx = 15;
// dy = 8;
// dx = flower1["y"] / flower1["x"]
// dy = flower1["y"] / flower1["x"]
let gcd = gcd_two_numbers(flower1["x"], flower1["y"]);
dx = flower1["x"]/gcd/gcd*2;
dy = flower1["y"]/gcd/gcd*2;

// counter = 0;
var move = () => {


  ctx2.clearRect(0, 0, c2.width, c2.height);
  console.log("butterfly should be moving")
  window.cancelAnimationFrame(requestID);
  //
  // if(++counter % 10){
  //     requestID = window.requestAnimationFrame(move);
  //     // return false;
  // }

  //current coords
  dvdx += dx;
  dvdy += dy;

  ctx2.drawImage(butterfly, dvdx, dvdy, 40, 30);

  // if butterfly hits wall
  if (dvdx <= 0  || dvdx >= c.width -120 ) {
    dx = dx * -1;
  }
  if (dvdy <= 0 || dvdy >= c.height - 80 ) {
    dy = dy *-1;
  }

  console.log(dvdx + "DVDX");

  requestID = window.requestAnimationFrame(move);
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

// Event Listeners
spawnButton.addEventListener("click", drawButterfly);
startButton.addEventListener("click", move);
stopButton.addEventListener("click", stop);
clearButton.addEventListener("click", clear);
