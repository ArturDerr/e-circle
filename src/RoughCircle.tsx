import React, { useEffect, useState, useRef } from 'react';
import { motion, animate, useInView } from 'framer-motion';

interface DrawingCircleProps {
  targetPercent: number;
  isPerfect?: boolean;
  startTrigger?: boolean;
}

const DrawingCircle: React.FC<DrawingCircleProps> = ({ 
  targetPercent, 
  isPerfect = false, 
  startTrigger = false 
}) => {
  const [displayCount, setDisplayCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const roughPath = "M50 10 C68 12 85 25 92 50 C95 72 82 92 55 95 C32 98 8 82 10 55 C12 30 35 8 50 10 Z";
  const perfectPath = "M 50, 50 m -40, 0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0";

  const shouldStart = isPerfect ? startTrigger : isInView;

  useEffect(() => {
    if (shouldStart) {
      const controls = animate(0, targetPercent, {
        duration: 2.5,
        ease: "easeInOut",
        onUpdate: (value) => setDisplayCount(Math.floor(value)),
      });
      return () => controls.stop();
    }
  }, [shouldStart, targetPercent]);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full h-full">
      <svg viewBox="0 0 100 100" className="w-[450px] h-[450px] -rotate-90">
        <path
          d={isPerfect ? perfectPath : roughPath}
          fill="none"
          stroke="rgba(0,0,0,0.03)"
          strokeWidth="1"
        />
        <motion.path
          d={isPerfect ? perfectPath : roughPath}
          fill="none"
          stroke={isPerfect ? "#000" : "#3B82F6"}
          strokeWidth="0.9"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={shouldStart ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[80px] font-sf-regular tracking-tighter leading-none">
          {displayCount}%
        </span>
      </div>
    </div>
  );
};

export default DrawingCircle;