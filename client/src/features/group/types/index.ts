import { BaseEntity } from '@/types';

export type Group = {
	name: string;
	description?: string;
	language?: string;
	createdAt: Date;
	updatedAt: Date;
} & BaseEntity;

export type GroupsResponse = {
	groups: Group[]; // API returns a 'group' property containing an array of groups
};
