import { AxiosPromise } from 'axios';

import apiCall from '@/lib/api-call.ts';

import { UserResponse } from '../types';

interface LoginCredentialsDTO {
  email: string;
  password: string;
}

export const login = async (
  data: LoginCredentialsDTO,
): AxiosPromise<UserResponse> => {
  const response = apiCall.post('/auth/login', data);
  return response;
};
