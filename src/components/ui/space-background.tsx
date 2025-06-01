'use client';

import { useRef, useEffect, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Wait for component to mount before initializing canvas
    if (!isMounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };
    
    const initStars = () => {
      const stars: Star[] = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 1500);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.05 + 0.01
        });
      }
      
      starsRef.current = stars;
    };
    
    const drawStars = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      starsRef.current.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Move stars
        star.y += star.speed;
        
        // Reset stars that go off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      // Draw some constellations
      drawConstellations(ctx);
      
      requestAnimationFrame(drawStars);
    };
    
    const drawConstellations = (ctx: CanvasRenderingContext2D) => {
      // Simplified Big Dipper
      const bigDipper = [
        { x: canvas.width * 0.2, y: canvas.height * 0.2 },
        { x: canvas.width * 0.25, y: canvas.height * 0.22 },
        { x: canvas.width * 0.3, y: canvas.height * 0.25 },
        { x: canvas.width * 0.35, y: canvas.height * 0.3 },
        { x: canvas.width * 0.4, y: canvas.height * 0.28 },
        { x: canvas.width * 0.45, y: canvas.height * 0.25 },
        { x: canvas.width * 0.5, y: canvas.height * 0.2 },
      ];
      
      // Draw constellation stars
      bigDipper.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });
      
      // Draw constellation lines
      ctx.beginPath();
      ctx.moveTo(bigDipper[0].x, bigDipper[0].y);
      for (let i = 1; i < bigDipper.length; i++) {
        ctx.lineTo(bigDipper[i].x, bigDipper[i].y);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
      
      // Orion's Belt (simplified)
      const orion = [
        { x: canvas.width * 0.7, y: canvas.height * 0.6 },
        { x: canvas.width * 0.75, y: canvas.height * 0.62 },
        { x: canvas.width * 0.8, y: canvas.height * 0.64 },
      ];
      
      // Draw Orion stars
      orion.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });
      
      // Draw Orion lines
      ctx.beginPath();
      ctx.moveTo(orion[0].x, orion[0].y);
      for (let i = 1; i < orion.length; i++) {
        ctx.lineTo(orion[i].x, orion[i].y);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create animation loop
    let animationFrameId: number;
    
    const animate = () => {
      drawStars();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted]);
  
  return (
    <>
      {isMounted && (
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-full -z-10"
        />
      )}
    </>
  );
}
