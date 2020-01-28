import React, { useRef, useEffect, useState } from 'react';
import {
  setContext,
  setUpperCanvasContext,
  componentMounted,
  componentUnmounted,
  handledMouseMove,
  handledMouseDown,
  handledOnMouseUp,
} from './draw';

export const Canvas = () => {
  const canvasRef = useRef();
  const upperCanvasRef = useRef();

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    const upperCanvasCtx = upperCanvasRef.current.getContext('2d');

    componentMounted();
    setContext(ctx);
    setUpperCanvasContext(upperCanvasCtx);
    handleResizeWindow();

    window.addEventListener('resize', handleResizeWindow, false);
    window.addEventListener('mousedown', handleMouseDown, false);
    window.addEventListener('mouseup', handleMouseUp, false);

    return () => {
      window.removeEventListener('resize', handleResizeWindow, false);
      window.removeEventListener('mousemove', handledMouseMove, false);
      window.removeEventListener('mousedown', handleMouseDown, false);
      window.removeEventListener('mouseup', handleMouseUp, false);
      componentUnmounted();
    };
  }, []);

  const handleMouseDown = event => {
    handledMouseDown(event);
    window.addEventListener('mousemove', handledMouseMove, false);
  };

  const handleMouseUp = event => {
    handledOnMouseUp();
    window.removeEventListener('mousemove', handledMouseMove, false);
  };

  const handleResizeWindow = () => {
    canvasRef.current.width = innerWidth;
    canvasRef.current.height = innerHeight - 114;

    upperCanvasRef.current.width = innerWidth;
    upperCanvasRef.current.height = innerHeight - 114;
  };

  return (
    <>
      <canvas ref={upperCanvasRef} style={{ position: 'absolute', left: 0 }} />
      <canvas ref={canvasRef} style={{ background: '#697380' }} />
    </>
  );
};
