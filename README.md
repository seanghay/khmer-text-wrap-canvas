## Install & Run

```
npm install
npm run dev
```

## Basic Usage

```javascript
import { RichTextLayoutEngine } from "./rich-text-layout-engine.js";

const textEngine = new RichTextLayoutEngine();
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
```

## Preview

<img src="./image.png" alt="">