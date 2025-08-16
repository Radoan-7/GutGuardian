import React, { useEffect, useState } from 'react';
import { Pet, DailyInput, HealthScore } from '../types';
import { Avatar } from '../components/Avatar';
import { HealthScoreCircle } from '../components/HealthScoreCircle';
import { ParticleBackground } from '../components/ParticleBackground';
import { calculateHealthScore, getHealthAdvice } from '../utils/healthCalculations';

interface HealthAnalysisScreenProps {
  pet: Pet;
  dailyInput: DailyInput;
  onContinue: () => void;
}

export const HealthAnalysisScreen: React.FC<HealthAnalysisScreenProps> = ({
  pet,
  dailyInput,
  onContinue
}) => {
  const [healthScore, setHealthScore] = useState<HealthScore | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const analyzeHealth = async () => {
      setIsAnalyzing(true);
      
      // Simulate analysis time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const score = calculateHealthScore(dailyInput);
      setHealthScore(score);
      setIsAnalyzing(false);
    };

    analyzeHealth();
  }, [dailyInput]);

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center relative overflow-hidden">
        <ParticleBackground />
        
        <div className="text-center z-10">
          <div className="mb-8">
            <Avatar pet={pet} size="large" className="animate-pulse" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Analyzing {pet.name}'s Health...
          </h2>
          
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          
          <p className="text-pink-100 mt-4">Processing daily inputs with AI algorithms...</p>
        </div>
      </div>
    );
  }

  if (!healthScore) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              {pet.name}'s Health Analysis
            </h1>
            <p className="text-pink-100">Based on today's inputs</p>
          </div>

          {/* Main Score Display */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar pet={pet} healthScore={healthScore} size="large" />
              </div>

              {/* Health Score */}
              <div className="text-center">
                <HealthScoreCircle score={healthScore.score} size={150} />
                <p className="mt-4 text-gray-600 max-w-md">
                  {getHealthAdvice(healthScore.score)}
                </p>
              </div>

              {/* Level Display */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-white mb-2">
                    Level {healthScore.level}
                  </div>
                  <div className="text-yellow-100 font-medium">
                    Healthy Paw Status
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          {healthScore.alerts.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">
                Health Alerts
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {healthScore.alerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-bounce-in border-l-4 ${
                      alert.severity === 'high' 
                        ? 'border-red-500' 
                        : alert.severity === 'medium' 
                        ? 'border-yellow-500' 
                        : 'border-blue-500'
                    }`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`text-2xl ${
                        alert.type === 'digestive' ? '🟡' :
                        alert.type === 'activity' ? '🔵' :
                        alert.type === 'hydration' ? '💧' : '🔴'
                      }`}>
                        {alert.type === 'digestive' ? '🟡' :
                         alert.type === 'activity' ? '🔵' :
                         alert.type === 'hydration' ? '💧' : '🔴'}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 mb-1">
                          {alert.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {alert.description}
                        </p>
                        <p className="text-xs text-gray-500 font-medium">
                          💡 {alert.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Message */}
          {healthScore.alerts.length === 0 && (
            <div className="bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl p-8 text-center shadow-2xl mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Great Job!
              </h2>
              <p className="text-green-100">
                {pet.name} is showing excellent health indicators today!
              </p>
            </div>
          )}

          {/* Continue Button */}
          <div className="text-center">
            <button
              onClick={onContinue}
              className="px-12 py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-lg font-bold rounded-2xl hover:from-teal-500 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              View Recommendations
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};