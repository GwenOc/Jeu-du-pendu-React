import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';

import { debounce } from 'lodash';
import './Canvas.css';

/**
 * Returns an array of functions that draw each part of the Hangman on the
 * canvas.
 * * 
 */
const getHangmanParts = () => { 

  const firstLine = canvasContext => {
    canvasContext.lineWidth = 10;
    canvasContext.beginPath();
    canvasContext.moveTo(296, 93);
    canvasContext.lineTo(294, 392);
    canvasContext.stroke();
  };

  const secondLine = canvasContext => {
    canvasContext.lineWidth = 10;
    canvasContext.beginPath();
    canvasContext.moveTo(299, 91);
    canvasContext.lineTo(91, 91);
    canvasContext.stroke();
  };

  const rope = canvasContext => {
    canvasContext.lineWidth = 10;
    canvasContext.beginPath();
    canvasContext.moveTo(91, 91);
    canvasContext.lineTo(91, 136);
    canvasContext.stroke();
  };


  const head = canvasContext => {
    canvasContext.beginPath();
    canvasContext.moveTo(84, 135 - 0);
    canvasContext.bezierCurveTo(84 + (0.5522847498307936 * 0), 135 - 0, 84 + 0, 135 - (0.5522847498307936 * 0), 84 + 0, 135);
    canvasContext.bezierCurveTo(84 + 0, 135 + (0.5522847498307936 * 0), 84 + (0.5522847498307936 * 0), 135 + 0, 84, 135 + 0);
    canvasContext.bezierCurveTo(84 - (0.5522847498307936 * 0), 135 + 0, 84 - 0, 135 + (0.5522847498307936 * 0), 84 - 0, 135);
    canvasContext.bezierCurveTo(84 - 0, 135 - (0.5522847498307936 * 0), 84 - (0.5522847498307936 * 0), 135 - 0, 84, 135 - 0);
    canvasContext.moveTo(98, 144 - 14);
    canvasContext.bezierCurveTo(98 + (0.5522847498307936 * 8), 144 - 14, 98 + 8, 144 - (0.5522847498307936 * 14), 98 + 8, 144);
    canvasContext.bezierCurveTo(98 + 8, 144 + (0.5522847498307936 * 14), 98 + (0.5522847498307936 * 8), 144 + 14, 98, 144 + 14);
    canvasContext.bezierCurveTo(98 - (0.5522847498307936 * 8), 144 + 14, 98 - 8, 144 + (0.5522847498307936 * 14), 98 - 8, 144);
    canvasContext.bezierCurveTo(98 - 8, 144 - (0.5522847498307936 * 14), 98 - (0.5522847498307936 * 8), 144 - 14, 98, 144 - 14);
    canvasContext.stroke();
  };

  const body = canvasContext => {
    canvasContext.beginPath();
    canvasContext.moveTo(103, 158);
    canvasContext.lineTo(115, 221);
    canvasContext.moveTo(106, 173);
    canvasContext.lineTo(81, 185);
    canvasContext.moveTo(105, 174);
    canvasContext.lineTo(139, 182);
    canvasContext.moveTo(114, 220);
    canvasContext.lineTo(97, 233);
    canvasContext.moveTo(116, 218);
    canvasContext.lineTo(136, 225);
    canvasContext.stroke();
  };  
  
  return [firstLine, secondLine, rope, head, body];
};

// Helper function to prepare the canvas for drawing
const draw = (canvasContext, drawFn) => {
  canvasContext.lineWidth = 2; // Reset line width to default
  drawFn(canvasContext);
};

// Clears the canvas
const clearCanvas = canvas => {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * Draws the "Hangman" graphic with parts filled in according to the number of incorrect guesses.
 *
 * For example, to draw the first 5 parts of the hangman:
 *
 * ```javascript
 * <Hangman incorrectGuessCount={5} />
 * ```
 */
const Canvas = ({ incorrectGuessCount = 0 }) => {
  const containerRef = useRef();
  const canvasRef = useRef();
  const drawnPartsRef = useRef(0);
  const previousIncorrectGuessCountRef = useRef(incorrectGuessCount);
  const [size, setSize] = useState();

  const hangmanParts = useMemo(() => getHangmanParts(size), [size])

  // Resizes the canvas based on its parent's width
  const resizeCanvas = useCallback(() => {
    const style = getComputedStyle(containerRef.current);
    const containerSize = parseInt(style.width);
    setSize(containerSize);
  }, []);

  // Debounced version to use as a resize event listener
  const resizeCanvasDebounce = useCallback(debounce(resizeCanvas, 50), []);

  // Clears and resets the canvas so parts can be redrawn
  const resetCanvas = () => {
    clearCanvas(canvasRef.current);
    drawnPartsRef.current = 0;
  };

  // Resize the canvas when the window size changes
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvasDebounce);
    return () => window.removeEventListener('resize', resizeCanvasDebounce);
  }, [resizeCanvas, resizeCanvasDebounce]);

  // Reset and redraw whenever canvas size changes
  useEffect(resetCanvas, [size]);

  // Draw the hangman parts
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // If the guess count went backward then reset the drawn state
    if (previousIncorrectGuessCountRef.current > incorrectGuessCount) {
      resetCanvas();
    }
    previousIncorrectGuessCountRef.current = incorrectGuessCount;

    // Draw the relevant part for the number of incorrect guesses
    const partsToDraw = hangmanParts.slice(drawnPartsRef.current, incorrectGuessCount);
    partsToDraw.forEach(f => draw(context, f));
    drawnPartsRef.current = incorrectGuessCount;
  }, [hangmanParts, incorrectGuessCount]);

  return (
    <div className="Hangman" ref={containerRef}>
      <canvas ref={canvasRef} height={size} width={size}></canvas>
    </div>
  );
};

export default Canvas