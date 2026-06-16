'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAppStore } from '@/store/useAppStore';
import { getUserProfile, saveUserProfile } from '@/lib/db';
import { User } from '@/types';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAppStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is logged in to Firebase
        let userProfile = await getUserProfile(firebaseUser.uid);
        
        if (!userProfile) {
          // New user, create default profile
          userProfile = {
            id: firebaseUser.uid,
            displayName: firebaseUser.displayName || 'Eco Warrior',
            email: firebaseUser.email || '',
            ecoScore: 50,
            weeklyBudgetKg: 50,
            currentStreak: 0,
            seeds: 0,
            level: 1,
            onboardingCompleted: false,
          };
          
          try {
            await saveUserProfile(firebaseUser.uid, userProfile);
          } catch (e) {
            console.warn("Could not save to Firestore, might be disabled", e);
          }
        }
        
        setUser(userProfile);
      } else {
        // User is logged out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading EcoTrack...</div>;
  }

  return <>{children}</>;
}
