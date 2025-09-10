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
  speedFactor = 0.05,
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
      dx: number;
      dy: number;
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
        const speed = 0.05 * speedFactor;
        const numClusters = Math.floor(starCount / 50);
        for (let i = 0; i < numClusters; i++) {
            const clusterX = Math.random() * canvas.width;
            const clusterY = Math.random() * canvas.height;
            const clusterSize = Math.random() * 30 + 20;

            for (let j = 0; j < clusterSize; j++) {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * 50;
            const velocityAngle = Math.random() * 2 * Math.PI;
            const velocity = (Math.random() * 2 + 0.1) * speed;
            starsRef.current.push({
                x: clusterX + Math.cos(angle) * radius,
                y: clusterY + Math.sin(angle) * radius,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                dx: Math.cos(velocityAngle) * velocity,
                dy: Math.sin(velocityAngle) * velocity,
            });
            }
        }

        const remainingStars = starCount - starsRef.current.length;
        for (let i = 0; i < remainingStars; i++) {
            const velocityAngle = Math.random() * 2 * Math.PI;
            const velocity = (Math.random() * 2 + 0.1) * speed;
            starsRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            dx: Math.cos(velocityAngle) * velocity,
            dy: Math.sin(velocityAngle) * velocity,
            });
        }
    };

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const [r, g, b] = starColor;

      starsRef.current.forEach((star) => {
        star.x += star.dx;
        star.y += star.dy;

        if (star.x < 0 || star.x > canvas.width || star.y < 0 || star.y > canvas.height) {
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
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
    
