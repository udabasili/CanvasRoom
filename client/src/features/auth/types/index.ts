import { User } from '@/features/user';

export interface UserResponse {
  user: User;
  accessToken: string;
}

export interface RegisterCredentialsDTO {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginCredentialsDTO {
  email: string;
  password: string;
}
