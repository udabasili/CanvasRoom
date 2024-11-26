import { BaseEntity } from '@/types';

type Role = 'admin' | 'user';

export type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  avatarUrl?: string;
  groups?: string[];
} & BaseEntity;
