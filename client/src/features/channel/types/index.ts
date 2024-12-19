export const channelTypes = [
  'questionnaire',
  'group_chat',
  'coding_project',
  'live_drawings',
] as const;

export type ChannelType = (typeof channelTypes)[number];

export interface Channel {
  _id: string;
  name: string;
  type: ChannelType;
  createdAt: Date;
  updatedAt: Date;
}
