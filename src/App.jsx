import { useEffect, useMemo, useRef } from "react";
import { drawStuffOnCanvas } from "./canvas.js";

function CanvasRenderer() {
  const canvasRef = useRef(null);
  const backgroundImageRef = useRef(null);
  const deltaTimeRef = useRef(0)

  const draw = (canvas) => {
    const width = 1080;
    const height = 720;

    // 1. Multiply the canvas's width and height by the devicePixelRatio
    const ratio = window.devicePixelRatio || 1;
    canvas.width = width * ratio;
    canvas.height = height * ratio;

    // 2. Force it to display at the original (logical) size with CSS or style attributes
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    // 3. Scale the context so you can draw on it without considering the ratio.
    canvas.getContext("2d").scale(ratio, ratio);
    drawStuffOnCanvas(canvas, {
      width,
      height,
      backgroundImage: backgroundImageRef?.current,
    });
  };

  function looper() {
    if (Date.now() - deltaTimeRef.current >= 60) {
      draw(canvasRef.current);
      deltaTimeRef.current += 60;
      deltaTimeRef.current = Date.now()
    }
    requestAnimationFrame(looper);
  }

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      backgroundImageRef.current = image;
      if (canvasRef.current) {
        draw(canvasRef.current);
      }
    };

    image.src =
      "https://fastly.picsum.photos/id/339/1080/720.jpg?hmac=g-NTwo5bYR4u--90DKzyHOXdeoEwuTF_RTQbQEHwfZY";

    looper()
  }, []);

  const CanvasElement = useMemo(() => <canvas ref={canvasRef}></canvas>, []);
  return <div className="canvas-renderer">{CanvasElement}</div>;
}

export default function App() {
  return (
    <>
      <div className="container">
        <CanvasRenderer />
      </div>
    </>
  );
}
