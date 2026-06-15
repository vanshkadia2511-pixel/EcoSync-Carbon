'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';

const questions = [
  {
    id: 'transportMode',
    question: 'How do you usually travel?',
    options: [
      { label: 'Walk / Bike', value: 'walk_bike', icon: '🚲' },
      { label: 'Public Transit', value: 'public_transit', icon: '🚆' },
      { label: 'Car', value: 'car', icon: '🚗' },
    ]
  },
  {
    id: 'dietType',
    question: 'How often do you eat meat or dairy?',
    options: [
      { label: 'Rarely (Plant-based)', value: 'plant_based', icon: '🥗' },
      { label: 'Sometimes (Vegetarian/Flex)', value: 'vegetarian', icon: '🧀' },
      { label: 'Often (Heavy Meat)', value: 'heavy_meat', icon: '🥩' },
    ]
  },
  {
    id: 'goal',
    question: 'Do you want a weekly carbon goal?',
    options: [
      { label: 'Yes, help me reduce!', value: 'yes', icon: '🎯' },
      { label: 'No, just tracking', value: 'no', icon: '📊' },
    ]
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const setUser = useAppStore(state => state.setUser);

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finish onboarding
      setUser({
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        displayName: 'Aarav', // Mock user for demo
        email: 'aarav@example.com',
        ecoScore: answers.dietType === 'plant_based' ? 85 : 68,
        weeklyBudgetKg: 40,
        currentStreak: 0,
        seeds: 100,
        level: 1,
        onboardingCompleted: true
      });
      router.push('/dashboard');
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQ = questions[currentStep];

  return (
    <div className="min-h-screen bg-[var(--color-surface)] flex flex-col items-center p-8 pt-24 text-[var(--color-on-surface)]">
      <div className="w-full max-w-2xl bg-white p-12 rounded-3xl shadow-[0_12px_30px_rgba(45,106,79,0.05)] border border-[var(--color-surface-container)]">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm font-medium text-[var(--color-outline)] mb-2">
            <span>Step {currentStep + 1} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-[var(--color-surface-container-low)] rounded-full h-3">
            <div 
              className="bg-[var(--color-secondary)] h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-[var(--color-primary)] mb-4">{currentQ.question}</h2>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {currentQ.options.map((opt) => {
            const isSelected = answers[currentQ.id] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`
                  flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-[var(--color-secondary)] bg-[var(--color-secondary-container)] text-[var(--color-on-secondary-container)] shadow-md' 
                    : 'border-[var(--color-surface-container)] hover:border-[var(--color-secondary)] hover:bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)]'
                  }
                `}
              >
                <span className="text-4xl mb-3">{opt.icon}</span>
                <span className="font-semibold text-lg">{opt.label}</span>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center pt-8 border-t border-[var(--color-surface-container)]">
          <button 
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            className={`px-6 py-3 font-semibold text-[var(--color-outline)] hover:text-[var(--color-primary)] transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
          >
            Back
          </button>
          
          <button 
            onClick={handleNext}
            disabled={!answers[currentQ.id]}
            className={`
              px-10 py-4 rounded-full font-semibold text-lg transition-all
              ${answers[currentQ.id] 
                ? 'bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-white shadow-lg shadow-emerald-900/20 hover:opacity-90' 
                : 'bg-[var(--color-surface-container)] text-[var(--color-outline)] cursor-not-allowed'
              }
            `}
          >
            {currentStep === questions.length - 1 ? 'Finish & See Dashboard' : 'Next Step'}
          </button>
        </div>

      </div>
    </div>
  );
}
