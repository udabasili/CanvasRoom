import { User } from '@/features/user';

export interface Chat {
  _id: string;
  channel?: string;
  sender?: User;
  recipient?: User;
  message: string;
  url?: string;
  status: 'waiting' | 'sent' | 'received' | 'read';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessages {
  chat: Chat[];
}
