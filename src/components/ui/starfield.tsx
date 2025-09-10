
"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Star {
  startX: number;
  startY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  phase: number;
}

interface StarfieldProps extends React.ComponentProps<"canvas"> {
  starCount?: number;
  starColor?: [number, number, number];
  backgroundColor?: string;
}

export function Starfield({
  starCount = 500,
  starColor = [255, 255, 255],
  backgroundColor = "black",
  className,
  ...props
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameId = useRef<number | null>(null);

  const initOrUpdateStars = (canvas: HTMLCanvasElement) => {
    const existingStars = starsRef.current;
    const newStars: Star[] = [];

    const makeStar = (x?: number, y?: number): Star => {
      const startX = x ?? Math.random() * canvas.width;
      const startY = y ?? Math.random() * canvas.height;
      return {
        startX: startX,
        startY: startY,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 0.8 + 0.4,
        opacity: 0,
        phase: Math.random() * Math.PI * 2,
      };
    };
    
    // If starCount changes, adjust the array
    if (existingStars.length > starCount) {
        starsRef.current = existingStars.slice(0, starCount);
    } else if (existingStars.length < starCount) {
        for (let i = 0; i < starCount - existingStars.length; i++) {
            newStars.push(makeStar());
        }
        starsRef.current = existingStars.concat(newStars);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    initOrUpdateStars(canvas);

    const update = () => {
      starsRef.current.forEach((star) => {
        // Wandering motion
        star.vx += (Math.random() - 0.5) * 0.01;
        star.vy += (Math.random() - 0.5) * 0.01;
        
        // Clamp velocity
        star.vx = Math.max(-0.2, Math.min(0.2, star.vx));
        star.vy = Math.max(-0.2, Math.min(0.2, star.vy));

        star.x += star.vx;
        star.y += star.vy;
        
        // Wrap around edges
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Twinkling opacity
        star.phase += 0.02;
        star.opacity = (Math.sin(star.phase) + 1) / 2 * 0.7 + 0.1;
      });
    };

    const draw = () => {
        if (!ctx || !canvas) return;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
  
        const [r, g, b] = starColor;
  
        starsRef.current.forEach((star) => {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.opacity})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
          ctx.fill();
        });
      };

    const animate = () => {
      update();
      draw();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();
    
    const handleResize = () => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initOrUpdateStars(canvas);
      };
  
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [starCount, starColor, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 -z-20 h-full w-full", className)}
      {...props}
    />
  );
}
