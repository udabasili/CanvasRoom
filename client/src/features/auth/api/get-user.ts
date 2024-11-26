import { AxiosPromise } from 'axios';

import { UserResponse } from '@/features/auth';
import apiCall from '@/lib/api-call.ts';

export const getUser = async (): AxiosPromise<UserResponse> => {
  const response = await apiCall.get('/auth/me');
  return response;
};
