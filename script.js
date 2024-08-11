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
let strokeColor = "black";
let pixelDimension = `width: ${pixelSideLength}px; height: ${pixelSideLength}px`;
let mode = "fixed";
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
  let id = target.getAttribute("id");
  let styleValue = target.getAttribute("style");
  console.log(target);
  if (styleValue.includes("background-color")) {
    target.setAttribute(
      "style",
      pixelDimension +
        `; background-color:${mode == "fixed" ? strokeColor : randomColor()}`
    );
    target.setAttribute("id", id);
  } else {
    target.setAttribute(
      "style",
      `${target.getAttribute("style")}; background-color:${
        strokeColor ? strokeColor : "black"
      }`
    );
  }
}
function clearPage() {
  const divCells = mainContainer.querySelectorAll("div");
  divCells.forEach((item) => item.setAttribute("style", pixelDimension));
}
function changeColor(e) {
  let target = e.target;
  console.log(target);

  if (target.id == "randomColor") {
    mode = "random";
  } else {
    strokeColor = colorButton.value;
    mode = "fixed";
  }
}
function randomColor() {
  let hexArray = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let randomColor = [];
  for (let n = 0; n < 6; n++) {
    randomColor.push(hexArray[Math.floor(Math.random() * 16)]);
  }
  return (strokeColor = `#${randomColor.join("")}`);
}
mainContainer.addEventListener("mouseover", changeBgColor);
clearButton.addEventListener("click", clearPage);
colorButton.addEventListener("change", (e) => changeColor(e));
randomColorButton.addEventListener("click", (e) => changeColor(e));
