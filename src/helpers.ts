// Creates an empty array x by y dimensions with each element === false
export const createEmptyGrid = (x: number, y: number): boolean[][] => {
  return Array.from({ length: y }, () => Array(x).fill(false));
};

// Creates pixel div element and applies 'pixel' and 'true/false' class
export const createPixelElement = (cellValue: boolean) => {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel", cellValue.toString());
  return pixel;
};

// Toggles pixel classes 'true' and 'false'
export const togglePixel = (pixelElement: HTMLDivElement) => {
  pixelElement.classList.toggle("true");
  pixelElement.classList.toggle("false");
};

// Renders an empty grid with the requested dimensions
export const renderEmptyGrid = (width: number, length: number) => {
  let isSelectMode = false;
  let isDeselectMode = false;

  const grid = createEmptyGrid(width, length);
  const gridContainer = document.querySelector(".grid") as HTMLDivElement;

  gridContainer.innerHTML = ""; // clears previous grid content
  gridContainer.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
  const gridContainerWidth = gridContainer.offsetWidth;

  grid.forEach((row, rowIndex) => {
    row.forEach((cellValue, colIndex) => {
      const pixel = createPixelElement(cellValue);
      pixel.style.width = `${gridContainerWidth / width}px`;
      console.log(pixel.style.width);
      pixel.style.height = pixel.style.width;

      pixel.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const pixelValue = grid[rowIndex][colIndex];
        if (pixelValue === true) {
          isSelectMode = false;
          isDeselectMode = true;
        } else {
          isSelectMode = true;
          isDeselectMode = false;
        }
        grid[rowIndex][colIndex] = !pixelValue;
        togglePixel(pixel);
      });

      pixel.addEventListener("mouseover", (e) => {
        e.preventDefault();
        const pixelValue = grid[rowIndex][colIndex];
        if (isSelectMode && pixelValue === false) {
          grid[rowIndex][colIndex] = true;
          togglePixel(pixel);
        } else if (isDeselectMode && pixelValue === true) {
          grid[rowIndex][colIndex] = false;
          togglePixel(pixel);
        }
      });

      pixel.addEventListener("mouseup", (e) => {
        e.preventDefault();
        isSelectMode = false;
        isDeselectMode = false;
        console.table(grid);
      });

      gridContainer.appendChild(pixel);
    });
  });
};
