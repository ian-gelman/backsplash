import "./index.css";
import Two from "two.js";
import { createGrid } from "./grid";

var two = new Two({
  type: Two.Types.svg,
  fullscreen: true,
  autostart: true,
}).appendTo(document.body);

const pixelSize = 15;

createGrid(pixelSize, "#cfcfcf");

/**
 * A pixel.
 * Has a chunk value (coordinate in the grid),
 * position within the chunk, (x, y),
 * color (hex string),
 * metadata (object).
 *
 * @typedef {Object} Pixel
 * @property {string} chunk - The chunk value.
 * @property {number} x - The x position.
 * @property {number} x - The x position.
 * @property {string} color - The color.
 * @property {Object} metadata - The metadata.
 * @property {string} metadata.created_by - The creator.
 * @property {string} metadata.created_at - The creation date.
 */

const chunkSize = 128;

const renderChunk = (two, chunk, pixels) => {
  const [x, y] = chunk.id;

  const chunkRect = two.makeRectangle(
    x * chunkSize * pixelSize,
    y * chunkSize * pixelSize,
    chunkSize * pixelSize,
    chunkSize * pixelSize,
  );
  chunkRect.fill = "#ffff00";
  chunkRect.stroke = "#ff0000";
};

const createChunk = (x, y) => {
  return { id: [x, y] };
};

const pixels = [
  {
    chunk: "0,0",
    x: 0,
    y: 0,
    color: "#ff0000",
    metadata: {
      created_by: "johndoe",
      created_at: "2020-01-01T00:00:00.000Z",
    },
  },
];

renderChunk(two, createChunk(0, 0), pixels);
