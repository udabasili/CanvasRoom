export const channelTypes = [
  'ask_questions',
  'share_resources',
  'project_ideas',
  'coding_project',
  'design_project',
  'faq',
  'external_resources',
] as const;

export type ChannelType = (typeof channelTypes)[number];

export const channelLabel = {
  ask_questions: 'Ask Questions',
  share_resources: 'Share Resources',
  project_ideas: 'Project Ideas',
  coding_project: 'Coding Project',
  design_project: 'Design Project',
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
