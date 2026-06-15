import { db } from './firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';

export const generateInviteLink = (userId: string): string => {
  // Generates a unique invite URL linking back to the current user
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ecosync.app';
  return `${baseUrl}/invite?ref=${userId}`;
};

export const processInviteReward = async (inviterId: string, inviteeId: string) => {
  try {
    // V2 Feature: Give 100 seeds to the inviter for bringing a friend
    const inviterRef = doc(db, 'users', inviterId);
    await updateDoc(inviterRef, {
      seeds: increment(100)
    });
    
    // Welcome bonus: 50 seeds to the new invitee
    const inviteeRef = doc(db, 'users', inviteeId);
    await updateDoc(inviteeRef, {
      seeds: increment(50)
    });
    
    console.log(`Successfully processed referral reward for ${inviterId}`);
  } catch (error) {
    console.error("Error processing invite reward:", error);
  }
};
