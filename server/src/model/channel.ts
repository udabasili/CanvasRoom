import {model, Model, Schema} from "mongoose";
import {channelTypes, IChannel} from "@/interface";

export type ChannelModel =  Model<IChannel, {}, {}>


const channelSchema = new Schema<IChannel, ChannelModel, {}>({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: channelTypes,
        required: true
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }
},
{
    timestamps: true
})
//after delete all the external resources, design files and code files associated with it
channelSchema.post('deleteOne', async function(doc) {

    await new this.model('ExternalResource').deleteMany({ channel: doc._id })
    await new this.model('DesignFile').deleteMany({ channel: doc._id })
    await new this.model('CodeFile').deleteMany({ channel: doc._id })
})

export const Channel = model<IChannel, ChannelModel>('Channel', channelSchema)