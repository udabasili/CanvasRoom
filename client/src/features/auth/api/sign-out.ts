import apiCall from '@/lib/api-call.ts';

export const signOut = (): Promise<void> => {
  return apiCall.get('/auth/logout');
};
