import { renderEmptyGrid } from "./utils";

let defaultWidth = 10;
let defaultHeight = 10;

renderEmptyGrid(defaultWidth, defaultHeight);

const setupClearButton = () => {
  const clearButton = document.getElementById("clear") as HTMLButtonElement;
  clearButton.onclick = () => renderEmptyGrid(defaultWidth, defaultHeight);
};
setupClearButton();
