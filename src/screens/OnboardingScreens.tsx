import React from 'react';
import { ParticleBackground } from '../components/ParticleBackground';

interface OnboardingScreensProps {
  screen: 'onboarding1' | 'onboarding2' | 'onboarding3';
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

export const OnboardingScreens: React.FC<OnboardingScreensProps> = ({
  screen,
  onNext,
  onBack,
  onSkip
}) => {
  const getScreenContent = () => {
    switch (screen) {
      case 'onboarding1':
        return {
          title: 'Monitor Your Pet\'s Health',
          description: 'Track daily health & gut wellness with our AI-powered system',
          animation: (
            <div className="relative">
              <div className="text-8xl animate-bounce">🐕</div>
              <div className="absolute -right-4 -top-4 text-4xl animate-pulse">💚</div>
              <div className="absolute -left-4 top-8 text-3xl animate-ping opacity-75">⚡</div>
            </div>
          )
        };
      case 'onboarding2':
        return {
          title: 'AI-Powered Health Insights',
          description: 'Get personalized health scores and recommendations based on daily inputs',
          animation: (
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto animate-pulse flex items-center justify-center text-3xl">
                🧬
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-teal-300 rounded-full animate-spin opacity-50"></div>
              </div>
              <div className="mt-4 flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-gradient-to-r from-green-400 to-teal-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )
        };
      case 'onboarding3':
        return {
          title: 'Prevent Health Issues',
          description: 'Early detection and prevention to keep your pet happy and healthy',
          animation: (
            <div className="relative">
              <div className="text-8xl animate-bounce">🐱</div>
              <div className="absolute -right-6 -top-2 text-4xl animate-pulse">🛡️</div>
              <div className="absolute -left-6 top-4 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>⭐</div>
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-2xl animate-ping opacity-75">✨</div>
            </div>
          )
        };
      default:
        return null;
    }
  };

  const content = getScreenContent();
  const isFirstScreen = screen === 'onboarding1';
  const isLastScreen = screen === 'onboarding3';

  if (!content) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 flex flex-col justify-between relative overflow-hidden">
      <ParticleBackground />
      
      {/* Skip button */}
      <div className="absolute top-8 right-8 z-10">
        <button
          onClick={onSkip}
          className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
        >
          Skip
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 z-10">
        <div className="text-center max-w-md">
          {/* Animation */}
          <div className="mb-12">
            {content.animation}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
            {content.title}
          </h2>

          {/* Description */}
          <p className="text-lg text-pink-100 leading-relaxed">
            {content.description}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center px-8 pb-8 z-10">
        <button
          onClick={onBack}
          disabled={isFirstScreen}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
            isFirstScreen
              ? 'text-transparent cursor-not-allowed'
              : 'text-white hover:bg-white/10 hover:scale-105'
          }`}
        >
          Back
        </button>

        {/* Progress indicators */}
        <div className="flex space-x-2">
          {['onboarding1', 'onboarding2', 'onboarding3'].map((s, index) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                s === screen
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="px-8 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white rounded-full font-medium hover:from-teal-500 hover:to-blue-600 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          {isLastScreen ? 'Get Started' : 'Next'}
        </button>
      </div>
    </div>
  );
};