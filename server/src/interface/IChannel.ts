import mongoose, {Document} from "mongoose";

export const  channelTypes =
[ 'ask_questions',
    'share_resources' ,
    'project_ideas' ,
    'coding_project',
    'design_project',
    'faq',
    'external_resources'
] as const

export interface IChannel extends Document {
    group: mongoose.Types.ObjectId
    name: string
    type: keyof typeof channelTypes
    createdAt: Date
    updatedAt: Date
}

export interface IChannelInputDto {
    group: string
    name: string
    type: keyof typeof channelTypes
}
