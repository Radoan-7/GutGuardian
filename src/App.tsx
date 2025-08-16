import React, { useState, useEffect } from 'react';
import { AppState, Pet, DailyInput, HealthScore } from './types';
import { calculateHealthScore } from './utils/healthCalculations';

// Import screens
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreens } from './screens/OnboardingScreens';
import { PetProfileScreen } from './screens/PetProfileScreen';
import { DailyInputDashboard } from './screens/DailyInputDashboard';
import { HealthAnalysisScreen } from './screens/HealthAnalysisScreen';
import { RecommendationsScreen } from './screens/RecommendationsScreen';
import { SummaryScreen } from './screens/SummaryScreen';

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'splash',
    pet: null,
    dailyInput: {},
    healthScore: null,
    healthHistory: []
  });

  // Load data from localStorage on app start
  useEffect(() => {
    const savedPet = localStorage.getItem('gutguardian-pet');
    const savedHistory = localStorage.getItem('gutguardian-history');
    
    if (savedPet) {
      const pet = JSON.parse(savedPet);
      setAppState(prev => ({ ...prev, pet }));
    }
    
    if (savedHistory) {
      const history = JSON.parse(savedHistory);
      setAppState(prev => ({ ...prev, healthHistory: history }));
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    if (appState.pet) {
      localStorage.setItem('gutguardian-pet', JSON.stringify(appState.pet));
    }
  }, [appState.pet]);

  useEffect(() => {
    if (appState.healthHistory.length > 0) {
      localStorage.setItem('gutguardian-history', JSON.stringify(appState.healthHistory));
    }
  }, [appState.healthHistory]);

  const handleSplashComplete = () => {
    if (appState.pet) {
      setAppState(prev => ({ ...prev, currentScreen: 'dashboard' }));
    } else {
      setAppState(prev => ({ ...prev, currentScreen: 'onboarding1' }));
    }
  };

  const handleOnboardingNext = () => {
    if (appState.currentScreen === 'onboarding1') {
      setAppState(prev => ({ ...prev, currentScreen: 'onboarding2' }));
    } else if (appState.currentScreen === 'onboarding2') {
      setAppState(prev => ({ ...prev, currentScreen: 'onboarding3' }));
    } else if (appState.currentScreen === 'onboarding3') {
      setAppState(prev => ({ ...prev, currentScreen: 'profile' }));
    }
  };

  const handleOnboardingBack = () => {
    if (appState.currentScreen === 'onboarding2') {
      setAppState(prev => ({ ...prev, currentScreen: 'onboarding1' }));
    } else if (appState.currentScreen === 'onboarding3') {
      setAppState(prev => ({ ...prev, currentScreen: 'onboarding2' }));
    }
  };

  const handleOnboardingSkip = () => {
    setAppState(prev => ({ ...prev, currentScreen: 'profile' }));
  };

  const handleProfileComplete = (pet: Pet) => {
    setAppState(prev => ({
      ...prev,
      pet,
      currentScreen: 'dashboard'
    }));
  };

  const handleDailyInputComplete = (dailyInput: DailyInput) => {
    const healthScore = calculateHealthScore(dailyInput);
    
    setAppState(prev => ({
      ...prev,
      dailyInput,
      healthScore,
      healthHistory: [...prev.healthHistory, healthScore],
      currentScreen: 'analysis'
    }));
  };

  const handleAnalysisComplete = () => {
    setAppState(prev => ({ ...prev, currentScreen: 'recommendations' }));
  };

  const handleRecommendationsComplete = () => {
    setAppState(prev => ({ ...prev, currentScreen: 'summary' }));
  };

  const handleRestart = () => {
    setAppState(prev => ({
      ...prev,
      dailyInput: {},
      healthScore: null,
      currentScreen: 'dashboard'
    }));
  };

  // Render current screen
  const renderCurrentScreen = () => {
    switch (appState.currentScreen) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      
      case 'onboarding1':
      case 'onboarding2':
      case 'onboarding3':
        return (
          <OnboardingScreens
            screen={appState.currentScreen}
            onNext={handleOnboardingNext}
            onBack={handleOnboardingBack}
            onSkip={handleOnboardingSkip}
          />
        );
      
      case 'profile':
        return <PetProfileScreen onComplete={handleProfileComplete} />;
      
      case 'dashboard':
        if (!appState.pet) return <div>Error: No pet data</div>;
        return (
          <DailyInputDashboard
            pet={appState.pet}
            onComplete={handleDailyInputComplete}
          />
        );
      
      case 'analysis':
        if (!appState.pet || !appState.dailyInput) return <div>Error: Missing data</div>;
        return (
          <HealthAnalysisScreen
            pet={appState.pet}
            dailyInput={appState.dailyInput as DailyInput}
            onContinue={handleAnalysisComplete}
          />
        );
      
      case 'recommendations':
        if (!appState.pet || !appState.healthScore) return <div>Error: Missing data</div>;
        return (
          <RecommendationsScreen
            pet={appState.pet}
            healthScore={appState.healthScore}
            onContinue={handleRecommendationsComplete}
          />
        );
      
      case 'summary':
        if (!appState.pet || !appState.healthScore) return <div>Error: Missing data</div>;
        return (
          <SummaryScreen
            pet={appState.pet}
            healthScore={appState.healthScore}
            onRestart={handleRestart}
          />
        );
      
      default:
        return <div>Unknown screen</div>;
    }
  };

  return (
    <div className="App">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;