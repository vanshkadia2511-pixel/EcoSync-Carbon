'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithPopup, auth, googleProvider } from '@/lib/firebase';

export default function LoginButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLogin}
      disabled={loading}
      className="inline-flex items-center justify-center bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[var(--color-surface-container-low)] transition-colors shadow-sm w-fit"
    >
      {loading ? 'Connecting...' : 'Log In with Google'}
    </button>
  );
}
