import { renderEmptyGrid } from "./helpers";

// let defaultWidth = 50;
// let defaultHeight = 25;

// renderEmptyGrid(defaultWidth, defaultHeight);

// const setupClearButton = () => {
//   const clearButton = document.getElementById("clear") as HTMLButtonElement;
//   clearButton.onclick = () => renderEmptyGrid(defaultWidth, defaultHeight);
// };
// setupClearButton();

/**
 * @type HTMLCanvasElement
 */

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const guide = document.getElementById("guide") as HTMLDivElement;
// const colorInput = document.getElementById("colorInput");
const toggleGuide = document.getElementById("toggleGuide") as HTMLInputElement;
const clearButton = document.getElementById("clearButton") as HTMLButtonElement;
const drawingContext = canvas.getContext("2d") as CanvasRenderingContext2D;

const CELL_SIDE_COUNT = 5;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;
// const colorHistory = {};

// Set default color
// colorInput.value = "#009578";

// Initialize the canvas background
{
  drawingContext.fillStyle = "#ffffff";
  drawingContext.fillRect(0, 0, canvas.width, canvas.height);
}

// Setup the guide
{
  guide.style.width = `${canvas.width}px`;
  guide.style.height = `${canvas.height}px`;
  guide.style.gridTemplateColumns = `repeat(${CELL_SIDE_COUNT}, 1fr)`;
  guide.style.gridTemplateRows = `repeat(${CELL_SIDE_COUNT}, 1fr)`;

  [...Array(CELL_SIDE_COUNT ** 2)].forEach(() =>
    guide.insertAdjacentHTML("beforeend", "<div></div>")
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
  const cellX = Math.floor(x / cellPixelLength);
  const cellY = Math.floor(y / cellPixelLength);
  // const currentColor = colorHistory[`${cellX}_${cellY}`];

  // if (e.ctrlKey) {
  //   if (currentColor) {
  //     colorInput.value = currentColor;
  //   }
  // } else {
  fillCell(cellX, cellY);
  // }
}

function handleClearButtonClick() {
  const yes = confirm("Are you sure you wish to clear the canvas?");

  if (!yes) return;

  drawingContext.fillStyle = "#ffffff";
  drawingContext.fillRect(0, 0, canvas.width, canvas.height);
}

function handleToggleGuideChange() {
  guide.style.display = toggleGuide.checked ? "" : "none";
}

function fillCell(cellX: number, cellY: number) {
  const startX = cellX * cellPixelLength;
  const startY = cellY * cellPixelLength;

  drawingContext.fillStyle = "green";
  drawingContext.fillRect(startX, startY, cellPixelLength, cellPixelLength);
  // colorHistory[`${cellX}_${cellY}`] = colorInput.value;
}

canvas.addEventListener("mousedown", handleCanvasMousedown);
clearButton.addEventListener("click", handleClearButtonClick);
toggleGuide.addEventListener("change", handleToggleGuideChange);
