import { doc, setDoc, getDoc, collection, addDoc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User, Activity, Challenge, Recommendation } from '../types';

export const saveUserProfile = async (userId: string, profile: Partial<User>) => {
  await setDoc(doc(db, 'users', userId), profile, { merge: true });
};

export const getUserProfile = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as User;
  }
  return null;
};

export const saveActivity = async (userId: string, activity: Omit<Activity, 'id'>) => {
  const activitiesRef = collection(db, 'users', userId, 'activities');
  await addDoc(activitiesRef, activity);
};

export const getActivities = async (userId: string) => {
  const activitiesRef = collection(db, 'users', userId, 'activities');
  const snapshot = await getDocs(activitiesRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Activity));
};

export const saveChallengeProgress = async (userId: string, challengeId: string, progress: number, status: string) => {
  const challengeRef = doc(db, 'users', userId, 'challenges', challengeId);
  await setDoc(challengeRef, { progress, status }, { merge: true });
};

export const saveRecommendation = async (userId: string, recommendationId: string, status: string) => {
  const recRef = doc(db, 'users', userId, 'recommendations', recommendationId);
  await setDoc(recRef, { status }, { merge: true });
};
