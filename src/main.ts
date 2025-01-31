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
const DEFAULT_STITCH_NUMBER = 10;
const DEFAULT_ROW_NUMBER = 5;
const MAX_STITCH_NUMBER = 50;
const MAX_ROW_NUMBER = 20;
const pixelWidth = colorCanvas.width / DEFAULT_STITCH_NUMBER;
const pixelHeight = colorCanvas.height / DEFAULT_ROW_NUMBER;
const colorHistory = {} as Record<string, string>;

// Set default color
colorInput.value = "#009578";

// Initialize color canvas background
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, colorCanvas.width, colorCanvas.height);

// Setup grid lines
function drawGrid(stitchNumber: number, rowNumber: number) {
  gridContext.clearRect(0, 0, gridCanvas.width, gridCanvas.height);

  const stitchWidth = gridCanvas.width / stitchNumber;
  const rowHeight = gridCanvas.height / rowNumber;

  gridContext.strokeStyle = "#000000";
  gridContext.lineWidth = 2;

  for (let i = 1; i < stitchNumber; i++) {
    gridContext.beginPath();
    gridContext.moveTo(i * stitchWidth, 0);
    gridContext.lineTo(i * stitchWidth, gridCanvas.height);
    gridContext.stroke();
  }

  for (let i = 1; i < rowNumber; i++) {
    gridContext.beginPath();
    gridContext.moveTo(0, i * rowHeight);
    gridContext.lineTo(gridCanvas.width, i * rowHeight);
    gridContext.stroke();
  }
}

drawGrid(DEFAULT_STITCH_NUMBER, DEFAULT_ROW_NUMBER);

// Setup stitch/row select menus
{
  [...Array(MAX_STITCH_NUMBER)].forEach((_, i) =>
    stitchNumberSelectMenu.insertAdjacentHTML(
      "beforeend",
      `<option ${i + 1 === DEFAULT_STITCH_NUMBER && "selected"}>${
        i + 1
      }</option>`
    )
  );

  [...Array(MAX_ROW_NUMBER)].forEach((_, i) =>
    rowNumberSelectMenu.insertAdjacentHTML(
      "beforeend",
      `<option ${i + 1 === DEFAULT_ROW_NUMBER && "selected"}>${i + 1}</option>`
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
  const cellX = Math.floor(x / pixelWidth);
  const cellY = Math.floor(y / pixelHeight);
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
  drawingContext.fillRect(0, 0, colorCanvas.width, colorCanvas.height);
}

function handleToggleGrid(e: Event) {
  const isChecked = (e.target as HTMLInputElement).checked;
  gridCanvas.style.display = isChecked ? "" : "none";
}

function fillCell(cellX: number, cellY: number) {
  const startX = cellX * pixelWidth;
  const startY = cellY * pixelHeight;

  drawingContext.fillStyle = colorInput.value;
  drawingContext.fillRect(startX, startY, pixelWidth, pixelHeight);
  colorHistory[`${cellX}_${cellY}`] = colorInput.value;
}

function onDimensionsChange() {
  const currentStitchNumber = parseInt(stitchNumberSelectMenu.value, 10);
  const currentRowNumber = parseInt(rowNumberSelectMenu.value, 10);
  drawGrid(currentStitchNumber, currentRowNumber);
}

colorCanvas.addEventListener("mousedown", handleCanvasClick);
clearButton.addEventListener("click", handleClearCanvas);
toggleGrid.addEventListener("change", handleToggleGrid);
stitchNumberSelectMenu.addEventListener("change", onDimensionsChange);
rowNumberSelectMenu.addEventListener("change", onDimensionsChange);
