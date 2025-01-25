const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const gridLines = document.getElementById("grid") as HTMLDivElement;
const colorInput = document.getElementById("color-input") as HTMLInputElement;
const toggleGrid = document.getElementById("toggle-grid") as HTMLInputElement;
const clearButton = document.getElementById(
  "clear-button"
) as HTMLButtonElement;
const drawingContext = canvas.getContext("2d") as CanvasRenderingContext2D;
const stitchNumberSelectMenu = document.getElementById(
  "stitch-number"
) as HTMLSelectElement;
const rowNumberSelectMenu = document.getElementById(
  "row-number"
) as HTMLSelectElement;

const DEFAULT_STITCH_NUMBER = 10;
const DEFAULT_ROW_NUMBER = 5;
const MAX_STITCH_NUMBER = 50;
const MAX_ROW_NUMBER = 20;
const pixelWidth = canvas.width / DEFAULT_STITCH_NUMBER;
const pixelHeight = canvas.height / DEFAULT_ROW_NUMBER;
const colorHistory = {} as Record<string, string>;

// Set default color
colorInput.value = "#009578";

// Initialize the canvas background
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

// Setup grid lines
const updateGrid = (stitchNumber: number, rowNumber: number) => {
  gridLines.style.width = `${canvas.width}px`;
  gridLines.style.height = `${canvas.height}px`;
  gridLines.style.gridTemplateColumns = `repeat(${stitchNumber}, 1fr)`;
  gridLines.style.gridTemplateRows = `repeat(${rowNumber}, 1fr)`;

  [...Array(stitchNumber * rowNumber)].forEach(() =>
    gridLines.insertAdjacentHTML("beforeend", "<div></div>")
  );
};

updateGrid(DEFAULT_STITCH_NUMBER, DEFAULT_ROW_NUMBER);

// Setup select menus
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

function handleCanvasMousedown(e: MouseEvent) {
  // Ensure user is using their primary mouse button
  if (e.button !== 0) {
    return;
  }

  const canvasBoundingRect = canvas.getBoundingClientRect();
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

const handleClearButtonClick = () => {
  const yes = confirm("Are you sure you wish to clear the canvas?");

  if (!yes) return;

  drawingContext.fillStyle = "#ffffff";
  drawingContext.fillRect(0, 0, canvas.width, canvas.height);
};

const handleToggleGrid = () => {
  gridLines.style.display = toggleGrid.checked ? "" : "none";
};

const fillCell = (cellX: number, cellY: number) => {
  const startX = cellX * pixelWidth;
  const startY = cellY * pixelHeight;

  drawingContext.fillStyle = colorInput.value;
  drawingContext.fillRect(startX, startY, pixelWidth, pixelHeight);
  colorHistory[`${cellX}_${cellY}`] = colorInput.value;
};

const onDimensionsChange = () => {
  const currentStitchNumber = parseInt(stitchNumberSelectMenu.value, 10);
  const currentRowNumber = parseInt(rowNumberSelectMenu.value, 10);
  updateGrid(currentStitchNumber, currentRowNumber);
};

canvas.addEventListener("mousedown", handleCanvasMousedown);
clearButton.addEventListener("click", handleClearButtonClick);
toggleGrid.addEventListener("change", handleToggleGrid);
stitchNumberSelectMenu.addEventListener("change", onDimensionsChange);
rowNumberSelectMenu.addEventListener("change", onDimensionsChange);
