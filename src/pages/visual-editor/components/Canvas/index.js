import React, { useRef, useEffect, useState } from 'react';
import {
  setContext,
  componentMounted,
  componentUnmounted,
  handledMouseMove,
  handledMouseDown,
  handledOnMouseUp,
} from './draw';

export const Canvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    componentMounted();
    setContext(ctx);
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
  };

  return <canvas ref={canvasRef} />;
};
