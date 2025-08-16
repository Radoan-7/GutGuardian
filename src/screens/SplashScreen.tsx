import React, { useEffect } from 'react';
import { ParticleBackground } from '../components/ParticleBackground';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
      <ParticleBackground />
      
      <div className="text-center z-10">
        {/* Logo with glow and rotation */}
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto bg-gradient-to-r from-teal-300 to-blue-400 rounded-full flex items-center justify-center animate-spin-slow shadow-2xl shadow-teal-400/50">
            <div className="text-6xl animate-bounce">🐾</div>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-30 animate-pulse"></div>
          </div>
          
          {/* DNA/Microbiome effect */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* App Title */}
        <div className="space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg tracking-wider">
            GutGuardian
          </h1>
          <p className="text-lg text-pink-100 font-medium tracking-wide">
            Your Pet's Wellness Advisor
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-12">
          <div className="w-48 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-teal-300 to-purple-300 rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes loading-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out 0.5s both;
        }
        
        .animate-loading-bar {
          animation: loading-bar 3s ease-out;
        }
      `}</style>
    </div>
  );
};