import React, { useEffect, useState } from 'react';

interface HealthScoreCircleProps {
  score: number;
  size?: number;
  className?: string;
}

export const HealthScoreCircle: React.FC<HealthScoreCircleProps> = ({
  score,
  size = 120,
  className = ''
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 85) return 'from-green-400 to-emerald-500';
    if (score >= 70) return 'from-yellow-400 to-orange-400';
    return 'from-red-400 to-pink-500';
  };

  const getGlowColor = () => {
    if (score >= 85) return 'shadow-green-400/50';
    if (score >= 70) return 'shadow-yellow-400/50';
    return 'shadow-red-400/50';
  };

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        className={`transform -rotate-90 transition-all duration-1000 drop-shadow-lg ${getGlowColor()}`}
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="8"
          fill="transparent"
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="45"
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-2000 ease-out"
        />
        
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" className={`stop-color-gradient-to-r ${getScoreColor()}`} />
            <stop offset="100%" className={`stop-color-gradient-to-r ${getScoreColor()}`} />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
            {Math.round(animatedScore)}
          </div>
          <div className="text-xs text-gray-500">Health Score</div>
        </div>
      </div>
    </div>
  );
};