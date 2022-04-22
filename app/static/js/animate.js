
// Project Butterfly | Annabel Zhang
// Animal Behavior
// Final Project
// 2022-04-21

var c = document.getElementById('garden');
var dotButton = document.getElementById('buttonCircle');

//prepare to interact with canvas in 2D
var ctx = c.getContext("2d")
var ctx2 = c.getContext("2d")

var requestID;


var clear = (e) => {
  console.log("clear invoked...")
  ctx.clearRect(0, 0, c.clientWidth, c.clientHeight);
};


var drawFlowers = () => {
    console.log("drawFlowers invoked...")

}

let butterfly = document.createElement("img");
butterfly.src = '../static/img/demob.png';

var drawButterfly = () => {
  console.log("drawButterfly invoked...")

  ctx.drawImage(butterfly, 0, 0, 300, 300);

}

dotButton.addEventListener("click", drawButterfly);
