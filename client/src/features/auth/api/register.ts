import { AxiosPromise } from 'axios';

import apiCall from '@/lib/api-call.ts';

import { RegisterCredentialsDTO, UserResponse } from '../types';

export const register = (
  data: RegisterCredentialsDTO,
): AxiosPromise<UserResponse> => {
  if (data.confirmPassword) {
    delete data['confirmPassword'];
  }
  return apiCall.post('/auth/register', data);
};
