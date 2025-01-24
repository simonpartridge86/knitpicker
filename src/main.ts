/**
 * @type HTMLCanvasElement
 */
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const guide = document.getElementById("guide") as HTMLDivElement;
const colorInput = document.getElementById("colorInput") as HTMLInputElement;
const toggleGuide = document.getElementById("toggleGuide") as HTMLInputElement;
const clearButton = document.getElementById("clearButton") as HTMLButtonElement;
const drawingContext = canvas.getContext("2d") as CanvasRenderingContext2D;

const CELL_SIDE_COUNT = 5;
const cellPixelLength = canvas.width / CELL_SIDE_COUNT;
const colorHistory = {} as Record<string, string>;

// Set default color
colorInput.value = "#009578";

// Initialize the canvas background
drawingContext.fillStyle = "#ffffff";
drawingContext.fillRect(0, 0, canvas.width, canvas.height);

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

const handleToggleGuideChange = () => {
  guide.style.display = toggleGuide.checked ? "block" : "none";
};

const fillCell = (cellX: number, cellY: number) => {
  const startX = cellX * cellPixelLength;
  const startY = cellY * cellPixelLength;

  drawingContext.fillStyle = colorInput.value;
  drawingContext.fillRect(startX, startY, cellPixelLength, cellPixelLength);
  colorHistory[`${cellX}_${cellY}`] = colorInput.value;
  console.log("2", colorHistory);
};

canvas.addEventListener("mousedown", handleCanvasMousedown);
clearButton.addEventListener("click", handleClearButtonClick);
toggleGuide.addEventListener("change", handleToggleGuideChange);
