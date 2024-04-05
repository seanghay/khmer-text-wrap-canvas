import { RichTextLayoutEngine } from "./rich-text-layout-engine.js";

const textEngine = new RichTextLayoutEngine();

export function drawStuffOnCanvas(canvas, { width, height, backgroundImage }) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.textBaseline = "top";

  if (backgroundImage) {
    ctx.drawImage(backgroundImage, 0, 0, width, height);
  }

  const block = textEngine.create(ctx, {
    top: 400,
    left: 200,
    width: 500,
    textAlignment: "left",
    lineHeight: 1.4,
    spans: [
      {
        text: "លោក ",
        fontSize: 18,
        fontFamily: "Khmer OS System, sans-serif",
        fillStyle: "yellow",
        fontWeight: "500",
      },
      {
        text: " ដារា សំណាង ",
        fontSize: 16,
        fontFamily: "Moul, sans-serif",
        fillStyle: "blue",
        fontWeight: "500",
      },
      {
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        fontSize: 18,
        fontFamily: "Google Sans, Noto Sans Khmer, sans-serif",
        fontWeight: "400",
      },
      {
        text: " Hello world Mollitia facere eveniet tenetur, sequi enim expedita quod consectetur dolore omnis maxime ipsa beatae velit architecto nobis cupiditate animi. Libero, numquam laboriosam. បានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរ",
        fontSize: 18,
        fontFamily: "Google Sans, Noto Sans Khmer, sans-serif",
        fillStyle: "darkred",
        fontWeight: "400",
      },
      {
        text: "។",
        fontSize: 18,
        fontFamily: "Noto Serif Khmer, sans-serif",
        fillStyle: "lightgreen",
        fontWeight: "500",
      },
    ],
  });

  ctx.fillStyle = "rgba(200, 200, 100 ,.65)";

  // compute height from text layout
  ctx.fillRect(200, 400, 500, block.height());
  block.draw();

  textEngine
    .create(ctx, {
      top: 100,
      left: 50,
      width: 512,
      textAlignment: "center",
      lineHeight: 1.4,
      spans: [
        {
          text: "លោក ",
          fontSize: 18,
          fontFamily: "Noto Serif Khmer, sans-serif",
          fillStyle: "white",
          fontWeight: "500",
        },
        {
          text: " ដារា សំណាង ",
          fontSize: 30,
          fontFamily: "Kantumruy Pro, sans-serif",
          fillStyle: "orange",
          fontWeight: "700",
        },
        {
          text: " បានទៅប្រទេសខ្មែរបាន\n\nទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរបានទៅប្រទេសខ្មែរ",
          fontSize: 18,
          fontFamily: "Noto Serif Khmer, sans-serif",
          fillStyle: "white",
          fontWeight: "500",
        },
        {
          text: "។",
          fontSize: 18,
          fontFamily: "Noto Serif Khmer, sans-serif",
          fillStyle: "orange",
          fontWeight: "500",
        },
      ],
    })
    .draw();
}
