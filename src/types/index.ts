export interface Pet {
  id: string;
  name: string;
  species: 'dog' | 'cat';
  breed: string;
  age: number;
  weight: number;
  profilePicture?: string;
  createdAt: Date;
}

export interface DailyInput {
  id: string;
  petId: string;
  date: string;
  meals: number;
  treats: number;
  waterIntake: number;
  milkIntake: boolean;
  activityLevel: number;
  bathroomFrequency: number;
  stoolConsistency: 'normal' | 'soft' | 'hard' | 'diarrhea';
  symptoms: {
    vomiting: boolean;
    diarrhea: boolean;
    lethargy: boolean;
  };
}

export interface HealthAlert {
  id: string;
  type: 'digestive' | 'activity' | 'hydration' | 'symptoms';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  recommendation: string;
}

export interface HealthScore {
  score: number;
  level: number;
  alerts: HealthAlert[];
  lastUpdated: Date;
}

export type AppScreen = 
  | 'splash'
  | 'onboarding1'
  | 'onboarding2' 
  | 'onboarding3'
  | 'profile'
  | 'dashboard'
  | 'analysis'
  | 'recommendations'
  | 'summary';

export interface AppState {
  currentScreen: AppScreen;
  pet: Pet | null;
  dailyInput: Partial<DailyInput>;
  healthScore: HealthScore | null;
  healthHistory: HealthScore[];
}