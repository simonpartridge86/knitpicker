const createEmptyGrid = (x: number, y: number): boolean[][] =>
  Array.from({ length: y }, () => Array(x).fill(false));

const emptyGrid = createEmptyGrid(10, 10);

const renderGrid = (grid: boolean[][]) => {
  const gridSize = grid.length;
  const gridContainer = document.getElementById("grid");

  if (gridContainer) {
    gridContainer.innerHTML = ""; // clears previous grid content
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item", cell.toString()); // Add class based on `true/false`
        gridItem.textContent = ""; // Optionally, display coordinates or content

        // Add click handler to toggle true/false
        gridItem.addEventListener("click", () => {
          grid[rowIndex][colIndex] = !grid[rowIndex][colIndex]; // Toggle value in the array
          gridItem.classList.toggle("true"); // Update styling dynamically
          gridItem.classList.toggle("false");
        });

        gridContainer.appendChild(gridItem);
      });
    });
  }
};

renderGrid(emptyGrid);
