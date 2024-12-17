export const channelTypes = [
  'questionnaire',
  'share_resources',
  'group_chat',
  'coding_project',
  'faq',
  'external_resources',
] as const;

export type ChannelType = (typeof channelTypes)[number];

export const channelLabel = {
  group_chat: 'Group Chat',
  share_resources: 'Share Resources',
  questionnaire: 'questionnaire',
  coding_project: 'Coding Project',
  faq: 'FAQ',
  external_resources: 'External Resources',
};

export interface Channel {
  _id: string;
  name: string;
  type: ChannelType;
  createdAt: Date;
  updatedAt: Date;
}
