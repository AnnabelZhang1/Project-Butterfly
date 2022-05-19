
// Project Butterfly | Annabel Zhang
// Animal Behavior
// Final Project
// 2022-04-21

var c = document.getElementById('garden');
var c2 = document.getElementById('butterfly');
var startButton = document.getElementById('buttonStart');
var stopButton = document.getElementById('buttonStop');
var resetButton = document.getElementById('buttonReset');

var slider = document.getElementById("butterflyRange");
var output = document.getElementById("demo");

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d")
var ctx2 = c2.getContext("2d")

var requestID;

//color levels (0 to 5)
// var red = 4;
// var yellow = 3;
// var pink = 2;
// var black = 0;


//butterfly info
var totalB = parseInt(slider.value);
var totalF = 10;

output.innerHTML = slider.value;
// totalB = parseInt(slider.value);

slider.oninput = function() {
  output.innerHTML = this.value;
  totalB = parseInt(slider.value);
  console.log(totalB + " butterflies were picked.");
  butterflies = []; //clears butterfly array
  for (var i = 0; i < totalB; i++) {
    butterflies.push(createButterfly());
  };
};


// Functions
function createFlower(x, y, species, sweetness, color) {
  let flowerImg = document.createElement("img");

  var dice = Math.floor(Math.random() * 4);

      if (dice === 0){
          color = 2;
          flowerImg.src = '../static/img/pink_flower.png';}
      else if (dice === 1){
          color = 4;
          flowerImg.src = '../static/img/red_flower.png';}
      else if (dice === 2){
          color = 0;
          flowerImg.src = '../static/img/black_flower.png';}
      else{
          color = 3;
          flowerImg.src = '../static/img/yellow_flower.png';}

  // flowerImg.src = '../static/img/flower.png';
  var x = Math.random()*750;
  var y = Math.random()*550;
  // var x = 400;
  // var y = 225;
  var sweetness = Math.floor(Math.random()*5);
  // var color = Math.floor(Math.random()*4);
  return {x: x, y: y, img: flowerImg, species: species, sweetness: sweetness, color: color};
};

var flowers = []
for (var i = 0; i < totalF; i++) {
  flowers.push(createFlower());
};

console.log(flowers);

function createButterfly(x, y, dx, dy, species, rank) {
  let butterflyImg = document.createElement("img");

  //random species
  //whiteC = white cabbage | blueM = blue morpho
  var dice = Math.floor(Math.random() * 4);
  // console.log(dice);
  // var species = "none";
  if (dice === 0){
      species = "whiteC";
      butterflyImg.src = '../static/img/whitecabbage_butterfly.png';}
  else if (dice === 1){
      species = "blueM";
      butterflyImg.src = '../static/img/bluemorpho_butterfly.png';}
  else if (dice === 2){
      species = "clipper";
      butterflyImg.src = '../static/img/clipper_butterfly.png';}
  else{
    species = "skipper";
    butterflyImg.src = '../static/img/skipper_butterfly.png';}

  var x = Math.random()*750;
  var y = Math.random()*550;

  var dx = Math.random()*3;
  var dy = Math.random()*4;
  var rank = flowers;

  return {x: x, y: y, dx: dx, dy: dy, img: butterflyImg, species: species, rank: rank};
};

var butterflies = []
for (var i = 0; i < totalB; i++) {
  butterflies.push(createButterfly());
};

console.log(butterflies);


window.onload = drawGarden = () => {
    // console.log("drawGarden invoked...")
    let garden = document.createElement("img");
    garden.src = '../static/img/garden.jpg';
    garden.addEventListener("load", () => {
      ctx.drawImage(garden, 0, 0, 800, 600);
      for (var i = 0; i < totalF; i++){
        ctx.drawImage(flowers[i].img, flowers[i].x, flowers[i].y, 50, 50);
        console.log("one flower drawn")
      };
    });
};

// let dx,dy;
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

function distance(x1, y1, x2, y2){
  return Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));
};

function bubbleSort(val, num){
  var arr = flowers;
  let swapped = false;

  //sweetness
  if (val === "sweetness"){
    do {
      swapped = false;
      for (let i = 0; i < (flowers.length - 1); i++){
        if (+arr[i].sweetness > +arr[i + 1].sweetness) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        };
        // console.log("hi");
      };
    } while (swapped);
    return arr;
  };

  //color
  if (val === "color"){
    do {
      swapped = false;
      for (let i = 0; i < (flowers.length - 1); i++){
        if (+arr[i].color > +arr[i + 1].color) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        };
        // console.log("hi");
      };
    } while (swapped);
    return arr;
  };

  //distance
  if (val === "distance"){
    do {
      swapped = false;
      for (let i = 0; i < (flowers.length - 1); i++){
        if (distance(butterflies[num].x, butterflies[num].y, arr[i].x, arr[i].y) > distance(butterflies[num].x, butterflies[num].y, arr[i+1].x, arr[i+1].y)) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          swapped = true;
        };
        // console.log("hi");
      };
    } while (swapped);
    // console.log(arr);
    return arr;
  };

};

function findDXDY(dice, numB, numF){
  var gcd = 50;

  if (dice === "closest"){
    butterflies[numB].rank = bubbleSort("distance", numB);
    // butterflies[numB].dx = (closest[numF].x - butterflies[numB].x)/gcd;
    // butterflies[numB].dy = (closest[numF].y - butterflies[numB].y)/gcd;
    butterflies[numB].dx = (butterflies[numB].rank[numF].x - butterflies[numB].x)/gcd;
    butterflies[numB].dy = (butterflies[numB].rank[numF].y - butterflies[numB].y)/gcd;
  }

  else if (dice === "sweetest"){
    butterflies[numB].rank = bubbleSort("sweetness", numB);
    // butterflies[numB].dx = (sweetness[numF].x - butterflies[numB].x)/gcd;
    // butterflies[numB].dy = (sweetness[numF].y - butterflies[numB].y)/gcd;
    butterflies[numB].dx = (butterflies[numB].rank[numF].x - butterflies[numB].x)/gcd;
    butterflies[numB].dy = (butterflies[numB].rank[numF].y - butterflies[numB].y)/gcd;
    // console.log("Target flower x: " + sweetness[numF].x);
    // console.log("Target flower y: " + sweetness[numF].y);
    // console.log(butterflies[numB].x);
    // console.log("")
  }

  else if (dice === "colorful"){
    butterflies[numB].rank = bubbleSort("color", numB);
    // butterflies[numB].dx = (colorful[numF].x - butterflies[numB].x)/gcd;
    // butterflies[numB].dy = (colorful[numF].y - butterflies[numB].y)/gcd;
    butterflies[numB].dx = (butterflies[numB].rank[numF].x - butterflies[numB].x)/gcd;
    butterflies[numB].dy = (butterflies[numB].rank[numF].y - butterflies[numB].y)/gcd;
    // console.log("Target flower x: " + colorful[numF].x);
    // console.log("Target flower y: " + colorful[numF].y);
  }
  else{
    // console.log("hi");
  }
};

function findBestFlower(num){

  //flying
  //skipper butterfly (likes closest flowers)
  if (butterflies[num].species === "skipper"){
    // console.log("it is a skipper!");
    findDXDY("closest", num, 0);
  }
  //white cabbage butterfly (likes most colorful flowers)
  else if (butterflies[num].species === "whiteC"){
    // console.log("it is a white cabbage butterfly!");
    findDXDY("colorful", num, totalF - 1);
    // console.log("Am looking for flower " + );
  }
  //blue morpho butterfly (likes sweetest flowers)
  else if (butterflies[num].species === "blueM"){
    // console.log("it's a blue morpho butterfly!");
    findDXDY("sweetest", num, totalF - 1);
  }
  //clipper butterfly (associates color with sweetness)
  else{
    //!!!
    //after # simulation runs, make clipper like the flower color that's usually the sweetest
    //!!!
    findDXDY("sweetest", num, totalF - 1);
  }
};


canSpawn = true;

function spawn(){

  // console.log("butterfly is being drawn");

  //random spawn
  if (canSpawn === true){

      for (let i = 0; i < totalB; i++){
        //sets random coords per butterfly
        // console.log("X: " + butterflies[i].x + " | Y: " + butterflies[i].y);
        //draws butterfly
        ctx2.drawImage(butterflies[i].img, butterflies[i].x, butterflies[i].y, 70, 70);
        // console.log("drawn one butterfly");
      };
  }

  canSpawn = false;

  //current coords
  for (let i = 0; i < totalB; i++){

    findBestFlower(i);

    butterflies[i].x += butterflies[i].dx;
    butterflies[i].y += butterflies[i].dy;
    // console.log("DX: " + butterflies[i].dx + ", DY: " + butterflies[i].dy);
  };

  if (canSpawn === false){
    for (let i = 0; i < totalB; i++){
      ctx2.drawImage(butterflies[i].img, butterflies[i].x, butterflies[i].y, 70, 70);
      // console.log("butterfly drawn successfully");
    };
  }
};


var move = () => {
  // console.log("butterfly should be moving");
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

var reset = () => {
  ctx.clearRect(0, 0, c.width, c.height);
  ctx2.clearRect(0, 0, c.width, c.height);
  drawGarden();
  flowers = [];
  for (var i = 0; i < totalF; i++) {
    flowers.push(createFlower());
  };
};

// Event Listeners
startButton.addEventListener("click", move);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
