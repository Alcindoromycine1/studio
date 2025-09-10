"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface StarfieldProps extends React.ComponentProps<"canvas"> {
  starCount?: number;
  starColor?: [number, number, number];
  speedFactor?: number;
  backgroundColor?: string;
}

export function Starfield({
  starCount = 1000,
  starColor = [255, 255, 255],
  speedFactor = 1,
  backgroundColor = "black",
  className,
  ...props
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<
    {
      x: number;
      y: number;
      size: number;
      opacity: number;
    }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!ctx || !canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (starsRef.current.length === 0) {
        for (let i = 0; i < starCount; i++) {
          starsRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
          });
        }
      }

      const [r, g, b] = starColor;

      starsRef.current.forEach((star) => {
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();
      });
    };
    
    draw();

    const handleResize = () => {
      starsRef.current = [];
      draw();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [starCount, starColor, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed inset-0 -z-20 h-full w-full",
        className
      )}
      {...props}
    />
  );
}
