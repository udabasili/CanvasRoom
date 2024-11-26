import { Channel } from '@/features/channel';
import { BaseEntity } from '@/types';

export type Group = {
  name: string;
  description?: string;
  language?: string;
  icon?: string;
  members: string[];
  channels: Channel[];
} & BaseEntity;

export type GroupsResponse = {
  groups: Group[]; // API returns a 'group' property containing an array of groups
};
