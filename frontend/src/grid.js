import Two from "two.js";

export function createGrid(s, color) {
  var size = s || 30;
  var two = new Two({
    type: Two.Types.canvas,
    width: size,
    height: size,
  });

  var a = two.makeLine(two.width, 0, two.width, two.height);
  var b = two.makeLine(0, two.height, two.width, two.height);
  a.stroke = b.stroke = color;

  two.update();

  var imageData = two.renderer.domElement.toDataURL("image/png");
  document.body.style.backgroundColor = "white";
  document.body.style.backgroundImage = `url(${imageData})`;
  document.body.style.backgroundSize = `${size}px`;
}
