"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  phase: number;
  speed: number;
}

interface StarfieldProps extends React.ComponentProps<"canvas"> {
  starCount?: number;
  starColor?: [number, number, number];
  backgroundColor?: string;
}

export function Starfield({
  starCount = 1000,
  starColor = [255, 255, 255],
  backgroundColor = "black",
  className,
  ...props
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const makeStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.5,
      opacity: 0,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.01,
    });

    const initStars = () => {
      starsRef.current = [];
      const numClusters = Math.floor(starCount / 100);
      const starsPerCluster = starCount / numClusters;

      for (let i = 0; i < numClusters; i++) {
        const clusterX = Math.random() * canvas.width;
        const clusterY = Math.random() * canvas.height;
        const clusterRadius = Math.random() * 200 + 100;

        for (let j = 0; j < starsPerCluster; j++) {
          const angle = Math.random() * 2 * Math.PI;
          const distance = Math.sqrt(Math.random()) * clusterRadius;
          starsRef.current.push({
            x: clusterX + Math.cos(angle) * distance,
            y: clusterY + Math.sin(angle) * distance,
            radius: Math.random() * 1.2 + 0.5,
            opacity: 0,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.02 + 0.01,
          });
        }
      }
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

    const update = () => {
      starsRef.current.forEach((star) => {
        star.phase += star.speed;
        star.opacity = (Math.sin(star.phase) + 1) / 2 * 0.7 + 0.1; // Oscillates between 0.1 and 0.8
      });
    };

    const animate = () => {
      update();
      draw();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
    
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      initStars();
    };

    // Setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
    animate();

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
