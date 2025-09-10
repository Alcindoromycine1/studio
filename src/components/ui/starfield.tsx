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

    const makeStar = (): Star => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speedFactor * 2,
      vy: (Math.random() - 0.5) * speedFactor * 2,
      radius: Math.random() * 1.2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
    });

    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push(makeStar());
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
      if (!canvas) return;
      starsRef.current.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        // Wander
        star.vx += (Math.random() - 0.5) * 0.001;
        star.vy += (Math.random() - 0.5) * 0.001;

        // Wrap edges
        if (star.x < -star.radius) {
          star.x = canvas.width + star.radius;
        } else if (star.x > canvas.width + star.radius) {
          star.x = -star.radius;
        }
        if (star.y < -star.radius) {
          star.y = canvas.height + star.radius;
        } else if (star.y > canvas.height + star.radius) {
          star.y = -star.radius;
        }

        // Twinkle
        star.phase += 0.03;
        star.opacity = 0.2 + (Math.sin(star.phase) + 1) * 0.15;
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

      // Adjust star count without nuking existing ones
      if (starsRef.current.length < starCount) {
        while (starsRef.current.length < starCount) {
          starsRef.current.push(makeStar());
        }
      } else if (starsRef.current.length > starCount) {
        starsRef.current = starsRef.current.slice(0, starCount);
      }
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
  }, [starCount, starColor, speedFactor, backgroundColor]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 -z-20 h-full w-full", className)}
      {...props}
    />
  );
}
