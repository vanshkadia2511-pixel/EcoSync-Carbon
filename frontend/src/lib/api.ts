// API client — all calls to the FastAPI backend
import type { CarbonAuditInput, FootprintRecord, ChallengeRecord, ActionItem } from '../types/carbon';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `API error ${res.status}`);
  }
  return res.json();
}

export const api = {
  health: () => request<{ status: string; mode: string; version: string }>('/health'),

  audit: (input: CarbonAuditInput) =>
    request<FootprintRecord>('/audit', {
      method: 'POST',
      body: JSON.stringify(input),
    }),

  chat: (payload: {
    sessionId: string;
    message: string;
    latestFootprint?: FootprintRecord;
  }) =>
    request<{ reply: string; actions: ActionItem[]; source: string }>('/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  history: (sessionId: string) =>
    request<{ records: FootprintRecord[] }>(`/history?sessionId=${sessionId}`),

  generateChallenge: (sessionId: string) =>
    request<ChallengeRecord>('/challenge', {
      method: 'POST',
      body: JSON.stringify({ sessionId }),
    }),
};
