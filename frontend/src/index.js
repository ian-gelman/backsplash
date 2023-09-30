import "./index.css";
import Two from "two.js";
import { createGrid } from "./grid";
import { io } from "socket.io-client";

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
 * @ property {number[]} chunk - The chunk value. (Not sure if this is right)
 * @property {number} x - The x position.
 * @property {number} x - The x position.
 * @property {string} color - The color.
 * @property {Object} metadata - The metadata.
 * @property {string} metadata.created_by - The creator.
 * @property {string} metadata.created_at - The creation date.
 */

const chunkSize = 64;

const renderChunk = (two, chunk, pixels) => {
  const [x, y] = chunk.id;

  //const chunkRect = two.makeRectangle(
  //  x * chunkSize * pixelSize + (chunkSize * pixelSize) / 2,
  //  y * chunkSize * pixelSize + (chunkSize * pixelSize) / 2,
  //  chunkSize * pixelSize,
  //  chunkSize * pixelSize,
  //);
  //chunkRect.fill = "#ffff00";
  //chunkRect.stroke = "#ff0000";

  pixels.forEach((pixel) => {
    const { x, y } = pixel;
    const rect = two.makeRectangle(
      x * pixelSize + pixelSize / 2 + chunkSize * pixelSize * chunk.id[0],
      y * pixelSize + pixelSize / 2 + chunkSize * pixelSize * chunk.id[1],
      pixelSize,
      pixelSize,
    );
    rect.fill = pixel.color;
    rect.stroke = "#000000";
  });
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

const screenCoordinatesToChunkAndPixel = ({ clientX, clientY }) => {
  const chunkX = Math.floor(Math.floor(clientX / pixelSize) / chunkSize);
  const chunkY = Math.floor(Math.floor(clientY / pixelSize) / chunkSize);

  const pixelX = Math.floor(clientX / pixelSize) % chunkSize;
  const pixelY = Math.floor(clientY / pixelSize) % chunkSize;

  return {
    chunk: createChunk(chunkX, chunkY),
    x: pixelX,
    y: pixelY,
  };
};

// const socket = io("4.tcp.ngrok.io:12322");
const socket = io("localhost:5000");

window.addEventListener("mousedown", (e) => {
  const { chunk, x, y } = screenCoordinatesToChunkAndPixel(e);

  const data = {
    chunk: `${chunk.id[0]},${chunk.id[1]}`,
    x,
    y,
    color: "#ff0000",
  };

  renderChunk(two, chunk, [data]);

  socket.emit("update_pixel", data);
});
