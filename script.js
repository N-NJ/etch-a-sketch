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
let strokeColor;
let pixelDimension = `width: ${pixelSideLength}px; height: ${pixelSideLength}px`;
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
  gridPixel.setAttribute("style", pixelDimension);
  gridPixel.setAttribute("id", randomIdGenerator());
  mainContainer.appendChild(gridPixel);
}

function changeBgColor(e) {
  let target = e.target;
  console.log(target);
  // let styleValue = target.getAttribute("style");
  // if (styleValue.includes("background-color")) {

  // }
  target.setAttribute(
    "style",
    `${target.getAttribute("style")}; background-color:${
      strokeColor ? strokeColor : "black"
    }`
  );
}
function clearPage() {
  const divCells = mainContainer.querySelectorAll("div");
  divCells.forEach((item) => item.setAttribute("style", pixelDimension));
}
function changeColor() {
  strokeColor = colorButton.value;
}
function randomColor() {
  let randomColor = Math.random() * 1001;
  strokeColor = `#`;
}
mainContainer.addEventListener("mouseover", changeBgColor);
clearButton.addEventListener("click", clearPage);
colorButton.addEventListener("change", changeColor);
randomColorButton.addEventListener("click", randomColor);
