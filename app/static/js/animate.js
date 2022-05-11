
// Project Butterfly | Annabel Zhang
// Animal Behavior
// Final Project
// 2022-04-21

var c = document.getElementById('garden');
var c2 = document.getElementById('butterfly');
var startButton = document.getElementById('buttonStart');
var stopButton = document.getElementById('buttonStop');
var clearButton = document.getElementById('buttonClear');
var resetButton = document.getElementById('buttonReset');

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d")
var ctx2 = c2.getContext("2d")

var requestID;

//color levels (0 to 5)
// var red = 4;
// var yellow = 3;
// var pink = 2;
// var black = 0;

var closest;
var sweetest;
var colorful;

//butterfly info
var totalB = 1;

// var dx;
// var dy;

function createButterfly(x, y, dx, dy, species) {
  let butterflyImg = document.createElement("img");

  //random species
  //whiteC = white cabbage | blueM = blue morpho
  var dice = Math.floor(Math.random() * 4);
  // console.log(dice);
  var species = "none";
      // if (dice == 0){
      //     species = "whiteC";
      //     butterflyImg.src = '../static/img/ya_love.png';}
      // else if (dice == 1){
      //     species = "blueM";
      //     butterflyImg.src = '../static/img/ya_love.png';}
      // else if (dice == 2){
      //     species = "clipper";
      //     butterflyImg.src = '../static/img/ya_love.png';}
      // else{
  species = "skipper";
  butterflyImg.src = '../static/img/ya_love.png';
        // }

  var x = Math.random()*750;
  var y = Math.random()*550;

  var dx = Math.random()*3;
  var dy = Math.random()*4;

  return {x: x, y: y, dx: dx, dy: dy, img: butterflyImg, species: species};
};

var butterflies = []
for (var i = 0; i < totalB; i++) {
  butterflies.push(createButterfly());
};

console.log(butterflies);


// Functions
function createFlower(x, y, species, sweetness, color) {
  let flowerImg = document.createElement("img");

  var dice = Math.floor(Math.random() * 4);
  // console.log(dice);
  var color = "none";
      if (dice === 0){
          // species
          flowerImg.src = '../static/img/flower.png';}
      else if (dice === 1){
          // species
          flowerImg.src = '../static/img/flower.png';}
      else if (dice === 2){
          // species
          flowerImg.src = '../static/img/flower.png';}
      else{
          // species
          flowerImg.src = '../static/img/flower.png';}
  var x = Math.random()*750;
  var y = Math.random()*550;
  var sweetness = Math.floor(Math.random()*5);
  var color = Math.floor(Math.random()*4);
  return {x: x, y: y, img: flowerImg, species: species, sweetness: sweetness, color: color};
};

totalF = 3;

var flowers = []
for (var i = 0; i < totalF; i++) {
  flowers.push(createFlower());
};

window.onload = drawGarden = () => {
    console.log("drawGarden invoked...")

    for (var i = 0; i < totalF; i++){
      ctx.drawImage(flowers[i].img, flowers[i].x, flowers[i].y, 50, 50);
      console.log("one flower drawn")
    }
};

// let dx,dy;
// function gcd_funct(x, y) {
//   x = Math.abs(x);
//   y = Math.abs(y);
//   while(y) {
//     var t = y;
//     y = x % y;
//     x = t;
//   }
//   return x;
// };

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
    return arr;
  };

};
// console.log(bubbleSort(););

function findDXDY(numB, numF){
  // console.log("findDXDY took in" + search);
  // var gcd = gcd_funct(closest[numF].x, closest[numF].y);
  // butterflies[numB].dx = closest[numF].x/gcd/gcd*2;
  // butterflies[numB].dy = closest[numF].y/gcd/gcd*2;

  // var gcd = gcd_funct(flowers[numF].x, flowers[numF].y);
  // //how to find slope??
  // butterflies[numB].dx = flowers[numF].x/gcd/gcd*2;
  // butterflies[numB].dy = flowers[numF].y/gcd/gcd*2;

  butterflies[numB].dx = (closest[numF].x - butterflies[numB].x)/2;
  butterflies[numB].dy = (closest[numF].y - butterflies[numB].y)/2;

};

function rest(num){

};

function findBestFlower(num){

  closest = bubbleSort("distance", num);

  sweetness = bubbleSort("sweetness", num);

  colorful = bubbleSort("color", num);

  //flying
  // for (let i = 0; i < totalB; i++){
  console.log("seeing if butterflies are skippers");
  if (butterflies[num].species === "skipper"){
    console.log("it is a skipper!");
    findDXDY(num, 0);
  }
  else{
    findDXDY(num, i);
  }
  // };
// };
};


canSpawn = true;

function spawn(){

  console.log("butterfly is being drawn");

  //random spawn
  if (canSpawn === true){

      for (let i = 0; i < totalB; i++){
        //sets random coords per butterfly
        console.log("X: " + butterflies[i].x + " | Y: " + butterflies[i].y);
        //draws butterfly
        ctx2.drawImage(butterflies[i].img, butterflies[i].x, butterflies[i].y, 40, 30);
        console.log("drawn one butterfly");
      };
  }

  canSpawn = false;

  //current coords
  for (let i = 0; i < totalB; i++){
    // findDXDY(i);
    // rand = Math.floor(Math.random());
    // z = 1;
    // if (rand === 1){
    //   z = -1;
    // }
    // butterflies[i].dx = Math.random()*z;
    // butterflies[i].dy = Math.random()*z;

    //^ works with this
    //somehow move pathfinding code to here
    // findDXDY(i,0);

    findBestFlower(i);

    butterflies[i].x += butterflies[i].dx;
    butterflies[i].y += butterflies[i].dy;
  };


  if (canSpawn === false){
    for (let i = 0; i < totalB; i++){
      ctx2.drawImage(butterflies[i].img, butterflies[i].x, butterflies[i].y, 40, 30);
      console.log("butterfly drawn successfully");
    };
      // findBestFlower(i);
      // dvdx = butterflies[i].x;
      // dvdy = butterflies[i].y;

      // if (butterflies[i].x <= 0  || butterflies[i].x >= c.width - 200 ) {
      //   dx = dx * -1;
      // }
      // if (butterflies[i].y <= 0 || butterflies[i].y >= c.height - 200 ) {
      //   dy = dy *-1;
      // }

    // }
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
startButton.addEventListener("click", move);
stopButton.addEventListener("click", stop);
clearButton.addEventListener("click", clear);
resetButton.addEventListener("click", reset);
