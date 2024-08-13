const mainContainer = document.querySelector("#sketchArea");
const sizeButton = document.querySelector("#size");
const colorButton = document.querySelector("#colorPicker");
const clearButton = document.querySelector("#clear");
const randomColorButton = document.querySelector("#randomColor");

let pixelColor = "black";
let gridSize = 256;
let strokeColor = "black";
let mode = "fixed";
let pixelSideLength;
let pixelDimension;

window.addEventListener("DOMContentLoaded", generateSketchBook);

function generateSketchBook() {
  pixelSideLength = Math.sqrt(
    Math.pow(mainContainer.clientWidth, 2) / gridSize
  );
  pixelDimension = `width: ${pixelSideLength}px; height: ${pixelSideLength}px`;
  //Check if id already exists.
  function randomIdGenerator() {
    let id = "a" + Math.floor(Math.random() * 10000);
    if (document.querySelector(`#a${id}`)) {
      randomIdGenerator();
    } else {
      return id;
    }
  }
  //Generate sketchbook cells.
  for (let i = 0; i < gridSize; i++) {
    const gridPixel = document.createElement("div");
    gridPixel.className = "pixel";
    gridPixel.setAttribute("style", pixelDimension);
    gridPixel.setAttribute("id", randomIdGenerator());
    gridPixel.style.opacity = 1;
    mainContainer.appendChild(gridPixel);
  }
}
function setGridSize(e) {
  console.log(e);
  let userSizeInput = prompt(
    "Please enter your desired grid scale *Maximum of 100*"
  );
  if (userSizeInput > 100) {
    userSizeInput = prompt(
      "Input exceeded limit. Please enter your desired grid scale *Maximum of 100*"
    );
  } else if (!userSizeInput) {
    return;
  }
  gridSize = Math.pow(userSizeInput, 2);
  mainContainer.textContent = "";
  generateSketchBook();
}
function changeBgColor(e) {
  let target = e.target;
  target.style.backgroundColor = mode == "fixed" ? strokeColor : randomColor();
}

function clearPage() {
  const divCells = mainContainer.querySelectorAll("div");
  divCells.forEach((item) => {
    item.setAttribute("style", pixelDimension);
    item.style.opacity = 1;
  });
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
function increaseOpacity(e) {
  let target = e.target;
  console.log(target);
  console.log(parseFloat(target.style.opacity));
  if (parseFloat(target.style.opacity) < 1)
    target.style.opacity = parseFloat(target.style.opacity) + 0.1;
}
function decreaseOpacity(e) {
  e.preventDefault();
  let target = e.target;
  target.style.opacity = parseFloat(target.style.opacity) - 0.1;
}
mainContainer.addEventListener("mouseover", changeBgColor);
sizeButton.addEventListener("click", setGridSize);
clearButton.addEventListener("click", clearPage);
colorButton.addEventListener("change", (e) => changeColor(e));
randomColorButton.addEventListener("click", (e) => changeColor(e));
mainContainer.addEventListener("click", increaseOpacity);
mainContainer.addEventListener("contextmenu", decreaseOpacity);
