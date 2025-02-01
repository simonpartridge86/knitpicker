// Element selection
const colorCanvas = document.getElementById("colorCanvas") as HTMLCanvasElement;
const gridCanvas = document.getElementById("gridCanvas") as HTMLCanvasElement;
const colorInput = document.getElementById("colorInput") as HTMLInputElement;
const toggleGrid = document.getElementById("toggleGrid") as HTMLInputElement;
const clearButton = document.getElementById("clearButton") as HTMLButtonElement;
const drawingContext = colorCanvas.getContext("2d") as CanvasRenderingContext2D;
const gridContext = gridCanvas.getContext("2d") as CanvasRenderingContext2D;
const stitchNumberSelectMenu = document.getElementById(
  "stitchNum"
) as HTMLSelectElement;
const rowNumberSelectMenu = document.getElementById(
  "rowNum"
) as HTMLSelectElement;

// Constant definitions
const MIN_STITCH_NUMBER = 20;
const MIN_ROW_NUMBER = 5;
const MAX_STITCH_NUMBER = 50;
const MAX_ROW_NUMBER = 20;
const PIXEL_SIZE = 20;
const colorHistory = {} as Record<string, string>;
let canvasWidth = PIXEL_SIZE * MIN_STITCH_NUMBER;
let canvasHeight = PIXEL_SIZE * MIN_ROW_NUMBER;

// Set default color
colorInput.value = "#009578";

// Initialize color canvas background
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvasWidth, canvasHeight);

// Setup grid lines
function drawGrid(stitchNumber: number, rowNumber: number) {
  canvasWidth = PIXEL_SIZE * stitchNumber;
  canvasHeight = PIXEL_SIZE * rowNumber;
  colorCanvas.width = canvasWidth;
  colorCanvas.height = canvasHeight;
  gridCanvas.width = canvasWidth;
  gridCanvas.height = canvasHeight;

  gridContext.clearRect(0, 0, canvasWidth, canvasHeight);
  drawingContext.fillStyle = "#ffffff";
  drawingContext.fillRect(0, 0, canvasWidth, canvasHeight);

  gridContext.strokeStyle = "#000000";
  gridContext.lineWidth = 2;

  for (let i = 1; i < stitchNumber; i++) {
    gridContext.beginPath();
    gridContext.moveTo(i * PIXEL_SIZE, 0);
    gridContext.lineTo(i * PIXEL_SIZE, canvasHeight);
    gridContext.stroke();
  }

  for (let i = 1; i < rowNumber; i++) {
    gridContext.beginPath();
    gridContext.moveTo(0, i * PIXEL_SIZE);
    gridContext.lineTo(canvasWidth, i * PIXEL_SIZE);
    gridContext.stroke();
  }
}

drawGrid(MIN_STITCH_NUMBER, MIN_ROW_NUMBER);

// Setup stitch/row select menus
{
  [...Array(MAX_STITCH_NUMBER)].forEach((_, i) =>
    stitchNumberSelectMenu.insertAdjacentHTML(
      "beforeend",
      `<option ${i + 1 === MIN_STITCH_NUMBER && "selected"}>${i + 1}</option>`
    )
  );

  [...Array(MAX_ROW_NUMBER)].forEach((_, i) =>
    rowNumberSelectMenu.insertAdjacentHTML(
      "beforeend",
      `<option ${i + 1 === MIN_ROW_NUMBER && "selected"}>${i + 1}</option>`
    )
  );
}

function handleCanvasClick(e: MouseEvent) {
  // Ensure user is using their primary mouse button
  if (e.button !== 0) {
    return;
  }

  const canvasBoundingRect = colorCanvas.getBoundingClientRect();
  const x = e.clientX - canvasBoundingRect.left;
  const y = e.clientY - canvasBoundingRect.top;
  const cellX = Math.floor(x / PIXEL_SIZE);
  const cellY = Math.floor(y / PIXEL_SIZE);
  const currentColor = colorHistory[`${cellX}_${cellY}`];

  if (e.ctrlKey || e.metaKey) {
    if (currentColor) {
      colorInput.value = currentColor;
    }
  } else {
    fillCell(cellX, cellY);
  }
}

function handleClearCanvas() {
  const yes = confirm("Are you sure you wish to clear the canvas?");

  if (!yes) return;

  drawingContext.fillStyle = "#ffffff";
  drawingContext.fillRect(0, 0, canvasWidth, canvasHeight);
}

function handleToggleGrid(e: Event) {
  const isChecked = (e.target as HTMLInputElement).checked;
  gridCanvas.style.display = isChecked ? "" : "none";
}

function fillCell(cellX: number, cellY: number) {
  const startX = cellX * PIXEL_SIZE;
  const startY = cellY * PIXEL_SIZE;

  drawingContext.fillStyle = colorInput.value;
  drawingContext.fillRect(startX, startY, PIXEL_SIZE, PIXEL_SIZE);
  colorHistory[`${cellX}_${cellY}`] = colorInput.value;
}

function onDimensionsChange() {
  const currentStitchNumber = parseInt(stitchNumberSelectMenu.value, 10);
  const currentRowNumber = parseInt(rowNumberSelectMenu.value, 10);
  drawGrid(currentStitchNumber, currentRowNumber);
}

// function onWindowResize(e: Event) {
//   const windowHeight = (e.target as Window).innerHeight;
//   const windowWidth = (e.target as Window).innerWidth;
//   console.log("width:", windowWidth, "height:", windowHeight);
// }

colorCanvas.addEventListener("mousedown", handleCanvasClick);
clearButton.addEventListener("click", handleClearCanvas);
toggleGrid.addEventListener("change", handleToggleGrid);
stitchNumberSelectMenu.addEventListener("change", onDimensionsChange);
rowNumberSelectMenu.addEventListener("change", onDimensionsChange);
// window.addEventListener("DOMContentLoaded", onWindowResize);
// window.addEventListener("resize", onWindowResize);
