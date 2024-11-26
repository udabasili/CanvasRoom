import { AxiosPromise } from 'axios';

import apiCall from '@/lib/api-call.ts';

import { RegisterCredentialsDTO, UserResponse } from '../types';

export const register = async (
  data: RegisterCredentialsDTO,
): AxiosPromise<UserResponse> => {
  if (data.confirmPassword) {
    delete data['confirmPassword'];
  }
  const response = await apiCall.post('/auth/register', data);
  return response;
};
