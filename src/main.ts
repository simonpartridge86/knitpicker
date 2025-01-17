import { renderEmptyGrid } from "./utils";

let defaultWidth = 50;
let defaultHeight = 25;

renderEmptyGrid(defaultWidth, defaultHeight);

const setupClearButton = () => {
  const clearButton = document.getElementById("clear") as HTMLButtonElement;
  clearButton.onclick = () => renderEmptyGrid(defaultWidth, defaultHeight);
};
setupClearButton();
