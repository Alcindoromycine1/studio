
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
  repelRadius?: number;
}

interface MousePos {
  x: number;
  y: number;
  inside: boolean;
}

export function Starfield({
  starCount = 1000,
  starColor = [255, 255, 255],
  backgroundColor = "black",
  repelRadius = 60,
  className,
  ...props
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const mousePos = useRef<MousePos>({ x: 0, y: 0, inside: false });

  const initOrUpdateStars = (canvas: HTMLCanvasElement) => {
    const existingStars = starsRef.current;
    const newStars: Star[] = [];
    const numStars = starCount;

    const makeStar = (): Star => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        startX: x,
        startY: y,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 0.8 + 0.4,
        opacity: 0,
        phase: Math.random() * Math.PI * 2,
      };
    };

    if (existingStars.length > numStars) {
      starsRef.current = existingStars.slice(0, numStars);
    } else if (existingStars.length < numStars) {
      for (let i = 0; i < numStars - existingStars.length; i++) {
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
    
    let dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);

    initOrUpdateStars(canvas);

    const update = () => {
      starsRef.current.forEach((star) => {
        // Wandering motion
        star.vx += (Math.random() - 0.5) * 0.01;
        star.vy += (Math.random() - 0.5) * 0.01;
        
        star.vx = Math.max(-0.2, Math.min(0.2, star.vx));
        star.vy = Math.max(-0.2, Math.min(0.2, star.vy));

        star.x += star.vx;
        star.y += star.vy;
        
        if (star.x < 0) star.x = window.innerWidth;
        if (star.x > window.innerWidth) star.x = 0;
        if (star.y < 0) star.y = window.innerHeight;
        if (star.y > window.innerHeight) star.y = 0;

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

      if (mousePos.current.inside) {
        ctx.beginPath();
        ctx.arc(mousePos.current.x, mousePos.current.y, repelRadius, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(255,0,0,1)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const animate = () => {
      update();
      draw();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();
    
    const handleResize = () => {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      if (ctx) ctx.scale(dpr, dpr);
      initOrUpdateStars(canvas);
    };

    const handlePointerMove = (e: PointerEvent | TouchEvent) => {
        mousePos.current.inside = true;
        const rect = canvas.getBoundingClientRect();
        const event = 'touches' in e ? e.touches[0] : e;
        mousePos.current.x = (event.clientX - rect.left);
        mousePos.current.y = (event.clientY - rect.top);
    };

    const handlePointerLeave = () => {
        mousePos.current.inside = false;
    };

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("touchmove", handlePointerMove);
    canvas.addEventListener("touchend", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("touchmove", handlePointerMove);
      canvas.removeEventListener("touchend", handlePointerLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [starCount, starColor, backgroundColor, repelRadius]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed inset-0 -z-20 h-full w-full", className)}
      {...props}
    />
  );
}
