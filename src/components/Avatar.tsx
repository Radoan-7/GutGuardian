import React from 'react';
import { DailyInput, HealthScore } from '../types';

interface AvatarProps {
  pet?: { name: string; species: 'dog' | 'cat' } | null;
  dailyInput?: Partial<DailyInput>;
  healthScore?: HealthScore | null;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  pet, 
  dailyInput, 
  healthScore, 
  size = 'medium',
  className = '' 
}) => {
  const getAvatarExpression = () => {
    if (healthScore) {
      if (healthScore.score >= 85) return '😸'; // Happy
      if (healthScore.score >= 70) return '😐'; // Neutral
      if (healthScore.alerts.some(a => a.severity === 'high')) return '😰'; // Concerned
      return '😕'; // Slightly worried
    }

    if (dailyInput) {
      if ((dailyInput.treats || 0) > 3) return '😅'; // Guilty/playful
      if ((dailyInput.activityLevel || 0) < 2) return '😴'; // Sleepy
      if ((dailyInput.waterIntake || 0) < 3) return '🥵'; // Thirsty
    }

    return pet?.species === 'cat' ? '😺' : '🐕'; // Default happy
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-16 h-16 text-2xl';
      case 'large': return 'w-32 h-32 text-6xl';
      default: return 'w-24 h-24 text-4xl';
    }
  };

  const getAnimationClass = () => {
    if (healthScore?.score && healthScore.score >= 85) {
      return 'animate-bounce';
    }
    if (dailyInput?.treats && dailyInput.treats > 3) {
      return 'animate-pulse';
    }
    return 'hover:scale-110';
  };

  return (
    <div className={`
      ${getSizeClasses()}
      ${getAnimationClass()}
      bg-gradient-to-br from-pink-200 via-purple-200 to-teal-200
      rounded-full 
      flex items-center justify-center 
      shadow-lg 
      transition-all duration-300 ease-in-out
      border-4 border-white
      ${className}
    `}>
      <div className="text-center transition-all duration-500">
        {getAvatarExpression()}
      </div>
      
      {healthScore && healthScore.level > 0 && (
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm font-bold shadow-lg animate-pulse">
          {healthScore.level}
        </div>
      )}
    </div>
  );
};