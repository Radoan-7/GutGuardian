import React, { useState } from 'react';
import { Pet, HealthScore } from '../types';
import { Avatar } from '../components/Avatar';
import { HealthScoreCircle } from '../components/HealthScoreCircle';
import { ParticleBackground } from '../components/ParticleBackground';

interface SummaryScreenProps {
  pet: Pet;
  healthScore: HealthScore;
  onRestart: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  pet,
  healthScore,
  onRestart
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'weekly' | 'monthly'>('today');

  // Generate sample historical data for demo
  const generateTrendData = () => {
    const today = healthScore.score;
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * 20;
      const score = Math.max(20, Math.min(100, today + variation));
      data.push({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        score: Math.round(score)
      });
    }
    
    return data;
  };

  const trendData = generateTrendData();
  const averageScore = Math.round(trendData.reduce((sum, item) => sum + item.score, 0) / trendData.length);

  const ProgressChart = ({ data }: { data: typeof trendData }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
        <span className="text-xl">📈</span>
        Health Trend
      </h3>
      
      <div className="flex items-end justify-between h-32 gap-2">
        {data.map((item, index) => (
          <div key={item.date} className="flex flex-col items-center flex-1">
            <div
              className="bg-gradient-to-t from-purple-400 to-pink-400 rounded-t w-full transition-all duration-1000 hover:from-purple-500 hover:to-pink-500"
              style={{ 
                height: `${(item.score / 100) * 100}%`,
                animationDelay: `${index * 0.1}s`
              }}
            />
            <div className="text-xs text-gray-600 mt-2 text-center">
              <div className="font-medium">{item.score}</div>
              <div>{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 via-blue-500 to-purple-600 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Health Summary
            </h1>
            <p className="text-blue-100">Complete wellness overview for {pet.name}</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2">
              {(['today', 'weekly', 'monthly'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? 'bg-white text-purple-600 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Current Status */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-center">
                <Avatar pet={pet} healthScore={healthScore} size="medium" className="mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">Current Status</h3>
                <HealthScoreCircle score={healthScore.score} size={100} />
                <div className="mt-4 space-y-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-2 text-white font-medium">
                    Level {healthScore.level} Healthy Paw
                  </div>
                  <div className="text-sm text-gray-600">
                    {healthScore.alerts.length} active alerts
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">📊</span>
                Key Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Score</span>
                  <span className="font-bold text-lg text-purple-600">{averageScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best Day</span>
                  <span className="font-bold text-lg text-green-600">{Math.max(...trendData.map(d => d.score))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Improvement</span>
                  <span className="font-bold text-lg text-blue-600">
                    {healthScore.score > averageScore ? '+' : ''}{healthScore.score - averageScore}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Streak</span>
                  <span className="font-bold text-lg text-orange-600">7 days</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">⚡</span>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={onRestart}
                  className="w-full p-3 bg-gradient-to-r from-green-400 to-teal-500 text-white rounded-lg hover:from-green-500 hover:to-teal-600 transition-all duration-200 font-medium"
                >
                  📝 New Daily Check
                </button>
                <button className="w-full p-3 bg-gradient-to-r from-blue-400 to-purple-500 text-white rounded-lg hover:from-blue-500 hover:to-purple-600 transition-all duration-200 font-medium">
                  📱 Set Reminder
                </button>
                <button className="w-full p-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg hover:from-orange-500 hover:to-pink-600 transition-all duration-200 font-medium">
                  👨‍⚕️ Find Vet
                </button>
                <button className="w-full p-3 bg-gradient-to-r from-purple-400 to-indigo-500 text-white rounded-lg hover:from-purple-500 hover:to-indigo-600 transition-all duration-200 font-medium">
                  📧 Share Report
                </button>
              </div>
            </div>
          </div>

          {/* Health Trend Chart */}
          <ProgressChart data={trendData} />

          {/* Active Alerts */}
          {healthScore.alerts.length > 0 && (
            <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                Active Health Alerts ({healthScore.alerts.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {healthScore.alerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl border-l-4 ${
                      alert.severity === 'high' 
                        ? 'bg-red-50 border-red-400' 
                        : alert.severity === 'medium' 
                        ? 'bg-yellow-50 border-yellow-400' 
                        : 'bg-blue-50 border-blue-400'
                    }`}
                  >
                    <div className="font-medium text-gray-800">{alert.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{alert.description}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Message */}
          {healthScore.alerts.length === 0 && (
            <div className="mt-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl p-8 text-center shadow-2xl">
              <div className="text-6xl mb-4">🏆</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Perfect Health Day!
              </h2>
              <p className="text-green-100">
                {pet.name} is showing excellent health indicators. Keep up the great work!
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-8">
            <button
              onClick={onRestart}
              className="px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-bold rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              🔄 Start New Health Check
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};