import React, { useState } from 'react';
import { Pet, HealthScore } from '../types';
import { Avatar } from '../components/Avatar';
import { ParticleBackground } from '../components/ParticleBackground';

interface RecommendationsScreenProps {
  pet: Pet;
  healthScore: HealthScore;
  onContinue: () => void;
}

export const RecommendationsScreen: React.FC<RecommendationsScreenProps> = ({
  pet,
  healthScore,
  onContinue
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const getRecommendationCards = () => {
    const cards = [];

    // General wellness card
    cards.push({
      id: 'wellness',
      icon: '⭐',
      title: 'Daily Wellness Tips',
      color: 'from-purple-400 to-pink-500',
      recommendations: [
        'Maintain consistent meal times',
        'Provide fresh water daily',
        'Regular playtime and exercise',
        'Monitor bathroom habits',
        'Keep up with regular vet checkups'
      ]
    });

    // Add specific recommendations based on alerts
    healthScore.alerts.forEach(alert => {
      switch (alert.type) {
        case 'digestive':
          cards.push({
            id: 'digestive',
            icon: '🥗',
            title: 'Digestive Health',
            color: 'from-green-400 to-teal-500',
            recommendations: [
              'Add fiber-rich foods to diet',
              'Reduce treats temporarily',
              'Consider probiotics for gut health',
              'Monitor stool consistency daily',
              'Consult vet if symptoms persist'
            ]
          });
          break;
        case 'activity':
          cards.push({
            id: 'activity',
            icon: '🏃',
            title: 'Exercise & Activity',
            color: 'from-orange-400 to-red-500',
            recommendations: [
              'Increase daily walk duration',
              'Add interactive play sessions',
              'Use puzzle toys for mental stimulation',
              'Try new activities (fetch, tug-of-war)',
              'Consider dog park visits for socialization'
            ]
          });
          break;
        case 'hydration':
          cards.push({
            id: 'hydration',
            icon: '💧',
            title: 'Hydration Support',
            color: 'from-blue-400 to-cyan-500',
            recommendations: [
              'Add multiple water bowls around home',
              'Use a pet water fountain',
              'Mix wet food with dry food',
              'Check water freshness regularly',
              'Monitor water intake daily'
            ]
          });
          break;
        case 'symptoms':
          cards.push({
            id: 'symptoms',
            icon: '🏥',
            title: 'Symptom Monitoring',
            color: 'from-red-400 to-pink-500',
            recommendations: [
              'Keep detailed symptom diary',
              'Monitor frequency and severity',
              'Contact veterinarian if persistent',
              'Avoid sudden diet changes',
              'Ensure comfortable rest area'
            ]
          });
          break;
      }
    });

    return cards;
  };

  const recommendationCards = getRecommendationCards();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Personalized Recommendations
            </h1>
            <p className="text-purple-100">Tailored wellness plan for {pet.name}</p>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <Avatar pet={pet} healthScore={healthScore} size="large" />
          </div>

          {/* Recommendation Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recommendationCards.map((card, index) => (
              <div
                key={card.id}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
              >
                <div className={`
                  bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg 
                  transition-all duration-300 hover:shadow-2xl hover:scale-105
                  ${expandedCard === card.id ? 'ring-4 ring-white/50' : ''}
                  animate-slide-in
                `}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`
                      w-16 h-16 rounded-full bg-gradient-to-r ${card.color} 
                      flex items-center justify-center text-2xl shadow-lg
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Click to {expandedCard === card.id ? 'collapse' : 'expand'}
                      </p>
                    </div>
                  </div>

                  <div className={`
                    transition-all duration-500 overflow-hidden
                    ${expandedCard === card.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      {card.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 animate-fade-in"
                          style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-700 text-sm">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {expandedCard !== card.id && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                        <span>Click to view recommendations</span>
                        <div className="w-4 h-4 border-2 border-current rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-100 border border-red-300 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🚨</div>
              <div>
                <h3 className="font-bold text-red-800 mb-1">
                  Emergency Situations
                </h3>
                <p className="text-red-700 text-sm">
                  If you notice severe symptoms like continuous vomiting, blood in stool, 
                  difficulty breathing, or extreme lethargy, contact your veterinarian immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onContinue}
              className="px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-lg font-bold rounded-2xl hover:from-teal-500 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              View Health Summary
            </button>
            
            <button
              onClick={() => window.print()}
              className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white text-lg font-bold rounded-2xl hover:from-purple-500 hover:to-pink-600 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              📋 Save Recommendations
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};