"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Star {
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
  const starsRef = useRef<Star[]>([]);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const initStars = () => {
      starsRef.current = [];
      const numClusters = 5;
      const starsPerCluster = starCount / numClusters;
      
      for (let i = 0; i < numClusters; i++) {
        const clusterX = Math.random() * canvas.width;
        const clusterY = Math.random() * canvas.height;
        const clusterRadius = Math.random() * (canvas.width / 4) + (canvas.width / 10);

        for (let j = 0; j < starsPerCluster; j++) {
            const angle = Math.random() * 2 * Math.PI;
            const radius = Math.random() * clusterRadius;
            const x = clusterX + Math.cos(angle) * radius * (Math.random() * 1.5);
            const y = clusterY + Math.sin(angle) * radius * (Math.random() * 1.5);

            starsRef.current.push({
              x: x,
              y: y,
              vx: (Math.random() - 0.5) * speedFactor * 2,
              vy: (Math.random() - 0.5) * speedFactor * 2,
              radius: Math.random() * 1.2 + 0.5,
              opacity: Math.random() * 0.5 + 0.2,
              phase: Math.random() * Math.PI * 2,
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
            star.x += star.vx;
            star.y += star.vy;
            
            // Wander
            star.vx += (Math.random() - 0.5) * 0.001;
            star.vy += (Math.random() - 0.5) * 0.001;

            // Bounce off edges
            if (star.x - star.radius < 0 || star.x + star.radius > canvas.width) {
              star.vx = -star.vx;
            }
            if (star.y - star.radius < 0 || star.y + star.radius > canvas.height) {
              star.vy = -star.vy;
            }

            // Twinkle
            star.phase += 0.03;
            star.opacity = 0.2 + (Math.sin(star.phase) + 1) * 0.15;
        });
    }

    const animate = () => {
      update();
      draw();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
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
