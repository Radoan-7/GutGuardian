import { DailyInput, HealthAlert, HealthScore } from '../types';

export const calculateHealthScore = (input: Partial<DailyInput>): HealthScore => {
  let baseScore = 100;
  const alerts: HealthAlert[] = [];

  // Digestive health checks
  if ((input.treats || 0) > 3 && (input.activityLevel || 0) < 3) {
    baseScore -= 15;
    alerts.push({
      id: 'digestive-1',
      type: 'digestive',
      severity: 'medium',
      title: 'Digestive Alert',
      description: 'High treat intake with low activity may affect digestion',
      recommendation: 'Reduce treats and increase physical activity'
    });
  }

  if (input.stoolConsistency === 'soft' || input.stoolConsistency === 'diarrhea') {
    baseScore -= 20;
    alerts.push({
      id: 'digestive-2',
      type: 'digestive',
      severity: input.stoolConsistency === 'diarrhea' ? 'high' : 'medium',
      title: 'Digestive Concern',
      description: 'Abnormal stool consistency detected',
      recommendation: 'Monitor closely and consult vet if persistent'
    });
  }

  // Activity checks
  if ((input.activityLevel || 0) < 2) {
    baseScore -= 10;
    alerts.push({
      id: 'activity-1',
      type: 'activity',
      severity: 'low',
      title: 'Low Activity Alert',
      description: 'Pet needs more physical activity',
      recommendation: 'Increase walk time and play sessions'
    });
  }

  // Hydration checks
  if ((input.waterIntake || 0) < 3) {
    baseScore -= 12;
    alerts.push({
      id: 'hydration-1',
      type: 'hydration',
      severity: 'medium',
      title: 'Hydration Alert',
      description: 'Low water intake detected',
      recommendation: 'Encourage more water consumption'
    });
  }

  // Symptom checks
  if (input.symptoms?.vomiting || input.symptoms?.diarrhea || input.symptoms?.lethargy) {
    baseScore -= 25;
    alerts.push({
      id: 'symptoms-1',
      type: 'symptoms',
      severity: 'high',
      title: 'Symptom Alert',
      description: 'Concerning symptoms detected',
      recommendation: 'Monitor closely and consult veterinarian'
    });
  }

  // Add some randomness for realism
  const randomAdjustment = (Math.random() - 0.5) * 10;
  baseScore += randomAdjustment;

  // Ensure score is within bounds
  const finalScore = Math.max(0, Math.min(100, baseScore));

  // Calculate level based on score
  const level = Math.floor(finalScore / 10) + 1;

  return {
    score: finalScore,
    level,
    alerts,
    lastUpdated: new Date()
  };
};

export const getHealthAdvice = (score: number): string => {
  if (score >= 85) return "Excellent! Your pet is in great health. Keep up the good work!";
  if (score >= 70) return "Good health with room for improvement. Check the recommendations below.";
  if (score >= 50) return "Some concerns detected. Please review the alerts and take action.";
  return "Multiple health issues detected. Consider consulting your veterinarian.";
};