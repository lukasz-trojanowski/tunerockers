import React, { useLayoutEffect, useRef } from "react";
import StyledWrapper from "./StyledWrapper";

const Visualizer = ({ freqData }) => {
  const canvasRef = useRef();
  let raf = null;

  useLayoutEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const visualizer = () => {
      ctx.clearRect(0, 0, 1400, 300);
      const sample = 1024;
      for (let i = 0; i < sample; i++) {
        if (i % 8 === 0) {
          let t = ~~freqData[i] / 2;
          let y = 300;
          while (t >= 0) {
            ctx.fillStyle = `rgb(255,255,255)`;
            ctx.beginPath();
            ctx.arc(4 + i * 2, 8 + y, 4, 0, 2 * Math.PI);
            ctx.fill();
            ctx.closePath();
            y = y - 16;
            t = t - 8;
          }
        }
      }
      return () => cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(visualizer);
  }, [freqData]);

  return (
    <StyledWrapper>
      <canvas width="1400px" height="300px" ref={canvasRef} />
    </StyledWrapper>
  );
};

export default Visualizer;
