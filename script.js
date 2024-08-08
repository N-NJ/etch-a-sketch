const mainContainer = document.querySelector("#sketchArea");
const sizeButton = document.querySelector("#size");
const colorButton = document.querySelector("#colorPicker");
const clearButton = document.querySelector("#clear");
const randomColorButton = document.querySelector("#randomColor");
const darkenButton = document.querySelector("#darken");

let pixelColor = "black";
let gridSize = 256;

let pixelSideLength = Math.sqrt(
  Math.pow(mainContainer.clientWidth, 2) / gridSize
);
// pixelSideLength = Math.floor(pixelSideLength);
function setGridSize(e) {
  let userSizeInput = prompt("Please enter your desired grid scale");
  gridSize = Math.pow(userSizeInput, 2);
}
sizeButton.addEventListener("click", setGridSize);

function randomIdGenerator() {
  let id = "a" + Math.floor(Math.random() * 10000);
  if (document.querySelector(`#a${id}`)) {
    randomIdGenerator();
  } else {
    return id;
  }
}
for (let i = 0; i < gridSize; i++) {
  const gridPixel = document.createElement("div");
  gridPixel.className = "pixel";
  gridPixel.setAttribute(
    "style",
    `width: ${pixelSideLength}px; height: ${pixelSideLength}px`
  );
  gridPixel.setAttribute("id", randomIdGenerator());

  mainContainer.appendChild(gridPixel);
}

function changeBgColor(e) {
  let target = e.target;
  console.log(target);
  target.setAttribute(
    "style",
    `${target.getAttribute("style")}; background-color:black`
  );
}
mainContainer.addEventListener("mouseover", changeBgColor);
