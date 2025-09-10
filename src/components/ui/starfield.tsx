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
      speed: number;
    }[]
  >([]);
  const scrollYRef = useRef(0);

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
      const numClusters = Math.floor(starCount / 50);
      for (let i = 0; i < numClusters; i++) {
        const clusterX = Math.random() * canvas.width;
        const clusterY = Math.random() * canvas.height;
        const clusterSize = Math.random() * 30 + 20;

        for (let j = 0; j < clusterSize; j++) {
          const angle = Math.random() * 2 * Math.PI;
          const radius = Math.random() * 50;
          starsRef.current.push({
            x: clusterX + Math.cos(angle) * radius,
            y: clusterY + Math.sin(angle) * radius,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            speed: Math.random() * 0.1 + 0.01,
          });
        }
      }

      // Add remaining stars scattered
      const remainingStars = starCount - starsRef.current.length;
      for (let i = 0; i < remainingStars; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.1 + 0.01,
        });
      }
    };

    let animationFrameId: number;

    const draw = (scrollDelta: number) => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const [r, g, b] = starColor;

      starsRef.current.forEach((star) => {
        const trailLength = Math.abs(scrollDelta) * star.speed * speedFactor;
        const yPos = (star.y - scrollYRef.current * star.speed) % canvas.height;

        // Star itself
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, yPos < 0 ? yPos + canvas.height : yPos, star.size, 0, 2 * Math.PI);
        ctx.fill();
        
        // Contrail
        if (trailLength > 0.1) {
            ctx.beginPath();
            ctx.moveTo(star.x, yPos < 0 ? yPos + canvas.height : yPos);
            const endY = yPos - Math.sign(scrollDelta) * trailLength;
            ctx.lineTo(star.x, endY < 0 ? endY + canvas.height : endY % canvas.height);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${star.opacity * 0.5})`;
            ctx.lineWidth = star.size;
            ctx.stroke();
        }
      });
    };
    
    let lastScrollY = window.scrollY;
    let scrollDelta = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDelta = currentScrollY - lastScrollY;
      scrollYRef.current = currentScrollY;
      lastScrollY = currentScrollY;
    };
    
    const animate = () => {
        draw(scrollDelta);
        scrollDelta *= 0.95; // Dampen the delta for smooth trail disappearance
        animationFrameId = requestAnimationFrame(animate);
    }
    
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
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
    