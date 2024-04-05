import fs from "node:fs/promises";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { drawStuffOnCanvas } from "./src/canvas.js";

const canvas = createCanvas(1080, 720);
const backgroundImage = await loadImage(
  "https://fastly.picsum.photos/id/339/1080/720.jpg?hmac=g-NTwo5bYR4u--90DKzyHOXdeoEwuTF_RTQbQEHwfZY"
);

drawStuffOnCanvas(canvas, {
  width: canvas.width,
  height: canvas.height,
  backgroundImage,
});

await fs.writeFile("image.png", canvas.toBuffer("image/png"));
await fs.writeFile("image.jpg", canvas.toBuffer("image/jpeg"));
