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
      endX: number;
      endY: number;
      size: number;
      opacity: number;
    }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = [];
      initStars();
    };

    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        starsRef.current.push({
          x: startX,
          y: startY,
          endX: Math.random() * canvas.width,
          endY: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    let animationFrameId: number;

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const [r, g, b] = starColor;

      starsRef.current.forEach((star) => {
        const dirX = star.endX - star.x;
        const dirY = star.endY - star.y;
        const distance = Math.sqrt(dirX * dirX + dirY * dirY);

        if (distance < 1) {
          star.endX = Math.random() * canvas.width;
          star.endY = Math.random() * canvas.height;
        } else {
          const normalizedDirX = dirX / distance;
          const normalizedDirY = dirY / distance;
          star.x += normalizedDirX * speedFactor;
          star.y += normalizedDirY * speedFactor;
        }
        
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
        ctx.fill();
      });
    };
    
    const animate = () => {
        draw();
        animationFrameId = requestAnimationFrame(animate);
    }
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount, starColor, speedFactor, backgroundColor]);

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
