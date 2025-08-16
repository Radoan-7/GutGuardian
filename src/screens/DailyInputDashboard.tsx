import React, { useState, useEffect } from 'react';
import { Pet, DailyInput } from '../types';
import { Avatar } from '../components/Avatar';
import { ParticleBackground } from '../components/ParticleBackground';

interface DailyInputDashboardProps {
  pet: Pet;
  onComplete: (input: DailyInput) => void;
}

export const DailyInputDashboard: React.FC<DailyInputDashboardProps> = ({ pet, onComplete }) => {
  const [input, setInput] = useState<Partial<DailyInput>>({
    meals: 2,
    treats: 1,
    waterIntake: 5,
    milkIntake: false,
    activityLevel: 3,
    bathroomFrequency: 3,
    stoolConsistency: 'normal',
    symptoms: {
      vomiting: false,
      diarrhea: false,
      lethargy: false
    }
  });

  const handleSliderChange = (field: string, value: number) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field: string, value?: boolean) => {
    setInput(prev => ({ ...prev, [field]: value !== undefined ? value : !prev[field] }));
  };

  const handleSymptomChange = (symptom: string, value: boolean) => {
    setInput(prev => ({
      ...prev,
      symptoms: {
        ...prev.symptoms,
        [symptom]: value
      }
    }));
  };

  const handleSubmit = () => {
    const dailyInput: DailyInput = {
      id: Date.now().toString(),
      petId: pet.id,
      date: new Date().toISOString().split('T')[0],
      meals: input.meals || 0,
      treats: input.treats || 0,
      waterIntake: input.waterIntake || 0,
      milkIntake: input.milkIntake || false,
      activityLevel: input.activityLevel || 0,
      bathroomFrequency: input.bathroomFrequency || 0,
      stoolConsistency: input.stoolConsistency || 'normal',
      symptoms: input.symptoms || { vomiting: false, diarrhea: false, lethargy: false }
    };

    onComplete(dailyInput);
  };

  const SliderInput = ({ 
    label, 
    value, 
    onChange, 
    min = 0, 
    max = 5, 
    icon, 
    unit = '' 
  }: {
    label: string;
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    icon: string;
    unit?: string;
  }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <label className="font-medium text-gray-700 flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {label}
        </label>
        <span className="text-lg font-bold text-purple-600">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-3 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
              Daily Health Check
            </h1>
            <p className="text-pink-100">Track {pet.name}'s daily activities and health</p>
          </div>

          {/* Avatar */}
          <div className="flex justify-center mb-8">
            <Avatar pet={pet} dailyInput={input} size="large" />
          </div>

          {/* Input Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Meals & Treats */}
            <SliderInput
              label="Meals Today"
              value={input.meals || 0}
              onChange={(value) => handleSliderChange('meals', value)}
              max={6}
              icon="🍽️"
            />

            <SliderInput
              label="Treats Given"
              value={input.treats || 0}
              onChange={(value) => handleSliderChange('treats', value)}
              max={10}
              icon="🦴"
            />

            <SliderInput
              label="Water Intake"
              value={input.waterIntake || 0}
              onChange={(value) => handleSliderChange('waterIntake', value)}
              max={10}
              icon="💧"
              unit=" cups"
            />

            <SliderInput
              label="Activity Level"
              value={input.activityLevel || 0}
              onChange={(value) => handleSliderChange('activityLevel', value)}
              max={5}
              icon="🏃"
            />

            <SliderInput
              label="Bathroom Frequency"
              value={input.bathroomFrequency || 0}
              onChange={(value) => handleSliderChange('bathroomFrequency', value)}
              max={8}
              icon="🚽"
            />
          </div>

          {/* Drinks Toggle */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6">
            <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🥛</span>
              Additional Drinks
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleToggle('milkIntake', !input.milkIntake)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  input.milkIntake
                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🥛 Milk
              </button>
            </div>
          </div>

          {/* Stool Consistency */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-6">
            <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">💩</span>
              Stool Consistency
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { value: 'normal', label: '👍 Normal', color: 'from-green-400 to-green-500' },
                { value: 'soft', label: '😐 Soft', color: 'from-yellow-400 to-yellow-500' },
                { value: 'hard', label: '😬 Hard', color: 'from-orange-400 to-orange-500' },
                { value: 'diarrhea', label: '😰 Diarrhea', color: 'from-red-400 to-red-500' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setInput(prev => ({ ...prev, stoolConsistency: option.value as any }))}
                  className={`p-3 rounded-xl font-medium transition-all duration-200 ${
                    input.stoolConsistency === option.value
                      ? `bg-gradient-to-r ${option.color} text-white shadow-lg scale-105`
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
              <span className="text-2xl">🏥</span>
              Symptoms Today
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { key: 'vomiting', label: '🤮 Vomiting' },
                { key: 'diarrhea', label: '💩 Diarrhea' },
                { key: 'lethargy', label: '😴 Lethargy' }
              ].map(symptom => (
                <button
                  key={symptom.key}
                  onClick={() => handleSymptomChange(symptom.key, !input.symptoms?.[symptom.key])}
                  className={`p-4 rounded-xl font-medium transition-all duration-200 ${
                    input.symptoms?.[symptom.key]
                      ? 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg scale-105'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {symptom.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="px-12 py-4 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-lg font-bold rounded-2xl hover:from-teal-500 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-2xl animate-pulse"
            >
              🔍 Analyze Health
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8B5CF6, #EC4899);
          cursor: pointer;
          box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
        }
      `}</style>
    </div>
  );
};